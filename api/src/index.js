import morgan from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';

import { errorHandler } from './middlewares/errorHandler.js';
import { authRouter } from './routes/authRouter.js';
import { auth } from './middlewares/authMiddleware.js';
import sequelize from './database/database.js';
import userRouter from './routes/userRouter.js';

const PORT = process.env.PORT || 3003;

const server = express();

server.use(express.json());
server.use(cookieParser());
server.use(morgan('dev'));

// Enable CORS
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Routes
server.use('/auth', authRouter);
server.use('/users', userRouter);

// Protected Routes
server.use(auth);

server.use(errorHandler);

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

