export const layout = "layouts/post.vto";
export const type = "post";

// Pretty URLs: /<owner>/<name>/<YYYY-MM-DD>/ — built from each post's
// `repo` and `date` front matter rather than the source filename.
export const url = (page: Lume.Page): string => {
  const repo = page.data.repo;
  const date = page.data.date;
  const ymd = date instanceof Date ? date.toISOString().slice(0, 10) : String(date);
  return `/${repo}/${ymd}/`;
};
