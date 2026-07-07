---
date: 2026-07-06
repo: microsoft/typescript-go
size: L
title: "VS Code extension revamp and crash fixes"
excerpt: "Major extension rename/layout work plus several crash and race fixes in project handling and API completion paths."
commits: 7
authors: [andrewbranch, jakebailey, johnfav03, jansedlon, Vorobey31415]
commit_authors: {"7bf5b3e": jakebailey, "7422f5b": andrewbranch, "9e90c15": andrewbranch, "877f15b": johnfav03, "e376b20": jansedlon, "de3f399": andrewbranch, "f3b1632": Vorobey31415}
---

### **VS Code extension renamed and reorganized** (7bf5b3e)
The extension is being rebranded from the native preview to “TypeScript 7,” with updated docs, output channel names, settings keys, package metadata, and build/release layout. The packager now supports extension packages via source directories, which is a meaningful release-structure change for the VS Code distribution.

### **Project reference cleanup now releases dropped configs** (7422f5b)
When a project changes and drops references, the old referenced configs are now explicitly released instead of lingering in registry state. This fixes a crash scenario where later changes to the dropped config could hit stale retaining-project entries.

### **Fix nil-commandLine crash during bulk cache invalidation** (9e90c15)
Bulk cache invalidation now guards against retained config entries whose command line has not been loaded yet. That prevents a nil dereference when watch-event storms force invalidation across configs, including referenced configs that only exist as retained entries.

### **Make accessible-entry enumeration concurrency-safe** (877f15b)
`snapshotFSBuilder.GetAccessibleEntries()` now caches and reuses merged directory entries safely across concurrent calls. This removes a data race in the snapshot filesystem layer and should make parallel access more reliable.

### **Preserve wildcard directories for `./`-prefixed includes** (e376b20)
Wildcard directory computation now normalizes include paths before applying exclude matching, fixing a bug where `./`-prefixed includes could lose all wildcard directories when dot-directory excludes were present. The result is more reliable project-file discovery for newly created files.

### **Native preview API gains source-file line mapping** (de3f399)
The native preview API now exposes `SourceFile` line/character mapping methods plus a `LineAndCharacter` type, bringing it closer to the standard TypeScript source-file surface. That enables consumers to convert between offsets and line/column positions directly on remote source files.

### **Fix completion crash on inferred projects** (f3b1632)
Completion requests no longer panic when the file belongs to an inferred project instead of a configured one. The session now uses the project ID rather than `ConfigFilePath()`, which avoids calling a configured-project-only method on inferred projects.

### Other misc changes
- CONTRIBUTING/docs updates for the new extension naming and trace setting
- Extension packaging/build refactors and package metadata updates
- Test coverage added for the above fixes
- Dependency/package-lock updates
