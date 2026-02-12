import React from 'react';
import { motion } from 'framer-motion';
import {
  FaReact, FaNodeJs, FaDocker, FaAws, FaGitAlt,
  FaBrain, FaRobot, FaNetworkWired, FaCode, FaDatabase, FaServer
} from 'react-icons/fa';
import {
  SiTypescript, SiNextdotjs, SiMongodb, SiExpress,
  SiPostgresql, SiNestjs, SiRedis, SiKubernetes,
  SiTerraform, SiVercel, SiOpenai, SiLangchain
} from 'react-icons/si';
import styles from './Skills.module.css';
import { useInView } from 'react-intersection-observer';

// --- Types ---
interface Skill {
  name: string;
  expertise: 'Expert' | 'Advanced' | 'Proficient';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  category?: string;
}

interface SkillCategory {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
  skills: Skill[];
}

// --- Data ---
const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Agentic AI & Automation",
    subtitle: "Building intelligent autonomous systems",
    icon: <FaBrain />,
    gradient: "linear-gradient(135deg, #7B00FF 0%, #00E7FF 100%)",
    skills: [
      { name: "Claude Agent SDK", expertise: "Expert", icon: FaRobot, color: "#7B00FF" },
      { name: "n8n Workflows", expertise: "Expert", icon: FaNetworkWired, color: "#FF6D6D" },
      { name: "LangChain", expertise: "Advanced", icon: SiLangchain, color: "#00D084" },
      { name: "OpenAI API", expertise: "Expert", icon: SiOpenai, color: "#10A37F" },
      { name: "AI Orchestration", expertise: "Advanced", icon: FaBrain, color: "#00E7FF" },
      { name: "Agent Frameworks", expertise: "Advanced", icon: FaRobot, color: "#9333EA" },
    ]
  },
  {
    title: "Full-Stack Development",
    subtitle: "Modern web applications & APIs",
    icon: <FaCode />,
    gradient: "linear-gradient(135deg, #00E7FF 0%, #6366F1 100%)",
    skills: [
      { name: "React.js", expertise: "Expert", icon: FaReact, color: "#61DAFB" },
      { name: "Next.js", expertise: "Expert", icon: SiNextdotjs, color: "#000000" },
      { name: "TypeScript", expertise: "Expert", icon: SiTypescript, color: "#3178C6" },
      { name: "Node.js", expertise: "Expert", icon: FaNodeJs, color: "#339933" },
      { name: "Nest.js", expertise: "Advanced", icon: SiNestjs, color: "#E0234E" },
      { name: "Express.js", expertise: "Expert", icon: SiExpress, color: "#000000" },
    ]
  },
  {
    title: "Cloud & DevOps",
    subtitle: "Scalable infrastructure & deployment",
    icon: <FaServer />,
    gradient: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",
    skills: [
      { name: "AWS", expertise: "Advanced", icon: FaAws, color: "#FF9900" },
      { name: "Docker", expertise: "Advanced", icon: FaDocker, color: "#2496ED" },
      { name: "Kubernetes", expertise: "Proficient", icon: SiKubernetes, color: "#326CE5" },
      { name: "Terraform", expertise: "Proficient", icon: SiTerraform, color: "#7B42BC" },
      { name: "Vercel", expertise: "Expert", icon: SiVercel, color: "#000000" },
      { name: "CI/CD Pipelines", expertise: "Advanced", icon: FaGitAlt, color: "#F05032" },
    ]
  },
  {
    title: "Databases & Backend",
    subtitle: "Data architecture & optimization",
    icon: <FaDatabase />,
    gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
    skills: [
      { name: "MongoDB", expertise: "Expert", icon: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL", expertise: "Advanced", icon: SiPostgresql, color: "#336791" },
      { name: "Redis", expertise: "Advanced", icon: SiRedis, color: "#DC382D" },
      { name: "Database Design", expertise: "Expert", icon: FaDatabase, color: "#00E7FF" },
      { name: "REST APIs", expertise: "Expert", icon: FaServer, color: "#6366F1" },
      { name: "Microservices", expertise: "Advanced", icon: FaNetworkWired, color: "#FF6D6D" },
    ]
  }
];

// Expertise level configuration
const EXPERTISE_CONFIG = {
  'Expert': { color: '#00E7FF', weight: 3 },
  'Advanced': { color: '#7B00FF', weight: 2 },
  'Proficient': { color: '#6366F1', weight: 1 }
};

// --- Component ---
const Skills: React.FC = () => {
  const [headerRef, headerInView] = useInView({
    triggerOnce: false,
    threshold: 0.3
  });

  const [categoriesRef, categoriesInView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });

  return (
    <section id="skills" className={styles.skillsSection}>
      {/* Animated Background */}
      <div className={styles.backgroundPattern} />
      <div className={styles.gridOverlay} />

      <div className={styles.container}>
        {/* Header */}
        <motion.div
          ref={headerRef}
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.mainTitle}>Technical Expertise</h2>
          <p className={styles.subtitle}>
            Enterprise-grade skills across AI automation, full-stack development, and cloud infrastructure
          </p>
        </motion.div>

        {/* Skill Categories */}
        <div ref={categoriesRef} className={styles.categoriesGrid}>
          {SKILL_CATEGORIES.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className={styles.categoryCard}
              initial={{ opacity: 0, y: 40 }}
              animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.15 }}
            >
              {/* Category Header */}
              <div className={styles.categoryHeader}>
                <div
                  className={styles.categoryIcon}
                  style={{ background: category.gradient }}
                >
                  {category.icon}
                </div>
                <div className={styles.categoryTitleGroup}>
                  <h3 className={styles.categoryTitle}>{category.title}</h3>
                  <p className={styles.categorySubtitle}>{category.subtitle}</p>
                </div>
              </div>

              {/* Skills Grid */}
              <div className={styles.skillsGrid}>
                {category.skills.map((skill, skillIndex) => {
                  const expertiseConfig = EXPERTISE_CONFIG[skill.expertise];

                  return (
                    <motion.div
                      key={skill.name}
                      className={styles.skillCard}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={categoriesInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: categoryIndex * 0.15 + skillIndex * 0.05
                      }}
                    >
                      <div className={styles.skillCardInner}>
                        {/* Skill Icon */}
                        <div
                          className={styles.skillIconWrapper}
                          style={{ color: skill.color }}
                        >
                          <skill.icon className={styles.skillIcon} />
                        </div>

                        {/* Skill Name */}
                        <div className={styles.skillName}>{skill.name}</div>

                        {/* Expertise Badge */}
                        <div
                          className={styles.expertiseBadge}
                          style={{
                            borderColor: expertiseConfig.color,
                            color: expertiseConfig.color
                          }}
                        >
                          {skill.expertise}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Category Gradient Border */}
              <div
                className={styles.categoryBorder}
                style={{ background: category.gradient }}
              />
            </motion.div>
          ))}
        </div>

        {/* Expertise Legend */}
        <motion.div
          className={styles.expertiseLegend}
          initial={{ opacity: 0, y: 20 }}
          animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className={styles.legendTitle}>Expertise Levels</div>
          <div className={styles.legendItems}>
            {Object.entries(EXPERTISE_CONFIG).map(([level, config]) => (
              <div key={level} className={styles.legendItem}>
                <div
                  className={styles.legendDot}
                  style={{
                    backgroundColor: config.color
                  }}
                />
                <span style={{ color: config.color }}>{level}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
