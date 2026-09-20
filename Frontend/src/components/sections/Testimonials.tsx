import { motion } from 'framer-motion';
import { FaQuoteLeft, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { TESTIMONIALS, type Testimonial } from '../../data/testimonials';
import styles from './Testimonials.module.css';

/**
 * Social proof.
 *
 * Four separate testimonial implementations previously existed in this repo
 * (two of them React Three Fiber scenes) and NONE of them was ever rendered —
 * the site shipped with zero social proof. This is the single replacement.
 *
 * Unverified entries are rendered in a muted treatment with an explicit
 * "attribution pending" marker rather than being dressed up as confirmed
 * client quotes. See data/testimonials.ts.
 */

const initials = (name: string): string =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('');

const Card: React.FC<{ item: Testimonial; index: number }> = ({ item, index }) => (
  <motion.figure
    className={`${styles.card} ${item.verified ? '' : styles.cardUnverified}`}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
  >
    <FaQuoteLeft className={styles.quoteMark} aria-hidden="true" />

    <blockquote className={styles.quote}>{item.quote}</blockquote>

    <figcaption className={styles.attribution}>
      {item.avatar ? (
        <img className={styles.avatar} src={item.avatar} alt="" width={44} height={44} loading="lazy" />
      ) : (
        <span className={styles.avatarFallback} aria-hidden="true">
          {initials(item.author)}
        </span>
      )}

      <span className={styles.who}>
        <span className={styles.author}>{item.author}</span>
        <span className={styles.role}>
          {item.role}
          {item.role && item.company ? ', ' : ''}
          {item.company}
        </span>
      </span>

      {item.verified && item.profileUrl && (
        <a
          className={styles.verifyLink}
          href={item.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${item.author}'s profile`}
        >
          <FaArrowUpRightFromSquare aria-hidden="true" />
        </a>
      )}
    </figcaption>

    {!item.verified && <p className={styles.pending}>Attribution pending</p>}
  </motion.figure>
);

const Testimonials: React.FC = () => {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section id="testimonials" className={styles.section} aria-labelledby="testimonials-heading">
      <div className={styles.header}>
        <p className={styles.eyebrow}>Social proof</p>
        <h2 id="testimonials-heading">What clients say</h2>
      </div>

      <div className={styles.grid}>
        {TESTIMONIALS.map((item, i) => (
          <Card key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
