---
date: 2026-06-25
repo: microsoft/typescript-go
size: M
title: "Native preview gets CJS root entrypoint"
excerpt: "@typescript/native-preview now exposes a CommonJS `.` entrypoint for version data, improving package compatibility for CJS consumers."
commits: 1
---

### **Add CJS root version entrypoint for @typescript/native-preview** (c080da6)
The package now exports `.` to a new CommonJS `version.cjs` stub, alongside matching `.d.cts` types. This makes the native-preview package easier to consume from CJS tooling and lets callers read `version` and `versionMajorMinor` from the package root without special handling.

### Other misc changes
- Package export map updated to point `.` at the new stub entrypoint.
