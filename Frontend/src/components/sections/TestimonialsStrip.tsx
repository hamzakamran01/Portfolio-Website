import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { VARIANTS } from '../../utils/animations';
import styles from './TestimonialsStrip.module.css';

const TESTIMONIALS = [
  {
    quote:
      "Hamza delivered enterprise-grade architecture with clear communication and strong execution. The platform exceeded our operational expectations.",
    author: 'Technology Partner',
    role: 'Enterprise Stakeholder',
    company: 'US Client Engagement',
  },
  {
    quote:
      "His full-stack and AI implementation work transformed our digital presence. Professional, fast, and deeply technical when it matters.",
    author: 'Tech Lead',
    role: 'Engineering',
    company: 'Zaaric',
  },
  {
    quote:
      "The product experience was modern, performant, and conversion-focused. Exactly what we needed to scale our online business.",
    author: 'Sarah',
    role: 'Founder',
    company: 'E-Commerce Client',
  },
];

const TestimonialsStrip: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="testimonials" ref={ref} className={styles.section} aria-labelledby="testimonials-heading">
      <div className={styles.container}>
        <motion.header
          className={styles.header}
          variants={VARIANTS.fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <span className={styles.eyebrow}>Social Proof</span>
          <h2 id="testimonials-heading">Trusted by Builders &amp; Clients</h2>
          <p>Feedback from enterprise delivery, founder-led builds, and product partnerships.</p>
        </motion.header>

        <motion.div
          className={styles.grid}
          variants={VARIANTS.container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {TESTIMONIALS.map((item) => (
            <motion.blockquote
              key={item.company}
              className={styles.card}
              variants={VARIANTS.item}
            >
              <p className={styles.quote}>&ldquo;{item.quote}&rdquo;</p>
              <footer className={styles.footer}>
                <cite className={styles.author}>{item.author}</cite>
                <span className={styles.meta}>
                  {item.role} · {item.company}
                </span>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsStrip;
