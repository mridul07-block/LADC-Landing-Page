import React from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustTicker } from '@/components/sections/TrustTicker';
import { CourseCatalogue } from '@/components/sections/CourseCatalogue';
import { InstructorsSection } from '@/components/sections/InstructorsSection';
import { WhatYouLearn } from '@/components/sections/WhatYouLearn';
import { VideoReelWall } from '@/components/sections/VideoReelWall';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppButton } from '@/components/sections/WhatsAppButton';
import { StickyBar } from '@/components/ui/StickyBar';
import { AuthModal } from '@/components/modals/AuthModal';
import { PaymentModal } from '@/components/modals/PaymentModal';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TrustTicker />
      <CourseCatalogue />
      <InstructorsSection />
      <WhatYouLearn />
      <VideoReelWall />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
      <WhatsAppButton />
      <StickyBar />
      <AuthModal />
      <PaymentModal />
    </>
  );
}
