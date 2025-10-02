import { Router } from "express";
import { deleteFile, fileUpload, getAllFiles } from "../controllers/file.controller";
import userMiddleware from "../middlewares/user.middleware";
const fileRouter = Router();

fileRouter.post('/upload', userMiddleware, fileUpload);

fileRouter.get('/all', userMiddleware, getAllFiles)

fileRouter.delete('/:id', userMiddleware, deleteFile)

export default fileRouter;