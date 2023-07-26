import ProductItem from './ProductItem';

function ProductList({ products }) {
  return (
    <div className=" flex flex-wrap justify-around">
      {products?.length === 0 ? (
        <h1>Product not available</h1>
      ) : (
        products.map((product) => (
          <ProductItem product={product} key={product.slug} />
        ))
      )}
    </div>
  );
}

export default ProductList;
