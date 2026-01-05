import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header, Footer } from '@/components/layout';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Trust Australia | Create Australian Trust Deeds Online',
    template: '%s | Trust Australia',
  },
  description:
    'Generate professional Australian trust deeds online. Create your Discretionary Trust or Unit Trust in minutes. Simple, affordable, and legally compliant.',
  keywords: [
    'trust deed',
    'Australian trust',
    'discretionary trust',
    'family trust',
    'unit trust',
    'trust deed online',
    'create trust deed',
    'Australia',
  ],
  authors: [{ name: 'Trust Australia' }],
  creator: 'Trust Australia',
  publisher: 'Trust Australia',
  metadataBase: new URL('https://trustaustralia.com.au'),
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://trustaustralia.com.au',
    siteName: 'Trust Australia',
    title: 'Trust Australia | Create Australian Trust Deeds Online',
    description:
      'Generate professional Australian trust deeds online. Create your Discretionary Trust or Unit Trust in minutes.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trust Australia | Create Australian Trust Deeds Online',
    description:
      'Generate professional Australian trust deeds online. Create your Discretionary Trust or Unit Trust in minutes.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
