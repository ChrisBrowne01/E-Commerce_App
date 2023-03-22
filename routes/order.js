const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const OrderService = require('../services/OrderService');
const orderService = new OrderService();

router.post('/', async (req, res, next) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch(err) {
    next(err);
  }
});

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.params.orderId);
    res.json(order);
  } catch(err) {
    next(err);
  }
});

router.put('/:orderId', async (req, res, next) => {
  try {
    const order = await orderService.updateOrder(req.params.orderId, req.body);
    res.json(order);
  } catch(err) {
    next(err);
  }
});

router.delete('/:orderId', async (req, res, next) => {
  try {
    await orderService.deleteOrder(req.params.orderId);
    res.sendStatus(204);
  } catch(err) {
    next(err);
  }
});

// Handle all other invalid routes
router.all('*', (req, res, next) => {
  next(createError(404));
});

module.exports = router;
