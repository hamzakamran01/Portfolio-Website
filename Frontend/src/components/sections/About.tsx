import React, { useEffect, useRef, useState, useCallback, lazy, Suspense } from 'react';
import { motion, Variants, useReducedMotion } from 'framer-motion';

// three + @react-three (~1 MB) load as an async chunk, not on first paint.
const AboutCanvas = lazy(() => import('../3d/AboutCanvas'));
import styles from './About.module.css';

const profileImage = '/assets/potrait1.jpg';

interface Stat {
  value: number;
  label: string;
  suffix: string;
}

const STATS: Stat[] = [
  { value: 2, label: 'Years of Experience', suffix: '+' },
  { value: 15, label: 'Enterprise Solutions Delivered', suffix: '+' },
  { value: 70, label: 'Avg. Efficiency Gain', suffix: '%' }
];

const ANIMATION_CONFIG = {
  duration: 1500,
  stepTime: 20,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

const About: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const hasAnimated = useRef(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.2 });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [handleIntersection]);

  const animateNumber = useCallback((element: Element, targetValue: number, suffix: string) => {
    let current = 0;
    const increment = targetValue / (ANIMATION_CONFIG.duration / ANIMATION_CONFIG.stepTime);

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        current = targetValue;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current).toString() + suffix;
    }, ANIMATION_CONFIG.stepTime);

    return timer;
  }, []);

  useEffect(() => {
    const statsSection = statsRef.current;
    if (!statsSection) return;

    const statsElements = statsSection.querySelectorAll(`.${styles.stat} h3`);
    const timers: NodeJS.Timeout[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // Counters run once. Previously every scroll-out reset them to a bare
        // "0" (no suffix) and every scroll-in replayed the whole count-up.
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          statsElements.forEach((el, index) => {
            const timer = animateNumber(el, STATS[index].value, STATS[index].suffix);
            timers.push(timer);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(statsSection);
    return () => {
      observer.disconnect();
      timers.forEach(timer => clearInterval(timer));
    };
  }, [animateNumber]);


  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        About Me
      </motion.h2>

      <div className={styles.modelContainer} aria-hidden="true">
        {isVisible && !prefersReducedMotion && (
          <Suspense fallback={null}>
            <AboutCanvas />
          </Suspense>
        )}
      </div>

      <motion.div
        className={styles.aboutContent}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <motion.div className={styles.aboutText} variants={itemVariants}>
          <motion.p variants={itemVariants}>
            I'm Hamza Kamran, an enterprise web developer and solutions architect specializing in
            scalable architectures and AI-powered automation. With 2+ years of experience, I design
            and build intelligent automation workflows that streamline operations for SMEs, reducing
            manual workload by up to 70% while accelerating growth.
          </motion.p>
          <motion.p variants={itemVariants}>
            My expertise spans end-to-end solution architecture—from enterprise React applications
            to sophisticated AI automation pipelines using modern frameworks. I transform complex
            business challenges into elegant, automated systems that deliver measurable ROI. When
            I'm not architecting solutions, you can find me exploring literature and politics.
          </motion.p>
          <motion.div className={styles.aboutStats} ref={statsRef} variants={itemVariants}>
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                className={styles.stat}
                whileHover={{ scale: 1.05 }}
              >
                <h3>0</h3>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.profileImageContainer}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <img
            src={profileImage}
            alt="Hamza Kamran"
            className={styles.profileImage}
            loading="lazy"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;