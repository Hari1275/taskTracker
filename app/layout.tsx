import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

import { siteConfig } from '@/config/site';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url.base),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  // keywords: siteConfig.keywords,
  icons: [
    {
      url: '/hk.svg',
      href: '/hk.svg',
    },
  ],
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url.author,
    },
  ],

  creator: siteConfig.author,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url.base,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    // images: [
    //   {
    //     url: siteConfig.ogImage,
    //     width: 1200,
    //     height: 630,
    //     alt: siteConfig.name,
    //   },
    // ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    // images: [siteConfig.ogImage],
    creator: '@_rdev7',
  },
  // icons: {
  //   icon: '/favicon.ico',
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang='en' suppressHydrationWarning>
    //   <body className={cn('min-h-screen p-10', inter.className)}>
    //     <Navbar />
    //     {children}
    //   </body>
    //   <Footer />
    // </html>

    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
