// ============================================================================
// MINOR PROJECTS CAROUSEL - Horizontal scrolling showcase
// ============================================================================

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Project } from '../../types';
import { useInView } from '../../hooks/useInView';
import { VARIANTS } from '../../utils/animations';
import styles from './MinorProjectsCarousel.module.css';

interface MinorProjectsCarouselProps {
  projects: Project[];
}

export const MinorProjectsCarousel: React.FC<MinorProjectsCarouselProps> = ({ projects }) => {
  const { ref, isInView } = useInView({ threshold: 0.2, triggerOnce: true });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section ref={ref} className={styles.section} aria-label="More projects">
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          variants={VARIANTS.fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className={styles.title}>More Projects</h2>
          <p className={styles.description}>Additional work showcasing diverse skills and technologies</p>
        </motion.div>

        {/* Carousel Controls */}
        <div className={styles.controls}>
          <button
            className={styles.controlButton}
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            type="button"
          >
            <FaChevronLeft />
          </button>
          <button
            className={styles.controlButton}
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            type="button"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Scrollable Container */}
        <motion.div
          ref={scrollContainerRef}
          className={styles.scrollContainer}
          variants={VARIANTS.container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className={styles.card}
              variants={VARIANTS.item}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              {/* Image */}
              <div className={styles.imageWrapper}>
                <img
                  src={project.images.thumbnail.url}
                  alt={project.images.thumbnail.alt}
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.imageOverlay} />
              </div>

              {/* Content */}
              <div className={styles.cardContent}>
                {/* Categories */}
                <div className={styles.categories}>
                  {project.category.slice(0, 2).map((cat) => (
                    <span key={cat} className={styles.category}>
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className={styles.cardTitle}>{project.title}</h3>

                {/* Description */}
                <p className={styles.cardDescription}>{project.description}</p>

                {/* Tech Stack */}
                <div className={styles.techStack}>
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className={styles.tech}>
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className={styles.tech}>+{project.techStack.length - 4}</span>
                  )}
                </div>

                {/* Stats (if available) */}
                {project.stats && project.stats.length > 0 && (
                  <div className={styles.stats}>
                    {project.stats.slice(0, 2).map((stat, idx) => (
                      <div key={idx} className={styles.stat}>
                        <span className={styles.statValue}>{stat.value}</span>
                        <span className={styles.statLabel}>{stat.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className={styles.actions}>
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.actionButton}
                      aria-label={`View ${project.title} live demo`}
                    >
                      <FaExternalLinkAlt />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.actionButton}
                      aria-label={`View ${project.title} source code`}
                    >
                      <FaGithub />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <div className={styles.scrollIndicator}>
          <span>Scroll to explore more</span>
          <div className={styles.scrollLine} />
        </div>
      </div>
    </section>
  );
};
