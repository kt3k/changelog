# OG image (`src/og.png`)

The social-card image used in `og:image` / Twitter cards, referenced from
`src/_includes/layouts/base.vto`.

## Source

[`docs/og-image.html`](og-image.html) — a self-contained 1200×630 page that
mirrors the site's design tokens (Mulish, ink `#333333`, accent `#ff572f`, the
activity-strip cell greens). The activity-cell pattern is a fixed array in the
inline script, so the output is deterministic.

## Regenerate

Render the HTML with headless Chrome (loads Mulish from Google Fonts, so it
needs network access):

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --hide-scrollbars \
  --window-size=1200,630 --virtual-time-budget=8000 \
  --screenshot=src/og.png "file://$PWD/docs/og-image.html"
```

(`--virtual-time-budget` gives the web font time to load before the shot.)

To tweak the design, edit `docs/og-image.html` and re-run the command. The
underline under the logo tracks the logo width automatically (the masthead
wrapper uses `width: fit-content`), so the logo text can change freely.
