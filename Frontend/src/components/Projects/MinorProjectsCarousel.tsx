// ============================================================================
// INNOVATION LAB — Premium horizontal showcase + engineering catalog
// ============================================================================

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Project } from '../../types';
import { useInView } from '../../hooks/useInView';
import { VARIANTS } from '../../utils/animations';
import styles from './MinorProjectsCarousel.module.css';

interface MinorProjectsCarouselProps {
  projects: Project[];
}

const SPOTLIGHT_COUNT = 4;

const ACCENT_BY_ID: Record<string, string> = {
  gigledger: '#10B981',
  haqyab: '#8B5CF6',
  rxflow: '#00E7FF',
  'medicenter-ai': '#F59E0B',
};

const getAccent = (id: string): string => ACCENT_BY_ID[id] ?? '#00E7FF';

interface ProjectCardProps {
  project: Project;
  index: number;
  variant: 'spotlight' | 'catalog';
  displayIndex?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  variant,
  displayIndex,
}) => {
  const accent = getAccent(project.id);
  const stats = project.stats?.slice(0, variant === 'spotlight' ? 3 : 2) ?? [];
  const cardClass =
    variant === 'spotlight' ? styles.spotlightCard : styles.catalogCard;

  return (
    <motion.article
      className={cardClass}
      variants={VARIANTS.item}
      transition={{ delay: index * 0.08 }}
      style={{ '--card-accent': accent } as React.CSSProperties}
    >
      <div className={styles.cardGlow} aria-hidden="true" />

      <div className={styles.imageWrapper}>
        <img
          src={project.images.thumbnail.url}
          alt={project.images.thumbnail.alt}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.imageMesh} aria-hidden="true" />
        <div className={styles.imageOverlay} />

        {variant === 'spotlight' && displayIndex !== undefined && (
          <span className={styles.indexBadge}>
            <span className={styles.indexLabel}>Build</span>
            <span className={styles.indexNumber}>
              {String(displayIndex + 1).padStart(2, '0')}
            </span>
          </span>
        )}

        {project.tagline && (
          <p className={styles.tagline}>{project.tagline}</p>
        )}
      </div>

      <div className={styles.cardContent}>
        <div className={styles.categories}>
          {project.category.slice(0, 2).map((cat) => (
            <span key={cat} className={styles.category}>
              {cat}
            </span>
          ))}
        </div>

        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardSubtitle}>{project.subtitle}</p>
        <p className={styles.cardDescription}>{project.description}</p>

        {stats.length > 0 && (
          <div
            className={
              variant === 'spotlight' ? styles.statsSpotlight : styles.stats
            }
          >
            {stats.map((stat, idx) => (
              <div key={idx} className={styles.stat}>
                {stat.icon && (
                  <span
                    className={styles.statIcon}
                    style={{ color: stat.color ?? accent }}
                  >
                    {stat.icon}
                  </span>
                )}
                <span
                  className={styles.statValue}
                  style={{ color: stat.color ?? accent }}
                >
                  {stat.value}
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className={styles.techStack}>
          {project.techStack.slice(0, variant === 'spotlight' ? 5 : 4).map((tech) => (
            <span key={tech} className={styles.tech}>
              {tech}
            </span>
          ))}
          {project.techStack.length > (variant === 'spotlight' ? 5 : 4) && (
            <span className={styles.tech}>
              +{project.techStack.length - (variant === 'spotlight' ? 5 : 4)}
            </span>
          )}
        </div>

        {(project.links.live || project.links.github) && (
          <div className={styles.actions}>
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionPrimary}
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
                className={styles.actionSecondary}
                aria-label={`View ${project.title} source code`}
              >
                <FaGithub />
                <span>Source</span>
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
};

export const MinorProjectsCarousel: React.FC<MinorProjectsCarouselProps> = ({
  projects,
}) => {
  const { ref, isInView } = useInView({ threshold: 0.15, triggerOnce: true });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const spotlightProjects = projects.slice(0, SPOTLIGHT_COUNT);
  const catalogProjects = projects.slice(SPOTLIGHT_COUNT);

  const updateScrollProgress = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollProgress();
    el.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress);
    return () => {
      el.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, [updateScrollProgress, spotlightProjects.length]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(`[data-card]`);
    const amount = card ? card.offsetWidth + 24 : 440;
    el.scrollBy({
      left: direction === 'right' ? amount : -amount,
      behavior: 'smooth',
    });
  };

  return (
    <section ref={ref} className={styles.section} aria-label="Innovation lab projects">
      <div className={styles.gridBg} aria-hidden="true" />
      <div className={styles.orbCyan} aria-hidden="true" />
      <div className={styles.orbViolet} aria-hidden="true" />

      <div className={styles.container}>
        <motion.header
          className={styles.header}
          variants={VARIANTS.fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <span className={styles.eyebrow}>Innovation Lab</span>
          <h2 className={styles.title}>AI &amp; Enterprise Systems</h2>
          <p className={styles.description}>
            Production-grade architectures across FinTech, Legal AI, HIPAA healthcare,
            and intelligent automation — engineered for scale, compliance, and real-world impact.
          </p>
        </motion.header>

        <div className={styles.scrollerShell}>
          <div className={styles.fadeLeft} aria-hidden="true" />
          <div className={styles.fadeRight} aria-hidden="true" />

          <button
            type="button"
            className={`${styles.controlArrow} ${styles.leftArrow}`}
            onClick={() => scroll('left')}
            aria-label="Scroll innovation lab left"
          >
            <FaChevronLeft />
          </button>

          <motion.div
            ref={scrollRef}
            className={styles.scrollContainer}
            variants={VARIANTS.container}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {spotlightProjects.map((project, index) => (
              <div key={project.id} data-card className={styles.cardSnap}>
                <ProjectCard
                  project={project}
                  index={index}
                  variant="spotlight"
                  displayIndex={index}
                />
              </div>
            ))}
          </motion.div>

          <button
            type="button"
            className={`${styles.controlArrow} ${styles.rightArrow}`}
            onClick={() => scroll('right')}
            aria-label="Scroll innovation lab right"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className={styles.progressTrack} aria-hidden="true">
          <div
            className={styles.progressFill}
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>

        <p className={styles.scrollHint}>
          <span className={styles.scrollHintDot} />
          Drag or use arrows to explore flagship builds
        </p>

        {catalogProjects.length > 0 && (
          <div className={styles.catalogSection}>
            <motion.div
              className={styles.catalogHeader}
              variants={VARIANTS.fadeInUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <span className={styles.catalogEyebrow}>Engineering Depth</span>
              <h3 className={styles.catalogTitle}>Interactive &amp; Product Systems</h3>
              <p className={styles.catalogDescription}>
                Immersive 3D commerce, high-performance agency experiences, and
                experimental interfaces that prove full-stack craft.
              </p>
            </motion.div>

            <motion.div
              className={styles.catalogGrid}
              variants={VARIANTS.container}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {catalogProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  variant="catalog"
                />
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};
