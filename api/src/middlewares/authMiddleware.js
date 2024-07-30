import jwt from 'jsonwebtoken';

import { ServerError } from './errorHandler.js';
import { generateAccessToken } from '../utils/authUtils.js';

export const auth = async (req, res, next) => {
  try {
    // Get Tokens
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    // If the user don't have access token refuse the request
    if (!accessToken) {
      throw new ServerError('Invalid session', 401);
    }

    // Decode Access Token
    try {
      let decodedAccessToken = jwt.verify(
        accessToken,
        process.env.ACCESS_SECRET ?? 'secret',
      );

      // Save the userId in the request
      if (decodedAccessToken) {
        req.userId = decodedAccessToken.id;
        return next();
      }
    } catch (error) {
      // If the access token is expired create a new one with the refresh token
      // If the refresh token is expired too refuse the request
      if (refreshToken) {
        let decodedRefreshToken;
        try {
          decodedRefreshToken = jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET ?? 'secret',
          );
        } catch (error) {
          throw new ServerError('Invalid session', 401);
        }

        const newAccessToken = generateAccessToken({
          id: decodedRefreshToken.id,
          email: decodedRefreshToken.email,
          name: decodedRefreshToken.name,
        });

        res.cookie('accessToken', newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 15 * 60 * 1000,
        });

        req.userId = decodedRefreshToken.id;

        return next();
      } else {
        throw new ServerError('Invalid session', 401);
      }
    }
  } catch (error) {
    next(error);
  }
};
