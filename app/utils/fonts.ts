import { Noto_Sans_Thai, Poppins, JetBrains_Mono } from 'next/font/google';

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

// Monospace for technical / spec-sheet labels (codes, Ø, mm, numbers)
export const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const fontVariables = `${notoSansThai.variable} ${poppins.variable} ${jetbrainsMono.variable}`;
