// ============================================================================
// useInView HOOK - Intersection Observer for scroll-triggered animations
// ============================================================================

import { useEffect, useRef, useState, RefObject } from 'react';

export interface UseInViewOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  disabled?: boolean;
}

export interface UseInViewReturn<T extends Element> {
  ref: RefObject<T | null>;
  isInView: boolean;
  entry: IntersectionObserverEntry | null;
}

/**
 * Custom hook for detecting when an element enters/exits viewport
 *
 * @example
 * ```tsx
 * const { ref, isInView } = useInView<HTMLDivElement>({
 *   threshold: 0.2,
 *   triggerOnce: true
 * });
 *
 * return (
 *   <div ref={ref} className={isInView ? 'animate-in' : ''}>
 *     Content
 *   </div>
 * );
 * ```
 */
export function useInView<T extends Element = HTMLDivElement>(
  options: UseInViewOptions = {}
): UseInViewReturn<T> {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    disabled = false,
  } = options;

  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    // Don't observe if disabled
    if (disabled) return;

    const element = ref.current;
    if (!element) return;

    // Check if browser supports IntersectionObserver
    if (typeof IntersectionObserver === 'undefined') {
      console.warn('IntersectionObserver is not supported in this browser');
      setIsInView(true); // Fallback: assume in view
      return;
    }

    // If already triggered and triggerOnce is true, don't observe
    if (triggerOnce && hasTriggered.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
        const inView = entry.isIntersecting;

        setIsInView(inView);

        // Mark as triggered if in view and triggerOnce is enabled
        if (inView && triggerOnce) {
          hasTriggered.current = true;
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, disabled]);

  return { ref, isInView, entry };
}

/**
 * Simplified version that only returns ref and isInView
 */
export function useSimpleInView<T extends Element = HTMLDivElement>(
  threshold: number = 0.1,
  triggerOnce: boolean = true
): UseInViewReturn<T> {
  return useInView<T>({ threshold, triggerOnce });
}
