// EXPERIMENT (index-c): page-level split. A "Latest" feed — each repo's most
// recent daily summary with its excerpt — sits above the existing 40-day
// activity dashboard. Because the two live in separate, labelled sections, the
// prose can't be misread as describing the whole 40-day strip.
export const layout = "layouts/base.vto";
export const url = "/index-c.html";

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

  const end = new Date(`${ymd(new Date())}T00:00:00Z`);
  end.setUTCDate(end.getUTCDate() - 1);

  // --- Latest feed: each repo's most recent daily summary, newest first. ---
  const latestItems: { repo: string; post: Lume.Data }[] = [];
  for (const repo of watched) {
    const post = allPosts.find((p) =>
      p.repo === repo && (p.period ?? "daily") === "daily" &&
      p.size !== "N" && p.excerpt
    );
    if (post) latestItems.push({ repo, post });
  }
  latestItems.sort((a, b) =>
    toDate(b.post.date).getTime() - toDate(a.post.date).getTime()
  );

  const feed = latestItems.map(({ repo, post }) => {
    const d = toDate(post.date);
    const commits = Number(post.commits ?? 0);
    return `<article class="border-b border-rule py-6 first:pt-0 last:border-0">
      <p class="m-0 mb-1.5 flex flex-wrap items-center gap-x-2 text-xs font-semibold uppercase tracking-wider text-ink-soft">
        <a href="/${repo}/" class="font-mono text-accent no-underline hover:underline">${repo}</a>
        <span>· ${human(d)}${commits ? ` · ${commits} commits` : ""}</span>
      </p>
      <h3 class="m-0 mb-1 text-xl font-bold leading-snug tracking-tight"><a class="text-ink no-underline hover:text-accent" href="${post.url}">${post.title}</a></h3>
      <p class="m-0 text-base text-ink-soft">${post.excerpt}</p>
    </article>`;
  }).join("\n");

  const latestSection = feed
    ? `<section class="mb-14">
        <h2 class="mb-5 m-0 text-xs font-semibold uppercase tracking-wider text-ink-soft">Latest</h2>
        <div>${feed}</div>
      </section>`
    : "";

  // --- Activity dashboard: the existing 40-day strip, one row per repo. ---
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
      strip += `<span class="${cell} ${color}" title="${tip}"></span>`;
    }

    const stat =
      `<span class="shrink-0 whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-ink-soft">${totalCommits} commits in ${CELLS} days</span>`;

    const footer = hasIssues
      ? ""
      : `<p class="mt-4 m-0 italic text-ink-soft">No issues yet — check back after the next daily run.</p>`;

    return `<a href="/${repo}/" class="-mx-4 block border-b border-rule px-4 py-6 text-ink no-underline transition-colors last:border-0 hover:bg-[#fafafa]">
      <div class="mb-3.5 flex items-baseline justify-between gap-4">
        <h2 class="font-mono text-lg font-semibold text-accent">${repo}</h2>
        ${stat}
      </div>
      <div class="flex gap-1" aria-hidden="true">${strip}</div>
      ${footer}
    </a>`;
  });

  const dashboard = `<section>
    <h2 class="mb-5 m-0 text-xs font-semibold uppercase tracking-wider text-ink-soft">Activity · last 40 days</h2>
    <div>${cards.join("\n")}</div>
  </section>`;

  return `${latestSection}${dashboard}`;
}
