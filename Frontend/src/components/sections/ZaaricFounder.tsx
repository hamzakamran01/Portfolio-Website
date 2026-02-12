import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaLinkedin, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa';
import styles from './ZaaricFounder.module.css';

// --- Types ---
interface ContactLink {
    label: string;
    url: string;
    icon: React.ReactNode;
    type: 'primary' | 'secondary';
}

// --- Data ---
const CONTACT_LINKS: ContactLink[] = [
    {
        label: 'Visit Zaaric',
        url: 'https://zaaric-ai.com',
        icon: <FaExternalLinkAlt />,
        type: 'primary'
    },
    {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/hamza-kamran-7b1a85294/',
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

    // Helper to get links by type
    const primaryLink = CONTACT_LINKS.find(link => link.type === 'primary');
    const secondaryLinks = CONTACT_LINKS.filter(link => link.type === 'secondary');

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
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
                            <p className={styles.profileTitle}>Founder & CEO at <span className={styles.highlight}>Zaaric</span></p>
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
                                Zaaric is a next-generation AI enterprise automation venture redefining how organizations achieve efficiency and growth. We craft intelligent automation workflows, scalable cloud solutions, and AI-driven insights that transform complex operations into seamless, actionable outcomes.
                            </p>
                            <p>
                                Our mission is simple yet bold: empower businesses—from agile SMEs to Fortune 500 leaders—to unlock their full potential with innovative, enterprise-grade automation that drives measurable impact, accelerates decision-making, and future-proofs operations in an increasingly digital world.
                            </p>
                        </div>

                        {/* Logo & Links Side-by-Side Section */}
                        <motion.div
                            className={styles.bottomSection}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <div className={styles.logoWrapper}>
                                <img
                                    src="/assets/zaaric_logo.jpeg"
                                    alt="Zaaric Logo"
                                    className={styles.zaaricLogo}
                                />
                            </div>

                            <div className={styles.linksWrapper}>
                                <h4>Connect with Zaaric</h4>
                                <div className={styles.contactContainer}>
                                    {/* Primary Link (Full Width) */}
                                    {primaryLink && (
                                        <motion.a
                                            key={primaryLink.label}
                                            href={primaryLink.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`${styles.contactLink} ${styles.primaryLink} ${styles.fullWidthLink}`}
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {primaryLink.icon}
                                            <span>{primaryLink.label}</span>
                                        </motion.a>
                                    )}

                                    {/* Secondary Links (Side by Side) */}
                                    <div className={styles.secondaryLinksRow}>
                                        {secondaryLinks.map((link) => (
                                            <motion.a
                                                key={link.label}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`${styles.contactLink} ${styles.secondaryLink}`}
                                                whileHover={{ scale: 1.02, y: -2 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                {link.icon}
                                                <span>{link.label}</span>
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ZaaricFounder;
