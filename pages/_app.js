import { SessionProvider } from 'next-auth/react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Auth from '@/components/Auth';
import { StoreProvider } from '@/utils/Store';
import '@/styles/globals.css';
import { Rubik } from 'next/font/google';

const rubik = Rubik({ subsets: ['latin'], variable: '--font-rubik' });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <PayPalScriptProvider deferLoading={true}>
          <main className={`${rubik.variable} font-sans`}>
            {Component.auth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </main>
        </PayPalScriptProvider>
      </StoreProvider>
    </SessionProvider>
  );
}
