import User from '../models/User.js';
import { ServerError } from '../middlewares/errorHandler.js';

export default class UserService {

  /**
   * Find user by email.
   * @param email - User email.
   * @returns A promise that resolves the found user.
   * @throws Error if there is an error with the query.
   */
  static async findUserByEmail(email) {
      const user = await User.findOne({ where: { email } });
      return user;

  }
  
  /**
   * Insert a new user.
   * @param newUser - The new user entry.
   * @returns A promise that resolves to the created user.
   * @throws Error if there is an error with the insert with query.
   */
  static async createUser(newUser) {
      const createdUser = await User.create(newUser);
      return createdUser;

  }

  /**
   * Get all users.
   * @returns A promise that resolves to all users.
   * @throws Error if there is an error with the query.
   */
  static async getUsers() {
      return await User.findAll({ attributes: { exclude: ['password'] } });
  }

  /**
   * Get user by id.
   * @param id - User id.
   * @param name - User name.
   * @param email - User email.
   * @returns A promise that resolves to the found user.
   * @throws Error if there is an error with the query.
   */
  static async updateUser(id, name, email) {
      const user = await User.findByPk(id);
      if (!user) {
        throw new ServerError('User not found', 404);
      }
      await user.update({ name, email });
      return user;

  }

  /**
   * Delete user by id.
   * @param id - User id.
   * @returns A promise that resolves to the deleted user.
   * @throws Error if there is an error with the query.
   */
  static async deleteUser(id) {
      const user = await User.findByPk(id);
      if (!user) {
        throw new ServerError('User not found', 404);
      }
      await user.destroy();
      return user;
  }
}
