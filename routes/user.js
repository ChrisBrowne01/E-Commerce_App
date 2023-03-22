const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');
const userService = new UserService();

router.get('/', async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch(err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      res.status(404).send('User not found');
    } else {
      res.json(user);
    }
  } catch(err) {
    next(err);
  }
});

module.exports = router;
