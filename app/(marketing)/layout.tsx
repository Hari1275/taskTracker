import { Inter } from 'next/font/google';

import { cn } from '@/lib/utils';
import Navbar from './Navbar';
import Footer from './Footer';

const inter = Inter({ subsets: ['latin'] });

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

    <div className={cn('min-h-screen bg-slate-100', inter.className)}>
      <main className='p-10 bg-slate-100'>
        <Navbar />
        {children}
      </main>
      <Footer />
    </div>
  );
}
