import {
  Inter,
  Lexend_Deca,
  Nunito_Sans,
  DM_Serif_Display,
  Oooh_Baby,
  Poppins,
} from 'next/font/google';

export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const lexendDeca = Lexend_Deca({
  subsets: ['latin'],
  variable: '--font-lexend',
});

export const nunito = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito',
  fallback: ['Nunito', 'Arial', 'sans-serif'],
});

export const dm = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-dm',
});

export const baby = Oooh_Baby({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-baby',
});

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});
