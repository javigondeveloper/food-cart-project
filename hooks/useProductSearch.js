import { Store } from '@/store';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import useProductsWithStock from './useProductsWithStock';

function useProductSearch(product) {
  const [searchResult, setSearchResult] = useState([]);
  const [totalDocuments, setTotalDocuments] = useState();
  useProductsWithStock({
    products: searchResult,
    totalProducts: totalDocuments,
  });
  const { dispatch } = useContext(Store);
  const lastSearch = useRef('');
  const searchProduct = useCallback(
    async (productToSearch) => {
      try {
        const response = await fetch(
          `/api/products/search?product=${productToSearch}`
        );
        if (response.status > 399) {
          dispatch({
            type: 'SET_ERROR',
            payload: 'Something went wrong',
          });
          return { result: [], documents: 0 };
        } else {
          dispatch({
            type: 'RESET_ERROR',
          });
        }
        const { result, documents } = await response.json();

        return { result, documents };
      } catch (e) {
        return e;
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (lastSearch.current !== product) {
      searchProduct(product).then((response) => {
        setSearchResult(response.result);
        setTotalDocuments(response.documents);
      });
      lastSearch.current = product;
    }
  }, [product, searchProduct]);

  return { productsWhitStock: searchResult };
}

export default useProductSearch;
