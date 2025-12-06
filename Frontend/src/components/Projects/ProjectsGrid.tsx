// ============================================================================
// PROJECTS GRID - Revolutionary grid layout with advanced animations
// ============================================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { Project } from '../../types';
import { VARIANTS } from '../../utils/animations';
import { useInView } from '../../hooks/useInView';
import styles from './ProjectsGrid.module.css';

interface ProjectsGridProps {
  projects: Project[];
  showAll?: boolean;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects, showAll = true }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  const displayedProjects = showAll ? projects : projects.filter((p) => p.isFeatured);

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  // Keyboard accessibility for modal
  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && selectedProject) {
      handleCloseModal();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [selectedProject]);

  return (
    <>
      <motion.div
        ref={ref}
        className={styles.grid}
        variants={VARIANTS.container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        role="list"
        aria-label="Featured projects grid"
      >
        {displayedProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onClick={() => handleCardClick(project)}
          />
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </>
  );
};
