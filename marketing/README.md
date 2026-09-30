# Fratelanza marketing & print pack

Generates the bilingual company-profile booklet and print-ready designs (all with a QR code to the
`/links` page of the website) from the site's own content (`frontend/src/data`).

```bash
cd marketing && npm install && npm run build   # needs Chromium, zip, python3 + pymupdf
```

Chromium path: `CHROMIUM=/path/to/chromium` (defaults to `/opt/pw-browsers/chromium`).

| Output | What |
| --- | --- |
| `output/Fratelanza-Marketing-Pack.zip` | Everything below + QR files + README (the file to hand out) |
| `output/Fratelanza-Company-Profile.pdf` | 24-page A5 booklet: English (p3-12) + Arabic (p13-22), contact + QR — also copied to `frontend/public/downloads/` |
| `output/Fratelanza-Company-Profile-PRINT-A4-booklet.pdf` | Same booklet imposed for duplex print, fold and staple |
| `output/print/*.pdf` | One file per item: real size, 3 mm bleed, crop marks |
| `output/Fratelanza-Print-Design-Guide.pdf` | Overview, brand colours, printer notes |

Edit artwork in `designs.mjs`, booklet in `build-booklet.mjs`, QR helpers in `lib.mjs` (`LINKS_URL`).
Each item's QR carries `?utm_source=qr-<item>` so the site's attribution tracks scans per item.
PDF colours are RGB — convert to CMYK/Pantone at prepress.
