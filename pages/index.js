import Layout from '@/components/Layout';
import ProductList from '@/components/ProductList';
import useProductsWithStock from '@/hooks/useProductsWithStock';
import Product from '@/models/Product';
import db from '@/utils/db';

export default function Home({ totalProducts, products }) {
  const { productsAvailables, error } = useProductsWithStock({
    products,
    totalProducts,
  });

  return (
    <Layout title="Home Page">
      {error ? <h2>{error}</h2> : <ProductList products={productsAvailables} />}
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({ stock: { $gt: 0 } })
    .limit(10)
    .lean(); //lean fetch only the product data with no metadata (plane old js objects - POJOs)
  const totalProducts = await Product.countDocuments();
  db.disconnect();
  return {
    props: {
      totalProducts,
      products: products.map(db.convertDocToObj),
    },
  };
}
