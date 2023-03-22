const authRouter = require('./auth');
const cartRouter = require('./cart');
const orderRouter = require('./order');
const productRouter = require('./product');
const userRouter = require('./user');

module.exports = (app, passport) => {
  authRouter(app, passport);
  cartRouter(app);
  orderRouter(app);
  productRouter(app);
  userRouter(app);
}

// Handle all other invalid routes
router.all('*', (req, res, next) => {
  next(createError(404));
});

module.exports = router;
