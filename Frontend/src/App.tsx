import { useEffect, lazy, Suspense } from 'react';
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
import Philosophy from './components/sections/Philosophy';
import SEO from './components/seo/SEO';

// Lazy load Skills section to reduce initial bundle size
const Skills = lazy(() => import('./components/sections/Skills'));

// ── Enterprise-Level Structured Data ──────────────────────────────────
const STRUCTURED_DATA = [
  // 1. Person Schema — Core Personal Branding
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://hamzakamran.tech/#person",
    "name": "Hamza Kamran",
    "givenName": "Hamza",
    "familyName": "Kamran",
    "url": "https://hamzakamran.tech",
    "image": {
      "@type": "ImageObject",
      "url": "https://hamzakamran.tech/assets/ceo_image.png",
      "width": 400,
      "height": 400
    },
    "email": "mailto:hamzakamran843@gmail.com",
    "telephone": "+923052449933",
    "jobTitle": [
      "Enterprise AI Solutions Architect",
      "Founder & CEO"
    ],
    "description": "Enterprise Solutions Architect and AI-Powered Automation Specialist. Founder & CEO of Zaaric. 2+ years architecting scalable platforms and AI automation workflows that transform SME operations.",
    "knowsAbout": [
      "Artificial Intelligence", "Enterprise Solutions Architecture", "AI-Powered Automation",
      "Agentic AI", "Cloud Architecture", "Digital Transformation", "Full-Stack Development",
      "React.js", "Next.js", "TypeScript", "Node.js", "GraphQL", "Three.js",
      "MongoDB", "PostgreSQL", "AWS", "Docker", "Kubernetes",
      "n8n Workflows", "LangChain", "OpenAI API", "Claude Agent SDK",
      "Microservices", "REST APIs", "DevOps", "CI/CD"
    ],
    "sameAs": [
      "https://www.linkedin.com/in/hamza-kamran-7b1a85294/",
      "https://github.com/MCodecreeper",
      "https://zaaric.com"
    ],
    "worksFor": {
      "@type": "Organization",
      "@id": "https://hamzakamran.tech/#organization"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "University of the Punjab",
      "department": "Faculty of Computing and Information Technology (FCIT)"
    },
    "award": [
      "Qimam Fellowship — Selected as 1 of only 38 from 11,000+ applicants across Pakistan",
      "Parliamentary Debates Nationals — LUMS 2024"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lahore",
      "addressRegion": "Punjab",
      "addressCountry": "PK"
    },
    "nationality": {
      "@type": "Country",
      "name": "Pakistan"
    }
  },
  // 2. Organization Schema — Zaaric
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://hamzakamran.tech/#organization",
    "name": "Zaaric",
    "url": "https://zaaric.com",
    "logo": "https://hamzakamran.tech/assets/zaaric.png",
    "description": "AI-powered enterprise automation venture transforming how businesses operate globally. Specializing in intelligent automation workflows, scalable cloud architectures, and AI-driven insights.",
    "founder": {
      "@type": "Person",
      "@id": "https://hamzakamran.tech/#person"
    },
    "email": "services@zaaric-ai.com",
    "sameAs": [
      "https://zaaric.com"
    ],
    "knowsAbout": [
      "Enterprise AI Automation",
      "Intelligent Automation Workflows",
      "Scalable Cloud Architectures",
      "AI-Driven Business Insights",
      "Digital Transformation"
    ]
  },
  // 3. WebSite Schema — Sitelinks Search Box
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://hamzakamran.tech/#website",
    "name": "Hamza Kamran — Enterprise AI Solutions Architect & Portfolio",
    "alternateName": ["Hamza Kamran Portfolio", "Hamza Kamran Tech", "hamzakamran.tech"],
    "url": "https://hamzakamran.tech",
    "description": "Official portfolio of Hamza Kamran — Enterprise Solutions Architect, AI-Powered Automation Specialist, and Founder & CEO of Zaaric.",
    "publisher": {
      "@type": "Person",
      "@id": "https://hamzakamran.tech/#person"
    },
    "inLanguage": "en-US"
  },
  // 4. ProfilePage Schema
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "@id": "https://hamzakamran.tech/#person"
    },
    "dateCreated": "2024-01-01",
    "dateModified": "2026-02-12",
    "name": "Hamza Kamran — Official Portfolio",
    "description": "Enterprise AI Solutions Architect portfolio showcasing projects, skills, and achievements in AI automation, full-stack development, and cloud architecture."
  },
  // 5. BreadcrumbList for Rich Results
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://hamzakamran.tech/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": "https://hamzakamran.tech/#about"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Projects",
        "item": "https://hamzakamran.tech/#projects"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Skills",
        "item": "https://hamzakamran.tech/#skills"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Contact",
        "item": "https://hamzakamran.tech/#contact"
      }
    ]
  }
];

function App() {
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

  return (
    <div className="app">
      <Cursor />
      <Navigation />
      <main>
        <SEO
          title="Enterprise AI Solutions Architect & Founder of Zaaric"
          description="Hamza Kamran — Enterprise Solutions Architect, AI-Powered Automation Specialist, and Founder & CEO of Zaaric. Specializing in scalable cloud architectures, agentic AI systems, and enterprise digital transformation. 2+ years architecting platforms and AI automation workflows that transform SME operations."
          structuredData={STRUCTURED_DATA}
        />
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

    </div>
  );
}

export default App;