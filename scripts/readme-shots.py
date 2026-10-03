"""README screenshots and hero banner, from the live site.

  python scripts/readme-shots.py            # or README_BASE=http://localhost:8080

Writes docs/readme/{desktop,home,fleet,tours,booking,route,hero}.png.
Every page is scrolled top to bottom first so the reveal animations have run.
"""
import base64
import os
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = os.environ.get('README_BASE', 'https://www.spectrumtourandtravels.in')
OUT = Path('docs/readme')
OUT.mkdir(parents=True, exist_ok=True)
UA = 'Mozilla/5.0 (Linux; Android 16; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Mobile Safari/537.36'


def settle(page):
    """Scroll through once so IntersectionObserver reveals fire, then go back up."""
    h = page.evaluate('document.body.scrollHeight')
    for y in range(0, h, 500):
        page.evaluate(f'window.scrollTo(0, {y})')
        page.wait_for_timeout(90)
    page.evaluate('window.scrollTo(0, 0)')
    page.wait_for_timeout(900)


def at(page, selector, name):
    page.locator(selector).first.scroll_into_view_if_needed()
    page.evaluate(f"document.querySelector('{selector}').scrollIntoView({{block: 'start'}})")
    page.wait_for_timeout(900)
    page.screenshot(path=str(OUT / name))


with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome')

    desk = b.new_page(viewport={'width': 1440, 'height': 900})
    desk.goto(BASE, wait_until='networkidle')
    settle(desk)
    desk.screenshot(path=str(OUT / 'desktop.png'))

    ctx = b.new_context(viewport={'width': 393, 'height': 852}, device_scale_factor=2, user_agent=UA, is_mobile=True, has_touch=True)
    m = ctx.new_page()
    m.goto(BASE, wait_until='networkidle')
    settle(m)
    m.screenshot(path=str(OUT / 'home.png'))
    at(m, '#fleet', 'fleet.png')
    at(m, '#tours', 'tours.png')
    at(m, '#booking', 'booking.png')
    m.goto(f'{BASE}/chardham-yatra', wait_until='networkidle')
    settle(m)
    m.screenshot(path=str(OUT / 'route.png'))
    ctx.close()

    # Hero: the brand line beside the real site on a laptop and a phone.
    img = lambda n: 'data:image/png;base64,' + base64.b64encode((OUT / n).read_bytes()).decode()
    logo = 'data:image/png;base64,' + base64.b64encode(Path('assets/img/brand/logo-white.png').read_bytes()).decode()
    hero = f'''<html><head>
<link href="https://fonts.googleapis.com/css2?family=Geologica:wght@400;600;700&family=Epilogue:wght@400;500&display=swap" rel="stylesheet">
<style>
body {{ margin: 0; width: 1600px; height: 820px; background: #0f0d0b; font-family: Epilogue; color: #f3eee6; overflow: hidden; position: relative; }}
.glow {{ position: absolute; right: -200px; top: -220px; width: 1100px; height: 1100px; border-radius: 50%;
  background: radial-gradient(closest-side, rgba(214,165,92,0.15), rgba(214,165,92,0)); }}
.copy {{ position: absolute; left: 100px; top: 200px; width: 560px; }}
.logo {{ height: 76px; }}
h1 {{ margin: 54px 0 0; font-family: Geologica; font-size: 62px; line-height: 1.05; font-weight: 700; letter-spacing: -0.035em; }}
h1 em {{ font-style: normal; color: #d8a55c; }}
p {{ margin: 24px 0 0; font-size: 23px; line-height: 1.45; color: #a49d92; max-width: 30ch; }}
.laptop {{ position: absolute; left: 700px; top: 120px; width: 820px; border-radius: 16px; overflow: hidden;
  border: 1px solid rgba(255,255,255,0.10); box-shadow: 0 40px 100px -30px rgba(0,0,0,0.9); background: #1a1714; }}
.bar {{ height: 30px; display: flex; align-items: center; gap: 7px; padding: 0 14px; }}
.bar i {{ width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.16); }}
.laptop img {{ display: block; width: 100%; }}
.phone {{ position: absolute; left: 1290px; top: 300px; width: 230px; border-radius: 32px; overflow: hidden; z-index: 2;
  border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 40px 90px -20px rgba(0,0,0,0.95); background: #0f0d0b; }}
.phone img {{ display: block; width: 100%; }}
</style></head><body><div class="glow"></div>
<div class="copy"><img class="logo" src="{logo}">
<h1>Corporate mobility and travel, <em>from Ahmedabad.</em></h1>
<p>The public site: fleet, tours and enquiries for Spectrum Tour &amp; Travel.</p></div>
<div class="laptop"><div class="bar"><i></i><i></i><i></i></div><img src="{img('desktop.png')}"></div>
<div class="phone"><img src="{img('home.png')}"></div>
</body></html>'''
    pg = b.new_page(viewport={'width': 1600, 'height': 820})
    pg.set_content(hero)
    pg.wait_for_timeout(1500)
    pg.screenshot(path=str(OUT / 'hero.png'))
    b.close()
print('written:', sorted(x.name for x in OUT.iterdir()))
