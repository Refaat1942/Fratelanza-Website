# Fratelanza marketing & print pack

Generates the bilingual company profile and print-ready designs from the website's own content
(`frontend/src/data`), so the PDFs stay in sync with the site.

```bash
cd marketing && npm install && npm run build
```

Requires Chromium (`CHROMIUM=/path/to/chromium`, defaults to `/opt/pw-browsers/chromium`).

- `output/Fratelanza-Company-Profile-{EN,AR}.pdf` — A4 company profile (also copied to `frontend/public/downloads/` for the website footer link)
- `output/Fratelanza-Print-Design-Guide.pdf` — overview of every print item, brand colours, printer notes
- `output/print/*.pdf` — one print-ready file per item (real size + 3 mm bleed + crop marks)

Edit artwork in `designs.mjs`, profile layout in `build-profile.mjs`. Colours in the PDFs are RGB — convert to CMYK/Pantone at prepress.
