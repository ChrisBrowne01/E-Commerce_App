const createError = require('http-errors');
const UserModel = require('../models/user');
const UserModelInstance = new UserModel();

module.exports = class UserService {
  
  async getUserById(id) {
    try {
      const user = await UserModelInstance.findById(id);
      if (!user) {
        throw createError(404, 'User not found');
      }
      return user;
    } catch (err) {
      throw createError(500, err);
    }
  }

  async updateUserById(id, data) {
    try {
      const user = await UserModelInstance.findById(id);
      if (!user) {
        throw createError(404, 'User not found');
      }
      // Update user data
      Object.assign(user, data);
      await user.save();
      return user;
    } catch (err) {
      throw createError(500, err);
    }
  }

  async deleteUserById(id) {
    try {
      const user = await UserModelInstance.findById(id);
      if (!user) {
        throw createError(404, 'User not found');
      }
      await user.delete();
      return { message: 'User deleted successfully' };
    } catch (err) {
      throw createError(500, err);
    }
  }
}
