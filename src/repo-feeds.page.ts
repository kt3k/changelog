// Generates the three tab pages per watched repo:
//   /<owner>/<name>/          daily issues   (directory index)
//   /<owner>/<name>/weekly    weekly summaries
//   /<owner>/<name>/monthly   monthly summaries
export const layout = "layouts/repo.vto";

const PERIODS = [
  { key: "daily", label: "Daily", seg: "" },
  { key: "weekly", label: "Weekly", seg: "weekly" },
  { key: "monthly", label: "Monthly", seg: "monthly" },
];

export default function* (data: Lume.Data) {
  const watched: string[] = data.watched ?? [];
  const all = data.search.pages("type=post", "date=desc");

  for (const repo of watched) {
    const tabs = PERIODS.map((p) => ({
      label: p.label,
      key: p.key,
      href: p.seg ? `/${repo}/${p.seg}` : `/${repo}/`,
    }));

    for (const p of PERIODS) {
      const feedPosts = all.filter((post) =>
        post.repo === repo &&
        (post.period ?? "daily") === p.key &&
        post.size !== "N"
      );
      yield {
        url: p.seg ? `/${repo}/${p.seg}.html` : `/${repo}/`,
        repo,
        period: p.key,
        tabs,
        feedPosts,
      };
    }
  }
}
