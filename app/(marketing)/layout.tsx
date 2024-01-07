import { Inter } from 'next/font/google';

import { cn } from '@/lib/utils';
import Navbar from './Navbar';
import Footer from './Footer';
import { Viewport } from 'next';

const inter = Inter({ subsets: ['latin'] });
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
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

    <div className={cn('min-h-screen', inter.className)}>
      <main className='p-10'>
        <Navbar />
        {children}
      </main>
      <Footer />
    </div>
  );
}
