import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import styles from './Recognition.module.css';

/**
 * Recognition & leadership.
 *
 * Replaces THREE separate full-bleed sections — QimamFellowship (946 lines of
 * CSS), NationalYouthSummit (741) and PublicSpeaking (258) — which together
 * occupied more vertical space than all of the engineering work on the page
 * and sat directly between the skills content and the contact form.
 *
 * The credibility signal is kept and the real estate is not: three award
 * cards, one photo strip. For a page whose job is converting founders, this
 * belongs after the technical case rather than in front of it.
 */

interface Award {
  title: string;
  org: string;
  year: string;
  stat: string;
  statLabel: string;
  detail: string;
}

const AWARDS: Award[] = [
  {
    title: 'Qimam Fellowship',
    org: 'National leadership programme',
    year: '2025',
    stat: '38',
    statLabel: 'of 11,000+ applicants',
    detail:
      'Selected as one of only 38 students nationwide. Corporate immersions, founder mentorship, and one-on-one sessions with 20+ CEOs.',
  },
  {
    title: 'National Youth Summit',
    org: 'Government of Punjab — Quetta',
    year: '2025',
    stat: 'Delegate',
    statLabel: 'provincial representative',
    detail:
      'Chosen to represent Punjab at a fully funded national summit on policy, cohesion and entrepreneurship.',
  },
  {
    title: 'Parliamentary Debates',
    org: 'Nationals — LUMS',
    year: '2024',
    stat: '15+',
    statLabel: 'competitions',
    detail:
      'Represented Punjab University in national-level parliamentary debating. Hosted the FCIT Career Fair and Annual Dinner 2025.',
  },
];

interface Photo {
  src: string;
  alt: string;
  caption: string;
}

const PHOTOS: Photo[] = [
  { src: '/assets/qimam/award group.jpg', alt: 'Qimam award ceremony', caption: 'Qimam award ceremony' },
  { src: '/assets/NYS_Quetta/award_pic.jpg', alt: 'Award recognition at the National Youth Summit', caption: 'Award recognition' },
  { src: '/assets/qimam/batch pic.jpg', alt: 'Qimam Fellowship class of 2025', caption: 'Class of 2025' },
  { src: '/assets/NYS_Quetta/gorup_pic_NYS.jpg', alt: 'Delegates at the National Youth Summit', caption: 'Inter-provincial delegates' },
  { src: '/assets/qimam/sessions.jpg', alt: 'Workshop session at the Qimam Fellowship', caption: 'Intensive workshops' },
  { src: '/assets/NYS_Quetta/cert_pic.jpg', alt: 'Certificate of merit', caption: 'Certificate of merit' },
];

const Recognition: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isOpen = lightboxIndex !== null;

  const close = useCallback(() => setLightboxIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setLightboxIndex(i => (i === null ? i : (i + delta + PHOTOS.length) % PHOTOS.length)),
    []
  );

  /* Escape to close, arrow keys to move between photos, and scroll lock while
     the dialog is open. */
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [isOpen, close, step]);

  const photo = lightboxIndex !== null ? PHOTOS[lightboxIndex] : null;

  return (
    <section id="recognition" className={styles.section} aria-labelledby="recognition-heading">
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <SectionHeader
          id="recognition-heading"
          eyebrow="Beyond the code"
          title="Recognition & leadership"
          subtitle="Selection and speaking work that shaped how I run projects and communicate with stakeholders."
        />

        {/* ── Award cards ───────────────────────────────────────────── */}
        <motion.ul
          className={styles.awards}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {AWARDS.map(award => (
            <motion.li
              key={award.title}
              className={styles.award}
              variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.awardStat}>
                <span className={styles.statValue}>{award.stat}</span>
                <span className={styles.statLabel}>{award.statLabel}</span>
              </div>
              <h3 className={styles.awardTitle}>{award.title}</h3>
              <p className={styles.awardOrg}>
                {award.org} <span className={styles.dot} aria-hidden="true" /> {award.year}
              </p>
              <p className={styles.awardDetail}>{award.detail}</p>
            </motion.li>
          ))}
        </motion.ul>

        {/* ── Photo strip ───────────────────────────────────────────── */}
        <motion.ul
          className={styles.strip}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {PHOTOS.map((p, i) => (
            <motion.li
              key={p.src}
              variants={{ hidden: { opacity: 0, scale: 0.94 }, visible: { opacity: 1, scale: 1 } }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                type="button"
                className={styles.thumb}
                onClick={() => setLightboxIndex(i)}
                aria-label={`Open photo: ${p.caption}`}
                data-cursor="button"
              >
                <img src={p.src} alt={p.alt} loading="lazy" decoding="async" />
                <span className={styles.thumbOverlay} aria-hidden="true" />
                <span className={styles.thumbCaption}>{p.caption}</span>
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* ── Lightbox ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {photo && (
          <motion.div
            className={styles.lightbox}
            role="dialog"
            aria-modal="true"
            aria-label={photo.caption}
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button type="button" className={styles.close} onClick={close} aria-label="Close">
              &times;
            </button>

            <button
              type="button"
              className={`${styles.nav} ${styles.navPrev}`}
              onClick={e => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous photo"
            >
              &#8249;
            </button>

            <motion.figure
              className={styles.figure}
              onClick={e => e.stopPropagation()}
              key={photo.src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src={photo.src} alt={photo.alt} />
              <figcaption>
                {photo.caption}
                <span className={styles.counter}>
                  {(lightboxIndex ?? 0) + 1} / {PHOTOS.length}
                </span>
              </figcaption>
            </motion.figure>

            <button
              type="button"
              className={`${styles.nav} ${styles.navNext}`}
              onClick={e => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next photo"
            >
              &#8250;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Recognition;
