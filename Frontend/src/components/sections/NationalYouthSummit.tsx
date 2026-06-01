import React, { useEffect, useRef, useState } from 'react';
import styles from './NationalYouthSummit.module.css';

const NationalYouthSummit: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    section.classList.add(styles.inView);
                } else {
                    section.classList.remove(styles.inView);
                }
            },
            { threshold: 0.08, rootMargin: '0px' }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [selectedImage]);

    // Unified gallery — Curated 9 best picks, perfectly sized for a 16-unit 4x4 Grid
    const unifiedGallery = [
        {
            src: '/assets/qimam/award group.jpg',
            alt: 'Qimam Award Ceremony',
            title: 'Qimam Award Ceremony',
            label: 'Qimam Fellowship',
            className: styles.gridSpan2x2
        },
        {
            src: '/assets/NYS_Quetta/award_pic.jpg',
            alt: 'NYS Award',
            title: 'Award Recognition',
            label: 'NYS Quetta',
            className: styles.gridSpan1x1
        },
        {
            src: '/assets/qimam/sessions.jpg',
            alt: 'Qimam Sessions',
            title: 'Intensive Workshops',
            label: 'Qimam Fellowship',
            className: styles.gridSpan1x1
        },
        {
            src: '/assets/NYS_Quetta/gorup_pic_NYS.jpg',
            alt: 'NYS Group Photo',
            title: 'Inter-Provincial Unity',
            label: 'NYS Quetta',
            className: `${styles.gridSpanWide} ${styles.nysGroupFrame}`,
            imageClassName: styles.nysGroupCustom
        },
        {
            src: '/assets/NYS_Quetta/cert_pic.jpg',
            alt: 'Certificate of Merit',
            title: 'Merit Certification',
            label: 'NYS Quetta',
            className: styles.gridSpanTall
        },
        {
            src: '/assets/NYS_Quetta/musical_night.jpg',
            alt: 'Cultural Musical Night',
            title: 'Cultural Night',
            label: 'NYS Quetta',
            className: `${styles.gridSpanTall} ${styles.nysCulturalNightFrame}`,
            imageClassName: styles.nysCulturalNightCustom
        },
        {
            src: '/assets/qimam/mentorship.jpg',
            alt: 'Mentorship Sessions',
            title: 'Expert Mentorship',
            label: 'Qimam Fellowship',
            className: styles.gridSpanWide
        },
        {
            src: '/assets/qimam/batch pic.jpg',
            alt: 'Fellowship Batch',
            title: 'Class of 2025',
            label: 'Qimam Fellowship',
            className: styles.gridSpan1x1
        },
        {
            src: '/assets/qimam/bazaar technologies tour.jpg',
            alt: 'Corporate Visit',
            title: 'Corporate Immersions',
            label: 'Qimam Fellowship',
            className: styles.gridSpan1x1
        }
    ];

    return (
        <section id="nys-quetta" className={styles.nysSummit} ref={sectionRef}>

            {/* ── Compact NYS Card ───────────────────────────────── */}
            <div className={styles.nysCard}>
                <div className={styles.cardImage}>
                    <img
                        src="/assets/NYS_Quetta/stage_pic.jpg"
                        alt="National Youth Summit Stage"
                        loading="lazy"
                    />
                    <div className={styles.cardImageOverlay}>
                        <div className={styles.cardBadge}>
                            <span className={styles.badgeDot}></span>
                            Provincial Delegate
                        </div>
                    </div>
                </div>

                <div className={styles.cardBody}>
                    <div className={styles.cardHeader}>
                        <h2>National Youth Summit</h2>
                        <p className={styles.cardSubtitle}>Quetta 2025 — Government of Pakistan</p>
                    </div>

                    <p className={styles.cardDescription}>
                        Selected by the <strong>Government of Punjab</strong> to represent the province in a
                        premium, fully funded multi-day initiative uniting exceptional leaders from across Pakistan.
                        An intense platform forged for exploring national cohesion and driving structural impacts.
                    </p>

                    {/* Detailed Highlights Grid directly in the card */}
                    <div className={styles.summitHighlights}>
                        <div className={styles.highlightCompact}>
                            <div className={styles.highlightIcon}>💡</div>
                            <div className={styles.highlightText}>
                                <h4>Leadership Sessions</h4>
                                <p>Masterclasses aimed at forging youth into actionable modern leaders.</p>
                            </div>
                        </div>

                        <div className={styles.highlightCompact}>
                            <div className={styles.highlightIcon}>🏛️</div>
                            <div className={styles.highlightText}>
                                <h4>Policy Talks</h4>
                                <p>Debating national-level issues and solving provincial structural gaps.</p>
                            </div>
                        </div>

                        <div className={styles.highlightCompact}>
                            <div className={styles.highlightIcon}>🚀</div>
                            <div className={styles.highlightText}>
                                <h4>Pitch Competitions</h4>
                                <p>Entrepreneurs battling with disruptive ideas for real-world execution.</p>
                            </div>
                        </div>

                        <div className={styles.highlightCompact}>
                            <div className={styles.highlightIcon}>🎙️</div>
                            <div className={styles.highlightText}>
                                <h4>Expert Dialogues</h4>
                                <p>Closed-door interactions with renowned societal and tech experts.</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.themeTags}>
                        <span className={styles.tag}>Entrepreneurship</span>
                        <span className={styles.tag}>Cultural Unity</span>
                        <span className={styles.tag}>Civic Policy</span>
                    </div>
                </div>
            </div>

            {/* ── Unified Achievements Gallery ───────────────────── */}
            <div className={styles.gallerySection}>
                <div className={styles.galleryHeader}>
                    <h3>Moments of Excellence</h3>
                    <p>Curated highlights from transformative leadership experiences</p>
                </div>

                <div className={styles.galleryGrid}>
                    {unifiedGallery.map((photo, index) => (
                        <div
                            key={index}
                            className={`${styles.galleryItem} ${photo.className}`}
                            onClick={() => setSelectedImage(photo.src)}
                        >
                            <div className={styles.imageWrapper}>
                                <img
                                    src={photo.src}
                                    alt={photo.alt}
                                    className={`${styles.galleryImage} ${photo.imageClassName || ''}`}
                                    loading="lazy"
                                />
                                <div className={styles.galleryItemOverlay}>
                                    <div className={styles.photoLabel}>{photo.label}</div>
                                    <div className={styles.photoInfo}>
                                        <h4>{photo.title}</h4>
                                    </div>
                                    <div className={styles.viewIcon}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Image Modal ────────────────────────────────────── */}
            {selectedImage && (
                <div className={styles.imageModal} onClick={() => setSelectedImage(null)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={() => setSelectedImage(null)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <img
                            src={selectedImage}
                            alt="Achievement Moment"
                            className={styles.modalImage}
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default NationalYouthSummit;
