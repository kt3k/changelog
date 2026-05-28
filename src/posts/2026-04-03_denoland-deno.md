---
date: 2026-04-03
repo: denoland/deno
size: L
title: "Deno ships key Node, test, and install updates"
excerpt: "Major Node compat work lands alongside a new tsconfig subcommand, test sanitizer defaults, and package install/add UX changes."
commits: 9
authors: [bartlomieju]
commit_authors: {"863bf0b": bartlomieju, "d6b5810": bartlomieju, "43deeb2": bartlomieju, "fee0589": bartlomieju, "607c73f": bartlomieju, "6b44f6d": bartlomieju, "4e6eb1e": bartlomieju, "ff775b2": bartlomieju}
---

**`deno install` and `deno add` now default unprefixed packages to npm** (6b44f6d)
This removes the need to type `npm:` for ordinary packages, so commands like `deno install express react` and `deno add ajv` now resolve to npm by default. It’s a practical UX improvement that makes the package workflow feel much closer to standard JS tooling.

**Node child_process sync APIs gain timeout, killSignal, and pid support** (43deeb2)
`spawnSync`/`execSync`/`execFileSync` now accept `timeout` and `killSignal`, return `pid`, and report timeout-killed processes with Node-like error/signal behavior. This closes an important compatibility gap for tooling that depends on sync process control.

**`Deno.test()` no longer fails by default on leaked ops/resources** (fee0589)
The test runner flips `sanitizeOps` and `sanitizeResources` to `false` unless explicitly enabled, reducing noisy failures from incidental async work and open resources. This is a meaningful behavior change for existing test suites and should make defaults much less surprising.

**Node fd-based sockets and handles get broader support** (4e6eb1e, 607c73f, ff775b2)
Several Node compat fixes landed for real OS file descriptors: `net.Socket({ fd })`, `TCP.open(fd)`, and numeric `stdio` entries in child_process now work with actual fds instead of resource IDs. Together these changes unblock more Node-style code that passes around inherited or opened descriptors.

**`deno tsconfig` was added, then immediately reverted** (d6b5810, 863bf0b)
The day briefly introduced a new unstable `deno tsconfig` subcommand for generating TypeScript config files, but it was reverted after the approach was deemed unsuitable. The intended functionality will be folded into `deno install` instead.

### Other misc changes
- Lint defaults changed for `no-process-global` / `no-node-globals` (1 commit).
- Minor Node compat and test harness tweaks.
- Test and fixture updates for the new/changed behaviors.
