/**
 *
 * @param {Array} ItemsInCart all The products in cart
 * @param {Product} product current product inserted in cart
 * @returns {number } the product stock minus quantity in cart
 */
const getQuantityUpdated = (ItemsInCart, product) => {
  const productInCart = ItemsInCart.find((i) => i._id === product._id);
  if (productInCart) {
    return product.stock - productInCart.quantity;
  }
  return product.stock;
};

export default getQuantityUpdated;
