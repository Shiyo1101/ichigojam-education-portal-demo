import './globals.css';

import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

import { auth } from '@/auth';
import { ThemeProvider } from '@/components/provider/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const font = Noto_Sans_JP({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
  title: 'プログラミング支援 講師用ポータルサイト',
  description: '鯖江市内の小学校で実施されているプログラミング支援の講師用ポータルサイトです。',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html
      lang="ja"
      suppressHydrationWarning={true}
    >
      <body className={font.className}>
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster
              closeButton
              richColors
            />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
