---
date: 2026-04-09
repo: oven-sh/bun
size: L
title: "Markdown ANSI rendering lands in Bun"
excerpt: "Bun gains a terminal markdown renderer, Linux os.freemem() now matches Node, and usockets DNS cancellation gets safer."
commits: 9
authors: [alii, robobun, dylan-conway, cirospaciari, Jarred-Sumner]
commit_authors: {"68e80db": alii, "e106942": robobun, "d4e8fb9": dylan-conway, "700fc11": alii, "4ee606e": dylan-conway, "c6e2bf8": cirospaciari, "218bf20": cirospaciari, "6f649d6": Jarred-Sumner, "fa6f69f": robobun}
---

**Bun can now render markdown directly to ANSI text** (fa6f69f)
`Bun.markdown.ansi()` adds a fast path for `.md` entrypoints that prints styled terminal output without spinning up the JS VM. It supports headings, lists, tables, code highlighting, links, images, and theme options like width, hyperlinks, and Kitty graphics.

**Linux `os.freemem()` now reports `MemAvailable`** (e106942)
Bun’s Linux memory API now matches Node/libuv by reading `/proc/meminfo` first and falling back to `sysinfo.freeram` only when needed. This fixes a real discrepancy where Bun underreported available memory on systems with reclaimable page cache.

**Connecting sockets now safely cancel pending DNS work** (c6e2bf8)
`usockets` now tracks the addrinfo request on the connecting socket, can cancel pending DNS callbacks before they fire, and frees the request in the closed-after-resolve path. This closes a lifetime/race hole around sockets being closed while resolution is still in flight.

**Pending DNS resolution keeps the context alive correctly** (218bf20)
A context ref is now held for the full lifetime of `pending_resolve_callback`, preventing the resolve callback from running against a dead context after close/unlink churn. That should eliminate a crash class in the connect path on Linux x86_64.

**Linux local builds switch to the parallel Zig compiler** (68e80db)
The build scripts now enable the parallel Zig compiler on Linux local builds as well, while CI and Windows remain on the stable compiler. The change reflects a performance-oriented compiler rollout, with batching fixes in Zig’s ELF merge path to avoid the earlier syscall-heavy hang.

### Other misc changes
- Windows ARM64 CI image/runner update to local-NVMe `Dpdsv6` sizes (4ee606e)
- Build/Zig config updates and temporary compiler- चयन refactors (d4e8fb9, 700fc11)
- Claude helper command/workflow tweaks for issue/duplicate PR triage (6f649d6)
- WIP build script adjustments and small build plumbing updates (700fc11, d4e8fb9, d4e8fb9)
