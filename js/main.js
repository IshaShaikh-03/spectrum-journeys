// ── CURSOR (transform only — gated to pointer:fine devices) ───
const hasFinePonter = window.matchMedia('(pointer: fine)').matches;
const dot  = document.getElementById('cur-dot');
const ring = document.getElementById('cur-ring');

if (hasFinePonter) {
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`;
  });
  (function animRing() {
    rx += (mx-rx)*0.11; ry += (my-ry)*0.11;
    ring.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`;
    requestAnimationFrame(animRing);
  })();
} else {
  dot.style.display  = 'none';
  ring.style.display = 'none';
  document.body.style.cursor = 'auto';
}

const hoverEls = 'a,button,.fleet-trigger,.pillar,.tour-row,.aud-pane,.ticker-item';
document.querySelectorAll(hoverEls).forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('is-hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('is-hovering'));
});

// ── SCROLL PROGRESS ──────────────────────────────────────────
const sb = document.getElementById('scroll-bar');
window.addEventListener('scroll', () => {
  const t = document.documentElement.scrollTop;
  const h = document.documentElement.scrollHeight - window.innerHeight;
  sb.style.width = (t/h*100) + '%';
}, {passive:true});

// ── NAV SCROLLED ─────────────────────────────────────────────
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, {passive:true});

// ── MOBILE MENU ──────────────────────────────────────────────
const burger   = document.getElementById('nav-burger');
const mobMenu  = document.getElementById('mob-menu');
const mobClose = document.getElementById('mob-close-btn');
const open = () => {
  mobMenu.classList.add('open');
  burger.setAttribute('aria-expanded','true');
  document.body.style.overflow = 'hidden';
  mobClose.focus();
};
const close = () => {
  mobMenu.classList.remove('open');
  burger.setAttribute('aria-expanded','false');
  document.body.style.overflow = '';
  burger.focus();
};
burger.addEventListener('click', open);
mobClose.addEventListener('click', close);
document.querySelectorAll('[data-mob]').forEach(l => l.addEventListener('click', close));
mobMenu.addEventListener('keydown', e => {
  if (e.key === 'Escape') { close(); return; }
  if (e.key !== 'Tab') return;
  const focusable = Array.from(mobMenu.querySelectorAll('a, button'));
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];
  if (e.shiftKey) {
    if (document.activeElement === first) { e.preventDefault(); last.focus(); }
  } else {
    if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
  }
});

// ── SCROLL REVEAL ────────────────────────────────────────────
// If user prefers reduced motion: mark all elements visible immediately, skip observer
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const forceReveal = () => document.querySelectorAll('.r,.rl,.rr').forEach(el => el.classList.add('on'));

if (prefersReducedMotion) {
  forceReveal();
} else {
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting) { e.target.classList.add('on'); revObs.unobserve(e.target); }
    });
  }, {threshold:0.05, rootMargin:'0px 0px -20px 0px'});
  document.querySelectorAll('.r,.rl,.rr').forEach(el => revObs.observe(el));

  // Stagger delays only matter when transitions are running
  document.querySelectorAll('.fleet-item').forEach((el,i) => el.style.transitionDelay=(i*60)+'ms');
  document.querySelectorAll('.pillar').forEach((el,i)     => el.style.transitionDelay=(i*80)+'ms');
  document.querySelectorAll('.tour-row').forEach((el,i)   => el.style.transitionDelay=(i*60)+'ms');

  // Safety net: if nothing revealed after 3s, IntersectionObserver likely silently failed
  setTimeout(() => {
    const stillHidden = document.querySelectorAll('.r:not(.on),.rl:not(.on),.rr:not(.on)');
    if (stillHidden.length > 0) forceReveal();
  }, 3000);
}

// ── TICKER ───────────────────────────────────────────────────
(function initTicker() {
  const ticker = document.querySelector('.ticker');
  if (!ticker) return;

  const PX_PER_SEC = 60;
  let offset = 0;
  let halfWidth = 0;
  let lastTime = null;
  let paused = false;

  ticker.addEventListener('mouseenter', () => { paused = true; });
  ticker.addEventListener('mouseleave', () => { paused = false; });

  const start = () => {
    halfWidth = ticker.scrollWidth / 2;
    if (!halfWidth) return;

    function step(ts) {
      if (!paused) {
        const dt = lastTime ? (ts - lastTime) / 1000 : 0;
        offset += PX_PER_SEC * dt;
        if (offset >= halfWidth) offset -= halfWidth;
        ticker.style.transform = `translateX(${-offset}px)`;
      }
      lastTime = ts;
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(start).catch(start);
    setTimeout(() => { if (!halfWidth) start(); }, 800);
  } else {
    start();
  }
})();

// ── FLEET ACCORDION ──────────────────────────────────────────
(function initFleetAccordion() {
  const items = Array.from(document.querySelectorAll('.fleet-item'));
  if (!items.length) return;

  items.forEach(item => {
    const trigger = item.querySelector('.fleet-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      items.forEach(other => {
        const otherTrigger = other.querySelector('.fleet-trigger');
        const isTarget = other === item;
        other.classList.toggle('is-open', isTarget);
        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', String(isTarget));
      });
    });
  });
})();

// ── FORM ─────────────────────────────────────────────────────
async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn  = form.querySelector('.form-submit');
  const ok   = document.getElementById('form-ok');
  const err  = document.getElementById('form-err');

  btn.textContent = 'Sending…'; btn.disabled = true;
  if (err) err.style.display = 'none';

  try {
    const res = await fetch('https://formspree.io/f/xwvzbkgv', {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' },
    });

    if (res.ok) {
      btn.style.display = 'none';
      ok.style.display = 'block';
      form.reset();
    } else {
      throw new Error('server');
    }
  } catch {
    btn.textContent = 'Send Enquiry →'; btn.disabled = false;
    if (err) err.style.display = 'block';
  }
}
