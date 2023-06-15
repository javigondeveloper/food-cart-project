import Head from 'next/head';

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title : 'Food Cart'}</title>
        <meta name="description" content="Ecommerce Website" />
      </Head>
      <div>
        <header>Header</header>
        <main>{children}</main>
        <footer>Footer</footer>
      </div>
    </>
  );
}
