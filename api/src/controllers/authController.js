import {
  validateLoginEntry,
  validateNewUserEntry,
} from '../validators/userValidator.js';
import {
  comparePasswords,
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} from '../utils/authUtils.js';
import UserService from '../services/userService.js';

export default class AuthController {
  static async login(req, res, next) {
    try {
      // Validate Entries
      const userToLogin = validateLoginEntry(req.body);

      // Find the user
      const user = await UserService.findUserByEmail(userToLogin.email);

      // Validate Credentials
      if (!user) {
        return res
          .status(401)
          .send({ message: 'The email or password is incorrect.' });
      }

      const isPasswordMatch = await comparePasswords(
        userToLogin.password,
        user.password,
      );

      if (!isPasswordMatch) {
        return res
          .status(401)
          .send({ message: 'The email or password is incorrect.' });
      }

      // Generate Tokens
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(200).send({
        id: user.id,
        name: user.name,
        email: user.email,
        balance: user.balance,
      });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      // Validate Entries
      const newUser = validateNewUserEntry(req.body);

      // Hash Password
      const hashedPassword = await hashPassword(newUser.password);

      // Create the user
      const createdUser = await UserService.createUser({
        ...newUser,
        password: hashedPassword,
      });

      return res.status(201).json(createdUser);
    } catch (error) {
      next(error);
    }
  }
}
