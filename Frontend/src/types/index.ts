// ============================================================================
// TYPE DEFINITIONS - Enterprise Portfolio
// ============================================================================

import { ReactNode } from 'react';

/**
 * Project statistics/metrics displayed in project cards and modals
 */
export interface ProjectStat {
  label: string;
  value: string;
  icon: ReactNode;
  color?: string;
}

/**
 * Project image assets with support for multiple formats
 */
export interface ProjectImage {
  url: string;
  alt: string;
  caption?: string;
  webp?: string; // WebP version for performance
}

/**
 * Project gallery containing multiple images/screenshots
 */
export interface ProjectGallery {
  thumbnail: ProjectImage;
  hero: ProjectImage;
  screenshots: ProjectImage[];
}

/**
 * Project links (demo, repository, case study)
 */
export interface ProjectLinks {
  live?: string;
  github?: string;
  casestudy?: string;
}

/**
 * Comprehensive project data structure
 */
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline?: string;
  description: string; // Short description for card
  longDescription: string; // Detailed description for modal/detail page
  overview?: string; // Additional context
  challenge?: string; // Problem being solved
  solution?: string; // How it was solved
  impact?: string; // Results and outcomes
  role?: string; // Your role in the project
  timeline?: string; // Project duration

  techStack: string[];
  category: string[]; // e.g., ["Web App", "Enterprise", "3D"]
  tags: string[]; // Additional tags for filtering

  images: ProjectGallery;
  video?: string; // Optional video URL

  links: ProjectLinks;

  stats?: ProjectStat[];
  features?: string[];

  isFeatured: boolean; // Display prominently
  isMajor: boolean; // Takes larger grid space
  isNDA: boolean; // Protected project

  order: number; // Display order
  createdAt: string; // ISO date
}

/**
 * Testimonial data structure
 */
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  companyLogo?: string;
  rating?: number; // Optional star rating
  date?: string; // When testimonial was given
  linkedinUrl?: string; // Link to LinkedIn profile
}

/**
 * Animation configuration for consistency across components
 */
export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: readonly number[];
  stagger?: number;
}

/**
 * Responsive breakpoints
 */
export interface Breakpoints {
  mobile: number;
  tablet: number;
  laptop: number;
  desktop: number;
}
