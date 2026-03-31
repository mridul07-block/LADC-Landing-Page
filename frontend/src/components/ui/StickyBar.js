import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export const StickyBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCourses = () => {
    const el = document.getElementById('courses');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-border backdrop-blur-md"
          style={{ backgroundColor: 'rgba(14, 10, 10, 0.96)' }}
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <p className="text-sm text-muted-foreground hidden sm:block">
              From <span className="text-coral font-semibold">₹999</span> · Lifetime access
            </p>
            <Button variant="coral" size="default" onClick={scrollToCourses}>
              Enrol Now
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
