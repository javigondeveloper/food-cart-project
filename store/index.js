import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';

export const Store = createContext();

const initialState = {
  productsAvailables: [],
  cart: Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart'))
    : {
        cartItems: [],
        shippingAddress: {},
        paymentMethod: '',
      },
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PRODUCTS_AVAILABLES': {
      return { ...state, productsAvailables: action.payload };
    }
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      // create a copy of cartItems with no product description to avoid exceeding cookie storage limit
      const cartItemsCopy = JSON.stringify(cartItems);
      const itemsForCookies = JSON.parse(cartItemsCopy);
      itemsForCookies.forEach((i) => delete i.description);
      Cookies.set(
        'cart',
        JSON.stringify({ ...state.cart, cartItems: itemsForCookies })
      );

      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      );
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_RESET': {
      //logout
      Cookies.remove('cart');
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: '',
        },
      };
    }
    case 'CART_CLEAR_ITEMS': {
      Cookies.set(
        'cart',
        JSON.stringify({
          ...state.cart,
          cartItems: [],
        })
      );
      return {
        ...state,
        cart: { ...state.cart, cartItems: [] },
      };
    }
    case 'SAVE_SHIPPING_ADDRESS': {
      Cookies.set(
        'cart',
        JSON.stringify({
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload,
          },
        })
      );
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload,
          },
        },
      };
    }
    case 'SAVE_PAYMENT_METHOD': {
      Cookies.set(
        'cart',
        JSON.stringify({
          ...state.cart,
          paymentMethod: action.payload,
        })
      );
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      };
    }
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
