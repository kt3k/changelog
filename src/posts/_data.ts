export const layout = "layouts/post.vto";
export const type = "post";
// Default; weekly/monthly articles override this in their own front matter.
export const period = "daily";

// Pretty URLs built from each post's `repo` and a slug:
//   daily   -> /<owner>/<name>/<YYYY-MM-DD>   (slug defaults to the date)
//   weekly  -> /<owner>/<name>/<YYYY-Www>
//   monthly -> /<owner>/<name>/<YYYY-MM>
export const url = (page: Lume.Page): string => {
  const { repo, date, slug } = page.data;
  const ymd = date instanceof Date ? date.toISOString().slice(0, 10) : String(date);
  return `/${repo}/${slug ?? ymd}.html`;
};
