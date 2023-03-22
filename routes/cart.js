const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const CartService = require('../services/CartService');
const cartService = new CartService();

router.post('/', async (req, res, next) => {
  try {
    const cart = await cartService.createCart(req.body);
    res.status(201).json(cart);
  } catch(err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const cart = await cartService.getCartById(req.params.id);
    res.json(cart);
  } catch(err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const cart = await cartService.updateCartById(req.params.id, req.body);
    res.json(cart);
  } catch(err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await cartService.deleteCartById(req.params.id);
    res.sendStatus(204);
  } catch(err) {
    next(err);
  }
});

router.all('*', (req, res, next) => {
  next(createError(404));
});

module.exports = router;
