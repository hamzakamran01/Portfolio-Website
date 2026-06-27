import styles from './ScrollIndicator.module.css';

const ScrollIndicator: React.FC = () => (
  <div className={styles.indicator} data-hero-scroll aria-hidden="true">
    <span className={styles.label}>SCROLL</span>
    <span className={styles.track}>
      <span className={styles.dot} />
    </span>
  </div>
);

export default ScrollIndicator;
