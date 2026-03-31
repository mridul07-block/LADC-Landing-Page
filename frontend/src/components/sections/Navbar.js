import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Courses', href: '#courses' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#faq' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { mockUser, openAuthModal, mockLogout } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();
  const isLanding = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isLanding) return;
    const ids = navLinks.map((l) => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isLanding]);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    if (!isLanding) {
      navigate('/' + href);
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCourses = () => {
    setMobileOpen(false);
    if (!isLanding) {
      navigate('/#courses');
      return;
    }
    const el = document.getElementById('courses');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-border backdrop-blur-md'
            : 'border-b border-transparent'
        }`}
        style={{
          backgroundColor: scrolled ? 'rgba(14, 10, 10, 0.95)' : 'transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => navigate('/')} className="flex items-baseline gap-0.5 focus-coral rounded">
            <span className="font-heading text-xl font-bold text-foreground">LADC</span>
            <span className="w-1.5 h-1.5 rounded-full bg-coral inline-block" />
          </button>

          {/* Desktop nav */}
          {isLanding && (
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`relative text-sm font-medium transition-colors duration-200 focus-coral rounded py-1 ${
                      isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="navActive"
                        className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-coral rounded-full"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          )}

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {mockUser ? (
              <>
                <span className="text-sm text-foreground">{mockUser.name}</span>
                <Button
                  variant="ghost-light"
                  size="sm"
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={mockLogout}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => openAuthModal()}
                  className="text-foreground/80 hover:text-foreground">
                  Login
                </Button>
                <Button variant="coral" onClick={scrollToCourses}>
                  Enrol Now
                </Button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-foreground focus-coral rounded p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 bg-background border-t border-border md:hidden"
          >
            <nav className="flex flex-col p-6 gap-4">
              {isLanding && navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-lg text-foreground/80 hover:text-foreground text-left py-2 focus-coral rounded"
                >
                  {link.label}
                </button>
              ))}
              <div className="h-px bg-border my-2" />
              {mockUser ? (
                <>
                  <p className="text-sm text-muted-foreground">Hi, {mockUser.name}</p>
                  <Button variant="ghost-light" onClick={() => { navigate('/dashboard'); setMobileOpen(false); }}>
                    Dashboard
                  </Button>
                  <Button variant="ghost" onClick={() => { mockLogout(); setMobileOpen(false); }}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost-light" onClick={() => { openAuthModal(); setMobileOpen(false); }}>
                    Login
                  </Button>
                  <Button variant="coral" onClick={() => { scrollToCourses(); setMobileOpen(false); }}>
                    Enrol Now
                  </Button>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
