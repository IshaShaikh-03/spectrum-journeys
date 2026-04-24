// Spectrum Tours - Core Interactivity
document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header & Active Nav
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const heroBg = document.querySelector('.hero-bg img');

  let rafPending = false;

  // Cache section tops once; refresh on resize to avoid reading layout in scroll RAF
  let sectionTops = [...sections].map(s => ({ id: s.getAttribute('id'), top: s.offsetTop }));
  window.addEventListener('resize', () => {
    sectionTops = [...sections].map(s => ({ id: s.getAttribute('id'), top: s.offsetTop }));
  });

  window.addEventListener('scroll', () => {
    if (rafPending) return;
    rafPending = true;

    requestAnimationFrame(() => {
      rafPending = false;

      // Header blur effect
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Parallax hero bg
      if (heroBg) {
        heroBg.style.transform = `translateY(${window.scrollY * 0.2}px) scale(1.05)`;
      }

      // Active navigation link (uses cached tops — no layout read in RAF)
      let current = '';
      sectionTops.forEach(({ id, top }) => {
        if (window.scrollY >= (top - 200)) {
          current = id;
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current) && current !== '') {
          link.classList.add('active');
        }
      });
    });
  });

  // 2. Mobile Menu Toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-links');
  
  if (menuBtn && navMenu) {
    const menuIcon = menuBtn.querySelector('.icon');

    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);

    const openMenu = () => {
      navMenu.classList.add('active');
      navOverlay.classList.add('active');
      menuBtn.setAttribute('aria-expanded', 'true');
      menuBtn.setAttribute('aria-label', 'Close navigation menu');
      menuIcon.classList.remove('icon-bars');
      menuIcon.classList.add('icon-times');
    };

    const closeMenu = () => {
      navMenu.classList.remove('active');
      navOverlay.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Open navigation menu');
      menuIcon.classList.remove('icon-times');
      menuIcon.classList.add('icon-bars');
    };

    navOverlay.addEventListener('click', closeMenu);

    menuBtn.addEventListener('click', () => {
      navMenu.classList.contains('active') ? closeMenu() : openMenu();
    });

    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // 3. Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // 4. Scroll Animation (Intersection Observer)
  const fadeElements = document.querySelectorAll('.fade-up');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    fadeElements.forEach(el => el.classList.add('visible'));
  } else {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    });

    fadeElements.forEach(el => fadeObserver.observe(el));
  }

  // 5. Number Counters Animation
  const counterElements = document.querySelectorAll('.count-number');
  let animationStarted = false;
  
  const animateCounters = () => {
    counterElements.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.innerText = Math.ceil(current) + (counter.hasAttribute('data-plus') ? '+' : '');
          requestAnimationFrame(updateCounter);
        } else {
          // Format with K suffix
          let displayVal = target >= 1000 ? (target / 1000) + 'K' : target;
          counter.innerText = displayVal + (counter.hasAttribute('data-plus') ? '+' : '');
        }
      };
      
      updateCounter();
    });
  };
  
  const statsSection = document.querySelector('.stats-ribbon');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animationStarted) {
        animationStarted = true;
        animateCounters();
      }
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
  }

  // 6. Booking Modal
  const modal = document.getElementById('booking-modal');
  const openBtns = document.querySelectorAll('.open-booking');
  const closeBtn = document.querySelector('.modal-close');
  
  if (modal) {
    let lastFocused = null;

    const getFocusable = () => [
      ...modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    ].filter(el => !el.disabled);

    const openModal = (trigger) => {
      lastFocused = trigger || document.activeElement;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      const focusable = getFocusable();
      if (focusable.length) focusable[0].focus();
    };

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    };

    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(btn);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('active')) return;
      if (e.key === 'Escape') { closeModal(); return; }
      if (e.key !== 'Tab') return;
      const focusable = getFocusable();
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  // 7. Form Submissions (Mock)
  const contactForm = document.getElementById('contact-form');
  const bookingForm = document.getElementById('booking-form');
  
  const handleForm = (form, e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<span class="icon icon-spinner icon-spin" aria-hidden="true"></span> Processing...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<span class="icon icon-check" aria-hidden="true"></span> Success!';
      btn.classList.add('btn-success');
      form.reset();

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.remove('btn-success');
        btn.disabled = false;
        
        // If booking form, close modal
        if (form.id === 'booking-form' && modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      }, 2000);
    }, 1500);
  };
  
  if (contactForm) contactForm.addEventListener('submit', (e) => handleForm(contactForm, e));
  if (bookingForm) bookingForm.addEventListener('submit', (e) => handleForm(bookingForm, e));

  // Card Tilt Effect has been removed per user feedback
});
