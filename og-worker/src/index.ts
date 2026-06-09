// On-demand og:image cards for daily digest posts, rendered at request time.
//
//   GET /<owner>/<name>/<YYYY-MM-DD>.png
//
// The path mirrors the article URL on the site. The worker fetches the post's
// markdown straight from the GitHub repo, reads its frontmatter (title,
// commits, …), and renders a 1200×630 card with satori (via workers-og).
// Responses are immutable-cached at the edge: a post for a past date never
// changes, so each card renders at most once per PoP.
//
// See docs/og-image.md for how this fits with the build-time cards.

import { ImageResponse } from "workers-og";
import { parse as parseYaml } from "yaml";
import mulish500 from "../fonts/mulish-500.ttf";
import mulish700 from "../fonts/mulish-700.ttf";
import mulish800 from "../fonts/mulish-800.ttf";

const REPO_RAW = "https://raw.githubusercontent.com/kt3k/changelog/main";

const INK = "#333333";
const INK_SOFT = "#6b6b6b";
const RULE = "#e6e6e6";
const ACCENT = "#ff572f";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface PostMeta {
  title?: string;
  excerpt?: string;
  commits?: number;
  size?: string;
}

// workers-og parses HTML with HTMLRewriter, which never decodes entities —
// `&amp;` etc. would render literally. So: leave `&` and quotes raw (safe in
// text chunks), and swap angle brackets for lookalikes so a stray `<` in a
// headline can't open a bogus tag.
const sanitize = (s: string): string => s.replace(/</g, "‹").replace(/>/g, "›");

const NBSP = " ";

const longDate = (ymd: string): string => {
  const [y, m, d] = ymd.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};

function frontmatter(md: string): PostMeta {
  const m = md.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  try {
    return parseYaml(m[1]) as PostMeta;
  } catch {
    return {};
  }
}

// Note: the underline div carries an explicit `display: flex` even though it
// has no children — workers-og's HTML parser mishandles childless styled divs
// without it (satori then rejects the tree).
function card(
  repo: string,
  date: string,
  meta: PostMeta,
): string {
  const [owner, name] = repo.split("/");
  const title = meta.title ?? "Daily digest";
  const commits = meta.commits ?? 0;
  const statsHtml = commits > 0
    ? `<span style="font-weight: 800; color: ${INK};">${commits}</span>
       <span>${NBSP}commit${commits === 1 ? "" : "s"} on the main branch</span>`
    : `<span>No changes on the main branch</span>`;

  return `<div style="display: flex; flex-direction: column; width: 1200px; height: 630px;
                background: #ffffff; color: ${INK}; font-family: Mulish;
                padding: 72px 100px;">
      <div style="display: flex; border-bottom: 1px solid ${RULE}; padding-bottom: 24px;">
        <span style="font-size: 30px; font-weight: 800; letter-spacing: -0.02em;">Changelog</span>
      </div>
      <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;">
        <div style="display: flex; font-size: 32px; font-weight: 700; color: ${INK_SOFT};">
          <span>${sanitize(owner)}/${sanitize(name)}</span>
          <span style="font-weight: 500;">${NBSP}· ${longDate(date)}</span>
        </div>
        <div style="display: flex; flex-direction: column; align-self: flex-start; margin-top: 36px;">
          <span style="font-size: 64px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.15;">
            ${sanitize(title)}
          </span>
          <div style="display: flex; margin-top: 24px; height: 10px; border-radius: 5px; background: ${ACCENT};"></div>
        </div>
        <div style="display: flex; margin-top: 40px; font-size: 29px; font-weight: 500; color: ${INK_SOFT};">
          ${statsHtml}
        </div>
      </div>
    </div>`.replace(/\n\s*/g, " ");
}

function render(html: string): ImageResponse {
  return new ImageResponse(html, {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Mulish", data: mulish500, weight: 500, style: "normal" },
      { name: "Mulish", data: mulish700, weight: 700, style: "normal" },
      { name: "Mulish", data: mulish800, weight: 800, style: "normal" },
    ],
  });
}

export default {
  async fetch(
    req: Request,
    _env: unknown,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const url = new URL(req.url);
    const m = url.pathname.match(
      /^\/([\w.-]+)\/([\w.-]+)\/(\d{4}-\d{2}-\d{2})\.png$/,
    );
    if (!m) return new Response("Not found", { status: 404 });
    const [, owner, name, date] = m;
    const repo = `${owner}/${name}`;

    const cache = caches.default;
    const cached = await cache.match(req);
    if (cached) return cached;

    // Posts are named src/posts/<date>_<owner>-<name>.md.
    const postUrl = `${REPO_RAW}/src/posts/${date}_${owner}-${name}.md`;
    const postRes = await fetch(postUrl);

    let res: Response;
    if (postRes.ok) {
      const meta = frontmatter(await postRes.text());
      const img = render(card(repo, date, meta));
      res = new Response(img.body, img);
      // A published day's digest is effectively immutable.
      res.headers.set("Cache-Control", "public, max-age=31536000, immutable");
    } else {
      // No such post (yet): render a generic card, but only cache it briefly
      // in case the digest lands later.
      const img = render(card(repo, date, { title: "Daily digest" }));
      res = new Response(img.body, img);
      res.headers.set("Cache-Control", "public, max-age=3600");
    }

    ctx.waitUntil(cache.put(req, res.clone()));
    return res;
  },
};
