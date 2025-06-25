/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss';
import forms from '@tailwindcss/forms';
import contentQueries from '@tailwindcss/container-queries';

const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette');

const config: Omit<Config, 'prefix' | 'presets' | 'content'> = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './src/**/*.{html,js}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/rizzui/dist/*.{js,ts,jsx,tsx}', // must use this line to compile and generate our RizzUI components style
  ],
  theme: {
    fontFamily: {
      inter: ['var(--font-inter)'],
      lexend: ['var(--font-lexend)'],
      nunito: ['var(--font-nunito)', 'sans-serif'],
      baby: ['var(--font-baby)'],
      dm: ['var(--font-dm)'],
      poppins: ['var(--font-poppins)'],
    },
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      'opt-md': '999px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px',
    },
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        transitionTimingFunction: {
          'custom-ui': 'cubic-bezier(0.15, 0.75, 0.5, 1)',
        },
        gray: {
          '0': 'rgb(var(--gray-0) / <alpha-value>)',
          '50': 'rgb(var(--gray-50) / <alpha-value>)',
          '100': 'rgb(var(--gray-100) / <alpha-value>)',
          '200': 'rgb(var(--gray-200) / <alpha-value>)',
          '300': 'rgb(var(--gray-300) / <alpha-value>)',
          '400': 'rgb(var(--gray-400) / <alpha-value>)',
          '500': 'rgb(var(--gray-500) / <alpha-value>)',
          '600': 'rgb(var(--gray-600) / <alpha-value>)',
          '700': 'rgb(var(--gray-700) / <alpha-value>)',
          '800': 'rgb(var(--gray-800) / <alpha-value>)',
          '900': 'rgb(var(--gray-900) / <alpha-value>)',
          '1000': 'rgb(var(--gray-1000) / <alpha-value>)',
        },
        'theme-orange': 'rgb(248 149 32 / 1)',
        'theme-black': 'rgb(66, 66, 66, 1)',
        'muted-foreground': 'rgb(var(--muted-foreground) / <alpha-value>)',
        primary: {
          lighter: 'rgb(var(--primary-lighter) / <alpha-value>)',
          DEFAULT: 'hsl(var(--primary))',
          dark: 'rgb(var(--primary-dark) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          lighter: 'rgb(var(--secondary-lighter) / <alpha-value>)',
          DEFAULT: 'hsl(var(--secondary))',
          dark: 'rgb(var(--secondary-dark) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        red: {
          lighter: 'rgb(var(--red-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--red-default) / <alpha-value>)',
          dark: 'rgb(var(--red-dark) / <alpha-value>)',
        },
        orange: {
          lighter: 'rgb(var(--orange-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--orange-default) / <alpha-value>)',
          dark: 'rgb(var(--orange-dark) / <alpha-value>)',
        },
        blue: {
          lighter: 'rgb(var(--blue-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--blue-default) / <alpha-value>)',
          dark: 'rgb(var(--blue-dark) / <alpha-value>)',
        },
        green: {
          lighter: 'rgb(var(--green-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--green-default) / <alpha-value>)',
          dark: 'rgb(var(--green-dark) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        marquee: {
          from: {
            transform: 'translateX(0)',
          },
          to: {
            transform: 'translateX(calc(-100% - var(--gap)))',
          },
        },
        'marquee-vertical': {
          from: {
            transform: 'translateY(0)',
          },
          to: {
            transform: 'translateY(calc(-100% - var(--gap)))',
          },
        },
        scroll: {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))',
          },
        },
        blink: {
          '0%': {
            opacity: '0.2',
          },
          '20%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0.2',
          },
        },
        scaleUp: {
          '0%': {
            transform: 'scale(0)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
        popup: {
          '0%': {
            transform: 'scale(0)',
          },
          '50%': {
            transform: 'scale(1.3)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
        skeletonWave: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '50%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        spinnerSpin: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        whatsappFloatingPulse: {
          '0%': {
            boxShadow: '0 0 0 0 rgba(37, 211, 101, 0.75)',
          },
          '100%': {
            boxShadow: '0 0 0 5px rgba(37, 211, 101, 0)',
          },
        },
        skypeFloatingPulse: {
          '0%': {
            boxShadow: '0 0 0 0 rgba(225, 217, 255)',
          },
          '100%': {
            boxShadow: '0 0 0 5px rgba(37, 211, 101, 0)',
          },
        },
      },
      animation: {
        whatsappFloatingPulse: 'whatsappFloatingPulse 1s infinite',
        skypeFloatingPulse: 'skypeFloatingPulse 1s infinite',
        marquee: 'marquee var(--duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
        scroll:
          'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
        blink: 'blink 1.4s infinite both;',
        'scale-up': 'scaleUp 500ms infinite alternate',
        'spin-slow': 'spin 4s linear infinite',
        popup: 'popup 500ms var(--popup-delay, 0ms) linear 1',
        skeleton: 'skeletonWave 1.6s linear 0.5s infinite',
        'spinner-ease-spin': 'spinnerSpin 0.8s ease infinite',
        'spinner-linear-spin': 'spinnerSpin 0.8s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        skeleton: '`linear-gradient(90deg,transparent,#ecebeb,transparent)`',
        'skeleton-dark':
          '`linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)`',
        'hero-image-bhw': 'url(`/assets/images/hero-image_bhw.png`)',
        'footer-texture': 'url(`/img/footer-texture.png`)',
      },
      content: {
        underline: 'url("/public/underline.svg")',
      },
      boxShadow: {
        profilePic:
          '0px 2px 4px -2px rgba(0, 0, 0, 0.10), 0px 4px 6px -1px rgba(0, 0, 0, 0.10)',
        '3xl': '0px 2px 8px rgba(0, 0, 0, 0.08)',
        '4xl':
          '0px 0px 8px rgba(211.43749594688416, 233.57007712125778, 255, 1)',
      },
      gridTemplateColumns: {
        '18': 'repeat(18, minmax(0, 1fr))',
      },
      height: {
        'custom-100p-300': 'calc(100% + 300px)',
      },
      zIndex: {
        '51': '51',
        '52': '52',
      },
    },
  },
  plugins: [
    forms,
    contentQueries,
    addVariablesForColors,
    // @ts-ignore
    plugin(({ addVariant }: any) => {
      addVariant('not-read-only', '&:not(:read-only)');
    }),
    require('tailwindcss-animate'),
  ],
};
export default config;

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme('colors'));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ':root': newVars,
  });
}
