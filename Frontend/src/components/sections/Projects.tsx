import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaChartLine, FaShieldAlt, FaUsers, FaRocket } from 'react-icons/fa';
import styles from './Projects.module.css';

// --- Types ---
interface ProjectStat {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  techStack: string[];
  liveLink: string;
  githubLink: string;
  image: string;
  isMajor: boolean; // Determines grid span
  stats?: ProjectStat[];
  features?: string[];
}

// --- Data ---
const projects: Project[] = [
  {
    id: 'digiqms',
    title: 'DigiQMS',
    subtitle: 'Enterprise Digital Queueing & Analytics System',
    description: 'A highly secure, seamless digital token generation and queuing system with advanced data analytics for enterprise automation.',
    longDescription: 'DigiQMS is an enterprise-grade solution designed to revolutionize queue management. It automates the entire token generation process while providing deep, data-driven insights. The system features a secure token generation pathway, real-time queue monitoring, and a comprehensive analytics dashboard that tracks user behavior, service completion rates, and operational efficiency over various time periods. Built for scalability and security, it empowers organizations to optimize their service delivery through actionable intelligence.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Socket.io', 'Recharts'],
    liveLink: '#', // NDA / Internal
    githubLink: '#', // NDA
    image: '/assets/digital-queueing-system/Screenshot 2025-12-01 224615.png',
    isMajor: true,
    stats: [
      { label: 'Wait Time Reduction', value: '45%', icon: <FaChartLine /> },
      { label: 'Daily Tokens', value: '5k+', icon: <FaUsers /> },
      { label: 'Uptime', value: '99.99%', icon: <FaShieldAlt /> },
    ],
    features: [
      'Secure Token Generation Pathway',
      'Real-time Queue Monitoring',
      'Advanced Data Analytics & Visualization',
      'User Behavior Tracking',
      'Automated Service Optimization'
    ]
  },
  {
    id: 'united-by-art',
    title: 'United by Art',
    subtitle: 'Enterprise Networking Platform for Creatives',
    description: 'MVP of a comprehensive networking platform for artists featuring communities, collaborations, and a talent marketplace.',
    longDescription: 'United by Art is a sophisticated networking ecosystem tailored for the creative industry. As the Frontend Developer and Database Expert, I architected a platform that facilitates seamless collaboration, portfolio showcases, and service exchange. Key features include real-time messaging, community leaderboards, and a secure marketplace for buying and selling talent services. The platform fosters a vibrant community where artists can grow, connect, and monetize their skills.',
    techStack: ['React', 'Supabase', 'Tailwind CSS', 'Zustand', 'Framer Motion'],
    liveLink: '#', // NDA
    githubLink: '#', // NDA
    image: '/assets/united-by-art/Screenshot 2025-12-01 231408.png',
    isMajor: true,
    stats: [
      { label: 'Beta Users', value: '1.2k+', icon: <FaUsers /> },
      { label: 'Communities', value: '50+', icon: <FaRocket /> },
      { label: 'Marketplace Tx', value: 'Secure', icon: <FaShieldAlt /> },
    ],
    features: [
      'Community & Collaboration Hubs',
      'Real-time Messaging System',
      'Talent Marketplace & Portfolio Showcase',
      'Dynamic Leaderboards',
      'Secure Service Transactions'
    ]
  },
  {
    id: '3d-chair',
    title: '3D Chair Visualizer',
    subtitle: 'E-Commerce Experience',
    description: 'Real-time 3D chair visualizer bridging the gap between online and physical shopping.',
    longDescription: 'A revolutionary e-commerce tool that allows users to visualize furniture in real-time 3D. This project bridges the gap between digital browsing and physical reality, offering an immersive shopping experience.',
    techStack: ['Next.js', 'Three.js', 'Tailwind', 'Framer Motion'],
    liveLink: 'https://3-d-chair-visualizer.vercel.app/',
    githubLink: 'https://github.com/MCodecreeper/3D-chair-Visualizer',
    image: '/assets/3D_chair_visualizer.png',
    isMajor: false,
  },
  {
    id: 'zaaric',
    title: 'ZAARIC',
    subtitle: 'Modern Tech Agency',
    description: 'High-performance agency website with stunning animations and seamless UI.',
    longDescription: 'A cutting-edge corporate website for Zaaric, featuring complex GSAP animations, a modern design language, and a highly optimized performance score.',
    techStack: ['React', 'GSAP', 'Tailwind', 'Framer Motion'],
    liveLink: 'https://zaaric.com',
    githubLink: 'https://github.com/MCodecreeper/Zaaric-Website.git',
    image: '/assets/zaaric.png',
    isMajor: false,
  },
  {
    id: '3d-portfolio',
    title: '3D Portfolio',
    subtitle: 'Interactive Experience',
    description: 'Previous iteration of my portfolio showcasing 3D web skills.',
    longDescription: 'An immersive 3D portfolio website that demonstrates mastery of Three.js and interactive web design, creating a memorable user journey.',
    techStack: ['React', 'Three.js', 'GSAP', 'TypeScript'],
    liveLink: '#',
    githubLink: 'https://github.com/MCodecreeper/Portfolio-Website.git',
    image: '/assets/3d_portfolio.png',
    isMajor: false,
  },
];

// --- Components ---

const ProjectCard: React.FC<{ project: Project; onClick: (p: Project) => void }> = ({ project, onClick }) => {
  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
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

  return (
    <motion.div
      layoutId={`card-container-${project.id}`}
      className={`${styles.card} ${project.isMajor ? styles.majorCard : ''}`}
      onClick={() => onClick(project)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.cardImageContainer} style={{ transform: "translateZ(20px)" }}>
        <motion.img
          layoutId={`image-${project.id}`}
          src={project.image}
          alt={project.title}
          className={styles.cardImage}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.cardContent} style={{ transform: "translateZ(50px)" }}>
        <motion.h3 layoutId={`title-${project.id}`} className={styles.cardTitle}>{project.title}</motion.h3>
        <motion.p layoutId={`subtitle-${project.id}`} className={styles.cardSubtitle}>{project.subtitle}</motion.p>
        <p className={styles.cardDescription}>{project.description}</p>

        <div className={styles.techTags}>
          {project.techStack.slice(0, 3).map(tech => (
            <span key={tech} className={styles.techTag}>{tech}</span>
          ))}
          {project.techStack.length > 3 && <span className={styles.techTag}>+{project.techStack.length - 3}</span>}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <motion.div
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        layoutId={`card-container-${project.id}`}
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}><FaTimes /></button>

        <div className={styles.modalImageContainer}>
          <motion.img
            layoutId={`image-${project.id}`}
            src={project.image}
            alt={project.title}
            className={styles.modalImage}
          />
          <div className={styles.modalGradient} />
          <div className={styles.modalHeader}>
            <motion.h2 layoutId={`title-${project.id}`} className={styles.modalTitle}>{project.title}</motion.h2>
            <motion.p layoutId={`subtitle-${project.id}`} className={styles.modalSubtitle}>{project.subtitle}</motion.p>
          </div>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.modalMain}>
            <div className={styles.section}>
              <h3>Overview</h3>
              <p>{project.longDescription}</p>
            </div>

            {project.features && (
              <div className={styles.section}>
                <h3>Key Features</h3>
                <ul className={styles.featureList}>
                  {project.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className={styles.modalSidebar}>
            {project.stats && (
              <div className={styles.statsGrid}>
                {project.stats.map((stat, idx) => (
                  <div key={idx} className={styles.statItem}>
                    <div className={styles.statIcon}>{stat.icon}</div>
                    <div className={styles.statValue}>{stat.value}</div>
                    <div className={styles.statLabel}>{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.techSection}>
              <h3>Technologies</h3>
              <div className={styles.modalTechTags}>
                {project.techStack.map(tech => (
                  <span key={tech} className={styles.modalTechTag}>{tech}</span>
                ))}
              </div>
            </div>

            <div className={styles.linksSection}>
              {project.liveLink !== '#' && (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className={styles.linkButton}>
                  <FaExternalLinkAlt /> Live Demo
                </a>
              )}
              {project.githubLink !== '#' && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className={`${styles.linkButton} ${styles.secondaryLink}`}>
                  <FaGithub /> View Code
                </a>
              )}
              {project.liveLink === '#' && project.githubLink === '#' && (
                <div className={styles.ndaBadge}>
                  <FaShieldAlt /> Enterprise NDA Protected
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className={styles.projectsSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Featured Projects</h2>
          <p>A showcase of enterprise solutions and creative engineering.</p>
        </motion.div>

        <div className={styles.bentoGrid}>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={setSelectedProject}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;