import { Router } from "express";
import { fileUpload, getAllFiles } from "../controllers/file.controller";
import userMiddleware from "../middlewares/user.middleware";
const fileRouter = Router();

fileRouter.post('/upload', userMiddleware, fileUpload);

fileRouter.get('/all', userMiddleware, getAllFiles)

export default fileRouter;