# LADC - Laveena Ashish Dance Company

## Overview
Complete frontend prototype for LADC — an Indian online dance academy with a "Bollywood Noir" cinematic dark theme.

## Tech Stack
- React (CRA + CRACO), Tailwind CSS, Framer Motion, React Router v6, shadcn/ui

## Design System
- **Theme**: Dark cinematic (brand-black #0E0A0A, coral #D85A30, gold #EF9F27, violet #7F77DD)
- **Typography**: Playfair Display (headings) + Inter (body)
- **All tokens in HSL format** in index.css

## Pages
1. **Landing Page** (`/`) — Hero, Trust Ticker, Course Catalogue, Instructors, Curriculum, Video Reels, Testimonials, Pricing, FAQ, Final CTA, Footer
2. **Checkout Page** (`/checkout/:courseId`) — Order summary + mock payment form
3. **Payment Success** (`/payment-success`) — Confetti animation + success state
4. **Dashboard** (`/dashboard`) — Enrolled courses, progress, explore more

## Key Features
- Mock auth (localStorage), course enrollment, coupon codes (DANCE10/LADC20)
- Video lightbox (YouTube embeds), course filtering, auto-scrolling testimonials
- Sticky CTA bar, WhatsApp button, responsive mobile design
- All data is MOCK (no backend required)

## State Management
- React Context + useReducer with localStorage persistence
