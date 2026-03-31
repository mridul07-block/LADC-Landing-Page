import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { testimonials } from '@/data/testimonials';

export const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = testimonials.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(next, 4500);
    return () => clearInterval(interval);
  }, [paused, next]);

  const getVisibleCards = () => {
    const arr = [];
    for (let i = 0; i < 3; i++) {
      arr.push(testimonials[(current + i) % total]);
    }
    return arr;
  };

  const visibleCards = getVisibleCards();

  return (
    <section id="testimonials" className="py-20 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-coral text-sm font-semibold tracking-wider uppercase mb-3">Testimonials</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground">
              Happy feet. Smiling faces.
            </h2>
          </div>
        </ScrollReveal>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {visibleCards.map((t, i) => (
              <motion.div
                key={`${current}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-card border border-border rounded-2xl p-6 relative flex flex-col"
              >
                {/* Quote mark */}
                <span className="font-heading text-7xl text-coral/20 absolute top-3 left-5 leading-none select-none">
                  &ldquo;
                </span>

                <p className="text-sm text-muted-foreground leading-relaxed mt-8 mb-6 flex-1">
                  {t.text}
                </p>

                <div className="flex items-center gap-3 mt-auto">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-coral/20 flex items-center justify-center text-coral font-semibold text-sm">
                    {t.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{t.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gold bg-gold/10 px-2 py-0.5 rounded-full">
                        {t.type}
                      </span>
                      <span className="text-xs text-muted-foreground">{t.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 text-coral fill-coral" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 focus-coral ${
                  i === current
                    ? 'bg-coral w-6'
                    : 'bg-brand-surface hover:bg-muted-foreground'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
