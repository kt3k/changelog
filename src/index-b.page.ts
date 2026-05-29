// EXPERIMENT (index-b): approach B alone — anchor the latest-day summary to
// its own cell in the 40-day strip. The cell that summary describes is ringed
// in accent and the excerpt below shares that accent, so the strip still reads
// as a 40-day overview while the prose visibly belongs to one cell. No added
// scope labels (that is the A variant); the link is purely visual.
export const layout = "layouts/base.vto";
export const url = "/index-b.html";

const CELLS = 40;

const ymd = (d: Date): string => d.toISOString().slice(0, 10);
const toDate = (v: unknown): Date =>
  v instanceof Date ? v : new Date(v as string);

export default function (data: Lume.Data): string {
  const watched: string[] = data.watched ?? [];
  const allPosts = data.search.pages("type=post", "date=desc");

  const end = new Date(`${ymd(new Date())}T00:00:00Z`);
  end.setUTCDate(end.getUTCDate() - 1);

  const cards = watched.map((repo) => {
    const posts = allPosts.filter((p) =>
      p.repo === repo && (p.period ?? "daily") === "daily"
    );

    const sizeByDate = new Map<string, string>();
    const commitsByDate = new Map<string, number>();
    for (const p of posts) {
      const d = toDate(p.date);
      sizeByDate.set(ymd(d), (p.size as string) ?? "M");
      commitsByDate.set(ymd(d), Number(p.commits ?? 0));
    }

    // Latest day that actually carries a summary (skip size:N / empty excerpt).
    const latest = posts.find((p) => p.size !== "N" && p.excerpt);
    const latestKey = latest ? ymd(toDate(latest.date)) : null;
    const hasIssues = posts.some((p) => p.size !== "N");

    const cell = "flex-1 aspect-square rounded-[3px]";
    let strip = "";
    let totalCommits = 0;
    for (let i = CELLS - 1; i >= 0; i--) {
      const d = new Date(end);
      d.setUTCDate(d.getUTCDate() - i);
      const key = ymd(d);
      totalCommits += commitsByDate.get(key) ?? 0;
      const size = sizeByDate.get(key);
      const active = size && size !== "N";
      const color = active ? `bg-cell-${size!.toLowerCase()}` : "bg-cell-empty";
      const tip = active ? `${key} · ${size}` : key;
      // Anchor (B): ring the one cell the excerpt below is about.
      const ring = key === latestKey
        ? " relative z-10 ring-2 ring-accent ring-offset-1 ring-offset-white"
        : "";
      strip += `<span class="${cell} ${color}${ring}" title="${tip}"></span>`;
    }

    const stat =
      `<span class="shrink-0 whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-ink-soft">${totalCommits} commits in ${CELLS} days</span>`;

    let latestBlock = "";
    if (latest) {
      // Accent left-border ties the prose to the ringed cell by colour alone.
      latestBlock = `
      <div class="mt-5 border-l-2 border-accent pl-4">
        <h3 class="m-0 mb-1 text-base font-bold leading-snug tracking-tight text-ink">${latest.title}</h3>
        <p class="m-0 text-sm text-ink-soft">${latest.excerpt}</p>
      </div>`;
    } else if (!hasIssues) {
      latestBlock =
        `<p class="mt-4 m-0 italic text-ink-soft">No issues yet — check back after the next daily run.</p>`;
    }

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
