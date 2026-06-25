import './globals.css';

import { Geist, Geist_Mono } from 'next/font/google';

import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import Providers from './providers';
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ishaan Saini | Portfolio',

  description:
    'Portfolio of a full-stack developer and problem solver specializing in TypeScript, React, and modular automation tools.',
  metadataBase: new URL('https://ishaansaini.dev'),
  openGraph: {
    title: 'Ishaan Saini | Portfolio',

    description:
      'Honours BSc in Computer Science with Distinction from U of T. Building modular web ecosystems, custom automation engines, and scalable applications.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='flex min-h-full flex-col'>
          <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
