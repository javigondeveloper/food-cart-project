import { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { signOut, useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '@/store';
import MenuBox from './MenuBox';
import SearchIcon from './icons/SearchIcon';
import { getError } from '@/utils/error';
import getQuantityUpdated from '@/utils/getQuantityUpdated';

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  const handleChangeSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const searchProduct = async (product) => {
    try {
      const response = await fetch(`/api/products/search?product=${product}`);
      const { result } = await response.json();

      const productsWhitStock = result.filter((p) => p.stock > 0);
      productsWhitStock.forEach(
        (p) => (p.stockAvailable = getQuantityUpdated(cart.cartItems, p))
      );

      dispatch({
        type: 'SET_PRODUCTS_AVAILABLES',
        payload: productsWhitStock,
      });
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <>
      <Head>
        <title>{title ? `${title} - Food Cart` : 'Food Cart'}</title>
        <meta name="description" content="Ecommerce Website" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="  flex min-h-screen flex-col justify-between bg-cyan-100">
        <header className="z-20  fixed top-0 left-0 w-full  ">
          {/* navBar */}
          <nav className=" flex whitespace-nowrap gap-2 h-16 px-4  items-center justify-between shadow-md  bg-white lg:mx-[calc((100%-1016px)/2)]">
            <Link href="/" className="text-lg font-bold whitespace-nowrap">
              Food Cart
            </Link>

            {/* search input */}
            <div className="flex shrink gap-1 min-w-[140px]  border rounded-md items-center">
              <input
                type="text"
                className="w-full focus:ring-0 border-none"
                placeholder="search product"
                name="searchInput"
                value={searchInput}
                onChange={handleChangeSearchInput}
              />
              <SearchIcon
                className="w-[1.2rem] h-[1.2rem] fill-blue-600 "
                onClick={() => searchProduct(searchInput)}
              />
            </div>

            {/* cart menu item */}
            <div className="flex items-center">
              <Link href="/cart" className="hidden md:block p-2 text-lg">
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
                <MenuBox
                  session={session}
                  clickHandler={logoutClickHandler}
                  cartItemsCount={cartItemsCount}
                />
              ) : (
                <Link href="/login" className="p-2 text-lg">
                  Login
                </Link>
              )}
            </div>
          </nav>
        </header>

        <main className="container flex flex-col mx-auto mt-[80px] px-4 flex-grow ">
          {children}
        </main>

        <footer className="flex h-10 justify-center items-center shadow-inner bg-white">
          Copyright © 2023 Javi González
        </footer>
      </div>
    </>
  );
}
