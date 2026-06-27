import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleField from './ParticleField';
import CustomCursor from './CustomCursor';
import HeroContent, { HeroContentHandle } from './HeroContent';
import ScrollIndicator from './ScrollIndicator';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import styles from './HeroSection.module.css';
import './HeroTokens.css';

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HeroContentHandle>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const particleEl = section.querySelector('[data-particle-field]') as HTMLElement | null;
    const scrollIndicator = section.querySelector('[data-hero-scroll]') as HTMLElement | null;
    const dividerDot = section.querySelector('[class*="dividerDot"]') as HTMLElement | null;
    const statsEl = section.querySelector('[class*="stats"]') as HTMLElement | null;

    /* ── Reduced Motion — immediately reveal everything ───────────── */
    if (prefersReduced) {
      if (particleEl) particleEl.style.opacity = '1';
      gsap.set(
        [
          content.badge,
          content.nameLine1,
          content.nameLine2,
          content.divider,
          content.role,
          content.description,
          statsEl,
          content.ctas,
          content.stack,
          scrollIndicator,
        ].filter(Boolean),
        { opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0)' },
      );
      gsap.set(section.querySelectorAll('[data-hero-char]'), { opacity: 1, y: 0 });
      if (dividerDot) gsap.set(dividerDot, { opacity: 1 });
      return;
    }

    /* ── Main Entrance Timeline ──────────────────────────────────── */
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // t=0 Particle field fade-in
      if (particleEl) {
        tl.fromTo(particleEl, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' }, 0);
      }

      // t=300ms Available badge
      if (content.badge) {
        tl.fromTo(content.badge, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.3);
      }

      // t=500ms and t=700ms Name lines
      if (isMobile) {
        if (content.nameLine1) {
          tl.fromTo(content.nameLine1, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.5);
        }
        if (content.nameLine2) {
          tl.fromTo(content.nameLine2, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.7);
        }
      } else {
        const line1Chars = content.nameLine1?.querySelectorAll('span');
        const line2Chars = content.nameLine2?.querySelectorAll('span');
        if (line1Chars?.length) {
          tl.fromTo(
            line1Chars,
            { y: 80, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.04, ease: 'power4.out' },
            0.5,
          );
        }
        if (line2Chars?.length) {
          tl.fromTo(
            line2Chars,
            { y: 80, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.04, ease: 'power4.out' },
            0.7,
          );
        }
      }

      // t=900ms Divider line draws right-to-left
      if (content.divider) {
        tl.fromTo(
          content.divider,
          { clipPath: 'inset(0 0 0 100%)' },
          { clipPath: 'inset(0 0 0 0)', duration: 0.6, ease: 'power2.inOut' },
          0.9,
        );
      }

      // t=1000ms Role text
      if (content.role) {
        tl.fromTo(content.role, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 1.0);
      }

      // t=1100ms Description
      if (content.description) {
        tl.fromTo(content.description, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 1.1);
      }

      // t=1300ms CTA buttons
      if (content.ctas) {
        tl.fromTo(
          content.ctas.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
          1.3,
        );
      }

      // t=1500ms Stack tags
      if (content.stack) {
        const tags = content.stack.querySelectorAll('[data-hero-tag]');
        tl.to(content.stack, { opacity: 1, duration: 0.01 }, 1.5);
        tl.fromTo(tags, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.05 }, 1.5);
      }

      // t=1700ms Scroll indicator
      if (scrollIndicator) {
        tl.fromTo(scrollIndicator, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 1.7);
      }

      /* ── Scroll Parallax + Cinematic Dissolve ─────────────────── */
      const nameBlock = content.nameLine1?.closest('h1');
      const parallaxContent = section.querySelector('[data-hero-parallax]');

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;

          // Name scales down and fades (start: 20% scroll, done: 60%)
          if (nameBlock) {
            gsap.set(nameBlock, {
              scale: 1 - p * 0.15,
              opacity: Math.max(0, 1 - Math.max(0, (p - 0.2) / 0.4)),
            });
          }

          // Content block parallax upward
          if (parallaxContent) {
            gsap.set(parallaxContent, { y: -p * 60 });
          }

          // Particle field fades after 70% scroll
          if (particleEl) {
            particleEl.style.opacity = p > 0.7
              ? String(Math.max(0, 1 - (p - 0.7) / 0.3))
              : '1';
          }
        },
      });
    }, section);

    return () => {
      ctx.revert();
      gsap.killTweensOf(section.querySelectorAll('*'));
    };
  }, [isMobile]);

  return (
    <section id="hero" ref={sectionRef} className={styles.hero} aria-label="Introduction">
      {/* Layer 0: WebGL particle field */}
      {!isMobile && <ParticleField className={styles.particles} />}

      {/* Layer 1: Radial vignette */}
      <div className={styles.vignette} aria-hidden="true" />

      {/* Layer 2: Subtle grid overlay */}
      <div className={styles.gridOverlay} aria-hidden="true" />

      {/* Layer 3: Ambient light orbs */}
      <div className={`${styles.ambientOrb} ${styles.topLeft}`} aria-hidden="true" />
      <div className={`${styles.ambientOrb} ${styles.bottomRight}`} aria-hidden="true" />
      <div className={`${styles.ambientOrb} ${styles.topRight}`} aria-hidden="true" />

      {/* Layer 4: Decorative corner accents */}
      <div className={`${styles.cornerAccent} ${styles.topLeft}`} aria-hidden="true" />
      <div className={`${styles.cornerAccent} ${styles.bottomRight}`} aria-hidden="true" />

      {/* Layer 5: Content + cursor */}
      <CustomCursor />
      <HeroContent ref={contentRef} isMobile={isMobile} />
      <ScrollIndicator />
    </section>
  );
};

export default HeroSection;
