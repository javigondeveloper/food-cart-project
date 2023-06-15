import Layout from '@/components/Layout';
import ProductItem from '@/components/ProductItem';
import data from '@/utils/data';

export default function Home() {
  return (
    <Layout title="Home Page">
      <div className=" flex flex-wrap justify-around">
        {data.products.map((product, index) => (
          <ProductItem product={product} key={index} />
        ))}
      </div>
    </Layout>
  );
}
