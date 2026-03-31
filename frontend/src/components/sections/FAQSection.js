import React from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    q: 'I have zero dance experience. Can I still join?',
    a: 'Absolutely! Our Bollywood Basics and Dance Fitness courses are designed specifically for beginners. Every step is broken down so you can follow along at your own pace. No prior experience needed.',
  },
  {
    q: 'How do the online classes work?',
    a: 'All courses are pre-recorded, so you can learn anytime. Each lesson includes step-by-step video instruction, practice segments, and a full choreography breakdown. You get lifetime access once enrolled.',
  },
  {
    q: 'I live outside India. Can I still participate?',
    a: 'Yes! Our students span 15+ countries. All classes are online with lifetime access, so timezone is never an issue. We\'ve choreographed weddings for families in the US, Canada, UK, UAE, Australia, and more.',
  },
  {
    q: 'Is it really lifetime access?',
    a: 'Yes. Once you enrol, you have permanent access to all course materials. No recurring fees, no expiry dates. Pay once, learn forever.',
  },
  {
    q: 'Will I get a certificate?',
    a: 'Every course includes a certificate of completion. Once you finish all lessons, your personalised certificate is automatically generated and can be downloaded.',
  },
  {
    q: 'What is the refund policy?',
    a: 'We offer a 7-day refund policy. If you\'re not satisfied with the course within 7 days of purchase, contact us for a full refund — no questions asked.',
  },
  {
    q: 'What age group is the Kids Program for?',
    a: 'Our Kids Dance Program is designed for children aged 5–14 years. The content is age-appropriate, fun, and focused on building motor skills, rhythm, and self-confidence through dance.',
  },
  {
    q: 'Are these live or recorded classes?',
    a: 'All courses are pre-recorded for maximum flexibility. However, the Wedding Sangeet Masterclass includes optional WhatsApp support for personalised rehearsal guidance. We also host occasional live Q&A sessions.',
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="py-20 sm:py-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-coral text-sm font-semibold tracking-wider uppercase mb-3">FAQ</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground">
              Frequently asked
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card border border-border rounded-xl px-5 data-[state=open]:border-coral/30"
              >
                <AccordionTrigger className="text-sm sm:text-base text-foreground hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  );
};
