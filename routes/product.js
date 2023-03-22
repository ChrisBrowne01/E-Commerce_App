const express = require('express');
const router = express.Router();
const ProductService = require('../services/ProductService');
const productService = new ProductService();

router.get('/', async (req, res, next) => {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch(err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      res.status(404).send('Product not found');
    } else {
      res.json(product);
    }
  } catch(err) {
    next(err);
  }
});

module.exports = router;
