import morgan from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

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
server.use(cors({
  origin: 'http://localhost:5176', 
  credentials: true 
}));



// Routes
server.use('/auth', authRouter);

// Protected Routes
server.use(auth);
server.get('/session', (req, res) => {
  res.send({ message: 'Session is valid' });
});
server.use('/users', userRouter);

server.use(errorHandler);

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

