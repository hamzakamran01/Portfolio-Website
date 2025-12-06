// ============================================================================
// MODERN IMAGE GRID - Sophisticated overlay of 4-5 best images
// ============================================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { ProjectImage } from '../../types';
import { DURATIONS } from '../../utils/animations';
import styles from './ModernImageGrid.module.css';

interface ModernImageGridProps {
  images: ProjectImage[];
  projectTitle: string;
}

export const ModernImageGrid: React.FC<ModernImageGridProps> = ({ images }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Take best 4-5 images for the grid
  const gridImages = images.slice(0, 5);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  return (
    <>
      <div className={styles.imageGrid}>
        {/* Main Large Image */}
        {gridImages[0] && (
          <motion.div
            className={styles.mainImage}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: DURATIONS.normal }}
            onClick={() => openLightbox(0)}
          >
            <img src={gridImages[0].url} alt={gridImages[0].alt} />
            <div className={styles.overlay} />
            <div className={styles.imageLabel}>Main View</div>
          </motion.div>
        )}

        {/* Secondary Images Grid */}
        <div className={styles.secondaryGrid}>
          {gridImages.slice(1, 5).map((image, index) => (
            <motion.div
              key={index}
              className={styles.secondaryImage}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: DURATIONS.fast }}
              onClick={() => openLightbox(index + 1)}
            >
              <img src={image.url} alt={image.alt} />
              <div className={styles.overlay} />
              {index === 3 && images.length > 5 && (
                <div className={styles.moreOverlay}>
                  <span>+{images.length - 5} more</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
              {/* Close Button */}
              <button className={styles.closeButton} onClick={closeLightbox} aria-label="Close">
                <FaTimes />
              </button>

              {/* Image */}
              <motion.img
                key={lightboxIndex}
                src={images[lightboxIndex].url}
                alt={images[lightboxIndex].alt}
                className={styles.lightboxImage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: DURATIONS.normal }}
              />

              {/* Navigation */}
              {images.length > 1 && (
                <>
                  <button className={styles.navButton} style={{ left: '2rem' }} onClick={prevImage}>
                    <FaChevronLeft />
                  </button>
                  <button className={styles.navButton} style={{ right: '2rem' }} onClick={nextImage}>
                    <FaChevronRight />
                  </button>
                </>
              )}

              {/* Caption */}
              <div className={styles.caption}>
                <p>{images[lightboxIndex].caption || images[lightboxIndex].alt}</p>
                <span>
                  {lightboxIndex + 1} / {images.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
