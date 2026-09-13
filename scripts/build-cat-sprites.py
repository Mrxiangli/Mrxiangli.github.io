"""Build the personal gray-and-white tabby SVG in oneko's 32px frame layout.

Run: python3 scripts/build-cat-sprites.py
All artwork is vector geometry; coordinates match spriteSets in assets/js/oneko.js.
"""
from pathlib import Path

OUTLINE = '#4d5050'

def path(d, fill='none', stroke=OUTLINE, width=.8):
    return f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{width}" stroke-linecap="round" stroke-linejoin="round"/>'

def ellipse(cx, cy, rx, ry, fill, stroke=OUTLINE):
    return f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{fill}" stroke="{stroke}" stroke-width=".7"/>'

def face(back=False, sleepy=False):
    s = path('M8 14 L7 4 L13 8 Q16 6 20 8 L25 4 L24 15 Q25 22 16 23 Q7 22 8 14Z', '#91938e')
    s += path('M9 7 L10 12 L13 10Z M23 7 L20 10 L23 12Z', '#d5aaa6', 'none')
    s += path('M13 8 L14 11 M16 8 L16 10 M19 8 L18 11', stroke='#626662')
    if back:
        return s + path('M9 15 Q16 19 23 15 M10 18 Q16 21 22 18', stroke='#737771')
    s += path('M16 10 L13 16 Q9 17 10 20 Q16 25 22 20 Q23 17 19 16Z', '#faf8ef', 'none')
    s += path('M9 13 L11 14 M22 13 L24 12 M9 16 L11 16 M22 16 L24 15', stroke='#626662')
    if sleepy:
        s += path('M10 16 Q12 18 14 16 M18 16 Q20 18 22 16')
    else:
        for x in (12, 20):
            s += ellipse(x, 15.5, 2, 2.2, '#adc395')
            s += ellipse(x, 15.6, .8, 1.6, '#303735', 'none')
            s += ellipse(x-.5, 14.7, .4, .5, '#ffffff', 'none')
    s += path('M14.7 18 L17.3 18 L16 19.5Z', '#d29a9a', '#b88788', .4)
    s += path('M16 19.5 L16 20.5 M14 21 Q16 22 16 20.5 Q16 22 18 21', width=.45)
    s += path('M6 18 L11 19 M6 20 L11 20 M21 19 L26 18 M21 20 L26 20', stroke='#b1afa6', width=.5)
    return s

def running_cat(kind, frame):
    """Two gallop phases, with separate far/near legs and a profile head."""
    def leg(d, x, y, far=False):
        color = '#deded4' if far else '#faf8ef'
        return (path(d, stroke=OUTLINE, width=3.2)
                + path(d, stroke=color, width=2)
                + ellipse(x, y, 1.6, 1, color))

    if kind in ('N', 'S'):
        s = ''
        # Four staggered paws remain visible around the foreshortened body.
        for x, y in ((10, 14 + frame*3), (22, 17 - frame*3),
                     (11, 28 - frame*3), (21, 25 + frame*3)):
            s += leg(f'M16 21 L{x} {y}', x, y)
        s += ellipse(16, 21, 6, 7, '#91938e')
        s += path('M12 19 L15 20 M20 21 L17 22 M12 24 L15 25', stroke='#626962')
        tail = f'M17 25 Q{24+frame*2} 30 25 20'
        s += path(tail, stroke=OUTLINE, width=3)
        s += path(tail, stroke='#91938e', width=1.9)
        s += path('M23 26 L25 27 M24 23 L26 23', stroke='#555d54')
        if kind == 'S':
            s += path('M12 18 L12 25 Q16 29 20 25 L20 18Z', '#faf8ef', 'none')
        s += f'<g transform="translate(2 {frame}) scale(.88)">' + face(kind == 'N') + '</g>'
        return s

    # Rounded silhouette adapted from cat-reference/side-view-concept.png.
    # Broad curved paws replace the thin, angular legs of the earlier sprite.
    far_paws = (
        ('M11 22 Q10 25 12 27 Q15 28 15 26 L14 22Z',
         'M22 20 Q26 20 27 23 Q27 25 24 24 L21 23Z'),
        ('M10 22 Q7 23 7 25 Q8 27 10 25 L13 23Z',
         'M22 21 L23 26 Q25 28 27 26 Q27 24 25 24 L25 21Z'),
    )
    s = ''.join(path(d, '#deded4') for d in far_paws[frame])
    tail = ('M9 19 C3 18 5 11 3 10' if frame == 0
            else 'M9 19 C3 20 3 14 4 11')
    s += path(tail, stroke=OUTLINE, width=3.6)
    s += path(tail, stroke='#969790', width=2.3)
    s += path('M3.5 12 L5 12 M4 15 L5.5 15' if frame == 0
              else 'M3 13 L4.5 13 M3.5 16 L5 16', stroke='#686d65', width=1)
    s += path('M7 21 C5 16 9 14 14 15 C20 14 24 17 24 21 C24 26 14 27 9 24 Q7 23 7 21Z', '#969790')
    s += path('M9 22 Q15 25 19 20 L22 17 Q26 23 21 25 Q15 28 9 24Z', '#faf8ef', 'none')
    s += path('M10 15.5 Q9 18 10 19 M13.5 15.5 Q12 18 13 20 M17 16 Q15.5 18 16 20', stroke='#686d65', width=1.2)
    near_paws = (
        ('M8 21 Q7 23 5.5 24 Q4 27 7 27.5 Q9 28 10 24 L12 22Z',
         'M19 21 Q18 25 21 27 Q24 29 25 27 Q26 25 23 25 L23 21Z'),
        ('M8 22 Q9 26 12 27 Q15 28 15 26 Q15 25 12 24 L12 22Z',
         'M20 21 Q22 25 26 24 Q29 23 27 21 Q26 20 24 22 L23 20Z'),
    )
    s += ''.join(path(d, '#faf8ef') for d in near_paws[frame])
    # Large round cheek and small curved ears keep the profile kitten-like.
    head = path('M16 9 Q15 5 17 3.5 Q18 3 21 7 Q24 5.5 26 7 Q27 3.5 28 5 Q29 7 28 10 C31 13 30 18 27 20 C23 23 17 21 15 18 Q12 14 16 9Z', '#969790')
    head += path('M16.7 8 Q16 5 17.4 4.9 L19.5 7.8Z M26.5 7.7 L27.7 5.6 L27.9 9Z', '#dfb3ae', 'none')
    head += path('M26 9 Q29 11 28.6 14 Q31 15 29 18 Q27 22 21 21 Q18 21 16.5 18.5 Q23 20 25 15 Q27 13 26 9Z', '#faf8ef', 'none')
    head += path('M16 14.5 Q18 15 19 14 M21 7.5 L22 9', stroke='#686d65', width=.8)
    head += ellipse(25, 13.8, 2.3, 2.7, '#a9c49b')
    head += ellipse(25.7, 13.8, 1.25, 2, '#39443d', 'none')
    head += ellipse(25.5, 12.7, .65, .7, '#ffffff', 'none')
    head += path('M28.7 15 Q30.5 14.6 30 15.6 L29.4 16.3Z', '#dba4a3', 'none')
    head += path('M29.3 16.4 Q29 18.2 27.7 17.3', width=.55)
    head += path('M23 17 L20 17.2 M23 18 L20.5 19', stroke='#787b73', width=.45)
    s += f'<g transform="translate(0 {-0.5 if frame else 0})">{head}</g>'
    # Tilt diagonal runs toward their destination without leaving the 32px cell.
    angle = -12 if kind in ('NE', 'NW') else 12 if kind in ('SE', 'SW') else 0
    s = f'<g transform="rotate({angle} 16 16)">{s}</g>'
    if kind in ('W', 'NW', 'SW'):
        s = '<g transform="translate(32 0) scale(-1 1)">' + s + '</g>'
    return s

def cat(kind, frame=0):
    if kind in ('N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'):
        return running_cat(kind, frame)
    back = kind in ('N', 'NE', 'NW', 'scratchWallN')
    side = kind in ('E', 'W', 'NE', 'NW', 'SE', 'SW', 'scratchWallE', 'scratchWallW')
    sleeping = kind == 'sleeping'
    running = kind in ('N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW')
    s = ''
    if sleeping:
        s += ellipse(17, 23, 11, 6 + frame*.4, '#91938e')
        s += path('M14 20 Q22 19 24 24 L20 28 L10 27Z', '#faf8ef', 'none')
        s += path('M22 19 L20 22 M25 21 L23 24', stroke='#626662', width=1.2)
        s += '<g transform="translate(0 10) scale(.72)">' + face(sleepy=True) + '</g>'
        s += path('M27 23 Q29 29 18 28 Q14 28 15 26', stroke='#666c65', width=3)
        s += path('M23 27 L23 29 M26 26 L27 28', stroke='#454c46')
        s += path(f'M24 {10-frame} h3 l-3 3 h3', stroke='#8b978b', width=.7)
        return s
    s += path(f'M22 24 Q30 24 28 {14 + frame*2} Q27 11 26 14', stroke=OUTLINE, width=3.8)
    s += path(f'M22 24 Q30 24 28 {14 + frame*2} Q27 11 26 14', stroke='#93978d', width=2.5)
    s += path('M26 21 L29 21 M26 18 L29 18 M26 14 L28 14', stroke='#555d54', width=1)
    s += ellipse(16, 22, 8, 7, '#91938e')
    s += path('M11 18 Q16 16 20 19 L21 27 Q16 30 11 27Z', '#faf8ef', 'none')
    if back:
        s += ellipse(16, 21, 6, 6, '#91938e', 'none')
    s += path('M9 21 L12 22 M9 24 L11 24 M21 20 L19 21 M23 23 L21 24', stroke='#626962', width=1.1)
    step = 2 if running and frame else 0
    s += ellipse(11-step, 28-step/2, 3, 1.6, '#faf8ef')
    s += ellipse(21+step, 28, 3, 1.6, '#faf8ef')
    dx = 3 if side else 0
    dy = -1 if kind == 'alert' else (frame*.6 if running else 0)
    s += f'<g transform="translate({dx} {dy})">' + face(back, kind == 'tired') + '</g>'
    if kind.startswith('scratchWall'):
        s += path(f'M11 24 L{10+frame} 15 M21 24 L{22-frame} 14', stroke='#faf8ef', width=3)
    if kind == 'scratchSelf':
        s += path(f'M23 26 Q28 22 {23-frame} {17+frame}', stroke=OUTLINE, width=3.8)
        s += path(f'M23 26 Q28 22 {23-frame} {17+frame}', stroke='#faf8ef', width=2.5)
    if kind in ('W', 'NW', 'SW', 'scratchWallW'):
        s = '<g transform="translate(32 0) scale(-1 1)">' + s + '</g>'
    return s

poses = {
    'idle': [(3,3)], 'alert': [(7,3)], 'scratchSelf': [(5,0),(6,0),(7,0)],
    'scratchWallN': [(0,0),(0,1)], 'scratchWallS': [(7,1),(6,2)],
    'scratchWallE': [(2,2),(2,3)], 'scratchWallW': [(4,0),(4,1)],
    'tired': [(3,2)], 'sleeping': [(2,0),(2,1)], 'N': [(1,2),(1,3)],
    'NE': [(0,2),(0,3)], 'E': [(3,0),(3,1)], 'SE': [(5,1),(5,2)],
    'S': [(6,3),(7,2)], 'SW': [(5,3),(6,1)], 'W': [(4,2),(4,3)],
    'NW': [(1,0),(1,1)],
}
parts = ['<svg xmlns="http://www.w3.org/2000/svg" width="256" height="128" viewBox="0 0 256 128">',
         '<!-- Personal gray tabby: white blaze, bib and socks, green eyes, pink nose. Generated by scripts/build-cat-sprites.py. -->']
for kind, cells in poses.items():
    for frame, (x, y) in enumerate(cells):
        parts.append(f'<g id="{kind}-{frame}" transform="translate({x*32} {y*32})">{cat(kind, frame)}</g>')
parts.append('</svg>')
(Path(__file__).resolve().parents[1] / 'assets/images/oneko-tabby.svg').write_text('\n'.join(parts) + '\n')

# Keep a standalone image of the exact side-view artwork alongside the concept.
reference = Path(__file__).resolve().parents[1] / 'assets/images/cat-reference'
reference.mkdir(exist_ok=True)
(reference / 'side-view.svg').write_text(
    '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 32 32">'
    + running_cat('E', 0) + '</svg>\n')
