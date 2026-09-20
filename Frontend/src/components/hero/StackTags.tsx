import styles from './StackTags.module.css';

/**
 * Hero stack row.
 *
 * The previous list led with Next.js / TypeScript / Node.js and ended with
 * React Native and Three.js. Two problems:
 *   - React Native appeared in NO project's techStack in data/projects.ts, so
 *     the hero opened with an unsupported claim.
 *   - Three.js is used decoratively in one project. Leading a founder-facing
 *     AI pitch with a WebGL toy and a mobile framework buries the actual
 *     positioning.
 *
 * Every entry below is backed by data/projects.ts (occurrence counts in
 * parentheses) and ordered AI-first.
 */
const STACK = [
  'OpenAI Agents SDK', // 2 projects
  'RAG', // 2
  'pgvector', // 2
  'Python', // 2
  'FastAPI', // 3
  'Next.js', // 4
  'PostgreSQL', // 7
];

const StackTags: React.FC = () => (
  <div className={styles.row} data-hero-stack>
    {STACK.map((tag, index) => (
      <span key={tag} className={styles.itemWrap}>
        {index > 0 && (
          <span className={styles.divider} aria-hidden="true">
            &#9474;
          </span>
        )}
        <span className={styles.tag} data-hero-tag>
          {tag}
        </span>
      </span>
    ))}
  </div>
);

export default StackTags;
