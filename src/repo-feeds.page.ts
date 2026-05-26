// Generates one feed page per watched repo at /<owner>/<name>/,
// listing that repo's daily issues newest-first.
export const layout = "layouts/repo.vto";

export default function* (data: Lume.Data) {
  const posts = data.search.pages("type=post", "date=desc");
  const repos = [...new Set(posts.map((p) => p.repo as string).filter(Boolean))];

  for (const repo of repos) {
    yield {
      url: `/${repo}/`,
      repo,
      title: repo,
      feedPosts: posts.filter((p) => p.repo === repo),
    };
  }
}
