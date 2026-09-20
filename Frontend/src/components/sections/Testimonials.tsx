import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaArrowUpRightFromSquare, FaStar } from 'react-icons/fa6';
import { SiUpwork } from 'react-icons/si';
import SectionHeader from '../ui/SectionHeader';
import { TESTIMONIALS, type Testimonial } from '../../data/testimonials';
import styles from './Testimonials.module.css';

/**
 * Social proof.
 *
 * Four separate testimonial implementations previously existed in this repo
 * (two of them React Three Fiber scenes) and NONE was ever rendered — the site
 * shipped with zero social proof. This is the single replacement.
 *
 * Every card carries the platform the review came from and the project it is
 * about, so a visitor can place the quote rather than take it on faith. Entries
 * without usable attribution render in a held-back treatment with an explicit
 * marker rather than being dressed up as confirmed client quotes. See
 * data/testimonials.ts.
 */

const initials = (name: string): string =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('');

const Card: React.FC<{ item: Testimonial; index: number }> = ({ item, index }) => {
  /* Cursor-tracked spotlight. Writing to a custom property keeps this off the
     React render path — no state, no re-render per mousemove. */
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <motion.figure
      className={`${styles.card} ${item.verified ? '' : styles.cardUnverified}`}
      onMouseMove={onMouseMove}
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
    >
      <span className={styles.spotlight} aria-hidden="true" />
      <span className={styles.watermark} aria-hidden="true">
        &rdquo;
      </span>

      {/* Quote glyph and provenance share one row — the badge is the first
          thing read, before the words it vouches for. */}
      <div className={styles.topRow}>
        <FaQuoteLeft className={styles.quoteMark} aria-hidden="true" />

        {item.rating != null && (
          <span className={styles.rating} aria-label={`${item.rating} out of 5`}>
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                key={i}
                className={i < item.rating! ? styles.starOn : styles.starOff}
                aria-hidden="true"
              />
            ))}
          </span>
        )}

        {item.source && (
          <span className={styles.source}>
            <SiUpwork className={styles.sourceIcon} aria-hidden="true" />
            {item.source} review
          </span>
        )}
      </div>

      <blockquote className={styles.quote}>{item.quote}</blockquote>

      <figcaption className={styles.attribution}>
        {item.avatar ? (
          <img
            className={styles.avatar}
            src={item.avatar}
            alt=""
            width={44}
            height={44}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className={styles.avatarFallback} aria-hidden="true">
            {initials(item.author)}
          </span>
        )}

        <span className={styles.who}>
          <span className={styles.author}>{item.author}</span>
          <span className={styles.role}>
            {item.projectHref ? (
              <a
                className={styles.projectLink}
                href={item.projectHref}
                data-cursor="button"
              >
                {item.project}
              </a>
            ) : (
              item.project
            )}
            {item.location && (
              <>
                <span className={styles.dot} aria-hidden="true" />
                {item.location}
              </>
            )}
          </span>
        </span>

        {item.verified && item.profileUrl && (
          <a
            className={styles.verifyLink}
            href={item.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${item.author}'s profile`}
            data-cursor="button"
          >
            <FaArrowUpRightFromSquare aria-hidden="true" />
          </a>
        )}
      </figcaption>

      {!item.verified && (
        <p className={styles.pending}>
          <span className={styles.pendingDot} aria-hidden="true" />
          Attribution pending
        </p>
      )}
    </motion.figure>
  );
};

const Testimonials: React.FC = () => {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section id="testimonials" className={styles.section} aria-labelledby="testimonials-heading">
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <SectionHeader
          id="testimonials-heading"
          eyebrow="Social proof"
          title="What clients say"
          subtitle="Verbatim reviews from clients who hired us on Upwork."
        />

        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {TESTIMONIALS.map((item, i) => (
            <Card key={item.id} item={item} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
