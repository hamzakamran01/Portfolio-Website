import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSound } from './hooks/useSound';
import { SoundToggle } from './components/ui/SoundToggle';
import Navigation from './components/navigation';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import ZaaricFounder from './components/sections/ZaaricFounder';
import QimamFellowship from './components/sections/QimamFellowship';
import Projects from './components/Projects/Projects';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import Cursor from './components/ui/Cursor';
import './App.css';
import PublicSpeaking from './components/sections/PublicSpeaking';
import Testimonials from './components/Testimonials/Testimonials';
import Philosophy from './components/sections/Philosophy';

// Lazy load Skills section to reduce initial bundle size
const Skills = lazy(() => import('./components/sections/Skills'));

function App() {
  const { playClick, playHover } = useSound();

  // Preload Skills section when user scrolls near it
  useEffect(() => {
    const preloadSkills = () => {
      const skillsTrigger = document.getElementById('zaaric-founder');
      if (!skillsTrigger) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Start preloading when previous section comes into view
              import('./components/sections/Skills');
              observer.disconnect();
            }
          });
        },
        { rootMargin: '200px' } // Start loading 200px before entering viewport
      );

      observer.observe(skillsTrigger);
      return () => observer.disconnect();
    };

    const timer = setTimeout(preloadSkills, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Add click sound to all buttons and links
    const addClickSound = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        console.log('Click detected on:', target.tagName);
        playClick();
      }
    };

    // Add hover sound to interactive elements
    const addHoverSound = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        playHover();
      }
    };

    document.addEventListener('click', addClickSound);
    document.addEventListener('mouseover', addHoverSound);

    return () => {
      document.removeEventListener('click', addClickSound);
      document.removeEventListener('mouseover', addHoverSound);
    };
  }, [playClick, playHover]);

  return (
    <Router>
      <div className="app">
        <Cursor />
        <Navigation />
        <main>
          <Hero />
          <About />
          <ZaaricFounder />
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
            <Skills />
          </Suspense>
          <Philosophy />
          <Projects />
          <QimamFellowship />
          <PublicSpeaking />
          <Contact />
        </main>
        <Footer />
        <SoundToggle />
      </div>
    </Router>
  );
}

export default App;