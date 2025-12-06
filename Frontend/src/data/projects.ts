// ============================================================================
// PROJECTS DATA - Enhanced enterprise-level project showcase
// ============================================================================

import { Project } from '../types';
import React from 'react';
import { FaChartLine, FaShieldAlt, FaUsers, FaRocket, FaClock, FaAward } from 'react-icons/fa';

/**
 * All portfolio projects with comprehensive data
 */
export const projects: Project[] = [
  {
    id: 'digiqms',
    title: 'DigiQMS',
    subtitle: 'Enterprise Digital Queueing & Analytics System',
    tagline: 'Revolutionizing Queue Management with Intelligence',
    description: 'A highly secure, seamless digital token generation and queuing system with advanced data analytics for enterprise automation.',
    longDescription: 'DigiQMS is an enterprise-grade solution designed to revolutionize queue management. It automates the entire token generation process while providing deep, data-driven insights.',
    overview: 'DigiQMS transforms traditional queue management into an intelligent, automated system that optimizes service delivery through real-time analytics and predictive insights. Built with security and scalability at its core, it serves thousands of users daily while maintaining 99.99% uptime.',
    challenge: 'Organizations faced inefficient manual queue management, long wait times, and lack of actionable data to optimize their service delivery. The need was for a secure, scalable solution that could handle high volumes while providing deep insights.',
    solution: 'Developed a full-stack enterprise platform featuring secure token generation, real-time queue monitoring via Socket.io, PostgreSQL for reliable data storage, Redis for caching, and comprehensive analytics dashboards built with Recharts. Implemented advanced security measures and automated service optimization algorithms.',
    impact: 'Reduced average wait times by 45%, processes over 5,000 daily tokens across multiple service points, maintains 99.99% uptime, and provides actionable insights that have improved operational efficiency by 60%.',
    role: 'Full-Stack Developer & System Architect',
    timeline: '6 months (2024)',

    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Socket.io', 'Recharts', 'Docker'],
    category: ['Web Application', 'Enterprise', 'Real-time'],
    tags: ['Queue Management', 'Analytics', 'Enterprise', 'Real-time', 'Secure'],

    images: {
      thumbnail: {
        url: '/assets/digital-queueing-system/Screenshot 2025-12-01 224615.png',
        alt: 'DigiQMS Dashboard Overview',
      },
      hero: {
        url: '/assets/digital-queueing-system/Screenshot 2025-12-01 224615.png',
        alt: 'DigiQMS Analytics Dashboard - Real-time Monitoring',
        caption: 'Advanced analytics dashboard with real-time queue monitoring',
      },
      screenshots: [
        {
          url: '/assets/digital-queueing-system/Screenshot 2025-12-01 224615.png',
          alt: 'Main Dashboard with Real-time Queue Status',
          caption: 'Real-time queue monitoring and analytics dashboard',
        },
        {
          url: '/assets/digital-queueing-system/Screenshot 2025-12-01 224655.png',
          alt: 'Advanced Analytics Overview',
          caption: 'Comprehensive data visualization and insights',
        },
        {
          url: '/assets/digital-queueing-system/Screenshot 2025-12-01 224720.png',
          alt: 'Token Generation Interface',
          caption: 'Secure and seamless token generation system',
        },
        {
          url: '/assets/digital-queueing-system/Screenshot 2025-12-01 224804.png',
          alt: 'Service Performance Metrics',
          caption: 'Detailed service completion and performance tracking',
        },
        {
          url: '/assets/digital-queueing-system/Screenshot 2025-12-01 224839.png',
          alt: 'User Behavior Analytics',
          caption: 'User behavior patterns and engagement metrics',
        },
        {
          url: '/assets/digital-queueing-system/Screenshot 2025-12-01 224917.png',
          alt: 'Queue Management System',
          caption: 'Intelligent queue optimization and management',
        },
        {
          url: '/assets/digital-queueing-system/Screenshot 2025-12-01 225020.png',
          alt: 'Administrative Controls',
          caption: 'Comprehensive administrative panel and controls',
        },
      ],
    },

    links: {
      live: 'https://digital-queueing-system.vercel.app',
      github: undefined, // Private Repository
    },

    stats: [
      { label: 'Wait Time Reduction', value: '45%', icon: React.createElement(FaChartLine), color: '#10B981' },
      { label: 'Daily Tokens', value: '5k+', icon: React.createElement(FaUsers), color: '#00E7FF' },
      { label: 'System Uptime', value: '99.99%', icon: React.createElement(FaShieldAlt), color: '#8B5CF6' },
    ],

    features: [
      'Secure Token Generation Pathway with Multi-factor Authentication',
      'Real-time Queue Monitoring with WebSocket Integration',
      'Advanced Data Analytics & Visualization Dashboard',
      'Comprehensive User Behavior Tracking & Heatmaps',
      'Automated Service Optimization & Predictive Analytics',
      'Multi-location Support with Centralized Management',
      'Mobile-responsive Interface for All Devices',
      'Role-based Access Control & Audit Logs',
    ],

    isFeatured: true,
    isMajor: true,
    isNDA: false,
    order: 2,
    createdAt: '2024-08-01',
  },

  {
    id: 'united-by-art',
    title: 'United by Art',
    subtitle: 'Enterprise Networking Platform for Creatives',
    tagline: 'Connecting Creatives, Amplifying Talent',
    description: 'MVP of a comprehensive networking platform for artists featuring communities, collaborations, and a talent marketplace.',
    longDescription: 'United by Art is a sophisticated networking ecosystem tailored for the creative industry. A platform that facilitates seamless collaboration, portfolio showcases, and service exchange.',
    overview: 'United by Art bridges the gap between creative professionals, providing tools for collaboration, community building, and talent monetization. The platform combines social networking features with a secure marketplace, enabling artists to showcase their work, connect with peers, and grow their creative businesses.',
    challenge: 'Creative professionals lacked a dedicated platform that combined networking, collaboration tools, and a trusted marketplace for services. Existing solutions were either too generic or lacked the community features artists needed to thrive.',
    solution: 'Built a full-stack platform using React, Supabase for backend and real-time features, Zustand for state management, and Framer Motion for fluid animations. Implemented real-time messaging, community leaderboards, secure marketplace transactions, and portfolio showcase features optimized for creative content.',
    impact: 'Onboarded 1,200+ beta users, facilitated formation of 50+ creative communities, enabled hundreds of secure marketplace transactions, and created a vibrant ecosystem where artists can connect, collaborate, and monetize their skills.',
    role: 'Frontend Developer & Database Expert',
    timeline: '8 months (2024)',

    techStack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Zustand', 'Framer Motion'],
    category: ['Web Application', 'Social Platform', 'Marketplace'],
    tags: ['Social Network', 'Creative', 'Marketplace', 'Community', 'Real-time'],

    images: {
      thumbnail: {
        url: '/assets/united-by-art/Screenshot 2025-12-01 231408.png',
        alt: 'United by Art Platform',
      },
      hero: {
        url: '/assets/united-by-art/Screenshot 2025-12-01 231408.png',
        alt: 'United by Art - Creative Networking Platform',
        caption: 'Dynamic community hub connecting creative professionals',
      },
      screenshots: [
        {
          url: '/assets/united-by-art/Screenshot 2025-12-01 231408.png',
          alt: 'Community Hub Interface',
          caption: 'Vibrant community spaces for creative collaboration',
        },
        {
          url: '/assets/united-by-art/Screenshot 2025-12-01 231421.png',
          alt: 'Artist Discovery Feed',
          caption: 'Discover talented artists and creative work',
        },
        {
          url: '/assets/united-by-art/Screenshot 2025-12-01 231441.png',
          alt: 'Portfolio Showcase',
          caption: 'Beautiful portfolio presentations and galleries',
        },
        {
          url: '/assets/united-by-art/Screenshot 2025-12-01 231453.png',
          alt: 'Marketplace Interface',
          caption: 'Secure talent marketplace for creative services',
        },
        {
          url: '/assets/united-by-art/Screenshot 2025-12-01 231522.png',
          alt: 'Project Collaboration',
          caption: 'Seamless collaboration tools for creative projects',
        },
        {
          url: '/assets/united-by-art/Screenshot 2025-12-01 231538.png',
          alt: 'Community Engagement',
          caption: 'Interactive features for community building',
        },
        {
          url: '/assets/united-by-art/Screenshot 2025-12-01 231918.png',
          alt: 'Creative Dashboard',
          caption: 'Comprehensive dashboard for managing creative work',
        },
      ],
    },

    links: {
      live: 'https://unitedby.art',
      github: undefined, // Private Repository
    },

    stats: [
      { label: 'Beta Users', value: '1.2k+', icon: React.createElement(FaUsers), color: '#00E7FF' },
      { label: 'Communities', value: '50+', icon: React.createElement(FaRocket), color: '#F59E0B' },
      { label: 'Marketplace Tx', value: 'Secure', icon: React.createElement(FaShieldAlt), color: '#10B981' },
    ],

    features: [
      'Community Hubs & Collaboration Spaces',
      'Real-time Messaging System with Media Sharing',
      'Talent Marketplace with Secure Transactions',
      'Portfolio Showcase with Custom Branding',
      'Dynamic Leaderboards & Achievement System',
      'Project Collaboration Tools',
      'Event Management & RSVP System',
      'Advanced Search & Discovery Features',
    ],

    isFeatured: true,
    isMajor: true,
    isNDA: true,
    order: 1,
    createdAt: '2024-06-01',
  },

  {
    id: '3d-chair-visualizer',
    title: '3D Chair Visualizer',
    subtitle: 'Interactive E-Commerce Experience',
    tagline: 'Bringing Products to Life in 3D',
    description: 'Real-time 3D chair visualizer bridging the gap between online and physical shopping with immersive product exploration.',
    longDescription: 'A revolutionary e-commerce tool that allows users to visualize furniture in real-time 3D. This project bridges the gap between digital browsing and physical reality, offering an immersive shopping experience.',
    overview: '3D Chair Visualizer transforms online furniture shopping by providing customers with an interactive, photorealistic 3D preview of products. Users can rotate, zoom, customize materials and colors, and see exactly what they\'re buying before making a purchase decision.',
    challenge: 'E-commerce faces high return rates for furniture due to customers\' inability to visualize products in their space. Static images fail to convey size, texture, and spatial presence, leading to customer dissatisfaction and costly returns.',
    solution: 'Developed a Three.js-powered 3D visualization platform using Next.js for optimal performance. Implemented real-time material switching, lighting control, and smooth 360-degree rotation. Optimized 3D models for fast loading while maintaining visual quality. Used Tailwind for responsive UI and Framer Motion for smooth transitions.',
    impact: 'Dramatically improved customer confidence in purchase decisions, reduced potential return rates, and provided a competitive edge in the e-commerce space. The immersive 3D experience increased customer engagement and time on product pages.',
    role: 'Full-Stack Developer & 3D Engineer',
    timeline: '2 months (2024)',

    techStack: ['Next.js', 'Three.js', 'React Three Fiber', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    category: ['Web Application', '3D', 'E-Commerce'],
    tags: ['3D Visualization', 'E-Commerce', 'Interactive', 'Product Design'],

    images: {
      thumbnail: {
        url: '/assets/3D_chair_visualizer.png',
        alt: '3D Chair Visualizer',
      },
      hero: {
        url: '/assets/3D_chair_visualizer.png',
        alt: 'Interactive 3D Chair Visualization',
      },
      screenshots: [
        {
          url: '/assets/3D_chair_visualizer.png',
          alt: '3D Chair with Material Customization',
          caption: 'Real-time material and color customization',
        },
      ],
    },

    links: {
      live: 'https://3-d-chair-visualizer.vercel.app/',
      github: 'https://github.com/MCodecreeper/3D-chair-Visualizer',
    },

    stats: [
      { label: 'Load Time', value: '<2s', icon: React.createElement(FaClock), color: '#10B981' },
      { label: '3D Quality', value: 'High', icon: React.createElement(FaAward), color: '#00E7FF' },
    ],

    features: [
      'Real-time 3D Model Rendering with Three.js',
      '360° Product Rotation & Zoom',
      'Material & Color Customization',
      'Responsive Design for All Devices',
      'Optimized 3D Models for Fast Loading',
      'Smooth Animations & Transitions',
    ],

    isFeatured: false,
    isMajor: false,
    isNDA: false,
    order: 3,
    createdAt: '2024-03-01',
  },

  {
    id: 'zaaric',
    title: 'ZAARIC',
    subtitle: 'Modern Tech Agency Website',
    tagline: 'Where Innovation Meets Design',
    description: 'High-performance agency website with stunning GSAP animations and seamless UI delivering exceptional user experience.',
    longDescription: 'A cutting-edge corporate website for Zaaric, featuring complex GSAP animations, a modern design language, and a highly optimized performance score.',
    overview: 'ZAARIC website sets a new standard for tech agency online presence. Combining stunning visuals with buttery-smooth animations, it creates an immersive brand experience that captures attention and converts visitors. Built with performance and accessibility in mind.',
    challenge: 'Creating a website that stands out in a crowded tech agency market while maintaining excellent performance. The challenge was to implement complex animations without sacrificing load times or user experience on various devices.',
    solution: 'Leveraged GSAP for professional-grade animations, React for component architecture, and Framer Motion for UI transitions. Implemented code splitting, lazy loading, and optimized assets. Used Tailwind CSS for maintainable styling and responsive design. Achieved 95+ Lighthouse scores across all metrics.',
    impact: 'Delivered a memorable digital experience that increased visitor engagement, reduced bounce rate, and strengthened brand perception. The website became a portfolio piece itself, attracting high-quality leads.',
    role: 'Frontend Developer & Animation Engineer',
    timeline: '3 months (2024)',

    techStack: ['React', 'TypeScript', 'GSAP', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    category: ['Website', 'Agency', 'Animation'],
    tags: ['Corporate', 'Animation', 'High Performance', 'Modern Design'],

    images: {
      thumbnail: {
        url: '/assets/zaaric.png',
        alt: 'ZAARIC Agency Website',
      },
      hero: {
        url: '/assets/zaaric.png',
        alt: 'ZAARIC Homepage with Animations',
      },
      screenshots: [
        {
          url: '/assets/zaaric.png',
          alt: 'ZAARIC Modern Design',
          caption: 'Cutting-edge design and animations',
        },
      ],
    },

    links: {
      live: 'https://zaaric.com',
      github: 'https://github.com/MCodecreeper/Zaaric-Website.git',
    },

    features: [
      'Complex GSAP Animation Sequences',
      'Scroll-triggered Animations & Parallax',
      'Responsive Design with Mobile Optimization',
      '95+ Lighthouse Performance Score',
      'Smooth Page Transitions',
      'SEO Optimized Structure',
    ],

    isFeatured: false,
    isMajor: false,
    isNDA: false,
    order: 4,
    createdAt: '2024-01-01',
  },

  {
    id: '3d-portfolio',
    title: '3D Portfolio',
    subtitle: 'Interactive Personal Portfolio',
    tagline: 'Showcasing Skills Through Immersive 3D',
    description: 'Previous iteration of my portfolio showcasing advanced 3D web skills with Three.js and interactive experiences.',
    longDescription: 'An immersive 3D portfolio website that demonstrates mastery of Three.js and interactive web design, creating a memorable user journey through 3D environments.',
    overview: 'My previous portfolio pushed the boundaries of web development by creating a fully interactive 3D experience. Visitors could explore my work through an engaging 3D environment, demonstrating both technical prowess and creative vision.',
    challenge: 'Creating a portfolio that stands out while remaining functional and accessible. The challenge was balancing impressive 3D visuals with performance, ensuring fast load times and smooth interactions across devices.',
    solution: 'Built with React and Three.js, implementing level-of-detail (LOD) rendering, progressive loading, and fallback experiences for low-powered devices. Used GSAP for timeline-based animations and TypeScript for type safety. Optimized 3D assets and implemented efficient render loops.',
    impact: 'Successfully showcased advanced frontend skills, attracted client attention, and demonstrated ability to create engaging, performant 3D web experiences.',
    role: 'Full-Stack Developer & 3D Engineer',
    timeline: '4 months (2023)',

    techStack: ['React', 'Three.js', 'GSAP', 'TypeScript', 'WebGL'],
    category: ['Portfolio', '3D', 'Interactive'],
    tags: ['3D', 'WebGL', 'Interactive', 'Portfolio'],

    images: {
      thumbnail: {
        url: '/assets/3d_portfolio.png',
        alt: '3D Portfolio Website',
      },
      hero: {
        url: '/assets/3d_portfolio.png',
        alt: 'Interactive 3D Portfolio Experience',
      },
      screenshots: [
        {
          url: '/assets/3d_portfolio.png',
          alt: '3D Interactive Environment',
          caption: 'Immersive 3D portfolio experience',
        },
      ],
    },

    links: {
      live: undefined,
      github: 'https://github.com/MCodecreeper/Portfolio-Website.git',
    },

    features: [
      'Fully Interactive 3D Environment',
      'Three.js WebGL Rendering',
      'GSAP Timeline Animations',
      'Responsive 3D Scaling',
      'Progressive Loading System',
      'Fallback for Low-power Devices',
    ],

    isFeatured: false,
    isMajor: false,
    isNDA: false,
    order: 5,
    createdAt: '2023-09-01',
  },
];

/**
 * Get all projects sorted by order
 */
export const getAllProjects = (): Project[] => {
  return [...projects].sort((a, b) => a.order - b.order);
};

/**
 * Get featured projects only
 */
export const getFeaturedProjects = (): Project[] => {
  return projects.filter((p) => p.isFeatured).sort((a, b) => a.order - b.order);
};

/**
 * Get project by ID
 */
export const getProjectById = (id: string): Project | undefined => {
  return projects.find((p) => p.id === id);
};

/**
 * Get projects by category
 */
export const getProjectsByCategory = (category: string): Project[] => {
  return projects.filter((p) => p.category.includes(category)).sort((a, b) => a.order - b.order);
};
