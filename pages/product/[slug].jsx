import Link from 'next/link';
import Layout from '@/components/Layout';
import db from '@/utils/db';
import Product from '@/models/Product';
import useCart from '@/hooks/useCart';
import { useContext, useEffect, useState } from 'react';
import formatNumber from '@/utils/formatNumber';
import { Store } from '@/store';

export default function ProductScreen(props) {
  const { state } = useContext(Store);
  const [available, setAvailable] = useState();
  const { product } = props;
  const { addItemToCart } = useCart(product);

  useEffect(() => {
    const { cartItems } = state.cart;
    const quantityInCart =
      cartItems.find((p) => p._id === product._id)?.quantity || 0;
    if (product.stock > quantityInCart) {
      setAvailable(true);
    } else {
      setAvailable(false);
    }
  }, [product, state]);

  if (!product) {
    return (
      <Layout title="Product not found">
        <h1>Product Not Found</h1>
      </Layout>
    );
  }

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link className=" font-medium" href="/">
          back to products
        </Link>
      </div>
      <div className="grid   p-4 md:p-8 md:grid-cols-4 md:gap-3 md:h-min  ">
        <div className=" md:col-span-2 relative ">
          <img
            className="m-auto rounded-lg max-h-[200px] "
            src={product.image}
            alt={product.name}
          ></img>
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
            <h3 className="font-bold">Description:</h3>
            <li className="max-h-[200px] border mt-1 mb-4 overflow-scroll md:max-h-32">
              {product.description}
            </li>
          </ul>
        </div>
        <div className="card h-fit p-5">
          <div className="mb-2 flex justify-between">
            <div>Price</div>
            <div> {formatNumber(product.price, product.currency)}</div>
          </div>
          <div className="mb-2 flex justify-between">
            <div>Satus</div>

            <div className={available ? '' : 'text-red-500'}>
              {available ? 'In stock' : 'Unavailable'}
            </div>
          </div>

          <button
            className="primary-button w-full disabledClass "
            onClick={addItemToCart}
            disabled={!available}
          >
            Add to cart
          </button>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
