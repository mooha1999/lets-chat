import { Router } from "express";
import UsersControllers from "../controllers/users-controller";
const usersRouter = Router();
usersRouter.post('/login', UsersControllers.login);

usersRouter.post('/signup', UsersControllers.signup);

usersRouter.get('/friends/:uid', UsersControllers.getAllUsers);

export default usersRouter;