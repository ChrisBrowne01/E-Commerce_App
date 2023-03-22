const createError = require('http-errors');
const OrderModel = require('../models/order');
const OrderModelInstance = new OrderModel();

module.exports = class OrderService {

async createOrder(userId, cart) {
  try {
    // Create a new order object
    const order = {
    userId,
    items: cart.items,
    total: cart.items.reduce((acc, item) => acc + item.price, 0)
    };
    
    // Save the order in the database
    return await OrderModelInstance.create(order);

  } catch(err) {
    throw createError(500, err);
  }
};

async getOrders(userId) {
  try {
  // Find all orders for the specified user
  const orders = await OrderModelInstance.findAllByUserId(userId);

    // Return the orders array
    return orders;

  } catch(err) {
    throw createError(500, err);
  }
};

async getOrder(orderId) {
  try {
  // Find the order with the specified ID
  const order = await OrderModelInstance.findById(orderId);

    // If order not found, throw a 404 error
    if (!order) {
      throw createError(404, 'Order not found');
    }

    // Otherwise, return the order object
    return order;

  } catch(err) {
    throw createError(500, err);
  }
};

}