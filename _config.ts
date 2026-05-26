import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import basePath from "lume/plugins/base_path.ts";
import { parse as parseYaml } from "@std/yaml";

const site = lume({
  src: "./src",
  // Overridden in CI (SITE_URL) so links work under a GitHub Pages subpath.
  location: new URL(Deno.env.get("SITE_URL") ?? "http://localhost:3000/"),
});

site.use(date());
site.use(basePath()); // rewrites href/src in the output to include the base path

// Expose the watched repo list (from repos.yml) to all templates.
const reposDoc = parseYaml(await Deno.readTextFile("repos.yml")) as {
  repos?: (string | { repo: string })[];
};
const watched = (reposDoc.repos ?? []).map((r) =>
  typeof r === "string" ? r : r.repo
);
site.data("watched", watched);

// Copy static assets through untouched.
site.copy("/styles.css");

export default site;
