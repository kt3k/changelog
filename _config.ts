import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import basePath from "lume/plugins/base_path.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
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

// Expose the watched repo list (from repos.yml) to all templates.
const reposDoc = parseYaml(await Deno.readTextFile("repos.yml")) as {
  repos?: (string | { repo: string })[];
};
const watched = (reposDoc.repos ?? []).map((r) =>
  typeof r === "string" ? r : r.repo
);
site.data("watched", watched);

// Tailwind entry stylesheet (compiled by the tailwindcss plugin).
site.add("/styles.css");

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
    page.content = (page.content as string).replace(
      /\(([0-9a-f]{7,40}(?:,\s*[0-9a-f]{7,40})*)\)/g,
      (_m, group: string) =>
        "(" +
        group.replace(/[0-9a-f]{7,40}/g, (h) => {
          const login = byCommit[h.slice(0, 7)];
          // Prefix the resolved author's avatar (links to their profile).
          const avatar = login
            ? `<a href="https://github.com/${login}" title="${login}">` +
              `<img class="commit-avatar" src="https://github.com/${login}.png?size=24" alt="${login}" loading="lazy" /></a>`
            : "";
          return `${avatar}<a href="https://github.com/${repo}/commit/${h}">${h}</a>`;
        }) +
        ")",
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

export default site;
