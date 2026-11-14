---
date: 2026-11-13
repo: vitejs/vite
size: L
title: "SSR CSS fix plus Vite+ support"
excerpt: "Vite now avoids externalizing CSS imports in SSR, adds build manifest access, and create-vite learns Vite+ and DevTools flows."
commits: 7
authors: [sapphi-red, jamesopstad, btea, fengmk2, sheremet-va, webfansplz]
commit_authors: {"f898888": sapphi-red, "4bf4f32": sapphi-red, "4db9844": jamesopstad, "c1cc047": btea, "4d21dc4": fengmk2, "5ff255e": sheremet-va, "f0a0b5a": webfansplz}
---

### **SSR CSS imports no longer get externalized by default** (f898888)
Vite now forces CSS resolvers to stay internal during SSR-style resolution, fixing cases where package exports for `style`/`sass`/`less` could be externalized unexpectedly. A new playground covers CSS, Sass, and Less package imports in SSR to verify styles still resolve and apply correctly.

### **Build environments can read `environment.manifest` directly** (4db9844)
The build pipeline now exposes each environment’s manifest object after build, even when `build.manifest` is disabled and no file is written. That makes it easier for plugins to consume manifest data in `buildApp` without round-tripping through the filesystem.

### **create-vite adds first-class Vite+ and DevTools support** (4d21dc4, f0a0b5a)
The scaffolder now recognizes the Vite+ package manager (`vp`) for install/run command generation, and it can detect `VP_USER_AGENT` when launched through `vp dlx`. It also adds an opt-in DevTools flow, including CLI flags, prompts, and template-specific config/package updates.

### **Bundled SSR dev mode lands in the module runner** (5ff255e)
Vite’s SSR runtime gained bundled dev-mode support, with substantial changes across the module runner, HMR handling, fetch/runtime plumbing, and source-map retention. This is a major infra change that enables a different SSR dev execution path and comes with extensive test coverage.

### Other misc changes
- Native process start-time lookup added for Windows via an optional addon (4bf4f32).
- Fixed the `sirv` patch type for `shouldServe` to return `boolean` (c1cc047).
