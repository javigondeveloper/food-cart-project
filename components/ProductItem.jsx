import Link from 'next/link';
import useCart from '@/hooks/useCart';

export default function ProductItem({ product }) {
  const { addItemToCart } = useCart(product);

  return (
    <div className="card productCard">
      <div className=" relative  w-full h-2/3 flex justify-center items-center bg-white rounded-lg">
        <Link href={`/product/${product.slug}`} className=" h-fit">
          <img
            src={product.image}
            alt={product.name}
            className=" rounded-lg  object-cover m-auto"
          />
        </Link>
      </div>
      <div className=" flex flex-col flex-grow items-center justify-between p-5">
        <Link href={`/product/${product.name}`}>
          <h2 className="text-lg font-bold text-center">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>{`EUR ${product.price}`}</p>
        <button
          className="primary-button"
          type="button"
          onClick={addItemToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
