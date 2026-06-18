import React, { useEffect, useRef } from 'react';
import ReactLogo3D from '../3d/ReactLogo3D';
import { gsap } from 'gsap';
import styles from './HeroSection.module.css';

const LinkedInIcon = '/assets/linkedin.svg';

const Hero: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(textRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' });
  }, []);

  return (
    <section id="hero" className={styles.hero} aria-label="Introduction">
      <ReactLogo3D />
      <div className={styles.heroInner}>
        <div ref={textRef} className={styles.heroContent}>
          <h1>
            <span>Hi, I&apos;m</span> Hamza Kamran
          </h1>
          <h2>Engineering AI-Powered Enterprise Solutions</h2>
          <div className={styles.heroCta}>
            <a href="#projects" className={styles.ctaButton}>
              Explore My Work
            </a>
            <a href="#contact" className={`${styles.ctaButton} ${styles.secondary}`}>
              Get in Touch
            </a>
          </div>
          <div className={styles.heroSocials}>
            <a
              href="https://www.linkedin.com/in/hamza-kamran-7b1a85294/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <img src={LinkedInIcon} alt="" className={styles.socialIcon} aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
            <a href="mailto:hamzakamran843@gmail.com" className={styles.socialLink}>
              <span className={`${styles.socialIcon} ${styles.emailIcon}`} aria-hidden="true">
                ✉️
              </span>
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;