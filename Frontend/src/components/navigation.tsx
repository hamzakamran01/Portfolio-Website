import { FC, useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const Navigation: FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);

    handleScroll();
    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navLinks = [
    { to: 'projects', label: 'Work' },
    { to: 'about', label: 'About' },
    { to: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setSidebarOpen(false);
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <a
          href="#hero"
          className={styles.logo}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('hero');
          }}
        >
          HK
        </a>

        {isMobile ? (
          <>
            <button
              className={styles.menuToggle}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
            >
              {sidebarOpen ? '✕' : '☰'}
            </button>
            <div className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
              <ul className={styles.sidebarLinks}>
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <a
                      href={`#${link.to}`}
                      className={styles.sidebarLink}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.to);
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#contact"
                    className={styles.sidebarCta}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('contact');
                    }}
                  >
                    Get In Touch ↗
                  </a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div className={styles.desktopNav}>
            <ul className={styles.navLinks}>
              {navLinks.map((link) => (
                <li key={link.to}>
                  <a
                    href={`#${link.to}`}
                    className={styles.navLink}
                    data-cursor="button"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.to);
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className={styles.navCta}
              data-cursor="button"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
            >
              Get In Touch <span aria-hidden="true">↗</span>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
