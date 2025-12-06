// ============================================================================
// ENTERPRISE IMAGE GALLERY - Elite multi-image showcase
// ============================================================================

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaTimes,
} from 'react-icons/fa';
import { ProjectImage } from '../../types';
import { DURATIONS } from '../../utils/animations';
import styles from './EnterpriseImageGallery.module.css';

interface EnterpriseImageGalleryProps {
  images: ProjectImage[];
  projectTitle: string;
}

export const EnterpriseImageGallery: React.FC<EnterpriseImageGalleryProps> = ({
  images,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const currentImage = images[currentIndex];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-scroll thumbnails to center the active one
  useEffect(() => {
    if (thumbnailsRef.current) {
      const activeThumb = thumbnailsRef.current.children[currentIndex] as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextLightboxImage();
        if (e.key === 'ArrowLeft') prevLightboxImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  return (
    <>
      <div className={styles.gallery}>
        {/* Main Image Display */}
        <div className={styles.mainImageContainer}>
          <motion.div
            key={currentIndex}
            className={styles.imageWrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DURATIONS.normal }}
          >
            <img
              src={currentImage.url}
              alt={currentImage.alt}
              className={styles.mainImage}
              loading="lazy"
            />

            {/* Expand Button */}
            <button
              className={styles.expandButton}
              onClick={() => openLightbox(currentIndex)}
              aria-label="View fullscreen"
              type="button"
            >
              <FaExpand />
            </button>

            {/* Gradient Overlays */}
            <div className={styles.topGradient} />
            <div className={styles.bottomGradient} />
          </motion.div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                className={`${styles.navArrow} ${styles.prevArrow}`}
                onClick={prevImage}
                aria-label="Previous image"
                type="button"
              >
                <FaChevronLeft />
              </button>
              <button
                className={`${styles.navArrow} ${styles.nextArrow}`}
                onClick={nextImage}
                aria-label="Next image"
                type="button"
              >
                <FaChevronRight />
              </button>
            </>
          )}

          {/* Image Caption */}
          <AnimatePresence mode="wait">
            {currentImage.caption && (
              <motion.div
                key={currentIndex}
                className={styles.caption}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: DURATIONS.normal }}
              >
                <p>{currentImage.caption}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className={styles.thumbnailsWrapper}>
            <div className={styles.thumbnailsContainer} ref={thumbnailsRef}>
              {images.map((image, index) => (
                <motion.button
                  key={index}
                  className={`${styles.thumbnail} ${
                    index === currentIndex ? styles.thumbnailActive : ''
                  }`}
                  onClick={() => goToImage(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  aria-label={`View ${image.alt}`}
                >
                  <img src={image.url} alt={image.alt} />
                  <div className={styles.thumbnailOverlay} />
                  {index === currentIndex && (
                    <motion.div
                      className={styles.thumbnailBorder}
                      layoutId="thumbnailBorder"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Progress Indicator */}
            <div className={styles.progressIndicator}>
              <span className={styles.currentNumber}>{currentIndex + 1}</span>
              <span className={styles.separator}>/</span>
              <span className={styles.totalNumber}>{images.length}</span>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
              {/* Close Button */}
              <button
                className={styles.lightboxClose}
                onClick={closeLightbox}
                aria-label="Close lightbox"
                type="button"
              >
                <FaTimes />
              </button>

              {/* Lightbox Image */}
              <motion.div
                key={lightboxIndex}
                className={styles.lightboxImageWrapper}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: DURATIONS.normal }}
              >
                <img
                  src={images[lightboxIndex].url}
                  alt={images[lightboxIndex].alt}
                  className={styles.lightboxImage}
                />
              </motion.div>

              {/* Lightbox Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
                    onClick={prevLightboxImage}
                    aria-label="Previous image"
                    type="button"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    className={`${styles.lightboxNav} ${styles.lightboxNext}`}
                    onClick={nextLightboxImage}
                    aria-label="Next image"
                    type="button"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}

              {/* Lightbox Info */}
              <div className={styles.lightboxInfo}>
                <p className={styles.lightboxCaption}>{images[lightboxIndex].caption}</p>
                <p className={styles.lightboxCounter}>
                  {lightboxIndex + 1} / {images.length}
                </p>
              </div>

              {/* Lightbox Thumbnails */}
              <div className={styles.lightboxThumbnails}>
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={`${styles.lightboxThumb} ${
                      index === lightboxIndex ? styles.lightboxThumbActive : ''
                    }`}
                    onClick={() => setLightboxIndex(index)}
                    type="button"
                  >
                    <img src={image.url} alt={image.alt} />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
