// ============================================================================
// PROJECT CARD - Premium card with advanced 3D tilt and micro-interactions
// ============================================================================

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaShieldAlt } from 'react-icons/fa';
import { Project } from '../../types';
import { DURATIONS, EASING } from '../../utils/animations';
import { useInView } from '../../hooks/useInView';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, isInView } = useInView({ threshold: 0.2, triggerOnce: true });

  // Merge refs
  const setRefs = (element: HTMLDivElement | null) => {
    cardRef.current = element;
    (inViewRef as React.MutableRefObject<HTMLDivElement | null>).current = element;
  };

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Keyboard accessibility
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.article
      ref={setRefs}
      className={`${styles.card} ${project.isMajor ? styles.majorCard : ''} ${
        isInView ? styles.visible : ''
      }`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: DURATIONS.slow,
        delay: index * 0.1,
        ease: EASING.easeOut,
      }}
      whileHover={{
        scale: 1.02,
        y: -4,
        transition: { duration: DURATIONS.normal },
      }}
    >
      {/* Image Container */}
      <div className={styles.imageContainer} style={{ transform: "translateZ(20px)" }}>
        <motion.img
          src={project.images.thumbnail.url}
          alt={project.images.thumbnail.alt}
          className={styles.image}
          loading="lazy"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: DURATIONS.slow }}
        />
        <div className={styles.overlay} />

        {/* Quick Action Buttons */}
        <div className={styles.quickActions}>
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.quickAction}
              onClick={(e) => e.stopPropagation()}
              aria-label="View live demo"
            >
              <FaExternalLinkAlt />
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.quickAction}
              onClick={(e) => e.stopPropagation()}
              aria-label="View source code"
            >
              <FaGithub />
            </a>
          )}
          {project.isNDA && (
            <div className={styles.ndaBadge} title="Enterprise NDA Protected">
              <FaShieldAlt />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className={styles.content} style={{ transform: "translateZ(50px)" }}>
        {/* Category Tags */}
        <div className={styles.categories}>
          {project.category.slice(0, 2).map((cat) => (
            <span key={cat} className={styles.category}>
              {cat}
            </span>
          ))}
        </div>

        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.subtitle}>{project.subtitle}</p>
        <p className={styles.description}>{project.description}</p>

        {/* Tech Stack */}
        <div className={styles.techStack}>
          {project.techStack.slice(0, 3).map((tech) => (
            <span key={tech} className={styles.techTag}>
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className={styles.techTag}>+{project.techStack.length - 3}</span>
          )}
        </div>

        {/* Stats Preview (for major projects) */}
        {project.stats && project.isMajor && (
          <div className={styles.statsPreview}>
            {project.stats.slice(0, 2).map((stat, idx) => (
              <div key={idx} className={styles.stat}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
};
