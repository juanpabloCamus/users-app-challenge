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
    try {
      const user = await User.findOne({ where: { email } });
      return user;
    } catch (error) {
      console.error(error);
      throw new ServerError('Internal Server Error');
    }
  }
  
  /**
   * Insert a new user.
   * @param newUser - The new user entry.
   * @returns A promise that resolves to the created user.
   * @throws Error if there is an error with the insert with query.
   */
  static async createUser(newUser) {
    try {
      const createdUser = await User.create(newUser);
      return createdUser;
    } catch (error) {
      console.error(error);
      throw new ServerError('Internal Server Error');
    }
  }
}
