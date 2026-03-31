import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { VideoLightbox } from '@/components/modals/VideoLightbox';

const heroWords1 = ['Dance', 'Your', 'Way'];
const heroWords2 = ['To', 'Happiness'];

const stats = [
  { label: 'Students', value: 10000, suffix: '+' },
  { label: 'Weddings', value: 300, suffix: '+' },
  { label: 'Years', value: 15, suffix: '+' },
  { label: 'Countries', value: 15, suffix: '' },
];

export const HeroSection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const scrollToCourses = () => {
    const el = document.getElementById('courses');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* YouTube background - desktop only */}
      <div className="absolute inset-0 hidden md:block">
        <iframe
          src="https://www.youtube.com/embed/NHxQBeiGkbE?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=NHxQBeiGkbE"
          title="Background video"
          className="absolute top-1/2 left-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ border: 'none' }}
          allow="autoplay"
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(14,10,10,0.3), rgba(14,10,10,0.65) 60%, rgba(14,10,10,1) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gold text-xs sm:text-sm tracking-[0.2em] uppercase mb-6 font-medium"
        >
          Trained under Shiamak Davar · 15+ Years · 10,000+ Students
        </motion.p>

        {/* Heading */}
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6">
          <span className="block">
            {heroWords1.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4 + i * 0.15,
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                }}
                className="inline-block mr-3 sm:mr-4 text-foreground"
              >
                {word}
              </motion.span>
            ))}
          </span>
          <span className="block">
            {heroWords2.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.85 + i * 0.15,
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                }}
                className="inline-block mr-3 sm:mr-4 text-coral"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed"
        >
          Learn Bollywood, Jazz & Hip Hop from India&apos;s most trusted choreographers. Classes for all levels, any timezone.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <Button
            variant="coral"
            size="xl"
            className="animate-cta-pulse"
            onClick={scrollToCourses}
          >
            Explore Courses
          </Button>
          <Button
            variant="ghost-light"
            size="lg"
            onClick={() => setLightboxOpen(true)}
            className="gap-2"
          >
            <Play className="w-4 h-4" /> Watch Free Class
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-surface/80 border-l-2 border-coral"
            >
              <span className="text-lg font-bold text-foreground">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bounce chevron */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </motion.div>

      <VideoLightbox
        videoId="gr8vc-IZwvE"
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
};
