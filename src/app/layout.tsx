import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Wrapper } from '@/components/containers/wrapper';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/navigation/footer';

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
  description: 'Easy money',
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
          <Navbar />
          <Wrapper>{children}</Wrapper>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
