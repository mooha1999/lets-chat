import { Router } from "express";
import UsersController from "../controllers/users-controller";
const usersRouter = Router();
usersRouter.post('/login', UsersController.login);

usersRouter.post('/signup', UsersController.signup);

export default usersRouter;