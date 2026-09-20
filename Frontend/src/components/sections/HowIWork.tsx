import { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import styles from './HowIWork.module.css';

/**
 * How I work.
 *
 * The hero promises "architecture to deployment in 30 days" and nothing on the
 * site explained what that means, what it costs, or what the client supplies.
 * This converts an unproven claim into a reviewable offer.
 *
 * It also replaces Philosophy, which was written in agency "we/our" voice on a
 * personal portfolio and consisted of three unfalsifiable claims — "Clean
 * Architecture", "Performance First", "Modern Stack". The principles below are
 * positions, not metrics: a technical founder can disagree with them, which is
 * exactly what makes them worth stating.
 *
 * Interaction: the phases are a real tablist — click, or arrow/Home/End keys
 * with a roving tabindex. The rail fills to the selected phase.
 */

interface Phase {
  id: string;
  week: string;
  title: string;
  body: string;
  output: string;
  deliverables: string[];
}

const PHASES: Phase[] = [
  {
    id: 'scope',
    week: 'Week 1',
    title: 'Scope and architecture',
    body: 'We agree the one outcome that matters, then I map the system around it — data flow, model boundaries, failure modes, and what is explicitly out of scope. Most of the risk in an AI build is decided here, before any code exists.',
    output: 'Architecture doc + eval plan',
    deliverables: ['System diagram', 'Eval criteria', 'Scope boundary', 'Cost model'],
  },
  {
    id: 'build',
    week: 'Weeks 2–3',
    title: 'Build against evals',
    body: 'The evaluation harness is written before the features it measures, so "is this good enough?" gets answered with numbers instead of vibes. You see working software every week, not a reveal at the end.',
    output: 'Working system + eval scores',
    deliverables: ['Eval harness', 'Weekly builds', 'Prompt/model iteration', 'Integration'],
  },
  {
    id: 'ship',
    week: 'Week 4',
    title: 'Harden and hand over',
    body: 'Load, cost and failure testing. Observability wired in, deployment automated, and a walkthrough so your team owns the system rather than depending on me to keep it alive.',
    output: 'Deployed system + runbook',
    deliverables: ['Load + cost tests', 'Monitoring', 'CI/CD', 'Handover session'],
  },
];

const PRINCIPLES = [
  {
    n: '01',
    title: 'Evals before features',
    body: 'An AI system without a measurable baseline is a demo. The eval harness comes first so every later change is provably better or worse, not just different.',
  },
  {
    n: '02',
    title: 'Design the failure mode',
    body: 'Models are wrong sometimes. The interesting engineering is what happens then — fallbacks, confidence thresholds, and where a human gets the final say.',
  },
  {
    n: '03',
    title: 'Boring infrastructure',
    body: 'Postgres with pgvector until it genuinely stops being enough. Every extra managed service is a bill, an outage surface and an onboarding cost for whoever maintains this next.',
  },
  {
    n: '04',
    title: 'Cost per request is a constraint',
    body: 'Token spend is an architectural decision, not a billing surprise. Routing, caching and model choice get priced at design time.',
  },
];

const HowIWork: React.FC = () => {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = useCallback((index: number) => {
    setActive(index);
    tabRefs.current[index]?.focus();
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const last = PHASES.length - 1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        focusTab(active === last ? 0 : active + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        focusTab(active === 0 ? last : active - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        focusTab(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        focusTab(last);
      }
    },
    [active, focusTab]
  );

  const phase = PHASES[active];
  const progress = (active / (PHASES.length - 1)) * 100;

  return (
    <section id="how-i-work" className={styles.section} aria-labelledby="how-i-work-heading">
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <SectionHeader
          id="how-i-work-heading"
          eyebrow="Engagement"
          title="How I work"
          subtitle="A 30-day engagement, scope to deployed. Fixed scope, weekly working software, and your team owning the result at the end."
        />

        {/* ── Stepper ───────────────────────────────────────────────── */}
        <div className={styles.stepper}>
          {/* Progress is passed as a custom property rather than an inline
              width, so the same value drives a horizontal rail on desktop and
              a vertical one on mobile. */}
          <div
            className={styles.rail}
            aria-hidden="true"
            style={{ '--progress': `${progress}%` } as React.CSSProperties}
          >
            <span className={styles.railFill} />
          </div>

          <div
            className={styles.tabs}
            role="tablist"
            aria-label="Engagement phases"
            onKeyDown={onKeyDown}
          >
            {PHASES.map((p, i) => {
              const isActive = i === active;
              const isDone = i < active;
              return (
                <button
                  key={p.id}
                  ref={el => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`phase-tab-${p.id}`}
                  aria-selected={isActive}
                  aria-controls={`phase-panel-${p.id}`}
                  tabIndex={isActive ? 0 : -1}
                  className={`${styles.tab} ${isActive ? styles.tabActive : ''} ${
                    isDone ? styles.tabDone : ''
                  }`}
                  onClick={() => setActive(i)}
                  data-cursor="button"
                >
                  <span className={styles.node}>
                    <span className={styles.nodeNum}>{String(i + 1).padStart(2, '0')}</span>
                    {isActive && (
                      <motion.span
                        layoutId="phase-node-ring"
                        className={styles.nodeRing}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </span>
                  <span className={styles.tabText}>
                    <span className={styles.tabWeek}>{p.week}</span>
                    <span className={styles.tabTitle}>{p.title}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Active panel ──────────────────────────────────────────── */}
        <div className={styles.panelWrap}>
          <AnimatePresence mode="wait">
            <motion.div
              key={phase.id}
              id={`phase-panel-${phase.id}`}
              role="tabpanel"
              aria-labelledby={`phase-tab-${phase.id}`}
              className={styles.panel}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.panelMain}>
                <span className={styles.panelWeek}>{phase.week}</span>
                <h3 className={styles.panelTitle}>{phase.title}</h3>
                <p className={styles.panelBody}>{phase.body}</p>

                <p className={styles.output}>
                  <span className={styles.outputLabel}>Output</span>
                  <span className={styles.outputValue}>{phase.output}</span>
                </p>
              </div>

              <ul className={styles.deliverables}>
                {phase.deliverables.map((d, i) => (
                  <motion.li
                    key={d}
                    className={styles.deliverable}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.3 }}
                  >
                    <span className={styles.check} aria-hidden="true" />
                    {d}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Principles ────────────────────────────────────────────── */}
        <div className={styles.principles}>
          <h3 className={styles.principlesHeading}>How I make the calls</h3>

          <motion.ul
            className={styles.principleList}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {PRINCIPLES.map(p => (
              <motion.li
                key={p.n}
                className={styles.principle}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className={styles.principleNum} aria-hidden="true">
                  {p.n}
                </span>
                <h4 className={styles.principleTitle}>{p.title}</h4>
                <p className={styles.principleBody}>{p.body}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div className={styles.ctaRow}>
          <a href="#contact" className={styles.ctaLink} data-cursor="button">
            Start a project
            <span className={styles.ctaArrow} aria-hidden="true">
              &#8599;
            </span>
          </a>
          <span className={styles.ctaNote}>Typical reply within one business day</span>
        </div>
      </div>
    </section>
  );
};

export default HowIWork;
