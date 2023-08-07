import Layout from '@/components/Layout';
import ProductList from '@/components/ProductList';
import Product from '@/models/Product';
import { Store } from '@/store';
import db from '@/utils/db';
import { useContext, useEffect } from 'react';

export default function Home({ totalProductsInDB, productsInDB }) {
  const { dispatch } = useContext(Store);

  useEffect(() => {
    dispatch({
      type: 'SET_PRODUCTS_INITIAL_STATE',
      payload: {
        productsInitialState: productsInDB,
        totalProductsInitialState: totalProductsInDB,
      },
    });
  }, [dispatch, productsInDB, totalProductsInDB]);

  return (
    <Layout title="Home Page">
      <ProductList />
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({ stock: { $gt: 0 } })
    .limit(10)
    .lean(); //lean fetch only the product data with no metadata (plane old js objects - POJOs)
  const totalProductsInDB = await Product.countDocuments({ stock: { $gt: 0 } });
  db.disconnect();
  return {
    props: {
      totalProductsInDB,
      productsInDB: products.map(db.convertDocToObj),
    },
  };
}
