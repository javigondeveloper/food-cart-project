import { SessionProvider } from 'next-auth/react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Auth from '@/components/Auth';
import '@/styles/globals.css';
import { Rubik } from 'next/font/google';
import { StoreProvider } from '@/store';

const rubik = Rubik({ subsets: ['latin'], variable: '--font-rubik' });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <PayPalScriptProvider deferLoading={true}>
          <div className={`${rubik.variable} font-sans`}>
            {Component.auth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </div>
        </PayPalScriptProvider>
      </StoreProvider>
    </SessionProvider>
  );
}
