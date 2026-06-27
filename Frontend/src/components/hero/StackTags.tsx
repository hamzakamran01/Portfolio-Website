import styles from './StackTags.module.css';

const STACK = [
  'Next.js',
  'TypeScript',
  'Node.js',
  'OpenAI SDK',
  'PostgreSQL',
  'React Native',
  'Three.js',
];

const StackTags: React.FC = () => (
  <div className={styles.row} data-hero-stack>
    {STACK.map((tag, index) => (
      <span key={tag} className={styles.itemWrap}>
        {index > 0 && <span className={styles.divider} aria-hidden="true">│</span>}
        <span className={styles.tag} data-hero-tag>{tag}</span>
      </span>
    ))}
  </div>
);

export default StackTags;
