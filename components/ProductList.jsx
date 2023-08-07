import ProductItem from './ProductItem';
import usePagination from '@/hooks/usePagination';
import ScrollToTopButton from './ScrollToTopButton';

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
        <ScrollToTopButton />
      </div>
      {loading && (
        <div className="text-center">
          <h2>Loading...</h2>
        </div>
      )}
      {error && (
        <div className="text-center">
          <h2>{error}</h2>
        </div>
      )}
    </>
  );
}

export default ProductList;
