import Layout from '@/components/Layout';
import data from '@/utils/data';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ProductScreen() {
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase()
  );
  if (!product) {
    return <h1>Product Not Found</h1>;
  }
  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link className=" font-medium" href="/">
          back to products
        </Link>
      </div>
      <div className="grid h-min p-4 md:p-8 md:grid-cols-4 md:gap-3 bg-sky-50 ">
        <div className="    md:col-span-2    rounded shadow relative  ">
          <img className="m-auto" src={product.image} alt={product.name}></img>
        </div>
        <div className=" font-medium text-center md:text-left md:ml-4">
          <ul>
            <li>
              <h1 className="text-lg font-bold">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.reviews} reviews
            </li>
          </ul>
        </div>
        <div className="card h-fit p-5">
          <div className="mb-2 flex justify-between">
            <div>Price</div>
            <div>Eur {product.price}</div>
          </div>
          <div className="mb-2 flex justify-between">
            <div>Satus</div>
            <div>{product.stock > 0 ? 'In stock' : 'Unavailable'}</div>
          </div>
          <button className="primary-button w-full">Add to cart</button>
        </div>
      </div>
    </Layout>
  );
}
