import Layout from '@/components/Layout';
import ProductItem from '@/components/ProductItem';
import Product from '@/models/Product';
import { Store } from '@/store';
import db from '@/utils/db';
import getQuantityUpdated from '@/utils/getQuantityUpdated';
import { useContext, useEffect } from 'react';

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { productsAvailables } = state;
  const { cartItems } = state.cart;

  useEffect(() => {
    const productsWhitStock = products.filter((p) => p.stock > 0);
    productsWhitStock.forEach(
      (p) => (p.stockAvailable = getQuantityUpdated(cartItems, p))
    );

    dispatch({
      type: 'SET_PRODUCTS_AVAILABLES',
      payload: productsWhitStock,
    });
  }, [cartItems, products, dispatch]);

  return (
    <Layout title="Home Page">
      <div className=" flex flex-wrap justify-around">
        {productsAvailables.length === 0 ? (
          <h1>Product not available</h1>
        ) : (
          productsAvailables.map((product, index) => (
            <ProductItem product={product} key={index} />
          ))
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean(); //lean fetch only the product data with no metadata

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
