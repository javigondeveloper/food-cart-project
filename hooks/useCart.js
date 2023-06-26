import { useContext } from 'react';
import { Store } from '@/utils/Store';
import { toast } from 'react-toastify';

function useCart(product) {
  const { state, dispatch } = useContext(Store);
  const existItemInCart = state.cart.cartItems?.find(
    (i) => i.slug.toLowerCase() === product.slug.toLowerCase()
  );

  const addItemToCart = async () => {
    const quantity = existItemInCart ? existItemInCart.quantity + 1 : 1;

    const response = await fetch(`/api/products/${product._id}`);
    const productAPI = await response.json();

    if (productAPI.stock < quantity) {
      toast.error('Sorry, product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

    toast.success('Product added to the cart');
  };

  return { addItemToCart };
}

export default useCart;
