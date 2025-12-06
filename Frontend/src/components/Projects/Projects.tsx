// ============================================================================
// PROJECTS SECTION - Revolutionary enterprise showcase
// ============================================================================

import React from 'react';
import { FeaturedProject } from './FeaturedProject';
import { MinorProjectsCarousel } from './MinorProjectsCarousel';
import { getAllProjects } from '../../data/projects';
import styles from './Projects.module.css';

const Projects: React.FC = () => {
  const allProjects = getAllProjects();

  // Split projects into featured (major) and minor
  const featuredProjects = allProjects.filter((p) => p.isMajor).slice(0, 2);
  const minorProjects = allProjects.filter((p) => !p.isMajor);

  return (
    <div id="projects" className={styles.projectsWrapper}>
      {/* Featured Projects - Full Screen Alternating */}
      {featuredProjects.map((project, index) => (
        <FeaturedProject
          key={project.id}
          project={project}
          layout={index % 2 === 0 ? 'image-right' : 'image-left'}
          index={index}
        />
      ))}

      {/* Minor Projects - Horizontal Carousel */}
      {minorProjects.length > 0 && <MinorProjectsCarousel projects={minorProjects} />}
    </div>
  );
};

export default Projects;
