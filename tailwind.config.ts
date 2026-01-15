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
      // nunito: ['var(--font-nunito)', 'sans-serif'],
      // nunito: ['var(--font-Poppins)', 'Poppins'],
      poppins: ['var(--font-poppins)', 'sans-serif'],
      outfit: ['var(--font-outfit)', 'sans-serif'],
      montserrat: ['var(--font-montserrat)'],

      baby: ['var(--font-baby)'],
      dm: ['var(--font-dm)'],
      // poppins: ['var(--font-poppins)'],
    },
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      'opt-md': '999px',
      lg: '1024px',
      xl: '1280px',
      '1360': '1360px',
      '1366': '1360px',
      '1400': '1400px',
      '1470': '1470px',
      '1600': '1600px',
      '1680': '1680px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px',
      //safari fix
      '1710': '1710px',
      '1470 ': '1470px',
    },
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      keyframes: {
        softBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        softBounce: 'softBounce 1.6s ease-in-out infinite',
      },
      fontSize: {
        xxs: '14px',
        xs: '16px',
        sm: '18px',
        md: '20px',
        lg: '24px',
        xl: '32px',
        '2xl': '40px',
        '3xl': '48px',
        '4xl': '56px',
        '5xl': '64px',
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(90deg, #1D78CE 0%, #1B5A96 33%, #1B5A96 66%, #1D78CE 100%)',
        'footer-gradient':
          'linear-gradient(90deg, #010204DB 0%, #1B5A96E0 100%)',

        skeleton: 'linear-gradient(90deg, transparent, #ecebeb, transparent)',
        'skeleton-dark':
          'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',

        'hero-image-bhw': 'url("/assets/images/hero-image_bhw.png")',
        'footer-texture': 'url("/img/footer-texture.png")',
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
    keyframes: {
      stepBounce1: {
        '0%, 80%, 100%': { transform: 'translateY(0)' },
        '10%': { transform: 'translateY(-8px)' },
      },
      stepBounce2: {
        '0%, 10%, 90%, 100%': { transform: 'translateY(0)' },
        '25%': { transform: 'translateY(-8px)' },
      },
      stepBounce3: {
        '0%, 30%, 100%': { transform: 'translateY(0)' },
        '45%': { transform: 'translateY(-8px)' },
      },
      stepBounce4: {
        '0%, 50%, 100%': { transform: 'translateY(0)' },
        '65%': { transform: 'translateY(-8px)' },
      },
      slide: {
        '0%': { transform: 'translateX(0)' },
        '100%': { transform: 'translateX(-50%)' },
      },
      marquee: {
        '0%': { transform: 'translateX(0%)' },
        '100%': { transform: 'translateX(-50%)' },
      },
      zoomPulse: {
        '0%, 100%': { transform: 'scale(1)' },
        '50%': { transform: 'scale(1.15)' },
      },
      bubble: {
        '0%': {
          transform: 'scale(0.6)',
          opacity: '0.45',
        },
        '40%': {
          transform: 'scale(2.6)',
          opacity: '0',
        },

        /* remaining time = PAUSE */
        '100%': {
          transform: 'scale(2.6)',
          opacity: '0',
        },
      },
      contentReveal: {
        '0%': {
          opacity: '0',
          transform: 'translateX(-6px) translateY(16px)',
        },
        '100%': {
          opacity: '1',
          transform: 'translateX(0) translateY(0)',
        },
        imageZoomIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.88)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },
    },
    animation: {
      step1: 'stepBounce1 4s ease-in-out infinite',
      step2: 'stepBounce2 4s ease-in-out infinite',
      step3: 'stepBounce3 4s ease-in-out infinite',
      step4: 'stepBounce4 4s ease-in-out infinite',
      slide: 'slide 20s linear infinite',
      marquee: 'marquee 50s linear infinite',
      animateping: 'animate-ping',
      zoomPulse: 'zoomPulse 1.5s ease-in-out infinite',
      bubble: 'bubble 90s ease-out infinite',
      contentReveal: 'contentReveal 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
      imageZoomIn: 'imageZoomIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
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
