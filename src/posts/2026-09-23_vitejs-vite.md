---
date: 2026-09-23
repo: vitejs/vite
size: M
title: "TanStack starters split out in create-vite"
excerpt: "create-vite now offers separate TanStack Start and router-only options, while Vite’s pre-alias check gets a tiny cleanup."
commits: 2
authors: [DogPawHat, btea]
commit_authors: {"f155b62": DogPawHat, "af7cdf6": btea}
---

### **Separate TanStack Start and router-only templates** (f155b62)
create-vite now distinguishes TanStack Start from TanStack Router in its framework list, adding new Start entries for React and Solid. The existing TanStack Router commands were also updated to pass `--router-only`, which better matches the template intent and should route users to the right project setup.

### Other misc changes
- Small internal refactor in Vite pre-alias logic: `find` -> `some` (af7cdf6)
