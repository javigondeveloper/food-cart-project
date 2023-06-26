const getQuantityUpdated = (ItemsInCart, product) => {
  const productInCart = ItemsInCart.find((i) => i._id === product._id);
  if (productInCart) {
    return product.stock - productInCart.quantity;
  }
  return product.stock;
};

export default getQuantityUpdated;
