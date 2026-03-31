/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        /* Brand-specific colors */
        'brand-black': 'hsl(var(--brand-black))',
        'brand-card': 'hsl(var(--brand-card))',
        'brand-surface': 'hsl(var(--brand-surface))',
        'brand-border': 'hsl(var(--brand-border))',
        coral: {
          DEFAULT: 'hsl(var(--coral))',
          hover: 'hsl(var(--coral-hover))',
        },
        gold: 'hsl(var(--gold))',
        violet: 'hsl(var(--violet))',
        chart: {
          '1': 'hsl(var(--chart-1, 12 76% 61%))',
          '2': 'hsl(var(--chart-2, 173 58% 39%))',
          '3': 'hsl(var(--chart-3, 197 37% 24%))',
          '4': 'hsl(var(--chart-4, 43 74% 66%))',
          '5': 'hsl(var(--chart-5, 27 87% 67%))'
        }
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'elevated': 'var(--shadow-elevated)',
        'coral-glow': 'var(--shadow-coral-glow)',
        'gold-glow': 'var(--shadow-gold-glow)',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
