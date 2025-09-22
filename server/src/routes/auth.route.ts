import { Router } from "express";
import { userLogin, userLogout, userRegistration } from "../controllers/auth.controller";
import userMiddleware from "../middlewares/user.middleware";

const authRouter = Router();

authRouter.post('/register', userRegistration);

authRouter.post('/login', userLogin);

authRouter.post('/logout', userMiddleware, userLogout)

export default authRouter;
