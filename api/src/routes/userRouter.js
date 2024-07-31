import { Router } from 'express';
import UserController from '../controllers/userController.js';

const userRouter = Router();

userRouter.get('/', UserController.getUsers);
userRouter.put('/:id', UserController.updateUser);
userRouter.delete('/:id', UserController.deleteUser);

export default userRouter;
