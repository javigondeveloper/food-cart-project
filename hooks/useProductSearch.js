import { Store } from '@/store';
import { useContext, useEffect, useState } from 'react';

function useProductSearch({ page = 1, limit = 10 }) {
  const { state } = useContext(Store);
  const { productsInitialState, totalProductsInitialState, productToSearch } =
    state;
  const [productsFound, setProductsFound] = useState([]);
  const [totalProductsFound, setTotalProductsFound] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // initialize state
    setProductsFound(productsInitialState);
    setTotalProductsFound(totalProductsInitialState);
  }, [productsInitialState, totalProductsInitialState]);

  useEffect(() => {
    // Search handler
    let ignoreSearch = false;
    setLoading(true);

    const searchProduct = async () => {
      try {
        const response = await fetch(
          `/api/products/search?product=${productToSearch}&page=${page}&limit=${limit}`
        );
        if (response.status > 399) {
          return setError('Sorry, something went wrong, try again later');
        }
        setError('');

        if (!ignoreSearch) {
          const { result, documents } = await response.json();
          setTotalProductsFound(documents);
          if (page === 1) {
            setProductsFound(result);
          } else {
            setProductsFound((productsFound) => [...productsFound, ...result]);
          }
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    searchProduct();

    return () => {
      ignoreSearch = true;
    };
  }, [productToSearch, page, limit, productsInitialState]);

  return {
    productsFound,
    loading,
    totalProductsFound,
    error,
  };
}

export default useProductSearch;
