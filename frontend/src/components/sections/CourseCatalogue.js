import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { CourseCard } from '@/components/ui/CourseCard';
import { courses } from '@/data/courses';
import { useAppStore } from '@/store/AppContext';

const filters = ['All', 'Bollywood', 'Jazz', 'Hip Hop', 'Kids'];

export const CourseCatalogue = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const { enrolledCourseIds, handleEnrol } = useAppStore();

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return courses;
    if (activeFilter === 'Kids') return courses.filter((c) => c.level.includes('Kids'));
    return courses.filter((c) =>
      c.styles.some((s) => s.toLowerCase().includes(activeFilter.toLowerCase()))
    );
  }, [activeFilter]);

  return (
    <section id="courses" className="py-20 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-coral text-sm font-semibold tracking-wider uppercase mb-3">Our Courses</p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-3">
              Find Your Perfect Class
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              From zero experience to performance-ready. Pick your style and start moving.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 focus-coral ${
                  activeFilter === filter
                    ? 'bg-coral text-primary-foreground'
                    : 'bg-brand-surface text-muted-foreground hover:text-foreground'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Course grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((course, i) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <CourseCard
                  course={course}
                  onEnrol={handleEnrol}
                  isEnrolled={enrolledCourseIds.includes(course.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
