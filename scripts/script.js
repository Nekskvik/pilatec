 // ===== HEADER SCROLL =====
    const header = document.getElementById('header');
    function updateHeader() {
      header.classList.toggle('scrolled', window.pageYOffset > 40);
    }
    window.addEventListener('scroll', updateHeader);
    updateHeader();

    // ===== MOBILE NAV =====
    const burger = document.getElementById('burgerBtn');
    const mobileNav = document.getElementById('mobileNav');
    const overlay = document.getElementById('overlay');

    function toggleNav() {
      burger.classList.toggle('active');
      mobileNav.classList.toggle('open');
      overlay.classList.toggle('show');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    }

    burger?.addEventListener('click', toggleNav);
    overlay?.addEventListener('click', toggleNav);
    mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      if (mobileNav.classList.contains('open')) toggleNav();
    }));

    // ===== PARALLAX =====
    const heroBg = document.getElementById('heroBg');
    const bandBg = document.getElementById('bandBg');

    function parallax() {
      const scrolled = window.pageYOffset;
      const wh = window.innerHeight;

      if (heroBg) {
        const heroSection = document.querySelector('.hero');
        if (scrolled < heroSection.offsetHeight) {
          heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
      }

      if (bandBg) {
        const rect = bandBg.parentElement.getBoundingClientRect();
        if (rect.top < wh && rect.bottom > 0) {
          const offset = (scrolled - (rect.top + scrolled - wh * 0.5)) * 0.25;
          bandBg.style.transform = `translateY(${offset}px)`;
        }
      }
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => { parallax(); ticking = false; });
        ticking = true;
      }
    });

    // ===== REVEAL =====
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    revealEls.forEach(el => observer.observe(el));

    // ===== FAQ ACCORDION =====
    document.querySelectorAll('.faq-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const wasActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!wasActive) item.classList.add('active');
      });
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
          e.preventDefault();
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    parallax();
