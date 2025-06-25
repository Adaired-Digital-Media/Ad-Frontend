import {
  Inter,
  Lexend_Deca,
  Nunito_Sans,
  DM_Serif_Display,
  Oooh_Baby,
  Poppins,
} from 'next/font/google';

import localFont from 'next/font/local';

export const nunito = localFont({
  src: [
    {
      path: '../../public/fonts/NunitoSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NunitoSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NunitoSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-nunito',
  display: 'swap',
  adjustFontFallback: false,
  fallback: ['Arial', 'sans-serif'],
  declarations: [
    { prop: 'ascent-override', value: '90%' },
    { prop: 'descent-override', value: '20%' },
    { prop: 'line-gap-override', value: '0%' },
    { prop: 'size-adjust', value: '105%' },
  ],
});

// export const nunito = Nunito_Sans({
//   weight: ['400', '700'],
//   variable: '--font-nunito',
//   adjustFontFallback: false,
// });

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-inter',
});

export const lexendDeca = Lexend_Deca({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lexend',
});


export const dm = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-dm',
});

export const baby = Oooh_Baby({
  subsets: ['latin'],
  weight: '400', // Oooh Baby is a single-weight font
  variable: '--font-baby',
});

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'], // Matches your existing config
  variable: '--font-poppins',
});
