import { useEffect, useRef } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import gsap from 'gsap';
import styles from './CustomCursor.module.css';

type CursorMode = 'default' | 'button' | 'text';

const isTouchDevice = (): boolean =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches);

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const isWideEnough = useMediaQuery('(min-width: 768px)');
  const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const enabled = !isTouchDevice() && isWideEnough && !prefersReduced;

  useEffect(() => {
    if (!enabled) return;

    /* ── Hide native cursor globally ─────────────────────────────── */
    document.documentElement.classList.add('signal-cursor-active');

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    /* ── State ───────────────────────────────────────────────────── */
    const mouse = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    // Position dot immediately (no lag)
    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });

    /* ── RAF-based lerp ticker for silky ring movement ────────────── */
    const onTick = () => {
      current.x += (mouse.x - current.x) * 0.12;
      current.y += (mouse.y - current.y) * 0.12;
      gsap.set(ring, { x: current.x, y: current.y });
    };
    gsap.ticker.add(onTick);

    /* ── Mouse position tracker ───────────────────────────────────── */
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      gsap.set(dot, { x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    /* ── Cursor mode detection ────────────────────────────────────── */
    let mode: CursorMode = 'default';

    const applyMode = (newMode: CursorMode) => {
      if (newMode === mode) return;
      mode = newMode;

      // Dot
      gsap.to(dot, {
        scale: newMode === 'button' ? 0 : 1,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      // Ring
      if (newMode === 'button') {
        gsap.to(ring, {
          scale: 1.8,
          borderColor: '#00D4FF',
          backgroundColor: 'rgba(0, 212, 255, 0.08)',
          mixBlendMode: 'normal',
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      } else if (newMode === 'text') {
        gsap.to(ring, {
          scale: 2.0,
          borderColor: 'rgba(0, 212, 255, 0.6)',
          backgroundColor: 'rgba(0, 212, 255, 0.06)',
          mixBlendMode: 'normal',
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      } else {
        gsap.to(ring, {
          scale: 1,
          borderColor: 'rgba(0, 212, 255, 0.5)',
          backgroundColor: 'rgba(0, 212, 255, 0.03)',
          mixBlendMode: 'normal',
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor]');
      if (!target) {
        applyMode('default');
        return;
      }
      const type = target.getAttribute('data-cursor') as CursorMode | null;
      applyMode(type === 'button' || type === 'text' ? type : 'default');
    };
    document.addEventListener('mouseover', onOver, { passive: true });

    /* Magnetic effect on [data-cursor="button"] elements.
     *
     * Rect measurement is cached. The previous version ran querySelectorAll +
     * getBoundingClientRect() for every magnetic target inside a rAF on every
     * mousemove, forcing a layout each frame. Rects only change on scroll,
     * resize or DOM mutation, so we measure then -- and we subtract the active
     * GSAP translation so the centre we compare against is the element's
     * resting position rather than its nudged one.
     */
    type MagneticTarget = { el: HTMLElement; cx: number; cy: number };
    let magneticTargets: MagneticTarget[] = [];
    let rafMagnetic = 0;

    const measureMagnetic = () => {
      magneticTargets = Array.from(
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

    measureMagnetic();
    window.addEventListener('scroll', measureMagnetic, { passive: true });
    window.addEventListener('resize', measureMagnetic, { passive: true });
    const magneticObserver = new MutationObserver(measureMagnetic);
    magneticObserver.observe(document.body, { childList: true, subtree: true });

    const updateMagnetic = (e: MouseEvent) => {
      cancelAnimationFrame(rafMagnetic);
      rafMagnetic = requestAnimationFrame(() => {
        for (const { el, cx, cy } of magneticTargets) {
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          if (Math.hypot(dx, dy) < 80) {
            gsap.to(el, { x: dx * 0.25, y: dy * 0.25, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
          } else {
            gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.6)', overwrite: 'auto' });
          }
        }
      });
    };
    window.addEventListener('mousemove', updateMagnetic, { passive: true });

    /* ── Cleanup ────────────────────────────────────────────────── */
    return () => {
      gsap.ticker.remove(onTick);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousemove', updateMagnetic);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafMagnetic);
      window.removeEventListener('scroll', measureMagnetic);
      window.removeEventListener('resize', measureMagnetic);
      magneticObserver.disconnect();
      magneticTargets.forEach(({ el }) => gsap.set(el, { x: 0, y: 0 }));
      document.documentElement.classList.remove('signal-cursor-active');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
