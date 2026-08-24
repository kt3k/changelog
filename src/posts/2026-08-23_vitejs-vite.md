---
date: 2026-08-23
repo: vitejs/vite
size: M
title: "Srcset parsing fix lands in Vite"
excerpt: "Vite fixes newline-separated srcset handling and tidies bot comment formatting; a blame-ignore entry was also added."
commits: 3
authors: [vjymisal0, ulrichstark, bluwy]
commit_authors: {"4f9d2f4": vjymisal0, "7bdad37": ulrichstark, "ea5ac7c": bluwy}
---

### **Preserve newline-separated srcset candidates** (4f9d2f4)
Vite’s `parseSrcset` no longer strips the first newline it encounters, which fixes cases where srcset candidates are split across lines. The added tests cover both LF and CRLF input, so newline-delimited candidates are normalized into valid space-separated output.

### Other misc changes
- CI bot comment formatting cleaned up in `.github/workflows/bot.yml` (ea5ac7c)
- Added `97ad042` to `.git-blame-ignore-revs` for a formatting-only commit (7bdad37)
