    // ===== PARALLAX EFFECTS =====
    const heroBg = document.getElementById('heroBg');
    const bandBg = document.getElementById('bandBg');

    function parallax() {
      const scrolled = window.pageYOffset;

      // Hero parallax — background moves slower than scroll
      if (heroBg) {
        const heroSection = document.getElementById('hero');
        const heroHeight = heroSection.offsetHeight;
        if (scrolled < heroHeight) {
          heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
      }

      // Image band parallax
      if (bandBg) {
        const bandRect = bandBg.parentElement.getBoundingClientRect();
        const bandTop = bandRect.top + scrolled;
        const windowHeight = window.innerHeight;
        // Only apply when band is in view
        if (bandRect.top < windowHeight && bandRect.bottom > 0) {
          const offset = (scrolled - bandTop) * 0.3;
          bandBg.style.transform = `translateY(${offset}px)`;
        }
      }
    }

    // Throttle with requestAnimationFrame
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          parallax();
          ticking = false;
        });
        ticking = true;
      }
    });

    // ===== SCROLL REVEAL =====
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optionally unobserve after revealing
          // revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });

    // Initial parallax call
    parallax();
