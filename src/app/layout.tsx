// src\app\layout.tsx

import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import { updateSession } from '../../supabase/middleware';
import { ThemeProvider } from '@/components/theme-provider';
import ClientWrapper from '../components/ClientWrapper';
import NavbarSelector from '@/components/navbar-selector';
import Footer from '@/components/footer';
import { createClient } from '../../supabase/server';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cribr - Download transcripts from YouTube videos',
  description: 'Get precise transcriptions from YouTube',
  // ...icons
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const request = {
    cookies: cookies(),
    headers: headers(),
    nextUrl: new URL('https://www.cribr.co.uk/'),
  } as any;

  await updateSession(request);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ClientWrapper>
            {/* Pass initial user from server */}
            <NavbarSelector user={user} />
            <main className="flex-1 pt-14">{children}</main>
            {/* Pass user to footer */}
            <Footer user={user} />
          </ClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
