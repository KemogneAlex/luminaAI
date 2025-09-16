import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Provider from './providers';
import Navbar from '../components/navbar';
import CookiesBanner from '@/components/cookies-banner-wrapper';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'LuminaAI',
  description:
    "LuminaAI - L'éditeur de photos intelligent propulsé par l'IA pour sublimer vos images en quelques clics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fr'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <Navbar />
          <main>{children}</main>
          <CookiesBanner />
        </Provider>
      </body>
    </html>
  );
}
