// Home page: one row per watched repo, showing only the repo name and a
// daily activity strip (CELLS days) whose cells are colored by issue `size`.
export const layout = "layouts/base.vto";

const CELLS = 40;

const ymd = (d: Date): string => d.toISOString().slice(0, 10);

export default function (data: Lume.Data): string {
  const watched: string[] = data.watched ?? [];
  const allPosts = data.search.pages("type=post", "date=desc");

  // Rightmost cell is yesterday — we can only summarize through the previous
  // (completed) UTC day.
  const end = new Date(`${ymd(new Date())}T00:00:00Z`);
  end.setUTCDate(end.getUTCDate() - 1);

  const cards = watched.map((repo) => {
    const posts = allPosts.filter((p) =>
      p.repo === repo && (p.period ?? "daily") === "daily"
    );

    // size and commit count keyed by day.
    const sizeByDate = new Map<string, string>();
    const commitsByDate = new Map<string, number>();
    for (const p of posts) {
      const d = p.date instanceof Date ? p.date : new Date(p.date as string);
      sizeByDate.set(ymd(d), (p.size as string) ?? "M");
      commitsByDate.set(ymd(d), Number(p.commits ?? 0));
    }
    // Listed issues exclude "no change" (size: N).
    const hasIssues = posts.some((p) => p.size !== "N");

    // CELLS days, oldest -> newest (rightmost = yesterday). Cells flex to fill
    // the full width of the center column; aspect-square keeps them square.
    const cell = "flex-1 aspect-square rounded-[3px]";
    let strip = "";
    let totalCommits = 0;
    for (let i = CELLS - 1; i >= 0; i--) {
      const d = new Date(end);
      d.setUTCDate(d.getUTCDate() - i);
      const key = ymd(d);
      totalCommits += commitsByDate.get(key) ?? 0;
      const size = sizeByDate.get(key);
      // N ("no change") is treated the same as a day with no issue.
      const active = size && size !== "N";
      const color = active ? `bg-cell-${size!.toLowerCase()}` : "bg-cell-empty";
      const tip = active ? `${key} · ${size}` : key;
      strip += `<span class="${cell} ${color}" title="${tip}"></span>`;
    }

    const stat =
      `<span class="shrink-0 whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-ink-soft">${totalCommits} commits in ${CELLS} days</span>`;

    const footer = hasIssues
      ? ""
      : `<p class="mt-4 m-0 italic text-ink-soft">No issues yet — check back after the next daily run.</p>`;

    // The whole card is a single link to the repo feed, with a subtle hover.
    return `<a href="/${repo}/" class="-mx-4 block border-b border-rule px-4 py-6 text-ink no-underline transition-colors last:border-0 hover:bg-[#fafafa]">
      <div class="mb-3.5 flex items-baseline justify-between gap-4">
        <h2 class="font-mono text-lg font-semibold text-accent">${repo}</h2>
        ${stat}
      </div>
      <div class="flex gap-1" aria-hidden="true">${strip}</div>
      ${footer}
    </a>`;
  });

  return `<div>${cards.join("\n")}</div>`;
}
