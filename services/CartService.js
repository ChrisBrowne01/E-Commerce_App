const createError = require('http-errors');
const CartModel = require('../models/cart');
const CartModelInstance = new CartModel();

module.exports = class CartService {

async getCart(userId) {
try {
  // Find the cart for the specified user
  const cart = await CartModelInstance.findOneByUserId(userId);

  // If cart not found, return an empty cart object
  if (!cart) {
    return { userId, items: [] };
  }

    // Otherwise, return the cart object
    return cart;

  } catch(err) {
    throw createError(500, err);
  }
};

async addToCart(userId, item) {
  try {
  // Get the user's cart
  let cart = await this.getCart(userId);

    // Add the item to the cart
    cart.items.push(item);

    // Update the cart in the database
    return await CartModelInstance.updateByUserId(userId, cart);

  } catch(err) {
    throw createError(500, err);
  }
};

  async removeFromCart(userId, itemIndex) {
  try {
  // Get the user's cart
  let cart = await this.getCart(userId);

  // Remove the item at the specified index
  cart.items.splice(itemIndex, 1);

  // Update the cart in the database
  return await CartModelInstance.updateByUserId(userId, cart);

} catch(err) {
  throw createError(500, err);
}
};

}