import { useContext } from 'react';
import { Store } from '@/utils/Store';

function useCart(product) {
  const { state, dispatch } = useContext(Store);

  const addItemToCart = async () => {
    const existItem = state.cart.cartItems?.find(
      (i) => i.slug.toLowerCase() === product.slug.toLowerCase()
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const response = await fetch(`/api/products/${product._id}`);
    const productAPI = await response.json();

    if (productAPI.stock < quantity) {
      alert('Sorry, product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };

  return { addItemToCart };
}

export default useCart;
