import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const CourseCard = ({ course, onEnrol, isEnrolled, variant = 'default' }) => {
  const [showIncludes, setShowIncludes] = useState(false);

  const badgeColor = course.badge === 'Most Popular'
    ? 'bg-coral text-primary-foreground'
    : 'bg-violet text-primary-foreground';

  return (
    <motion.div
      whileHover={{ y: -6, borderColor: 'hsl(15, 71%, 52%)' }}
      transition={{ duration: 0.2 }}
      className="flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-coral-glow"
    >
      {/* Video placeholder */}
      <div className="relative aspect-video bg-brand-surface flex items-center justify-center">
        <div className="text-center px-4">
          <p className="font-heading text-lg text-foreground">{course.name}</p>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-coral/20 flex items-center justify-center">
            <Play className="w-5 h-5 text-coral ml-0.5" />
          </div>
        </div>
        {course.badge && (
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${badgeColor}`}>
            {course.badge}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-heading text-xl text-foreground mb-1">{course.name}</h3>
        <p className="text-sm text-gold mb-3">{course.tagline}</p>

        <div className="flex gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-full bg-brand-surface text-xs text-muted-foreground">
            {course.level}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-brand-surface text-xs text-muted-foreground">
            {course.duration}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-brand-surface text-xs text-muted-foreground">
            {course.lessons} lessons
          </span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {course.description}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mb-4">
          <span className="text-2xl font-bold text-coral">₹{course.price_inr.toLocaleString('en-IN')}</span>
          <span className="text-xs text-muted-foreground">/ lifetime</span>
        </div>

        {/* Includes toggle */}
        <button
          onClick={() => setShowIncludes(!showIncludes)}
          className="flex items-center gap-1 text-sm text-coral mb-3 focus-coral rounded"
        >
          What&apos;s included
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showIncludes ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {showIncludes && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <ul className="space-y-2 mb-4">
                {course.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <div className="mt-auto">
          {isEnrolled ? (
            <Button variant="success" className="w-full" disabled>
              <Check className="w-4 h-4 mr-1" /> Enrolled
            </Button>
          ) : variant === 'dashboard' ? (
            <Button variant="coral" className="w-full" onClick={() => onEnrol(course)}>
              Continue Learning
            </Button>
          ) : (
            <Button variant="coral" className="w-full" onClick={() => onEnrol(course)}>
              Enrol Now
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
