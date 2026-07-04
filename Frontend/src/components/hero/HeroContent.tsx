import { forwardRef, useImperativeHandle, useRef } from 'react';
import AvailableBadge from './AvailableBadge';
import StackTags from './StackTags';
import styles from './HeroContent.module.css';

export interface HeroContentHandle {
  badge: HTMLDivElement | null;
  nameLine1: HTMLHeadingElement | null;
  nameLine2: HTMLHeadingElement | null;
  divider: HTMLDivElement | null;
  role: HTMLDivElement | null;
  description: HTMLParagraphElement | null;
  ctas: HTMLDivElement | null;
  stack: HTMLDivElement | null;
}

interface HeroContentProps {
  isMobile: boolean;
}

const splitChars = (text: string, keyPrefix: string) =>
  text.split('').map((char, index) => (
    <span key={`${keyPrefix}-${index}`} className={styles.char} data-hero-char>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

const HeroContent = forwardRef<HeroContentHandle, HeroContentProps>(({ isMobile }, ref) => {
  const badgeRef = useRef<HTMLDivElement>(null);
  const nameLine1Ref = useRef<HTMLHeadingElement>(null);
  const nameLine2Ref = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    get badge() { return badgeRef.current?.querySelector('[data-hero-badge]') as HTMLDivElement | null; },
    get nameLine1() { return nameLine1Ref.current; },
    get nameLine2() { return nameLine2Ref.current; },
    get divider() { return dividerRef.current; },
    get role() { return roleRef.current; },
    get description() { return descriptionRef.current; },
    get ctas() { return ctasRef.current; },
    get stack() { return stackRef.current?.querySelector('[data-hero-stack]') as HTMLDivElement | null; },
  }));

  return (
    <div className={styles.content}>

      {/* ── Top Area — badge + system status ── */}
      <div className={styles.topArea} ref={badgeRef}>
        <AvailableBadge />
      </div>

      {/* ── Center Area — main headline ── */}
      <div className={styles.centerArea} data-hero-parallax>
        <h1 className={styles.nameBlock} data-cursor="text">
          <span className={styles.nameLine} ref={nameLine1Ref}>
            {isMobile ? 'HAMZA' : splitChars('HAMZA', 'hamza')}
          </span>
          <span className={styles.nameLine} ref={nameLine2Ref}>
            {isMobile ? 'KAMRAN' : splitChars('KAMRAN', 'kamran')}
          </span>
        </h1>

        <div className={styles.dividerWrap}>
          <div className={styles.divider} ref={dividerRef} aria-hidden="true" />
          <div className={styles.dividerDot} aria-hidden="true" />
        </div>

        <div className={styles.roleWrap} ref={roleRef}>
          <span className={styles.roleText}>AI Engineer</span>
          <span className={styles.roleDivider} aria-hidden="true" />
          <span className={styles.roleText}>Founder</span>
          <span className={styles.roleDivider} aria-hidden="true" />
          <span className={styles.roleText}>Builder</span>
        </div>

        <p className={styles.description} ref={descriptionRef}>
          I build production-ready AI systems for US and EU founders.
          From architecture to deployment in 30 days.
        </p>

        {/* ── CTAs ── */}
        <div className={styles.ctas} ref={ctasRef}>
          <a href="#projects" className={styles.primaryCta} data-cursor="button">
            <span>See My Work</span>
            <span className={styles.arrow} aria-hidden="true">↗</span>
          </a>
          <a href="#projects" className={styles.secondaryCta} data-cursor="button">
            View Case Studies
          </a>
        </div>
      </div>

      {/* ── Bottom Area — stack tags ── */}
      <div className={styles.bottomArea} ref={stackRef}>
        <StackTags />
      </div>
    </div>
  );
});

HeroContent.displayName = 'HeroContent';

export default HeroContent;
