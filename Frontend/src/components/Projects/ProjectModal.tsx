// ============================================================================
// PROJECT MODAL - Enhanced modal with image gallery and smooth transitions
// ============================================================================

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FaTimes,
  FaExternalLinkAlt,
  FaGithub,
  FaChevronLeft,
  FaChevronRight,
  FaShieldAlt,
} from 'react-icons/fa';
import { Project } from '../../types';
import { VARIANTS, DURATIONS } from '../../utils/animations';
import styles from './ProjectModal.module.css';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const allImages = [project.images.hero, ...project.images.screenshots];

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    // Focus trap
    modalContentRef.current?.focus();

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') onClose();
  };

  const currentImage = allImages[currentImageIndex];

  return (
    <motion.div
      className={styles.overlay}
      variants={VARIANTS.fade}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        ref={modalContentRef}
        className={styles.modal}
        variants={VARIANTS.scale}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        {/* Close Button */}
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          <FaTimes />
        </button>

        {/* Image Gallery Section */}
        <div className={styles.imageSection}>
          <div className={styles.imageContainer}>
            <motion.img
              key={currentImageIndex}
              src={currentImage.url}
              alt={currentImage.alt}
              className={styles.image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: DURATIONS.normal }}
            />
            <div className={styles.imageGradient} />

            {/* Gallery Navigation */}
            {allImages.length > 1 && (
              <>
                <button
                  className={`${styles.navButton} ${styles.navButtonPrev}`}
                  onClick={prevImage}
                  aria-label="Previous image"
                  type="button"
                >
                  <FaChevronLeft />
                </button>
                <button
                  className={`${styles.navButton} ${styles.navButtonNext}`}
                  onClick={nextImage}
                  aria-label="Next image"
                  type="button"
                >
                  <FaChevronRight />
                </button>

                {/* Image Counter */}
                <div className={styles.imageCounter}>
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              </>
            )}
          </div>

          {/* Image Caption */}
          {currentImage.caption && (
            <div className={styles.imageCaption}>{currentImage.caption}</div>
          )}

          {/* Thumbnail Gallery */}
          {allImages.length > 1 && (
            <div className={styles.thumbnails}>
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  className={`${styles.thumbnail} ${
                    idx === currentImageIndex ? styles.thumbnailActive : ''
                  }`}
                  onClick={() => setCurrentImageIndex(idx)}
                  aria-label={`View image ${idx + 1}`}
                  type="button"
                >
                  <img src={img.url} alt={img.alt} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className={styles.content}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerTop}>
              <div>
                <h2 id="modal-title" className={styles.title}>
                  {project.title}
                </h2>
                <p className={styles.subtitle}>{project.subtitle}</p>
                {project.tagline && <p className={styles.tagline}>{project.tagline}</p>}
              </div>

              {/* Meta Info */}
              <div className={styles.meta}>
                {project.role && <div className={styles.metaItem}>{project.role}</div>}
                {project.timeline && <div className={styles.metaItem}>{project.timeline}</div>}
              </div>
            </div>

            {/* Categories */}
            <div className={styles.categories}>
              {project.category.map((cat) => (
                <span key={cat} className={styles.categoryBadge}>
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className={styles.body}>
            <div className={styles.mainContent}>
              {/* Overview */}
              <section className={styles.section}>
                <h3>Overview</h3>
                <p>{project.overview || project.longDescription}</p>
              </section>

              {/* Challenge */}
              {project.challenge && (
                <section className={styles.section}>
                  <h3>Challenge</h3>
                  <p>{project.challenge}</p>
                </section>
              )}

              {/* Solution */}
              {project.solution && (
                <section className={styles.section}>
                  <h3>Solution</h3>
                  <p>{project.solution}</p>
                </section>
              )}

              {/* Impact */}
              {project.impact && (
                <section className={styles.section}>
                  <h3>Impact</h3>
                  <p>{project.impact}</p>
                </section>
              )}

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <section className={styles.section}>
                  <h3>Key Features</h3>
                  <ul className={styles.featureList}>
                    {project.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className={styles.sidebar}>
              {/* Stats */}
              {project.stats && project.stats.length > 0 && (
                <div className={styles.statsGrid}>
                  {project.stats.map((stat, idx) => (
                    <div key={idx} className={styles.statCard}>
                      <div className={styles.statIcon}>{stat.icon}</div>
                      <div className={styles.statValue}>{stat.value}</div>
                      <div className={styles.statLabel}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Technologies */}
              <div className={styles.techSection}>
                <h3>Technologies</h3>
                <div className={styles.techStack}>
                  {project.techStack.map((tech) => (
                    <span key={tech} className={styles.techBadge}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className={styles.linksSection}>
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkButton}
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.linkButton} ${styles.secondaryLink}`}
                  >
                    <FaGithub /> View Code
                  </a>
                )}
                {project.isNDA && (
                  <div className={styles.ndaBadge}>
                    <FaShieldAlt /> Enterprise NDA Protected
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
