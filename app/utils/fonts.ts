import { Noto_Sans_Thai, Poppins } from 'next/font/google';

export const notoSansThai = Noto_Sans_Thai({
  variable: '--font-noto-sans-thai',
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const fontVariables = `${notoSansThai.variable} ${poppins.variable}`;
