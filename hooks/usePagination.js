import { Store } from '@/store';
import { useContext, useEffect, useRef, useState } from 'react';
import useProductSearch from './useProductSearch';

export default function usePagination({ limit = 10 } = {}) {
  const [page, setPage] = useState(1);
  const { state } = useContext(Store);
  const { productToSearch } = state;
  const { productsFound, loading, totalProductsFound, error } =
    useProductSearch({ page, limit });
  const lastElementRef = useRef();
  const hasMorePages = totalProductsFound > productsFound.length;

  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

  useEffect(() => {
    // reset page nr and scroll position when
    // input search has changed
    setPage(1);
    scrollToTop();
  }, [productToSearch]);

  useEffect(() => {
    // Pagination handler
    const observerHandler = (entries) => {
      if (loading || error) {
        return;
      }

      if (entries[0].isIntersecting && hasMorePages) {
        setPage((page) => page + 1);
      }
    };
    const observer = new IntersectionObserver(observerHandler, {
      rootMargin: '200px',
    });

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }
    if (!hasMorePages) {
      observer.disconnect();
    }
    return () => observer.disconnect();
  }, [error, hasMorePages, loading, productsFound, totalProductsFound]);

  return {
    productsFound,
    totalProductsFound,
    loading,
    error,
    lastElementRef,
    page,
  };
}
