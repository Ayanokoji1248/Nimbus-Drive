import { Router } from "express";
import { deleteFile, fileUpload, getAllFiles, getSharedFiles, searchFile, shareFile } from "../controllers/file.controller";
import userMiddleware from "../middlewares/user.middleware";
const fileRouter = Router();

fileRouter.post('/upload', userMiddleware, fileUpload);

fileRouter.get('/all', userMiddleware, getAllFiles)

fileRouter.get('/search', userMiddleware, searchFile)

fileRouter.get('/sharedFile', userMiddleware, getSharedFiles)

fileRouter.delete('/:id', userMiddleware, deleteFile)

fileRouter.post('/:id/share', userMiddleware, shareFile)


export default fileRouter;