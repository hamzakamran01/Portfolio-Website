// ============================================================================
// UNIFIED PROJECTS GRID - Elite Enterprise Portfolio Showcase
// ============================================================================

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllProjects } from '../../data/projects';
import styles from './UnifiedProjectsGrid.module.css';

// Category filter options
const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Applications' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'enterprise', label: 'Enterprise' },
] as const;

const UnifiedProjectsGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const allProjects = getAllProjects();

  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return allProjects;
    return allProjects.filter((project) =>
      project.category.some((cat) => cat.toLowerCase().includes(selectedCategory))
    );
  }, [selectedCategory, allProjects]);

  // Get project count per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allProjects.length };
    CATEGORIES.slice(1).forEach((cat) => {
      counts[cat.id] = allProjects.filter((project) =>
        project.category.some((c) => c.toLowerCase().includes(cat.id))
      ).length;
    });
    return counts;
  }, [allProjects]);

  return (
    <section id="projects" className={styles.section}>
      {/* Section Header */}
      <div className={styles.header}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.headerContent}
        >
          <div className={styles.eyebrow}>Portfolio</div>
          <h2 className={styles.title}>Selected Work</h2>
          <p className={styles.subtitle}>
            Enterprise-grade solutions built for scale, precision, and impact
          </p>
        </motion.div>
      </div>

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={styles.filters}
      >
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`${styles.filterButton} ${selectedCategory === category.id ? styles.filterButtonActive : ''
              }`}
          >
            {category.label}
            <span className={styles.filterCount}>
              {categoryCounts[category.id]}
            </span>
          </button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        layout
        className={styles.grid}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                layout: { duration: 0.3 }
              }}
              className={styles.card}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Card Image */}
              <div className={styles.cardImage}>
                <div className={styles.imageWrapper}>
                  {project.images.thumbnail ? (
                    <img
                      src={project.images.thumbnail.url}
                      alt={project.images.thumbnail.alt}
                      className={styles.image}
                      loading="lazy"
                    />
                  ) : (
                    <div className={styles.placeholderImage}>
                      <span className={styles.placeholderText}>{project.title}</span>
                    </div>
                  )}
                  <div className={styles.imageOverlay} />
                </div>

                {/* Category Badge */}
                <div className={styles.categoryBadge}>
                  {project.category[0]}
                </div>
              </div>

              {/* Card Content */}
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.cardSubtitle}>{project.subtitle}</p>
                </div>

                <p className={styles.cardDescription}>
                  {project.description}
                </p>

                {/* Tech Stack Tags */}
                <div className={styles.techStack}>
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className={styles.techTag}>
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className={styles.cardActions}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={styles.viewButton}
                    onClick={() => {
                      // Navigate to project detail page using query parameter
                      window.location.href = `/project-detail.html?id=${project.id}`;
                    }}
                  >
                    <span>View Details</span>
                    <svg
                      className={styles.arrowIcon}
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
                  </motion.button>

                  {project.links?.live && (
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={styles.demoButton}
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Live Demo</span>
                      <svg
                        className={styles.demoIcon}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" />
                        <path d="M15.5 12L9.5 8.5V15.5L15.5 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Hover Glow Effect */}
              <motion.div
                className={styles.hoverGlow}
                animate={{
                  opacity: hoveredProject === project.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No Results State */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={styles.noResults}
        >
          <p>No projects found in this category.</p>
        </motion.div>
      )}
    </section>
  );
};

export default UnifiedProjectsGrid;
