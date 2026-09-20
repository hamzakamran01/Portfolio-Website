import { useEffect, lazy, Suspense } from 'react';
import Navigation from './components/navigation';
import HeroSection from './components/hero/HeroSection';
import { useLenis } from './hooks/useLenis';
import About from './components/sections/About';
import ZaaricFounder from './components/sections/ZaaricFounder';
import QimamFellowship from './components/sections/QimamFellowship';
import NationalYouthSummit from './components/sections/NationalYouthSummit';
import Projects from './components/Projects/UnifiedProjectsGrid';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import './App.css';
import PublicSpeaking from './components/sections/PublicSpeaking';
import Philosophy from './components/sections/Philosophy';
import { MotionConfig } from 'framer-motion';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ui/ErrorFallback';

// Lazy load Skills section to reduce initial bundle size
const Skills = lazy(() => import('./components/sections/Skills'));

function App() {
  useLenis();

  // Warm the lazy Skills chunk once the preceding section approaches the
  // viewport. The previous version returned its cleanup into nothing, so the
  // IntersectionObserver was never disconnected.
  useEffect(() => {
    let observer: IntersectionObserver | undefined;

    const timer = setTimeout(() => {
      const trigger = document.getElementById('about');
      if (!trigger) return;

      observer = new IntersectionObserver(
        entries => {
          if (entries.some(entry => entry.isIntersecting)) {
            import('./components/sections/Skills');
            observer?.disconnect();
          }
        },
        { rootMargin: '200px' }
      );
      observer.observe(trigger);
    }, 1000);

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, []);

  return (
    // reducedMotion="user" gates every framer-motion animation on the OS
    // setting. Without it the ~190 motion.* animations ignored the preference
    // entirely, because the global CSS clamp does not reach framer-motion.
    <MotionConfig reducedMotion="user">
      <div className="app">
        <a className="skip-link" href="#main">
          Skip to content
        </a>

        <Navigation />

        <main id="main">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <HeroSection />
          </ErrorBoundary>

          <Projects />

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <About />
          </ErrorBoundary>

          <ZaaricFounder />

          <Suspense fallback={<div style={{ minHeight: '50vh' }} />}>
            <Skills />
          </Suspense>

          <QimamFellowship />
          <NationalYouthSummit />
          <Philosophy />
          <PublicSpeaking />
          <Contact />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;