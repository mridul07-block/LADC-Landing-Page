import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const tabs = [
  {
    id: 'warmup',
    label: 'Warmup',
    items: ['Joint mobilisation', 'Dynamic stretching', 'Breathing exercises', 'Postural alignment', 'Mental warm-up'],
  },
  {
    id: 'technique',
    label: 'Technique',
    items: ['Rhythm & timing', 'Body isolation', 'Footwork precision', 'Hand-gesture vocabulary', 'Level changes'],
  },
  {
    id: 'choreography',
    label: 'Choreography',
    items: ['Full-length choreographies', 'Step-by-step breakdown', 'Music phrasing', 'Stylistic layering', 'Expression coaching'],
  },
  {
    id: 'performance',
    label: 'Performance',
    items: ['Stage presence', 'Camera techniques', 'Costume guidance', 'Rehearsal scheduling', 'Handling nerves'],
  },
];

export const WhatYouLearn = () => {
  const [activeTab, setActiveTab] = useState('warmup');

  const currentTab = tabs.find((t) => t.id === activeTab);

  return (
    <section id="curriculum" className="py-20 sm:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-coral text-sm font-semibold tracking-wider uppercase mb-3">Curriculum</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground">
              Inside every course
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          {/* Tab buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 focus-coral ${
                  activeTab === tab.id
                    ? 'text-foreground bg-brand-surface'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="currTab"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-coral rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-border rounded-2xl p-6 sm:p-8"
            >
              <ul className="space-y-4">
                {currentTab && currentTab.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-coral/10 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-coral" />
                    </div>
                    <span className="text-base text-foreground">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </ScrollReveal>
      </div>
    </section>
  );
};
