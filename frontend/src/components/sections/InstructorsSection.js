import React from 'react';
import { Award, Star, Globe, Users } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/button';

const credentials = [
  { icon: Award, label: '18 Years', sublabel: 'Under Shiamak Davar' },
  { icon: Star, label: '15+ Years', sublabel: 'Teaching' },
  { icon: Globe, label: '10,000+', sublabel: 'Students' },
  { icon: Users, label: '300+', sublabel: 'Weddings' },
];

export const InstructorsSection = () => {
  const scrollToCourses = () => {
    const el = document.getElementById('courses');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="py-20 sm:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image placeholder */}
          <ScrollReveal direction="left">
            <div className="aspect-[4/5] bg-brand-surface rounded-2xl flex items-center justify-center border border-border">
              <div className="text-center">
                <p className="font-heading text-5xl sm:text-6xl text-coral">L & A</p>
                <p className="text-lg text-muted-foreground mt-2">Laveena & Ashish</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right - Content */}
          <ScrollReveal direction="right">
            <div>
              <p className="text-coral text-sm font-semibold tracking-wider uppercase mb-3">Your Instructors</p>
              <h2 className="font-heading text-3xl sm:text-4xl text-foreground mb-4">
                Meet Laveena & Ashish
              </h2>
              <div className="w-8 h-0.5 bg-coral mb-6" />
              <p className="text-muted-foreground leading-relaxed mb-4">
                Trained for 18 years under the legendary Shiamak Davar, Laveena and Ashish have performed alongside Bollywood superstars — SRK, Salman, Hrithik, Aishwarya, Alia, Ranveer — and choreographed 300+ wedding sangeets across 15 countries.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                With LADC, they bring their world-class expertise online, making professional dance education accessible to anyone, anywhere. Their mission: help you express yourself through the joy of dance.
              </p>

              {/* Credential tiles */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {credentials.map((cred) => (
                  <div
                    key={cred.label}
                    className="flex items-center gap-3 p-4 rounded-xl bg-brand-surface border border-border"
                  >
                    <div className="w-10 h-10 rounded-lg bg-coral/10 flex items-center justify-center">
                      <cred.icon className="w-5 h-5 text-coral" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{cred.label}</p>
                      <p className="text-xs text-muted-foreground">{cred.sublabel}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="coral" size="lg" onClick={scrollToCourses}>
                Start Learning
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
