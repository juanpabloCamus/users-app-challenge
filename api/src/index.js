import morgan from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';

import { errorHandler } from './middlewares/errorHandler.js';
import { authRouter } from './routes/authRouter.js';
import { auth } from './middlewares/authMiddleware.js';
import sequelize from './database/database.js';

const PORT = process.env.PORT || 3001;

const server = express();

server.use(express.json());
server.use(cookieParser());
server.use(morgan('dev'));

// Routes
server.use('/auth', authRouter);

// Protected Routes
server.use(auth);

server.use(errorHandler);

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

