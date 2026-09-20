import { useEffect } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import gsap from 'gsap';

/**
 * Magnetic pull on primary actions.
 *
 * This was previously CustomCursor: a dot + lerped ring that replaced the
 * native pointer site-wide via `cursor: none !important`, alongside a WebGL
 * particle field that spawned a trail behind the cursor.
 *
 * Both are gone. The cursor effect read as 2020 creative-portfolio costume on
 * a site selling senior engineering, and hiding the OS pointer taxed the one
 * interaction that pays — any dropped frame left the fake cursor visibly
 * trailing the real click point.
 *
 * What survives is the part that was never decoration: interactive elements
 * lean toward the pointer as it approaches, which makes them easier to hit.
 * This component renders nothing; it only attaches behaviour.
 */

const isTouchDevice = (): boolean =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches);

/** Pointer distance at which a target starts to lean, in px. */
const PULL_RADIUS = 80;
/** Fraction of the offset the element travels. Subtle on purpose. */
const PULL_STRENGTH = 0.25;

const MagneticTargets: React.FC = () => {
  const isWideEnough = useMediaQuery('(min-width: 768px)');
  const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const enabled = !isTouchDevice() && isWideEnough && !prefersReduced;

  useEffect(() => {
    if (!enabled) return;

    /* Rect measurement is cached. The original ran querySelectorAll +
     * getBoundingClientRect() for every target inside a rAF on every
     * mousemove, forcing a layout each frame. Rects only change on scroll,
     * resize or DOM mutation, so we measure then -- and we subtract the active
     * GSAP translation so the centre we compare against is the element's
     * resting position rather than its nudged one. */
    type MagneticTarget = { el: HTMLElement; cx: number; cy: number };
    let targets: MagneticTarget[] = [];
    let raf = 0;

    const measure = () => {
      targets = Array.from(
        document.querySelectorAll<HTMLElement>('[data-cursor="button"]')
      ).map(el => {
        const rect = el.getBoundingClientRect();
        const tx = Number(gsap.getProperty(el, 'x')) || 0;
        const ty = Number(gsap.getProperty(el, 'y')) || 0;
        return {
          el,
          cx: rect.left + rect.width / 2 - tx,
          cy: rect.top + rect.height / 2 - ty,
        };
      });
    };

    measure();
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    const observer = new MutationObserver(measure);
    observer.observe(document.body, { childList: true, subtree: true });

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        for (const { el, cx, cy } of targets) {
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          if (Math.hypot(dx, dy) < PULL_RADIUS) {
            gsap.to(el, {
              x: dx * PULL_STRENGTH,
              y: dy * PULL_STRENGTH,
              duration: 0.4,
              ease: 'power3.out',
              overwrite: 'auto',
            });
          } else {
            gsap.to(el, {
              x: 0,
              y: 0,
              duration: 0.6,
              ease: 'elastic.out(1, 0.6)',
              overwrite: 'auto',
            });
          }
        }
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
      observer.disconnect();
      targets.forEach(({ el }) => gsap.set(el, { x: 0, y: 0 }));
    };
  }, [enabled]);

  return null;
};

export default MagneticTargets;
