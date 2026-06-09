---
date: 2026-06-07
repo: leanprover/lean4
size: L
title: "Std.Time gets a major DateTime overhaul"
excerpt: "Lean4 overhauls its time API around the renamed DateTime type, while also exposing reflectBV for BVDecide users."
commits: 2
authors: [hargoniX, algebraic-dev]
commit_authors: {"a806b5c": hargoniX, "b3b7d7a": algebraic-dev}
---

### **Std.Time replaces ZonedDateTime with a new DateTime API** (b3b7d7a)
This is a broad refactor of the `Std.Time` stack: the old `DateTime (tz : TimeZone)`/`ZonedDateTime` split is collapsed into a redesigned `DateTime` centered on zone rules and timezone-aware helpers. It updates formatting, parsing, notation, HTTP date handling, server logging, and a large set of time tests, so downstream code will likely need API adjustments.

### **`reflectBV` is now public** (a806b5c)
`Lean.Meta.Tactic.BVDecide.Prover.Basic.reflectBV` is exported publicly, making the BVDecide reflection helper available to other code. This is a small API exposure but can unblock external metaprogramming uses.

### Other misc changes
- HTTP/time plumbing updated to use the renamed time types and helpers
- Various time tests and formatting expectations adjusted
