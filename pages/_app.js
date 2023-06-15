import '@/styles/globals.css';
import { StoreProvider } from '@/utils/Store';
import { Rubik } from 'next/font/google';

const rubik = Rubik({ subsets: ['latin'], variable: '--font-rubik' });

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <main className={`${rubik.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </StoreProvider>
  );
}
