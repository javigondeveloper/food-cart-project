import Link from 'next/link';
import useCart from '@/hooks/useCart';
import formatNumber from '@/utils/formatNumber';

export default function ProductItem({ product }) {
  const { addItemToCart } = useCart(product);

  return (
    <div className="card productCard relative">
      <div className={product.stockAvailable > 0 ? 'invisible' : 'visible'}>
        <div className="absolute top-[40%] left-[25%] z-10 h-[70px] w-[200px] border-4 border-red-700 rounded-lg text-red-700 text-4xl text-center leading-[70px] align-middle -rotate-45">
          SOLD OUT
        </div>
      </div>
      <div
        className={
          product.stockAvailable > 0 ? '' : 'pointer-events-none opacity-60'
        }
      >
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
          <Link href={`/product/${product.slug}`}>
            <h2 className="text-lg font-bold text-center">{product.name}</h2>
          </Link>
          <p className="mb-2">{product.brand}</p>
          <p>{formatNumber(product.price, product.currency)}</p>
          <button
            className="primary-button"
            type="button"
            onClick={addItemToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
