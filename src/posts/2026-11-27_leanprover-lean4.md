---
date: 2026-11-27
repo: leanprover/lean4
size: L
title: "HTTP, time, and epr get major upgrades"
excerpt: "Lean4 adds HTTP/1.1 client plumbing and faster parsing, improves time handling for leap seconds and zones, and expands epr with skolemization."
commits: 11
authors: [hargoniX, algebraic-dev, Rob23oba, nomeata]
commit_authors: {"1a4a23a": algebraic-dev, "4fed7fc": hargoniX, "32b2336": hargoniX, "b18b3d6": hargoniX, "48c14fd": Rob23oba, "cd44dac": nomeata, "0e511b3": hargoniX, "15dda01": algebraic-dev, "2a4f2f0": algebraic-dev}
---

### **HTTP/1.1 parser and client support get a major overhaul** (15dda01, 2a4f2f0)
Lean's HTTP stack was substantially expanded and refactored: the H1 machine now parses incrementally, keeps state across `feed` calls, and is made total, while the client side gains machine operations plus body-stream and URI helpers. These changes lay the groundwork for a more capable HTTP client and cleaner protocol handling.

### **`Std.Time` now preserves leap seconds and zone identifiers** (1a4a23a)
`Std.Time` fixes several correctness issues around timezone lookup and formatting, including footer-based rule lookup when transition tables are empty, better zone ID extraction, and leap-second-aware HTTP date parsing/formatting. It also adjusts plain-time arithmetic so `23:59:60` survives formatting paths instead of being normalized away.

### **`epr` gains skolemization and stronger NNF support** (4fed7fc, 0e511b3)
The `epr` tactic now implements full skolemization with skolem functions, which should improve its ability to normalize and solve quantified goals. In support of that, NNF conversion was broadened to handle more boolean structure, including boolean equalities and connective simplifications.

### **Kernel weak-head normalization caches less aggressively** (cd44dac)
The kernel's `whnf_core` cache now only stores the first term in a reduction chain, instead of retaining intermediate freshly-built terms. That should reduce memory retention and improve checking time on reduction-heavy declarations.

### **Process and `ST.Ref` runtime fixes** (32b2336, b18b3d6)
`IO.Process.getCurrentDir` now returns a proper error on failure instead of falling through incorrectly. Single-threaded `ST.Ref` reads and takes from an emptied reference now panic consistently, matching the existing behavior of `swap`.

### **Discrimination tree key formatting is cleaned up** (48c14fd)
`#discr_tree_key` output now formats projection keys, quoted strings, and arrow spacing more accurately. The command's expected-output tests were updated accordingly.

### Other misc changes
- Veil/epr benchmark regeneration and inhabitant list updates (1 commit)
- HTTP async test flake fix and CI tweak (1 commit)
- Minor HTTP body/selector API additions and internal stream bookkeeping (1 commit)
