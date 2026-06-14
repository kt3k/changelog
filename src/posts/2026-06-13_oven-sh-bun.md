---
date: 2026-06-13
repo: oven-sh/bun
size: M
title: "Discord.js guide gets a real slash-command flow"
excerpt: "Bun’s Discord.js docs now walk through a working /ping bot, plus deployment notes and fixed guide links."
commits: 3
authors: [robobun]
commit_authors: {"14bcc6c": robobun, "719be62": robobun, "6f67e09": robobun}
---

### **Discord.js guide rewritten around a working `/ping` bot** (719be62)
The guide now takes readers from setup to a bot that actually responds to a slash command, instead of stopping at login. It adds a separate command-registration script, clearer env handling, and a more production-relevant flow that matches how Discord.js bots are typically deployed.

### **Added deployment guidance for running the bot in production** (6f67e09)
A new closing section explains that Bun can run `bot.ts` directly without a bundling step, so the source can be shipped as-is. It also points readers toward process managers like systemd and PM2 to keep the bot alive after crashes or reboots.

### **Fixed outdated Discord.js guide links** (14bcc6c)
The guide’s links were updated to the new `discordjs.guide` locations after the docs site moved. This keeps the setup instructions from sending readers to dead pages.

### Other misc changes
- Tightened a typo in the Discord.js guide copy.
- Minor wording and phrasing edits in the docs.
