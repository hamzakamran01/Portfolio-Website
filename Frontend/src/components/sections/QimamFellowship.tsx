import React, { useEffect, useRef } from 'react';
import styles from './QimamFellowship.module.css';

const QimamFellowship: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add(styles.inView);
        } else {
          section.classList.remove(styles.inView);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="qimam-fellowship" className={styles.qimamFellowship} ref={sectionRef}>
      <div className={styles.fellowshipHeader}>
        <h2>Qimam Fellowship</h2>
        <p className={styles.subtitle}>International Leadership Program</p>
      </div>

      <div className={styles.fellowshipContent}>
        <div className={styles.fellowshipImage}>
          <img
            src="/assets/awardpic.jpg"
            alt="Qimam Fellowship Award"
            className={styles.awardImage}
            loading="lazy"
          />
          <div className={styles.imageOverlay}>
            <div className={styles.successRate}>
              <span className={styles.rateNumber}>0.3%</span>
              <span className={styles.rateText}>Success Rate</span>
            </div>
          </div>
        </div>

        <div className={styles.fellowshipDetails}>
          <div className={styles.selectionHighlight}>
            <h3>Prestigious Selection</h3>
            <p>
              Selected as one of  <strong> only 38 </strong> students across Pakistan from
              <strong> 11,000+ applicants</strong> in the Qimam Fellowship - an international
              program designed to empower high-potential leaders.
            </p>
          </div>

          <div className={styles.experienceHighlights}>
            <h3>Transformative Experience</h3>

            <div className={styles.highlightItem}>
              <div className={styles.highlightIcon}>🏢</div>
              <div className={styles.highlightContent}>
                <h4>Corporate Leadership</h4>
                <p>Visited one of the top 6 companies contributing to Pakistan's economy</p>
              </div>
            </div>

            <div className={styles.highlightItem}>
              <div className={styles.highlightIcon}>🤝</div>
              <div className={styles.highlightContent}>
                <h4>Network Building</h4>
                <p>Connected with <strong>50+ </strong> corporate leaders and had one-on-one interactions with <strong>20+ </strong>top leaders and CEOs </p>
              </div>
            </div>

            <div className={styles.highlightItem}>
              <div className={styles.highlightIcon}>💡</div>
              <div className={styles.highlightContent}>
                <h4>Leadership Development</h4>
                <p>Attended transformative workshops on self-awareness and startup funding</p>
              </div>
            </div>
          </div>

          <div className={styles.impact}>
            <h3>Lifelong Impact</h3>
            <p>
              This fellowship redefined my understanding of leadership, realigned my goals,
              and fueled my drive for social impact. It's where leaders meet dreamers,
              and where vision transforms into action.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QimamFellowship; 