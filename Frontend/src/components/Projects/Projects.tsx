// ============================================================================
// PROJECTS SECTION - Revolutionary enterprise showcase
// ============================================================================

import React from 'react';
import { FeaturedProject } from './FeaturedProject';
import { MinorProjectsCarousel } from './MinorProjectsCarousel';
import { getAllProjects } from '../../data/projects';
import { Project } from '../../types';
import styles from './Projects.module.css';

/** Featured slot 1: AI HealthDost · slot 2: US client · slot 3: AI-powered enterprise analytics */
const FEATURED_PROJECT_IDS = ['ai-health-dost', 'united-by-art', 'digiqms'] as const;
const FEATURED_BADGES: Record<(typeof FEATURED_PROJECT_IDS)[number], string> = {
  'ai-health-dost': 'AI-Powered',
  'united-by-art': 'US Enterprise Client',
  digiqms: 'AI-Powered',
};

const Projects: React.FC = () => {
  const allProjects = getAllProjects();

  const featuredProjects = FEATURED_PROJECT_IDS.map((id) =>
    allProjects.find((p) => p.id === id)
  ).filter((p): p is Project => Boolean(p));

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
          featuredBadge={FEATURED_BADGES[project.id as keyof typeof FEATURED_BADGES]}
        />
      ))}

      {/* Minor Projects - Horizontal Carousel */}
      {minorProjects.length > 0 && <MinorProjectsCarousel projects={minorProjects} />}
    </div>
  );
};

export default Projects;
