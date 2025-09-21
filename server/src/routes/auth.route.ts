import { Router } from "express";
import { userLogin, userRegistration } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post('/register', userRegistration);

authRouter.post('/login', userLogin);

export default authRouter;
