import React from 'react';

const items = [
  '10,000+ Students Taught',
  'Trained by Shiamak Davar',
  '300+ Weddings',
  'India · USA · UK · Canada · UAE',
  '100% Recommend Rate',
  '15+ Years Excellence',
];

export const TrustTicker = () => {
  const allItems = [...items, ...items];

  return (
    <div className="bg-card py-3 overflow-hidden border-y border-border">
      <div className="animate-marquee flex whitespace-nowrap">
        {allItems.map((item, i) => (
          <span key={i} className="inline-flex items-center mx-6">
            <span className="text-xs sm:text-sm text-muted-foreground">{item}</span>
            <span className="ml-6 text-coral text-xs">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};
