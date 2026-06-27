import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface RevealOptions {
  y?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  once?: boolean;
}

export const useGSAPReveal = <T extends HTMLElement>(
  options: RevealOptions = {},
  deps: unknown[] = [],
) => {
  const ref = useRef<T>(null);
  const { y = 24, duration = 0.6, delay = 0, ease = 'power3.out', once = true } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease,
        scrollTrigger: once
          ? undefined
          : {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
};
