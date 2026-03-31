import React from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/button';

export const FinalCTA = () => {
  const scrollToCourses = () => {
    const el = document.getElementById('courses');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 sm:py-32 bg-card">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <ScrollReveal>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            Ready to dance?
          </h2>
          <p className="text-base text-muted-foreground mb-10 max-w-md mx-auto">
            Join 10,000+ students. Your first step starts here.
          </p>
          <Button
            variant="coral"
            size="xl"
            className="animate-cta-pulse"
            onClick={scrollToCourses}
          >
            Start Your Journey
          </Button>
          <p className="text-xs text-muted-foreground mt-6">
            From ₹999 · Lifetime access · Certificate included
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};
