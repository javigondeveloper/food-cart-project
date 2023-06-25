import { useContext } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { Store } from '@/utils/Store';
import db from '@/utils/db';
import Product from '@/models/Product';

export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);

  if (!product) {
    return (
      <Layout title="Product not found">
        <h1>Product Not Found</h1>
      </Layout>
    );
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems?.find(
      (i) => i.slug.toLowerCase() === product.slug.toLowerCase()
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const response = await fetch(`/api/products/${product._id}`);
    const productAPI = await response.json();

    if (productAPI.stock < quantity) {
      alert('Sorry, product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link className=" font-medium" href="/">
          back to products
        </Link>
      </div>
      <div className="grid  min-h-full p-4 md:p-8 md:grid-cols-4 md:gap-3 md:h-min bg-sky-50 ">
        <div className="    md:col-span-2      relative  ">
          <img
            className="m-auto rounded-lg "
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
            <li className="max-h-full overflow-scroll md:max-h-32">
              {product.description}
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
          <button className="primary-button w-full" onClick={addToCartHandler}>
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
