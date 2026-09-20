import { motion } from 'framer-motion';
import styles from './SectionHeader.module.css';

/**
 * Shared section header.
 *
 * The site's established language (Selected Work, Technical Expertise) is a
 * centred eyebrow pill + gradient-clipped display title + centred subtitle.
 * The sections added in this pass were written with plain left-aligned text,
 * which read as unstyled scaffolding next to everything around them. This
 * component is the single definition so they cannot drift again.
 */
interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** id for aria-labelledby on the parent <section> */
  id: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ eyebrow, title, subtitle, id }) => (
  <motion.div
    className={styles.header}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-100px' }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
  >
    <span className={styles.eyebrow}>
      <span className={styles.eyebrowDot} aria-hidden="true" />
      {eyebrow}
    </span>

    <h2 id={id} className={styles.title}>
      {title}
    </h2>

    <span className={styles.rule} aria-hidden="true" />

    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
  </motion.div>
);

export default SectionHeader;
