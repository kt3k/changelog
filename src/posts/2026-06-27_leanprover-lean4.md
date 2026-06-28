---
date: 2026-06-27
repo: leanprover/lean4
size: M
title: "Lean docstrings now handle macro-generated text"
excerpt: "Verso docstrings can now be elaborated from raw text when source positions are missing, fixing parameter references in more cases."
commits: 2
authors: [david-christiansen, Garmelon]
commit_authors: {"45e668d": david-christiansen, "6b941e7": Garmelon}
---

### **Fix Verso parameter references in more docstring forms (45e668d)**
Lean’s Verso docstring elaboration now handles unbracketed binders, `_` parameters, and macro-generated declarations more reliably. The change adds fallback parsing/elaboration paths for plain text and position-stripped docstrings, so parameter references resolve correctly even when source positions or interactive metadata are unavailable.

### Other misc changes
- CI workflow references updated for a downstream action rename (6b941e7).
