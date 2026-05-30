---
date: 2026-03-24
repo: oven-sh/bun
size: M
title: "URLPattern sped up, leaks and crashes fixed"
excerpt: "A small but meaningful day: one performance win plus two correctness fixes for streams and error formatting."
commits: 3
authors: [sosukesuzuki, robobun]
commit_authors: {"639bc43": robobun, "f6528b5": sosukesuzuki, "fe4a66e": sosukesuzuki}
---

### **Fix AbortSignal leak in ReadableStream.pipeTo with signal option** (f6528b5)
`ReadableStream.prototype.pipeTo()` could retain `AbortSignal` forever when called with a `signal` option and the pipe never completed, creating a 100% leak. The fix breaks the JS callback cycle by moving abort algorithms into a separately tracked list with GC visitation, and adds a regression test.

### **Clear pending JS exception when error formatting fails** (639bc43)
When formatting an error message itself threw a JS exception, Bun would fall back to a generic format string but leave that exception pending, causing later error throws to trip VM assertions. This commit clears the stale exception before constructing fallback error instances, fixing a crash path around `Symbol.toPrimitive`-driven formatting failures.

### **Speed up URLPattern test/exec hot paths** (fe4a66e)
`URLPattern.test()` and `exec()` now use `RegExp::match()` directly instead of building `RegExpObject`/`JSArray` intermediates for each component. That cuts GC allocations and property-access overhead in a hot path, which should improve URLPattern-heavy routing and benchmark performance.
