// ============================================================================
// FEATURED PROJECT - Full-screen alternating layout for major projects
// ============================================================================

import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaShieldAlt } from 'react-icons/fa';
import { Project } from '../../types';
import { useInView } from '../../hooks/useInView';
import { VARIANTS } from '../../utils/animations';
import { ModernImageGrid } from './ModernImageGrid';
import styles from './FeaturedProject.module.css';

interface FeaturedProjectProps {
  project: Project;
  layout: 'image-right' | 'image-left';
  index: number;
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({ project, layout, index }) => {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  // Ensure images array is valid
  const allImages = project.images?.screenshots
    ? [project.images.hero, ...project.images.screenshots]
    : [project.images.hero];

  return (
    <section
      ref={ref}
      className={`${styles.section} ${layout === 'image-left' ? styles.reverse : ''}`}
      aria-labelledby={`project-${project.id}`}
    >
      <div className={styles.container}>
        {/* Content Panel */}
        <motion.div
          className={styles.content}
          variants={VARIANTS.slideUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.2 }}
        >
          {/* Project Number */}
          <div className={styles.projectNumber}>
            <span className={styles.numberLabel}>Featured Project</span>
            <span className={styles.number}>0{index + 1}</span>
          </div>

          {/* Category Tags */}
          <div className={styles.categories}>
            {project.category.map((cat) => (
              <span key={cat} className={styles.category}>
                {cat}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2 id={`project-${project.id}`} className={styles.title}>
            {project.title}
          </h2>

          {/* Subtitle */}
          <p className={styles.subtitle}>{project.subtitle}</p>

          {/* Divider */}
          <div className={styles.divider} />

          {/* Description */}
          <div className={styles.description}>
            <h3>Overview</h3>
            <p>{project.overview || project.longDescription}</p>
          </div>

          {/* Challenge & Solution */}
          {project.challenge && (
            <div className={styles.description}>
              <h3>Challenge</h3>
              <p>{project.challenge}</p>
            </div>
          )}

          {project.solution && (
            <div className={styles.description}>
              <h3>Solution</h3>
              <p>{project.solution}</p>
            </div>
          )}

          {/* Stats */}
          {project.stats && project.stats.length > 0 && (
            <div className={styles.stats}>
              {project.stats.map((stat, idx) => (
                <div key={idx} className={styles.stat}>
                  <div className={styles.statIcon}>{stat.icon}</div>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack */}
          <div className={styles.techSection}>
            <h4>Technologies</h4>
            <div className={styles.techStack}>
              {project.techStack.map((tech) => (
                <span key={tech} className={styles.tech}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryButton}
              >
                <FaExternalLinkAlt /> View Live
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryButton}
              >
                <FaGithub /> Source Code
              </a>
            )}
            {project.isNDA && (
              <div className={styles.ndaBadge}>
                <FaShieldAlt /> NDA Protected
              </div>
            )}
          </div>
        </motion.div>

        {/* Image Panel - Modern Grid */}
        <motion.div
          className={styles.imagePanel}
          variants={VARIANTS.scale}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.4 }}
        >
          <ModernImageGrid images={allImages} projectTitle={project.title} />
        </motion.div>
      </div>
    </section>
  );
};
