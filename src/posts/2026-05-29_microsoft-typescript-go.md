---
date: 2026-05-29
repo: microsoft/typescript-go
size: M
title: "JSDoc `@satisfies` errors now point correctly"
excerpt: "Fixes diagnostic spans for `@satisfies`, including JSDoc cases, so errors highlight the tag instead of the expression."
commits: 1
---

### **Fix `@satisfies` error locations** (9a58775)
The checker now reports `satisfies` failures against the expression node directly, and the scanner can trace reparsed JSDoc `@satisfies` tags back to their originating tag for error spans. That means diagnostics now highlight the JSDoc tag itself in the common comment-based form, making these type errors much easier to understand and fix.

### Other misc changes
- Updated error baselines for `@satisfies` conformance cases
- Adjusted related checker/scanner test output for span changes
