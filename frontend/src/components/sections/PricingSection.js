import React from 'react';
import { Check } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/AppContext';
import { courses } from '@/data/courses';

const plans = [
  {
    name: 'Single Course',
    price: 'From \u20b9999',
    featured: false,
    badge: null,
    features: [
      'Any single course of your choice',
      'Lifetime access to lessons',
      'Certificate of completion',
      'Student community access',
      'Mobile-friendly content',
    ],
    ctaLabel: 'Browse Courses',
    ctaAction: 'scroll',
  },
  {
    name: 'Sangeet Special',
    price: '\u20b93,999',
    featured: true,
    badge: 'Best Value',
    features: [
      '24 structured lessons',
      'Solo, couple & group routines',
      'Audio-edited song mashups',
      'WhatsApp rehearsal support',
      'Certificate of completion',
      'Lifetime access',
      'Dedicated coordinator',
    ],
    ctaLabel: 'Enrol Now',
    ctaAction: 'enrol-sangeet',
  },
  {
    name: 'All Access Bundle',
    price: '\u20b97,999',
    originalPrice: '\u20b912,000',
    featured: false,
    badge: null,
    features: [
      'All 6 courses included',
      'Lifetime access to everything',
      'All certificates',
      'Priority support',
      'Live Q&A session',
      'Student community access',
    ],
    ctaLabel: 'Get Full Access',
    ctaAction: 'scroll',
  },
];

export const PricingSection = () => {
  const { handleEnrol } = useAppStore();

  const scrollToCourses = () => {
    const el = document.getElementById('courses');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCTA = (action) => {
    if (action === 'scroll') {
      scrollToCourses();
    } else if (action === 'enrol-sangeet') {
      const sangeet = courses.find((c) => c.id === 'wedding-sangeet');
      if (sangeet) handleEnrol(sangeet);
    }
  };

  return (
    <section id="pricing" className="py-20 sm:py-24 bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-coral text-sm font-semibold tracking-wider uppercase mb-3">Pricing</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground">
              Simple pricing
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 0.1}>
              <div
                className={`flex flex-col h-full rounded-2xl border p-6 relative ${
                  plan.featured
                    ? 'border-coral bg-brand-surface shadow-coral-glow'
                    : 'border-border bg-background'
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-coral text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                    {plan.badge}
                  </span>
                )}

                <h3 className="font-heading text-xl text-foreground mb-2">{plan.name}</h3>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl font-bold text-coral">{plan.price}</span>
                  {plan.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">{plan.originalPrice}</span>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <Button
                    variant={plan.featured ? 'coral' : 'ghost-light'}
                    className="w-full"
                    size="lg"
                    onClick={() => handleCTA(plan.ctaAction)}
                  >
                    {plan.ctaLabel}
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Secure payment · 7-day refund policy · Lifetime access guaranteed
        </p>
      </div>
    </section>
  );
};
