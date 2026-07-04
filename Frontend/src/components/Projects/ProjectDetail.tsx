// ============================================================================
// PROJECT DETAIL PAGE - Elite Enterprise Project Showcase
// ============================================================================

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAllProjects } from '../../data/projects';
import styles from './ProjectDetail.module.css';

const ProjectDetail: React.FC = () => {
  // Get project ID from URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const project = getAllProjects().find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className={styles.notFound}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.notFoundContent}
        >
          <h1>Project Not Found</h1>
          <p>The project you're looking for doesn't exist.</p>
          <button onClick={() => window.location.href = '/#projects'} className={styles.backButton}>
            Back to Projects
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.container}
    >
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => window.location.href = '/#projects'}
        className={styles.backButton}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 4L4 10L10 16M4 10H16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to Projects
      </motion.button>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={styles.hero}
      >
        <div className={styles.heroContent}>
          {/* Category Badge */}
          <div className={styles.categoryBadge}>
            {project.category.join(' • ')}
          </div>

          {/* Title */}
          <h1 className={styles.title}>{project.title}</h1>

          {/* Subtitle */}
          <p className={styles.subtitle}>{project.subtitle}</p>

          {/* Tagline */}
          <p className={styles.tagline}>{project.tagline}</p>

          {/* Meta Info */}
          <div className={styles.metaInfo}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Role</span>
              <span className={styles.metaValue}>{project.role}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Timeline</span>
              <span className={styles.metaValue}>{project.timeline}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={styles.ctaButtons}>
            {project.links.live && (
              <motion.a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={styles.primaryButton}
              >
                <span>Live Demo</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8H13M13 8L9 4M13 8L9 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.a>
            )}
            {project.links.github && (
              <motion.a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={styles.secondaryButton}
              >
                <span>View Code</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 3V13M8 13L4 9M8 13L12 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.a>
            )}
          </div>
        </div>

        {/* Hero Image */}
        {project.images.hero && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.heroImage}
          >
            <img
              src={project.images.hero.url}
              alt={project.images.hero.alt}
              className={styles.heroImg}
            />
            {project.images.hero.caption && (
              <p className={styles.imageCaption}>{project.images.hero.caption}</p>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Content Sections */}
      <div className={styles.content}>
        {/* Overview */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.section}
        >
          <h2 className={styles.sectionTitle}>Overview</h2>
          <p className={styles.sectionText}>{project.overview}</p>
        </motion.section>

        {/* Challenge */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={styles.section}
        >
          <h2 className={styles.sectionTitle}>Challenge</h2>
          <p className={styles.sectionText}>{project.challenge}</p>
        </motion.section>

        {/* Solution */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={styles.section}
        >
          <h2 className={styles.sectionTitle}>Solution</h2>
          <p className={styles.sectionText}>{project.solution}</p>
        </motion.section>

        {/* Impact */}
        {project.impact && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={styles.section}
          >
            <h2 className={styles.sectionTitle}>Impact</h2>
            <p className={styles.sectionText}>{project.impact}</p>
          </motion.section>
        )}

        {/* Tech Stack */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={styles.section}
        >
          <h2 className={styles.sectionTitle}>Tech Stack</h2>
          <div className={styles.techStack}>
            {project.techStack.map((tech) => (
              <span key={tech} className={styles.techBadge}>
                {tech}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Tags */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className={styles.section}
        >
          <h2 className={styles.sectionTitle}>Tags</h2>
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Screenshots Gallery */}
        {project.images.screenshots && project.images.screenshots.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className={styles.section}
          >
            <h2 className={styles.sectionTitle}>Gallery</h2>
            <div className={styles.gallery}>
              {project.images.screenshots.map((screenshot, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={styles.galleryItem}
                >
                  <img
                    src={screenshot.url}
                    alt={screenshot.alt}
                    className={styles.galleryImage}
                  />
                  {screenshot.caption && (
                    <p className={styles.galleryCaption}>{screenshot.caption}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Stats */}
        {project.stats && project.stats.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className={styles.section}
          >
            <h2 className={styles.sectionTitle}>Key Metrics</h2>
            <div className={styles.statsGrid}>
              {project.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={styles.statCard}
                  style={{ borderColor: stat.color }}
                >
                  {stat.icon && (
                    <div className={styles.statIcon} style={{ color: stat.color }}>
                      {stat.icon}
                    </div>
                  )}
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className={styles.section}
          >
            <h2 className={styles.sectionTitle}>Key Features</h2>
            <ul className={styles.featuresList}>
              {project.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={styles.featureItem}
                >
                  <span className={styles.featureBullet}>•</span>
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.section>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
