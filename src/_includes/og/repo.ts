// Satori layout for per-repo og:image cards (rendered by the og_images
// plugin; see docs/og-image.md). Returns a plain React-element-like object
// tree, so no JSX toolchain is needed.
//
// Layout: "Changelog" brand header / <owner>/<name> masthead with the accent
// underline / a one-line commit-stats deck / a 30-day commit sparkline with
// month labels. All data comes from the repo's daily posts.

const DAYS = 30;
const BAR_W = 26;
const BAR_GAP = 7;
const BAR_MAX_H = 110;
const BAR_MIN_H = 8;

const INK = "#333333";
const INK_SOFT = "#6b6b6b";
const RULE = "#e6e6e6";
const ACCENT = "#ff572f";
const GREEN = "#40c463";
const EMPTY = "#ebedf0";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// deno-lint-ignore no-explicit-any
type Node = any;

const h = (
  type: string,
  style: Record<string, unknown>,
  children?: Node,
): Node => ({ type, props: { style, children } });

const toDate = (d: unknown): Date => d instanceof Date ? d : new Date(`${d}`);

export default function (data: Lume.Data): Node {
  const repo = data.repo as string;
  const [owner, name] = repo.split("/");

  // Last DAYS daily posts (incl. "no change" size-N days) for this repo.
  const dailies = data.search.pages(`type=post repo="${repo}"`, "date=asc")
    .filter((p) => (p.period ?? "daily") === "daily")
    .slice(-DAYS);
  const days = dailies.map((p) => ({
    date: toDate(p.date),
    commits: (p.commits as number | undefined) ?? 0,
  }));

  const total = days.reduce((sum, d) => sum + d.commits, 0);
  const active = days.filter((d) => d.commits > 0).length;
  const max = Math.max(1, ...days.map((d) => d.commits));

  const bars = days.map((d) =>
    h("div", {
      width: BAR_W,
      height: d.commits === 0
        ? BAR_MIN_H
        : Math.max(BAR_MIN_H, Math.round(d.commits / max * BAR_MAX_H)),
      borderRadius: 4,
      backgroundColor: d.commits === 0 ? EMPTY : GREEN,
      flexShrink: 0,
    })
  );

  // A month label under the first bar and under each 1st-of-month bar.
  const labels: Node[] = [];
  let prev = 0;
  days.forEach((d, i) => {
    if (i !== 0 && d.date.getUTCDate() !== 1) return;
    labels.push(h("div", {
      marginLeft: (i - prev) * (BAR_W + BAR_GAP),
      fontSize: 22,
      fontWeight: 600,
      color: INK_SOFT,
      flexShrink: 0,
    }, MONTHS[d.date.getUTCMonth()]));
    prev = i;
  });

  const statsRun = (text: string, strong = false) =>
    h("span", {
      fontSize: 29,
      fontWeight: strong ? 800 : 500,
      color: strong ? INK : INK_SOFT,
    }, text);

  return h("div", {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    color: INK,
    fontFamily: "Mulish",
    padding: "72px 100px",
  }, [
    // Brand header, echoing the site header.
    h("div", {
      display: "flex",
      borderBottom: `1px solid ${RULE}`,
      paddingBottom: 24,
    }, [
      h(
        "div",
        { fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em" },
        "Changelog",
      ),
    ]),
    h("div", {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }, [
      // Masthead: repo name with the accent underline tracking its width.
      h("div", {
        display: "flex",
        flexDirection: "column",
        alignSelf: "flex-start",
      }, [
        h("div", {
          display: "flex",
          fontSize: 84,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }, [
          h("span", { color: INK_SOFT, fontWeight: 700 }, `${owner}/`),
          h("span", {}, name),
        ]),
        // No width: stretches to the masthead's width (= the repo name text).
        // A percentage width would resolve against the auto-sized parent and
        // collapse to 0 in satori's layout engine.
        h("div", {
          marginTop: 20,
          height: 10,
          borderRadius: 5,
          backgroundColor: ACCENT,
        }),
      ]),
      // Stats deck.
      h("div", { display: "flex", marginTop: 44, alignItems: "baseline" }, [
        statsRun(`${total}`, true),
        statsRun(" commits"),
        statsRun(" / "),
        statsRun(`${active}`, true),
        statsRun(" active days"),
        statsRun(" · "),
        statsRun(`last ${days.length} days`),
      ]),
      // Sparkline + month labels.
      h("div", {
        display: "flex",
        alignItems: "flex-end",
        marginTop: 28,
        height: BAR_MAX_H,
        gap: BAR_GAP,
      }, bars),
      h("div", { display: "flex", marginTop: 14 }, labels),
    ]),
  ]);
}
