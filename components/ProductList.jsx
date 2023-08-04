import ProductItem from './ProductItem';
import usePagination from '@/hooks/usePagination';

function ProductList() {
  const { productsFound, loading, error, lastElementRef } = usePagination();

  return (
    <>
      <div className=" flex flex-wrap justify-around">
        {productsFound?.length === 0 ? (
          <h1>Product not available</h1>
        ) : (
          productsFound.map((product, index) => {
            if (productsFound.length === index + 1) {
              return (
                <ProductItem
                  productRef={lastElementRef}
                  product={product}
                  key={product.slug}
                />
              );
            } else {
              return <ProductItem product={product} key={product.slug} />;
            }
          })
        )}
      </div>
      <div className="text-center">{loading && <h2>Loading...</h2>}</div>
      <div className="text-center">{error && <h2>{error}</h2>}</div>
    </>
  );
}

export default ProductList;
