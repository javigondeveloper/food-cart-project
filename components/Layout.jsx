import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? `${title} - Food Cart` : 'Food Cart'}</title>
        <meta name="description" content="Ecommerce Website" />
      </Head>
      <div className=" flex min-h-screen flex-col justify-between">
        <header>
          <nav className=" flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/" className="text-lg font-bold">
              Food Cart
            </Link>
            <div>
              <Link href="/cart" className=" p-2 text-lg">
                Cart
              </Link>
              <Link href="/login" className="p-2 text-lg">
                Login
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          Copyright © 2023 Javi González
        </footer>
      </div>
    </>
  );
}
