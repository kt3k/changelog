// Home page: one row per watched repo. Each row pairs a 40-day activity strip
// (cells coloured by issue `size`) with the repo's latest daily summary. The
// strip is scoped "Last 40 days" and the summary gets a dated "Latest" label
// whose accent matches the ringed cell it describes — so the strip reads as a
// 40-day overview while the excerpt clearly belongs to one single day.
export const layout = "layouts/base.vto";

const CELLS = 40;
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const ymd = (d: Date): string => d.toISOString().slice(0, 10);
const human = (d: Date): string => `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`;
const toDate = (v: unknown): Date =>
  v instanceof Date ? v : new Date(v as string);

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
      const d = toDate(p.date);
      sizeByDate.set(ymd(d), (p.size as string) ?? "M");
      commitsByDate.set(ymd(d), Number(p.commits ?? 0));
    }

    // Latest day that actually carries a summary (skip size:N / empty excerpt).
    const latest = posts.find((p) => p.size !== "N" && p.excerpt);
    const latestDate = latest ? toDate(latest.date) : null;
    const latestKey = latestDate ? ymd(latestDate) : null;
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
      // Ring the one cell the latest summary below is about.
      const ring = key === latestKey
        ? " relative z-10 ring-2 ring-accent ring-offset-1 ring-offset-white"
        : "";
      strip += `<span class="${cell} ${color}${ring}" title="${tip}"></span>`;
    }

    // Name the timespan so the strip can't be read as "today".
    const stat =
      `<span class="shrink-0 whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-ink-soft">Last 40 days · ${totalCommits} commits</span>`;

    let latestBlock = "";
    if (latest && latestDate) {
      // Dated, accent-tinted label pairs the prose with the ringed cell above.
      latestBlock = `
      <div class="mt-5 border-l-2 border-accent pl-4">
        <p class="m-0 mb-1 text-xs font-semibold uppercase tracking-wider text-accent">Latest · ${human(latestDate)}</p>
        <h3 class="m-0 mb-1 text-base font-bold leading-snug tracking-tight text-ink">${latest.title}</h3>
        <p class="m-0 text-sm text-ink-soft">${latest.excerpt}</p>
      </div>`;
    } else if (!hasIssues) {
      latestBlock =
        `<p class="mt-4 m-0 italic text-ink-soft">No issues yet — check back after the next daily run.</p>`;
    }

    // The whole card is a single link to the repo feed, with a subtle hover.
    return `<a href="/${repo}/" class="-mx-4 block border-b border-rule px-4 py-6 text-ink no-underline transition-colors last:border-0 hover:bg-[#fafafa]">
      <div class="mb-3.5 flex items-baseline justify-between gap-4">
        <h2 class="font-mono text-lg font-semibold text-accent">${repo}</h2>
        ${stat}
      </div>
      <div class="flex gap-1" aria-hidden="true">${strip}</div>
      ${latestBlock}
    </a>`;
  });

  return `<div>${cards.join("\n")}</div>`;
}
