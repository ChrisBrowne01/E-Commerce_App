const createError = require('http-errors');
const ProductModel = require('../models/product');
const ProductModelInstance = new ProductModel();

module.exports = class ProductsService {

  async createProduct(data) {
    try {
      return await ProductModelInstance.create(data);
    } catch (err) {
      throw createError(500, err);
    }
  }

  async getProductById(productId) {
    try {
      const product = await ProductModelInstance.findById(productId);
      if (!product) {
        throw createError(404, 'Product not found');
      }
      return product;
    } catch (err) {
      throw createError(500, err);
    }
  }

  async updateProductById(productId, data) {
    try {
      const product = await ProductModelInstance.findByIdAndUpdate(productId, data, { new: true });
      if (!product) {
        throw createError(404, 'Product not found');
      }
      return product;
    } catch (err) {
      throw createError(500, err);
    }
  }

  async deleteProductById(productId) {
    try {
      const product = await ProductModelInstance.findByIdAndDelete(productId);
      if (!product) {
        throw createError(404, 'Product not found');
      }
      return product;
    } catch (err) {
      throw createError(500, err);
    }
  }
};
