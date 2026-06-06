import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import basePath from "lume/plugins/base_path.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import feed from "lume/plugins/feed.ts";
import ogImages from "lume/plugins/og_images.ts";
import { parse as parseYaml } from "@std/yaml";

const site = lume({
  src: "./src",
  // Overridden in CI (SITE_URL) so links work under a GitHub Pages subpath.
  location: new URL(Deno.env.get("SITE_URL") ?? "http://localhost:3000/"),
  // Emit `foo.html` instead of `foo/index.html` → no trailing slash in URLs.
  prettyUrls: false,
});

site.use(date());
site.use(tailwindcss());
site.use(basePath()); // rewrites href/src in the output to include the base path

// Lume's _cache keys entries with WebCrypto MD5, which Deno 2.8 removed, so
// every cache write throws. Disabling the cache only costs re-rendering the
// og:image cards each build, which is fast. TODO: drop once Lume digests with
// a supported algorithm.
site.cache = undefined;

// Per-repo og:image cards (pages opt in via `openGraphLayout`; the repo tab
// landing pages do — see src/repo-feeds.page.ts and src/_includes/og/repo.ts).
const mulish = (weight: number) =>
  Deno.readFile(new URL(`./src/_fonts/mulish-${weight}.ttf`, import.meta.url));
site.use(ogImages({
  options: {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Mulish", weight: 500, style: "normal", data: await mulish(500) },
      { name: "Mulish", weight: 600, style: "normal", data: await mulish(700) },
      { name: "Mulish", weight: 700, style: "normal", data: await mulish(700) },
      { name: "Mulish", weight: 800, style: "normal", data: await mulish(800) },
    ],
  },
}));

// Expose the watched repo list (from repos.yml) to all templates.
const reposDoc = parseYaml(await Deno.readTextFile("repos.yml")) as {
  repos?: (string | { repo: string })[];
};
const watched = (reposDoc.repos ?? []).map((r) =>
  typeof r === "string" ? r : r.repo
);
site.data("watched", watched);

// Next scheduled daily run (cron "10 0 * * *"): the upcoming 00:10 UTC, computed
// at build time and shown in the footer.
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const buildNow = new Date();
const nextRun = new Date(`${buildNow.toISOString().slice(0, 10)}T00:10:00Z`);
if (nextRun.getTime() <= buildNow.getTime()) {
  nextRun.setUTCDate(nextRun.getUTCDate() + 1);
}
site.data(
  "nextUpdate",
  `${MONTHS[nextRun.getUTCMonth()]} ${nextRun.getUTCDate()}, 00:10 UTC`,
);

// Tailwind entry stylesheet (compiled by the tailwindcss plugin).
site.add("/styles.css");

// Social-card image (see docs/og-image.md for how to regenerate it).
site.add("/og.png");

// One RSS feed per repo per cadence at /<owner>/<name>/<period>.rss. Each
// excludes "no change" (size: N) entries; item content is the rendered article
// body so readers get the full issue.
const FEED_PERIODS = [
  { key: "daily", label: "Daily", limit: 50 },
  { key: "weekly", label: "Weekly", limit: 30 },
  { key: "monthly", label: "Monthly", limit: 24 },
];
for (const repo of watched) {
  for (const f of FEED_PERIODS) {
    site.use(feed({
      output: `/${repo}/${f.key}.rss`,
      query: `type=post repo=${repo} period=${f.key} size!=N`,
      limit: f.limit,
      info: {
        title: `${repo} · ${f.label}`,
        description: `${f.label} digest of activity in ${repo}.`,
        lang: "en",
      },
      items: {
        title: "=title",
        description: "=excerpt",
        published: "=date",
        content: "=children",
      },
    }));
  }
}

// Linkify commit hashes in post bodies to their GitHub commit page. Summaries
// reference short hashes per the prompt's `(abc1234)` convention (sometimes a
// comma-separated group like `(2148214, 18b7c95, cab4feb)`); the repo comes
// from the post's front matter. Matching only parenthesized hex groups avoids
// touching hex that happens to appear elsewhere in the markup. Runs before the
// external-link pass below so these links also get target="_blank".
site.process([".html"], (pages) => {
  for (const page of pages) {
    const repo = page.data.repo as string | undefined;
    if (!repo || page.data.type !== "post") continue;
    // short hash → GitHub login, from the post's front matter (may be absent).
    const byCommit = (page.data.commit_authors ?? {}) as Record<string, string>;
    // Render one hash as its commit link, prefixed with the author's avatar
    // (linking to their profile) when resolved.
    const render = (h: string) => {
      const link = `<a href="https://github.com/${repo}/commit/${h}">${h}</a>`;
      const login = byCommit[h.slice(0, 7)];
      if (!login) return link;
      return `<a href="https://github.com/${login}" title="${login}">` +
        `<img class="commit-avatar" src="https://github.com/${login}.png?size=24" alt="${login}" loading="lazy" /></a>` +
        link;
    };
    page.content = (page.content as string).replace(
      /\(([0-9a-f]{7,40}(?:,\s*[0-9a-f]{7,40})*)\)/g,
      (_m, group: string) => {
        const hashes = group.split(/,\s*/);
        // Glue the parens to their adjacent tokens and keep each avatar+hash
        // together; allow a line break only at the commas between tokens. Each
        // piece is a `white-space: nowrap` span.
        return hashes
          .map((h, i) => {
            const open = i === 0 ? "(" : "";
            const close = i === hashes.length - 1 ? ")" : "";
            return `<span class="commit-ref">${open}${
              render(h)
            }${close}</span>`;
          })
          .join(", ");
      },
    );
  }
});

// Strip the `.html` extension from internal links so the address bar shows
// clean, slash-less URLs (e.g. /denoland/deno/2026-05-25). The `.html` files
// are still emitted; GitHub Pages serves them at the extensionless path.
site.process([".html"], (pages) => {
  for (const page of pages) {
    let html = page.content as string;
    html = html.replace(
      /\b(href|src)="(\/[^"]*?)\.html(#[^"]*)?"/g,
      (_m, attr, path, hash = "") => `${attr}="${path}${hash}"`,
    );
    // Open external (http/https) links in a new tab.
    html = html.replace(
      /<a (?=[^>]*\bhref="https?:\/\/)([^>]*?)>/g,
      '<a $1 target="_blank" rel="noopener noreferrer">',
    );
    page.content = html;
  }
});

// Match the site's clean URLs in the RSS feeds: drop `.html` from the item
// <link>/<guid> targets (the article content itself is left untouched).
site.process([".rss"], (pages) => {
  for (const page of pages) {
    page.content = (page.content as string).replace(
      /\.html(<\/(?:link|guid)>)/g,
      "$1",
    );
  }
});

export default site;
