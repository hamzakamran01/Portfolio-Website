import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaRocket, FaBrain, FaChartLine, FaGlobe, FaLinkedin, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa';
import styles from './ZaaricFounder.module.css';

// --- Types ---
interface MissionGoal {
    label: string;
    target: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

interface ContactLink {
    label: string;
    url: string;
    icon: React.ReactNode;
    type: 'primary' | 'secondary';
}

// --- Data ---
const MISSION_GOALS: MissionGoal[] = [
    {
        label: 'Global Market Reach',
        target: '50+ Countries',
        description: 'Expanding AI solutions across international markets',
        icon: <FaGlobe />,
        color: '#00E7FF'
    },
    {
        label: 'Enterprise Solutions',
        target: '100+ Deployments',
        description: 'Scaling intelligent automation for Fortune 500 companies',
        icon: <FaBrain />,
        color: '#7B00FF'
    },
    {
        label: 'Efficiency Innovation',
        target: '80% Optimization',
        description: 'Revolutionizing business operations through AI-driven workflows',
        icon: <FaChartLine />,
        color: '#00E7FF'
    },
    {
        label: 'Industry Leadership',
        target: 'Top 15 AI Platform',
        description: 'Becoming a recognized leader in enterprise AI automation',
        icon: <FaRocket />,
        color: '#7B00FF'
    },
];

const CONTACT_LINKS: ContactLink[] = [
    {
        label: 'Visit Zaaric',
        url: 'https://zaaric.com',
        icon: <FaExternalLinkAlt />,
        type: 'primary'
    },
    {
        label: 'LinkedIn',
        url: '#', // Placeholder as user will update
        icon: <FaLinkedin />,
        type: 'secondary'
    },
    {
        label: 'services@zaaric-ai.com',
        url: 'mailto:services@zaaric-ai.com',
        icon: <FaEnvelope />,
        type: 'secondary'
    },
];

// --- Component ---
const ZaaricFounder: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    // 3D Tilt Effect for Profile Image
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!profileRef.current) return;
        const rect = profileRef.current.getBoundingClientRect();
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

    // Intersection Observer for animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="zaaric-founder" className={styles.zaaricSection} ref={sectionRef}>
            {/* Animated Background */}
            <div className={styles.backgroundPattern} />

            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Leadership & Innovation</h2>
                    <p>Founder and CEO of Zaaric - Pioneering AI-Powered Enterprise Solutions</p>
                </motion.div>

                <div className={styles.contentGrid}>
                    {/* Profile Panel */}
                    <motion.div
                        className={styles.profilePanel}
                        initial={{ opacity: 0, x: -50 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <motion.div
                            ref={profileRef}
                            className={styles.profileImageContainer}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: "preserve-3d",
                            }}
                        >
                            <div className={styles.glassFrame}>
                                <img
                                    src="/assets/ceo_image.png"
                                    alt="Hamza Kamran - Founder & CEO of Zaaric"
                                    className={styles.profileImage}
                                />
                                <div className={styles.imageGlow} />
                            </div>
                        </motion.div>

                        <div className={styles.profileInfo}>
                            <h3 className={styles.profileName}>Hamza Kamran</h3>
                            <p className={styles.profileTitle}>Founder & CEO</p>
                            <div className={styles.companyBadge}>
                                <FaRocket />
                                <span>ZAARIC</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Panel */}
                    <motion.div
                        className={styles.contentPanel}
                        initial={{ opacity: 0, x: 50 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        <div className={styles.visionCard}>
                            <h3>Company Vision</h3>
                            <p>
                                Zaaric is an emerging AI-powered enterprise automation venture, poised to transform
                                how businesses operate globally. We're building cutting-edge solutions that specialize
                                in intelligent automation workflows, scalable cloud architectures, and AI-driven
                                insights designed to empower organizations of all sizes.
                            </p>
                            <p>
                                As we cultivate our initial client base and establish our footprint in the market,
                                our mission is clear: bridge the gap between complex technology and practical
                                business outcomes, helping SMEs and Fortune 500 enterprises unlock their full
                                potential through innovative, enterprise-grade automation solutions.
                            </p>
                        </div>

                        {/* Strategic Goals Section */}
                        <div className={styles.missionSection}>
                            <h3 className={styles.missionTitle}>Strategic Mission & Goals</h3>
                            <p className={styles.missionSubtitle}>
                                Our roadmap to becoming a global leader in AI-powered enterprise automation
                            </p>
                        </div>

                        {/* Mission Goals Grid */}
                        <div className={styles.statsGrid}>
                            {MISSION_GOALS.map((goal, index) => (
                                <motion.div
                                    key={goal.label}
                                    className={styles.statCard}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                >
                                    <div className={styles.statIcon} style={{ color: goal.color }}>
                                        {goal.icon}
                                    </div>
                                    <div className={styles.statValue}>{goal.target}</div>
                                    <div className={styles.statLabel}>{goal.label}</div>
                                    <div className={styles.goalDescription}>{goal.description}</div>
                                    <div className={styles.statGlow} style={{
                                        boxShadow: `0 0 20px ${goal.color}40`
                                    }} />
                                </motion.div>
                            ))}
                        </div>

                        {/* Contact Links */}
                        <div className={styles.contactSection}>
                            <h4>Connect with Zaaric</h4>
                            <div className={styles.contactLinks}>
                                {CONTACT_LINKS.map((link) => (
                                    <motion.a
                                        key={link.label}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${styles.contactLink} ${link.type === 'primary' ? styles.primaryLink : styles.secondaryLink
                                            }`}
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {link.icon}
                                        <span>{link.label}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ZaaricFounder;
