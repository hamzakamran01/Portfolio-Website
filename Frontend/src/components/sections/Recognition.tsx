import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Recognition.module.css';

/**
 * Recognition & leadership.
 *
 * Replaces THREE separate full-bleed sections — QimamFellowship (945 lines of
 * CSS), NationalYouthSummit (740) and PublicSpeaking (257) — which together
 * occupied more vertical space than all of the engineering work on the page
 * and sat directly between the skills content and the contact form.
 *
 * The credibility signal is kept and the real estate is not: three award
 * cards, one stat row, one photo strip. For a page whose job is converting
 * founders, this belongs after the technical case, not in front of it.
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
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  const close = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [lightbox, close]);

  return (
    <section id="recognition" className={styles.section} aria-labelledby="recognition-heading">
      <div className={styles.header}>
        <p className={styles.eyebrow}>Beyond the code</p>
        <h2 id="recognition-heading">Recognition &amp; leadership</h2>
        <p className={styles.sub}>
          Selection and speaking work that shaped how I run projects and communicate with
          stakeholders.
        </p>
      </div>

      <ul className={styles.awards}>
        {AWARDS.map((award, i) => (
          <motion.li
            key={award.title}
            className={styles.award}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
          >
            <div className={styles.awardStat}>
              <span className={styles.statValue}>{award.stat}</span>
              <span className={styles.statLabel}>{award.statLabel}</span>
            </div>
            <h3 className={styles.awardTitle}>{award.title}</h3>
            <p className={styles.awardOrg}>
              {award.org} &middot; {award.year}
            </p>
            <p className={styles.awardDetail}>{award.detail}</p>
          </motion.li>
        ))}
      </ul>

      <ul className={styles.strip}>
        {PHOTOS.map(photo => (
          <li key={photo.src}>
            <button type="button" className={styles.thumb} onClick={() => setLightbox(photo)}>
              <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
              <span className={styles.thumbCaption}>{photo.caption}</span>
            </button>
          </li>
        ))}
      </ul>

      {lightbox && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.caption}
          onClick={close}
        >
          <button type="button" className={styles.lightboxClose} onClick={close} aria-label="Close">
            &times;
          </button>
          <figure className={styles.lightboxFigure} onClick={e => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.alt} />
            <figcaption>{lightbox.caption}</figcaption>
          </figure>
        </div>
      )}
    </section>
  );
};

export default Recognition;
