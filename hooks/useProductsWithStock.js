import { Store } from '@/store';
import getQuantityUpdated from '@/utils/getQuantityUpdated';
import { useContext, useEffect } from 'react';

function useProductsWithStock({ products, totalProducts }) {
  const { state, dispatch } = useContext(Store);
  const { productsAvailables, error } = state;
  const { cartItems } = state.cart;

  useEffect(() => {
    const productsWhitStock = [...products];
    productsWhitStock.forEach(
      (p) => (p.stockAvailable = getQuantityUpdated(cartItems, p))
    );

    dispatch({
      type: 'SET_PRODUCTS_AVAILABLES',
      payload: productsWhitStock,
    });
  }, [cartItems, products, dispatch]);

  return { error, productsAvailables, totalProducts };
}

export default useProductsWithStock;
