/* =========================================================
   Eric Rodriguez Portfolio — script.js
   Vanilla ES6+, no dependencies
   ========================================================= */

'use strict';

/* ---------------------------------------------------------
   Mobile Menu
   --------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.querySelector('.nav__toggle');
  const menu   = document.querySelector('.nav__menu');
  const close  = document.querySelector('.nav__close');

  if (!toggle || !menu) return;

  function openMenu() {
    menu.classList.add('nav__menu--open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Move focus into menu
    const firstLink = menu.querySelector('a');
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    menu.classList.remove('nav__menu--open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    toggle.focus();
  }

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('nav__menu--open');
    isOpen ? closeMenu() : openMenu();
  });

  if (close) close.addEventListener('click', closeMenu);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('nav__menu--open')) {
      closeMenu();
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (
      menu.classList.contains('nav__menu--open') &&
      !menu.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Close menu and follow nav links
  menu.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      if (menu.classList.contains('nav__menu--open')) closeMenu();
    });
  });
}

/* ---------------------------------------------------------
   Nav Scroll Shadow
   --------------------------------------------------------- */
function initNavScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('site-header--scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

/* ---------------------------------------------------------
   Scroll Spy — active nav link
   --------------------------------------------------------- */
function initScrollSpy() {
  const sections = ['#hero', '#projects', '#about', '#contact']
    .map((sel) => document.querySelector(sel))
    .filter(Boolean);

  if (!sections.length) return;

  const navLinks = document.querySelectorAll('.nav__link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const href = link.getAttribute('href') || '';
          // Match both "#id" (index.html) and "index.html#id" (portfolio pages)
          const matches = href === `#${id}` || href.endsWith(`#${id}`);
          link.classList.toggle('nav__link--active', matches);
        });
      });
    },
    { threshold: 0, rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((s) => {
    if (s) observer.observe(s);
  });
}

/* ---------------------------------------------------------
   Scroll Fade — Intersection Observer
   --------------------------------------------------------- */
function initScrollFade() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  // Respect reduced-motion: show immediately
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------
   Hero Parallax
   --------------------------------------------------------- */
function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const hero = document.querySelector('.hero');
  if (!hero) return;

  let ticking = false;

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          document.documentElement.style.setProperty(
            '--scroll-y',
            window.scrollY
          );
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
}

/* ---------------------------------------------------------
   Bootstrap
   --------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initNavScroll();
  initScrollSpy();
  initScrollFade();
  initParallax();
});
