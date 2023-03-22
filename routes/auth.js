const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const AuthService = require('../services/AuthService');
const authService = new AuthService();

router.post('/register', async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch(err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await authService.login(req.body);
    res.json(user);
  } catch(err) {
    next(err);
  }
});

// Handle all other invalid routes
router.all('*', (req, res, next) => {
  next(createError(404));
});

module.exports = router;
  