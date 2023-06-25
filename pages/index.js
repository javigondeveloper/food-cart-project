import Layout from '@/components/Layout';
import ProductItem from '@/components/ProductItem';
import Product from '@/models/Product';
import db from '@/utils/db';

export default function Home({ products }) {
  return (
    <Layout title="Home Page">
      <div className=" flex flex-wrap justify-around">
        {products.map((product, index) => (
          <ProductItem product={product} key={index} />
        ))}
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
