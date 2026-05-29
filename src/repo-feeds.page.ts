// Generates the per-repo tab pages and their time-bucketed archive pages:
//   /<owner>/<name>/               daily   — latest N + month archive index
//   /<owner>/<name>/<YYYY>/<MM>    daily   — one month
//   /<owner>/<name>/weekly         weekly  — latest N + year archive index
//   /<owner>/<name>/weekly/<YYYY>  weekly  — one year
//   /<owner>/<name>/monthly        monthly — latest N + year archive index
//   /<owner>/<name>/monthly/<YYYY> monthly — one year
export const layout = "layouts/repo.vto";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// `latest` = posts shown on the tab landing before the archive index.
// `bucket` = how the rest are grouped into permalinked archive pages.
const PERIODS = [
  { key: "daily", label: "Daily", seg: "", latest: 30, bucket: "month" },
  { key: "weekly", label: "Weekly", seg: "weekly", latest: 12, bucket: "year" },
  { key: "monthly", label: "Monthly", seg: "monthly", latest: 12, bucket: "year" },
];

interface Bucket {
  label: string;
  url: string;
  posts: Lume.Data[];
}

const toDate = (post: Lume.Data): Date =>
  post.date instanceof Date ? post.date : new Date(post.date as string);

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
      const topHref = p.seg ? `/${repo}/${p.seg}` : `/${repo}/`;

      const posts = all.filter((post) =>
        post.repo === repo &&
        (post.period ?? "daily") === p.key &&
        post.size !== "N"
      );

      // Group into buckets (months for daily, years otherwise). `posts` is
      // date-desc, so each bucket is first seen newest-first and the bucket
      // list stays in descending order.
      const buckets: Bucket[] = [];
      const byKey = new Map<string, Bucket>();
      for (const post of posts) {
        const d = toDate(post);
        const y = d.getUTCFullYear();
        let key: string, label: string, url: string;
        if (p.bucket === "month") {
          const m = d.getUTCMonth();
          key = `${y}-${m}`;
          label = `${MONTHS[m]} ${y}`;
          url = `/${repo}/${y}/${String(m + 1).padStart(2, "0")}`;
        } else {
          key = `${y}`;
          label = `${y}`;
          url = `/${repo}/${p.seg}/${y}`;
        }
        let b = byKey.get(key);
        if (!b) {
          b = { label, url, posts: [] };
          byKey.set(key, b);
          buckets.push(b);
        }
        b.posts.push(post);
      }

      const archive = buckets.map((b) => ({
        label: b.label,
        url: b.url,
        count: b.posts.length,
      }));

      // Tab landing: newest `latest` posts, with the archive index below.
      yield {
        url: p.seg ? `/${repo}/${p.seg}.html` : `/${repo}/`,
        repo,
        period: p.key,
        tabs,
        topHref,
        feedPosts: posts.slice(0, p.latest),
        archive,
      };

      // One permalinked page per bucket holding that month's/year's full slice.
      for (const b of buckets) {
        yield {
          url: `${b.url}.html`,
          repo,
          period: p.key,
          tabs,
          topHref,
          bucketLabel: b.label,
          bucketUrl: b.url,
          feedPosts: b.posts,
          archive,
        };
      }
    }
  }
}
