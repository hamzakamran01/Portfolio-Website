import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { getLenis } from '../hooks/useLenis';
import styles from './Navbar.module.css';

/**
 * Site navigation.
 *
 * Rewritten to fix, in order of severity:
 *  - Only 3 of 10 sections were reachable from the nav.
 *  - No active-section state at all: no scroll-spy, no aria-current.
 *  - `isMobile` was JS state initialised to false, so the DESKTOP nav rendered
 *    on first paint on phones and then swapped. The CSS already had the same
 *    breakpoint, making the JS branch both redundant and the cause of a flash.
 *  - The drawer was moved off-screen with `right: -100%`, so it stayed in the
 *    accessibility tree and remained tabbable while closed.
 *  - No aria-expanded/aria-controls, no focus trap, no Escape, no scroll lock.
 *  - scrollIntoView({behavior:'smooth'}) fought Lenis for the scroll position,
 *    while getLenis() sat exported and unused.
 */

const NAV_LINKS = [
  { id: 'projects', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'zaaric-founder', label: 'Zaaric' },
  { id: 'qimam-fellowship', label: 'Recognition' },
] as const;

const SPY_IDS = [...NAV_LINKS.map(l => l.id), 'contact'];

const Navigation: FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* ── Scrolled state ─────────────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Scroll spy ─────────────────────────────────────────────────────── */
  useEffect(() => {
    const sections = SPY_IDS.map(id => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      entries => {
        // Pick the entry closest to the top of the viewport that is visible.
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      // A band near the top of the viewport decides what counts as "current".
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* ── Navigate ───────────────────────────────────────────────────────── */
  const goTo = useCallback((id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;

    const lenis = getLenis();
    const offset = -(parseFloat(getComputedStyle(document.documentElement).fontSize) * 5);

    if (lenis) {
      lenis.scrollTo(el, { offset });
    } else {
      // Reduced motion, or Lenis not running: native jump. scroll-margin-top
      // in App.css keeps the heading clear of the fixed navbar.
      el.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }, []);

  /* ── Drawer: scroll lock, Escape, focus trap, focus restore ─────────── */
  useEffect(() => {
    if (!menuOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    getLenis()?.stop();

    const drawer = drawerRef.current;
    drawer?.querySelector<HTMLElement>('a, button')?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        return;
      }
      if (e.key !== 'Tab' || !drawer) return;

      const focusables = drawer.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      getLenis()?.start();
      previouslyFocused?.focus();
    };
  }, [menuOpen]);

  const renderLink = (id: string, label: string, className: string) => (
    <a
      href={`#${id}`}
      className={`${className} ${activeId === id ? styles.active : ''}`}
      aria-current={activeId === id ? 'true' : undefined}
      data-cursor="button"
      onClick={e => {
        e.preventDefault();
        goTo(id);
      }}
    >
      {label}
    </a>
  );

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} aria-label="Main">
      <div className={styles.container}>
        <a
          href="#hero"
          className={styles.logo}
          onClick={e => {
            e.preventDefault();
            goTo('hero');
          }}
        >
          HK
        </a>

        {/* Desktop nav. Visibility is controlled purely by CSS, so there is no
            first-paint flash from a JS-held breakpoint. */}
        <div className={styles.desktopNav}>
          <ul className={styles.navLinks}>
            {NAV_LINKS.map(link => (
              <li key={link.id}>{renderLink(link.id, link.label, styles.navLink)}</li>
            ))}
          </ul>
          <a
            href="#contact"
            className={styles.navCta}
            data-cursor="button"
            onClick={e => {
              e.preventDefault();
              goTo('contact');
            }}
          >
            Book a call <span aria-hidden="true">&#8599;</span>
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className={styles.menuToggle}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(open => !open)}
        >
          <span className={styles.menuIcon} aria-hidden="true">
            {menuOpen ? '×' : '☰'}
          </span>
        </button>

        {menuOpen && (
          <div className={styles.backdrop} onClick={() => setMenuOpen(false)} aria-hidden="true" />
        )}

        {/* `inert` keeps the closed drawer out of the tab order and the
            accessibility tree, which `right: -100%` alone did not do. */}
        <div
          id="mobile-menu"
          ref={drawerRef}
          className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : ''}`}
          inert={!menuOpen}
        >
          <ul className={styles.sidebarLinks}>
            {NAV_LINKS.map(link => (
              <li key={link.id}>{renderLink(link.id, link.label, styles.sidebarLink)}</li>
            ))}
            <li>
              <a
                href="#contact"
                className={styles.sidebarCta}
                onClick={e => {
                  e.preventDefault();
                  goTo('contact');
                }}
              >
                Book a call <span aria-hidden="true">&#8599;</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
