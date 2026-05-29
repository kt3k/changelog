// Home page: one row per watched repo, each pairing a 40-day activity strip
// with a daily summary. The strip is interactive — hovering a cell with
// activity moves the accent ring to it and swaps the summary below to that
// day's; cells with no activity (size:N / no post) are inert. Links: the repo
// name goes to the repo feed, an active cell goes straight to that day's
// article, and the summary block goes to the article of the day it currently
// shows (kept in sync as you hover). Each repo's 40 days of title + excerpt are
// embedded as JSON for the client script.
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

// Embed JSON in a <script> without letting prose break out of the tag.
const safeJson = (v: unknown): string =>
  JSON.stringify(v).replace(/</g, "\\u003c");

interface Day {
  human: string;
  latest: boolean;
  active: boolean;
  title: string;
  excerpt: string;
}

export default function (data: Lume.Data): string {
  const watched: string[] = data.watched ?? [];
  const allPosts = data.search.pages("type=post", "date=desc");

  const end = new Date(`${ymd(new Date())}T00:00:00Z`);
  end.setUTCDate(end.getUTCDate() - 1);
  const windowStart = new Date(end);
  windowStart.setUTCDate(end.getUTCDate() - (CELLS - 1));
  const windowStartKey = ymd(windowStart);

  const repoDays: Record<string, Day[]> = {};

  const cards = watched.map((repo) => {
    const posts = allPosts.filter((p) =>
      p.repo === repo && (p.period ?? "daily") === "daily"
    );
    const postByDate = new Map<string, Lume.Data>();
    for (const p of posts) postByDate.set(ymd(toDate(p.date)), p);

    // Latest day carrying a summary, but only if it sits inside the strip.
    const latestPost = posts.find((p) => p.size !== "N" && p.excerpt);
    const latestPostKey = latestPost ? ymd(toDate(latestPost.date)) : null;
    const latestKey =
      latestPostKey && latestPostKey >= windowStartKey ? latestPostKey : null;
    const hasIssues = posts.some((p) => p.size !== "N");

    const base = "flex-1 aspect-square rounded-[3px]";
    const days: Day[] = [];
    let strip = "";
    let totalCommits = 0;
    for (let i = CELLS - 1; i >= 0; i--) {
      const d = new Date(end);
      d.setUTCDate(d.getUTCDate() - i);
      const key = ymd(d);
      const p = postByDate.get(key);
      totalCommits += Number(p?.commits ?? 0);
      const size = p?.size as string | undefined;
      const active = !!size && size !== "N";
      const color = active ? `bg-cell-${size!.toLowerCase()}` : "bg-cell-empty";
      const tip = active ? `${key} · ${size}` : key;
      const isLatest = key === latestKey;
      const ring = isLatest
        ? " relative z-10 ring-2 ring-accent ring-offset-1 ring-offset-white"
        : "";
      const idx = days.length;
      // Active cells link straight to that day's article; empty cells are inert.
      strip += active
        ? `<a href="${p!.url}" data-i="${idx}" class="${base} ${color} cursor-pointer${ring}" title="${tip}"></a>`
        : `<span data-i="${idx}" class="${base} ${color}" title="${tip}"></span>`;
      days.push({
        human: human(d),
        latest: isLatest,
        active,
        title: active ? ((p!.title as string) ?? "") : "",
        excerpt: active ? ((p!.excerpt as string) ?? "") : "",
      });
    }
    repoDays[repo] = days;

    const stat =
      `<span class="shrink-0 whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-ink-soft">Last 40 days · ${totalCommits} commits</span>`;

    // The summary block starts on the latest in-window day. When there is one
    // it is a link (kept in sync with the shown day by JS); otherwise a note.
    const latest = latestKey ? postByDate.get(latestKey) : null;
    let summary: string;
    if (latest) {
      summary = `<a data-summary href="${latest.url}" class="group mt-5 block border-l-2 border-accent pl-4 no-underline">
        <p data-eyebrow class="m-0 mb-1 text-xs font-semibold uppercase tracking-wider text-accent">Latest · ${human(toDate(latest.date))}</p>
        <h3 data-title class="m-0 mb-1 text-base font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent">${latest.title}</h3>
        <p data-excerpt class="m-0 text-sm text-ink-soft">${latest.excerpt}</p>
      </a>`;
    } else {
      const note = hasIssues
        ? "No activity in the last 40 days."
        : "No issues yet — check back after the next daily run.";
      summary =
        `<p class="mt-5 m-0 italic text-ink-soft">${note}</p>`;
    }

    return `<div data-card="${repo}" class="border-b border-rule py-6 last:border-0">
      <div class="mb-3.5 flex items-baseline justify-between gap-4">
        <h2 class="m-0 font-mono text-lg font-semibold"><a href="/${repo}/" class="text-accent no-underline hover:underline">${repo}</a></h2>
        ${stat}
      </div>
      <div class="flex gap-1">${strip}</div>
      ${summary}
    </div>`;
  });

  const script = `<script type="application/json" id="repo-days">${safeJson(repoDays)}</script>
<script>
(function () {
  var data = JSON.parse(document.getElementById("repo-days").textContent);
  var RING = ["relative", "z-10", "ring-2", "ring-accent", "ring-offset-1", "ring-offset-white"];
  function show(cell) {
    var card = cell.closest("[data-card]");
    var day = data[card.getAttribute("data-card")][+cell.getAttribute("data-i")];
    // Inert on days with no activity: keep the ring and summary as they were.
    if (!day || !day.active) return;
    card.querySelectorAll("[data-i]").forEach(function (c) {
      c.classList.remove.apply(c.classList, RING);
    });
    cell.classList.add.apply(cell.classList, RING);
    card.querySelector("[data-eyebrow]").textContent =
      day.latest ? "Latest · " + day.human : day.human;
    var ti = card.querySelector("[data-title]");
    ti.textContent = day.title;
    card.querySelector("[data-excerpt]").textContent = day.excerpt;
    // Point the summary link at the day it now shows (copied from the cell so
    // the base path / clean-URL rewrites are preserved).
    card.querySelector("[data-summary]").setAttribute("href", cell.getAttribute("href"));
  }
  document.querySelectorAll("[data-card] [data-i]").forEach(function (cell) {
    cell.addEventListener("mouseenter", function () { show(cell); });
  });
})();
</script>`;

  return `<div>${cards.join("\n")}</div>${script}`;
}
