---
date: 2026-05-25
repo: lumeland/lume
title: "Icons plugin gains SVG sprite support"
excerpt: "Sample article. The icons plugin can now emit a single SVG sprite, with renamed, clearer options."
commit_count: 16
---
> **Sample issue** for layout/testing. Replace with real output via `deno task digest`.

### **Icons plugin can emit a single SVG sprite (e77211a)**
The icons plugin now supports generating one combined SVG sprite alongside (or
instead of) individual icon files, cutting request counts for icon-heavy sites.
A new `spriteIcon` helper is registered on `Lume.Helpers` so templates can
reference sprite symbols directly (dd2a2ea).

### **Clearer icon option names — breaking (4696b19, bf99058)**
Several options were renamed for consistency: `sprite` → `spriteFile`,
`iconSprite` → `spriteIcon`, and the `defaultMode` option was removed. Existing
configs using the old names will need updating.

### Other misc changes
- New patch release + CHANGELOG updates (4 commits)
- `Run fmt` formatting passes (2 commits)
- Strip the `version` attribute from sprite output (840f3d6)
- Test snapshot updates for the icons changes (2 commits)
