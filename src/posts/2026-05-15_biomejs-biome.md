---
date: 2026-05-15
repo: biomejs/biome
size: M
title: "YAML support lands; Markdown parser tightened"
excerpt: "Biome adds experimental YAML configuration/formatting support and hardens Markdown list parsing with new invariants."
commits: 3
authors: [Conaclos, ematipico, jfmcdowell]
commit_authors: {"13cd12b": Conaclos, "a299852": ematipico, "52bb565": jfmcdowell}
---

### **Experimental YAML formatting support added** (a299852)
Biome now has YAML-specific configuration plumbing and formatter test coverage, including CLI format harness coverage and service/file-handler wiring. The formatter is still marked disabled by default in the new config types, but this lays the groundwork for first-class YAML formatting support.

### **Markdown list parsing gets stricter invariants** (52bb565)
The Markdown parser was updated to better handle list continuation indentation after quote prefixes, reducing edge-case misparses in nested list/blockquote structures. New CST invariant tests were added to lock in the expected list-item structure and prevent regressions.

### **Other misc changes**
- Governance update broadening reimbursable Biome-related travel/expense cases (13cd12b)
- Dependency and test fixture updates for YAML support
- Misc formatter verbatim and snapshot adjustments
