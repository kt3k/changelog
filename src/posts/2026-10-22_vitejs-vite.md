---
date: 2026-10-22
repo: vitejs/vite
size: M
title: "Bundled dev and SSR resolve fixes land"
excerpt: "Vite fixed Node builtin handling in bundled dev and SSR webworker builds, plus a static alias edge case."
commits: 8
authors: [sapphi-red, h-a-n-a, smeng9, btea]
commit_authors: {"4260c75": h-a-n-a, "a711f1c": sapphi-red, "1b6ed05": btea}
---

**Bundled dev now supports named imports from Node built-ins** (4260c75)
Vite passes bundled-dev resolve context through to Oxc so named imports like `import { readFileSync } from 'node:fs'` don’t break resolution. The playground coverage adds both the success case and the expected plain-dev failure mode.

**SSR webworker builds convert external builtin requires to imports** (a711f1c)
When building SSR for `webworker`, Vite now tells the resolver to convert external `require()` calls against Node built-ins into ESM imports, avoiding `createRequire`-based output that can’t run there. The new tests cover runtime behavior, build output, and the automatic externalization warning path.

**Static alias replacement preserves `$` patterns and regex captures** (1b6ed05)
Static file aliasing now avoids `String.prototype.replace` semantics for plain string aliases, so replacements containing `$`, `$&`, or `$'` are preserved literally. Regex aliases still use replacement backrefs, and the new tests lock in both behaviors.

### Other misc changes
- Rolldown dependency bumps and related snapshot/test updates (3 commits)
- `@node-rs/bcrypt` updated to v2 in the SSR deps playground
- Preact template dependency bumped to v11
- Dynamic import and css-codesplit test flake fixes
