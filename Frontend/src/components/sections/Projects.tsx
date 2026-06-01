import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaChartLine, FaShieldAlt, FaUsers, FaRocket, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
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
  isMajor?: boolean;
  stats?: ProjectStat[];
  features?: string[];
}

// --- Data: The Crown Jewels ---
const featuredProjects: Project[] = [
  {
    id: 'digiqms',
    title: 'DigiQMS',
    subtitle: 'Enterprise Digital Queueing & Analytics System',
    description: 'A highly secure, seamless digital token generation and queuing system with advanced data analytics for enterprise automation.',
    longDescription: 'DigiQMS is an enterprise-grade solution designed to revolutionize queue management. It automates the entire token generation process while providing deep, data-driven insights. The system features a secure token generation pathway, real-time queue monitoring, and a comprehensive analytics dashboard that tracks user behavior, service completion rates, and operational efficiency over various time periods. Built for scalability and security, it empowers organizations to optimize their service delivery through actionable intelligence.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Socket.io', 'Recharts'],
    liveLink: '#',
    githubLink: '#',
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
    liveLink: '#',
    githubLink: '#',
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
  }
];

// --- Data: The Innovation Lab SCROLLER ---
const catalogProjects: Project[] = [
  {
    id: 'gigledger',
    title: 'GigLedger',
    subtitle: 'Intelligent Income Intelligence for the Gig Economy',
    description: 'Real-time income tracking and anomaly detection platform built specifically for gig workers using ML pattern recognition.',
    longDescription: 'The gig economy runs on hustle but bleeds on invisibility. Drivers, freelancers, and daily-wage workers earn across multiple platforms with zero unified financial picture. GigLedger is a real-time income tracking and anomaly detection platform built specifically for gig workers, giving them what every salaried employee takes for granted: clarity on what they actually earned, what looks wrong, and what to do about it. The system ingests earnings data across sources, detects income anomalies using ML-based pattern recognition, flags irregularities like sudden drops, platform fee spikes, or missing payments, and surfaces them in a clean dashboard. Built under 24 hours at SOFTEC 2026.',
    techStack: ['Next.js', 'FastAPI', 'Node.js', 'PostgreSQL', 'Machine Learning'],
    liveLink: '#',
    githubLink: '#',
    image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?q=80&w=2000&auto=format&fit=crop',
    features: [
      'Multi-Platform Data Ingestion',
      'ML-Based Anomaly Detection',
      'Real-Time Income Visualizations',
      'Automated Risk Flagging',
      'Built in < 24 Hours at SOFTEC 2026'
    ]
  },
  {
    id: 'haqyab',
    title: 'HaqYab',
    subtitle: 'Agentic Legal Access for Every Pakistani',
    description: 'Multi-agent AI pipeline bridging legal statutes and citizen action through NLP and RAG integration in Urdu & English.',
    longDescription: 'Pakistan has laws that protect ordinary citizens. Most citizens never find out. HaqYab bridges that gap. A citizen describes their problem in plain Urdu or English. A multi-agent AI pipeline classifies the issue, retrieves the applicable Pakistani statute, drafts the exact legal document they need, whether a landlord notice, employer complaint, or FIR draft, and generates a step-by-step action plan in language any person can follow. No lawyer. No fee. No wasta. Just the law, working for the people it was written to protect.',
    techStack: ['OpenAI SDK', 'RAG', 'pgvector', 'Next.js', 'Urdu NLP'],
    liveLink: '#',
    githubLink: '#',
    image: 'https://images.unsplash.com/photo-1620712948343-005690b5e9ee?q=80&w=2000&auto=format&fit=crop',
    features: [
      'Multi-Agent AI Pipeline',
      'Urdu/English NLP Support',
      'Automated Document Generation',
      'pgvector RAG Architecture',
      'Dynamic Strategy Formatting'
    ]
  },
  {
    id: 'rxflow',
    title: 'RxFlow',
    subtitle: 'HIPAA-Compliant Pharmacy Commerce Platform',
    description: 'Full-stack platform combining end-to-end e-commerce with strictly regulated healthcare data intake protocols.',
    longDescription: 'Built for the US healthcare market where compliance is not optional and data integrity is everything. RxFlow is a full-stack pharmacy platform combining end-to-end medicine e-commerce with HIPAA-compliant data intake for both patients and vendors. Patients browse, order, and manage prescriptions through a clean consumer interface. On the backend, vendor onboarding, inventory management, and patient health records follow strict HIPAA data handling protocols including encrypted storage, access controls, and audit trails. The exact standard US pharmacy clients require before trusting any external system.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS KMS', 'Stripe'],
    liveLink: '#',
    githubLink: '#',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2000&auto=format&fit=crop',
    features: [
      'Secure End-to-End E-Commerce',
      'HIPAA Data Handing Architecture',
      'Encrypted Storage via AWS KMS',
      'Vendor Onboarding Portal',
      'Strict Access Controls & Audit Trails'
    ]
  },
  {
    id: 'vitacoreai',
    title: 'VitaCore AI',
    subtitle: 'Your Complete Health Intelligence Partner',
    description: 'Intelligent document processing suite acting as a personal AI medical assistant navigating digitized health records.',
    longDescription: 'Medical records are the most important data most people never understand. VitaCore AI changes that relationship entirely. It digitizes all medical invoices and health records through intelligent document processing, builds a unified health timeline the patient actually owns, and sits on top of it as an AI medical partner that knows your complete history. Ask it anything. What do my last three blood tests show? Is this new prescription interacting with something I already take? VitaCore responds in plain human language, making it the first health tool built for the person, not the provider.',
    techStack: ['Next.js', 'Python', 'OpenAI', 'Document Intelligence', 'PostgreSQL'],
    liveLink: '#',
    githubLink: '#',
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=2000&auto=format&fit=crop',
    features: [
      'Document Digitization OCR Pipeline',
      'Unified Patient Timeline Generation',
      'AI-Powered Medical Query Partner',
      'Cross-Prescription Interaction Checks',
      'Real-Time Health Insights Dashboard'
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
  },
];

// --- Components ---

const FeaturedProjectCard: React.FC<{ project: Project; onClick: (p: Project) => void }> = ({ project, onClick }) => {
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
      className={`${styles.card} ${styles.majorCard}`}
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
          {project.techStack.slice(0, 4).map(tech => (
            <span key={tech} className={styles.techTag}>{tech}</span>
          ))}
          {project.techStack.length > 4 && <span className={styles.techTag}>+{project.techStack.length - 4}</span>}
        </div>
      </div>
    </motion.div>
  );
};

const CatalogProjectCard: React.FC<{ project: Project; onClick: (p: Project) => void }> = ({ project, onClick }) => {
  return (
    <motion.div
      layoutId={`card-container-${project.id}`}
      className={styles.catalogCard}
      onClick={() => onClick(project)}
    >
      <div className={styles.catalogImageContainer}>
        <motion.img
          layoutId={`image-${project.id}`}
          src={project.image}
          alt={project.title}
          className={styles.catalogImage}
          loading="lazy"
        />
        <div className={styles.catalogOverlay} />
      </div>

      <div className={styles.catalogContent}>
        <motion.h4 layoutId={`title-${project.id}`} className={styles.catalogTitle}>{project.title}</motion.h4>
        <p className={styles.catalogDescription}>{project.description}</p>

        <div className={styles.catalogTechTags}>
          {project.techStack.slice(0, 3).map(tech => (
            <span key={tech} className={styles.catalogTechTag}>{tech}</span>
          ))}
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
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className={styles.projectsSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Featured Solutions</h2>
          <p>Architecting highly scalable enterprise solutions and complex AI models.</p>
        </motion.div>

        {/* --- Featured Section (The top 2) --- */}
        <div className={styles.featuredGrid}>
          {featuredProjects.map((project) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              onClick={setSelectedProject}
            />
          ))}
        </div>

        {/* --- Innovation Lab / Scroller (The detailed catalog) --- */}
        <div className={styles.innovationLabSection}>
          <div className={styles.innovationHeader}>
            <div className={styles.innovationTitles}>
              <h3>Innovation Lab</h3>
              <p>Explore high-complexity hackathon builds, ML architectures, and 3D web experiences.</p>
            </div>

            <div className={styles.scrollControls}>
              <button className={styles.scrollBtn} onClick={scrollLeft} aria-label="Scroll Left"><FaChevronLeft /></button>
              <button className={styles.scrollBtn} onClick={scrollRight} aria-label="Scroll Right"><FaChevronRight /></button>
            </div>
          </div>

          <div className={styles.scrollerWrapper}>
            <div className={styles.catalogTrack} ref={scrollerRef}>
              {catalogProjects.map((project) => (
                <CatalogProjectCard
                  key={project.id}
                  project={project}
                  onClick={setSelectedProject}
                />
              ))}
            </div>
          </div>
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