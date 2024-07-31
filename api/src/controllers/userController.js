import UserService from '../services/userService.js';
import { validateUpdateUserEntry } from '../validators/userValidator.js';

export default class UserController {
  static async getUsers(req, res, next) {
    try {
      const users = await UserService.getUsers();
      return res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { name, email } = validateUpdateUserEntry(req.body);

      const user = await UserService.updateUser(id, name, email);
      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const userDeleted = await UserService.deleteUser(id);
      return res.status(200).send(userDeleted);
    } catch (error) {
      next(error);
    }
  }
}
