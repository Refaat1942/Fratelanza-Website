"""Saddle-stitch imposition: A5 booklet pages -> A4 landscape sheets (front/back), ready for duplex print, fold & staple."""
import sys, pymupdf
src, out = sys.argv[1], sys.argv[2]
d = pymupdf.open(src)
n = len(d)
assert n % 4 == 0, 'page count must be a multiple of 4'
w, h = d[0].rect.width, d[0].rect.height  # A5
o = pymupdf.open()
for k in range(n // 4):
    # front: [n-2k, 1+2k]   back: [2+2k, n-1-2k]   (1-based, left|right)
    for left, right in ((n - 2 * k, 1 + 2 * k), (2 + 2 * k, n - 1 - 2 * k)):
        pg = o.new_page(width=2 * w, height=h)
        pg.show_pdf_page(pymupdf.Rect(0, 0, w, h), d, left - 1)
        pg.show_pdf_page(pymupdf.Rect(w, 0, 2 * w, h), d, right - 1)
        # tiny fold tick marks in the gutter
        pg.draw_line((w, 0), (w, 6), width=.4, color=(0, 0, 0)); pg.draw_line((w, h - 6), (w, h), width=.4, color=(0, 0, 0))
o.save(out, deflate=True, garbage=3)
print('imposed', n, 'pages ->', len(o), 'sides (', len(o) // 2, 'sheets )')
