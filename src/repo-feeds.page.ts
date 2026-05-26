// Generates one feed page per watched repo at /<owner>/<name>/,
// listing that repo's daily issues newest-first.
export const layout = "layouts/repo.vto";

export default function* (data: Lume.Data) {
  const posts = data.search.pages("type=post", "date=desc");
  const repos = [...new Set(posts.map((p) => p.repo as string).filter(Boolean))];

  for (const repo of repos) {
    yield {
      // Feed is the directory index for the repo (/<owner>/<name>/) so it can
      // coexist with the nested article pages living inside that directory.
      url: `/${repo}/`,
      repo,
      title: repo,
      // Exclude "no change" (size: N) issues from the listing.
      feedPosts: posts.filter((p) => p.repo === repo && p.size !== "N"),
    };
  }
}
