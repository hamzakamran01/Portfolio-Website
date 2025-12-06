// ============================================================================
// ANIMATION UTILITIES - Enterprise-level animation configurations
// ============================================================================

import { AnimationConfig } from '../types';

/**
 * Standard animation durations (in seconds)
 */
export const DURATIONS = {
  instant: 0,
  fast: 0.2,
  normal: 0.3,
  slow: 0.4,
  slower: 0.6,
  slowest: 0.8,
} as const;

/**
 * Animation easing functions (cubic bezier values)
 * Based on professional motion design standards
 */
export const EASING = {
  // Ease out (deceleration) - most common for UI
  easeOut: [0.215, 0.61, 0.355, 1],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeOutQuart: [0.25, 1, 0.5, 1],

  // Ease in (acceleration) - rarely used alone
  easeIn: [0.55, 0.055, 0.675, 0.19],
  easeInCubic: [0.32, 0, 0.67, 0],

  // Ease in-out (acceleration then deceleration) - for element transitions
  easeInOut: [0.455, 0.03, 0.515, 0.955],
  easeInOutCubic: [0.65, 0, 0.35, 1],

  // Custom - for specific effects
  spring: [0.6, -0.05, 0.01, 0.99],
  bounce: [0.68, -0.55, 0.265, 1.55],
} as const;

/**
 * Standard stagger delays (in seconds)
 */
export const STAGGER = {
  fast: 0.05,
  normal: 0.08,
  slow: 0.12,
  slower: 0.15,
} as const;

/**
 * Pre-configured animation settings for common UI patterns
 */
export const ANIMATION_CONFIGS: Record<string, AnimationConfig> = {
  // Entrance animations
  fadeIn: {
    duration: DURATIONS.slow,
    easing: EASING.easeOut,
  },
  fadeInUp: {
    duration: DURATIONS.slow,
    easing: EASING.easeOut,
  },
  fadeInScale: {
    duration: DURATIONS.slow,
    easing: EASING.easeOutCubic,
  },

  // Hover interactions
  cardHover: {
    duration: DURATIONS.normal,
    easing: EASING.easeOut,
  },
  buttonHover: {
    duration: DURATIONS.fast,
    easing: EASING.easeOut,
  },

  // Modal/overlay
  modalOverlay: {
    duration: DURATIONS.normal,
    easing: EASING.easeInOut,
  },
  modalContent: {
    duration: DURATIONS.slow,
    easing: EASING.spring,
  },

  // Staggered children
  staggeredGrid: {
    duration: DURATIONS.slow,
    stagger: STAGGER.normal,
    easing: EASING.easeOut,
  },
  staggeredList: {
    duration: DURATIONS.normal,
    stagger: STAGGER.fast,
    easing: EASING.easeOut,
  },
};

/**
 * Framer Motion variants for common animations
 */
export const VARIANTS = {
  // Container variants (parent)
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: STAGGER.normal,
        delayChildren: 0.1,
      },
    },
  },

  // Item variants (children)
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: DURATIONS.slow,
        ease: EASING.easeOut,
      },
    },
  },

  // Fade variants
  fade: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: DURATIONS.normal,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: DURATIONS.fast,
      },
    },
  },

  // Scale variants
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: DURATIONS.slow,
        ease: EASING.spring,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: DURATIONS.normal,
      },
    },
  },

  // Slide variants
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: DURATIONS.slow,
        ease: EASING.easeOut,
      },
    },
  },

  // Fade In Up variant (alias for slideUp)
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: DURATIONS.slow,
        ease: EASING.easeOut,
      },
    },
  },

  // Card hover
  cardHover: {
    rest: {
      scale: 1,
      y: 0,
    },
    hover: {
      scale: 1.02,
      y: -4,
      transition: {
        duration: DURATIONS.normal,
        ease: EASING.easeOut,
      },
    },
  },
};

/**
 * Spring configurations for Framer Motion
 */
export const SPRING_CONFIGS = {
  // Gentle spring (most UI elements)
  gentle: {
    type: 'spring',
    stiffness: 120,
    damping: 14,
  },

  // Bouncy spring (playful interactions)
  bouncy: {
    type: 'spring',
    stiffness: 300,
    damping: 20,
  },

  // Stiff spring (quick, responsive)
  stiff: {
    type: 'spring',
    stiffness: 400,
    damping: 30,
  },
} as const;

/**
 * Helper function to create stagger delay
 */
export const getStaggerDelay = (index: number, baseDelay: number = STAGGER.normal): number => {
  return index * baseDelay;
};

/**
 * Helper function to check if reduced motion is preferred
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Helper to get safe animation duration based on reduced motion preference
 */
export const getSafeAnimationDuration = (duration: number): number => {
  return prefersReducedMotion() ? 0.01 : duration;
};

/**
 * Generate CSS animation delay for staggered items
 */
export const getCSSStaggerDelay = (index: number, baseDelay: number = 0.08): string => {
  return `${index * baseDelay}s`;
};
