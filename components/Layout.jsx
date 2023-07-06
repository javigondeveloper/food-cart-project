import { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import { signOut, useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '@/store';
import MenuBox from './MenuBox';

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };
  return (
    <>
      <Head>
        <title>{title ? `${title} - Food Cart` : 'Food Cart'}</title>
        <meta name="description" content="Ecommerce Website" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="  flex min-h-screen flex-col justify-between bg-cyan-100">
        <header className="z-20  fixed top-0 left-0 w-full ">
          {/* navBar */}
          <nav className=" flex h-12 px-4 items-center justify-between shadow-md  bg-white     lg:mx-[calc((100%-1016px)/2)]">
            <Link href="/" className="text-lg font-bold">
              Food Cart
            </Link>

            {/* cart menu item */}
            <div>
              <Link href="/cart" className=" p-2 text-lg">
                Cart
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {/* user menu item */}
              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <MenuBox session={session} clickHandler={logoutClickHandler} />
              ) : (
                <Link href="/login" className="p-2 text-lg">
                  Login
                </Link>
              )}
            </div>
          </nav>
        </header>

        <main className="container flex flex-col mx-auto mt-16 px-4 flex-grow ">
          {children}
        </main>

        <footer className="flex h-10 justify-center items-center shadow-inner bg-white">
          Copyright © 2023 Javi González
        </footer>
      </div>
    </>
  );
}
