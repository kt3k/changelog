// EXPERIMENT (index-foo): the 40-day strip becomes interactive. Each repo's
// 40 days of title+excerpt are embedded as JSON; hovering (or tapping) a cell
// moves the accent ring to it and swaps the summary below to that day's. Hover
// out does not reset. On touch, the tap acts like hover and is kept from
// following the card link (preventDefault + stopPropagation).
export const layout = "layouts/base.vto";
export const url = "/index-foo.html";

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

    const cell = "flex-1 aspect-square rounded-[3px] cursor-pointer";
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
      strip +=
        `<span data-i="${idx}" class="${cell} ${color}${ring}" title="${tip}"></span>`;
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

    // The summary block is always present so JS has elements to update; it
    // starts on the latest in-window day, or a fallback note.
    const latest = latestKey ? postByDate.get(latestKey) : null;
    const ebInit = latest ? `Latest · ${human(toDate(latest.date))}` : "";
    const tiInit = latest ? (latest.title as string) : "";
    const exInit = latest
      ? (latest.excerpt as string)
      : hasIssues
      ? "No activity in the last 40 days."
      : "No issues yet — check back after the next daily run.";

    const latestBlock = `
      <div class="mt-5 border-l-2 border-accent pl-4">
        <p data-eyebrow class="m-0 mb-1 text-xs font-semibold uppercase tracking-wider text-accent">${ebInit}</p>
        <h3 data-title class="m-0 mb-1 text-base font-bold leading-snug tracking-tight text-ink"${latest ? "" : ' style="display:none"'}>${tiInit}</h3>
        <p data-excerpt class="m-0 text-sm text-ink-soft">${exInit}</p>
      </div>`;

    return `<a href="/${repo}/" data-card="${repo}" class="-mx-4 block border-b border-rule px-4 py-6 text-ink no-underline transition-colors last:border-0 hover:bg-[#fafafa]">
      <div class="mb-3.5 flex items-baseline justify-between gap-4">
        <h2 class="font-mono text-lg font-semibold text-accent">${repo}</h2>
        ${stat}
      </div>
      <div class="flex gap-1">${strip}</div>
      ${latestBlock}
    </a>`;
  });

  const script = `<script type="application/json" id="repo-days">${safeJson(repoDays)}</script>
<script>
(function () {
  var data = JSON.parse(document.getElementById("repo-days").textContent);
  var RING = ["relative", "z-10", "ring-2", "ring-accent", "ring-offset-1", "ring-offset-white"];
  function show(cell) {
    var card = cell.closest("[data-card]");
    var day = data[card.getAttribute("data-card")][+cell.getAttribute("data-i")];
    if (!day) return;
    card.querySelectorAll("[data-i]").forEach(function (c) {
      c.classList.remove.apply(c.classList, RING);
    });
    cell.classList.add.apply(cell.classList, RING);
    var eb = card.querySelector("[data-eyebrow]");
    var ti = card.querySelector("[data-title]");
    var ex = card.querySelector("[data-excerpt]");
    eb.textContent = day.latest ? "Latest · " + day.human : day.human;
    if (day.active) {
      ti.textContent = day.title;
      ti.style.display = "";
      ex.textContent = day.excerpt;
    } else {
      ti.textContent = "";
      ti.style.display = "none";
      ex.textContent = "No issues on " + day.human + ".";
    }
  }
  document.querySelectorAll("[data-card] [data-i]").forEach(function (cell) {
    cell.addEventListener("mouseenter", function () { show(cell); });
    cell.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      show(cell);
    });
  });
})();
</script>`;

  return `<div>${cards.join("\n")}</div>${script}`;
}
