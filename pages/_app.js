import Auth from '@/components/Auth';
import '@/styles/globals.css';
import { StoreProvider } from '@/utils/Store';
import { SessionProvider } from 'next-auth/react';
import { Rubik } from 'next/font/google';

const rubik = Rubik({ subsets: ['latin'], variable: '--font-rubik' });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <main className={`${rubik.variable} font-sans`}>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </main>
      </StoreProvider>
    </SessionProvider>
  );
}
