/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';

export default function ProductItem({ product }) {
  return (
    <div className="card productCard">
      <div className=" relative w-full h-1/2">
        <Link href={`/product/${product.slug}`}>
          <Image
            fill
            src={product.image}
            alt={product.name}
            className="rounded shadow object-contain"
          />
        </Link>
      </div>
      <div className=" flex flex-col flex-grow items-center justify-between p-5">
        <Link href={`/product/${product.name}`}>
          <h2 className="text-lg font-bold text-center">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>{`EUR ${product.price}`}</p>
        <button className="primary-button" type="button">
          Add to cart
        </button>
      </div>
    </div>
  );
}
