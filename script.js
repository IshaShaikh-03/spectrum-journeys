// Spectrum Tours - Core Interactivity
document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header & Active Nav
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  
  window.addEventListener('scroll', () => {
    // Header blur effect
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Parallax hero bg
    const heroBg = document.querySelector('.hero-bg img');
    if (heroBg) {
      heroBg.style.transform = `translateY(${window.scrollY * 0.2}px) scale(1.05)`;
    }
    
    // Active navigation link
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current) && current !== '') {
        link.classList.add('active');
      }
    });
  });

  // 2. Mobile Menu Toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-links');
  
  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = menuBtn.querySelector('i');
      if(navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
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
    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      });
    });
    
    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };
    
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
    
    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
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
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    btn.disabled = true;
    
    // Mock API call
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Success!';
      btn.style.background = '#10b981'; // Green
      form.reset();
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
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
