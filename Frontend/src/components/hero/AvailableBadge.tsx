import styles from './AvailableBadge.module.css';

interface AvailableBadgeProps {
  className?: string;
}

const AvailableBadge: React.FC<AvailableBadgeProps> = ({ className }) => (
  <div className={`${styles.badge} ${className ?? ''}`} data-hero-badge>
    <span className={styles.dot} aria-hidden="true" />
    <span>Available for Projects</span>
  </div>
);

export default AvailableBadge;
