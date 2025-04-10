import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { NavbarMain } from '@/components/custom/navbar';
import { ThemeProvider } from '@/components/custom/theme-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Pitfall',
  description: 'You are going to be very rich ;)',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-gray-700 bg-gray-400`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          disableTransitionOnChange>
          <NavbarMain />
          <div className='max-w-[1500px] mx-auto mt-30'>
            <div className='bg-white dark:bg-black h-full rounded-2xl mx-5 p-5'>
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
