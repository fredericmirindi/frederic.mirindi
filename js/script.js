// ======= 2025 PRO WEBSITE JS =======

// ======= Utility: Helper Functions =======
function qs(sel, ctx = document) { return ctx.querySelector(sel); }
function qsa(sel, ctx = document) { return Array.from(ctx.querySelectorAll(sel)); }

// ======= 1. Mobile Navigation Toggle =======
document.addEventListener('DOMContentLoaded', function () {
  const mobileNavToggle = qs('#mobile-nav-toggle');
  const mainNav = qs('#main-nav');

  if (mobileNavToggle && mainNav) {
    mobileNavToggle.addEventListener('click', function () {
      mainNav.classList.toggle('nav-open');
      // Accessibility: toggle aria-expanded
      const expanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
      mobileNavToggle.setAttribute('aria-expanded', String(!expanded));
      // Trap focus in nav when open (for accessibility)
      if (mainNav.classList.contains('nav-open')) {
        mainNav.querySelector('a').focus();
      }
    });
    // Optional: Close nav when clicking outside or on a link (mobile UX)
    document.addEventListener('click', function (e) {
      if (
        mainNav.classList.contains('nav-open') &&
        !mainNav.contains(e.target) &&
        e.target !== mobileNavToggle
      ) {
        mainNav.classList.remove('nav-open');
        mobileNavToggle.setAttribute('aria-expanded', "false");
      }
    });
    qsa('.main-nav a').forEach(link =>
      link.addEventListener('click', () => {
        if (window.innerWidth <= 700) {
          mainNav.classList.remove('nav-open');
          mobileNavToggle.setAttribute('aria-expanded', "false");
        }
      })
    );
  }

  // ======= 2. Light/Dark Theme Toggle =======
  const themeToggle = qs('#theme-toggle');
  const themeIcon = qs('#theme-icon');
  const darkModeClass = 'dark-mode';

  function applyTheme(mode) {
    if (mode === 'dark') {
      document.body.classList.add(darkModeClass);
      if (themeIcon) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      }
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove(darkModeClass);
      if (themeIcon) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
      localStorage.setItem('theme', 'light');
    }
  }
  // Respect system preference if no user choice
  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  applyTheme(savedTheme || (systemDark ? 'dark' : 'light'));

  if (themeToggle && themeIcon) {
    themeToggle.addEventListener('click', function () {
      const isDark = document.body.classList.contains(darkModeClass);
      applyTheme(isDark ? 'light' : 'dark');
    });
  }

  // ======= 3. Dynamic Current Year in Footer =======
  const yearSpan = qs('#current-year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // ======= 4. Carousel/Slider (Slick Carousel) =======
  if (typeof $ === "function" && typeof $.fn.slick === "function") {
    $('.carousel-track').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3500,
      speed: 600,
      arrows: true,
      dots: true,
      responsive: [
        { breakpoint: 900, settings: { slidesToShow: 2 } },
        { breakpoint: 600, settings: { slidesToShow: 1 } }
      ]
    });
  }

  // ======= 5. Scroll to Top Button (FAB) =======
  let scrollBtn = qs('.fab.scroll-top');
  if (!scrollBtn) {
    scrollBtn = document.createElement('button');
    scrollBtn.className = 'fab scroll-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollBtn);
  }
  scrollBtn.style.display = 'none';
  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 350 ? 'flex' : 'none';
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ======= 6. Modal Support =======
  qsa('[data-modal-target]').forEach(btn => {
    btn.addEventListener('click', function () {
      const target = qs(this.getAttribute('data-modal-target'));
      if (target) target.classList.add('active');
    });
  });
  qsa('.modal-close').forEach(btn => {
    btn.addEventListener('click', function () {
      this.closest('.modal').classList.remove('active');
    });
  });
  qsa('.modal').forEach(modal => {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.classList.remove('active');
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') qsa('.modal.active').forEach(m => m.classList.remove('active'));
  });

  // ======= 7. Tooltip Support =======
  qsa('[data-tooltip]').forEach(el => {
    el.setAttribute('tabindex', '0');
    el.addEventListener('focus', function () {
      this.classList.add('show-tooltip');
    });
    el.addEventListener('blur', function () {
      this.classList.remove('show-tooltip');
    });
  });

  // ======= 8. Accessibility: Keyboard nav highlight =======
  document.body.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') document.body.classList.add('user-is-tabbing');
  });
  document.body.addEventListener('mousedown', function () {
    document.body.classList.remove('user-is-tabbing');
  });

  // ======= 9. Lazy Loading Images =======
  if ('loading' in HTMLImageElement.prototype) {
    qsa('img[loading="lazy"]').forEach(img => {
      if (img.dataset.src) img.src = img.dataset.src;
    });
  } else if (window.IntersectionObserver) {
    let lazyImgs = qsa('img[loading="lazy"]');
    let observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let img = entry.target;
          if (img.dataset.src) img.src = img.dataset.src;
          obs.unobserve(img);
        }
      });
    });
    lazyImgs.forEach(img => observer.observe(img));
  }

  // ======= 10. Smooth Anchor Scroll =======
  qsa('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = qs(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ======= 11. Animate on Scroll (AOS-like) =======
  if ('IntersectionObserver' in window) {
    qsa('.fade-in').forEach(el => {
      el.style.opacity = 0;
      let obs = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.style.animation = "fadeIn 1.1s forwards";
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.15 });
      obs.observe(el);
    });
  }

  // ======= 12. Accessibility: Focus Outline Only for Keyboard Nav =======
  // See .user-is-tabbing class in CSS

  // ======= 13. Prevent double form submit =======
  qsa('form').forEach(form => {
    form.addEventListener('submit', function (e) {
      if (form.classList.contains('submitted')) e.preventDefault();
      form.classList.add('submitted');
      qsa('button[type="submit"],input[type="submit"]', form)?.setAttribute('disabled', 'disabled');
    });
  });
});
