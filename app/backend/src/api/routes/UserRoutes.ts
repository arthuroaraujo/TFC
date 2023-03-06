import { Router, Request, Response } from 'express';
import UserController from '../controllers/UserController';
import LoginMiddleware from '../middlewares/areLoginFieldValid';
import UserService from '../services/UserService';

const userRoutes = Router();

const userService = new UserService();
const userController = new UserController(userService);

userRoutes.post(
  '/',
  LoginMiddleware.test,
  (req: Request, res:Response) => userController.readByEmail(req, res),
);

export default userRoutes;
