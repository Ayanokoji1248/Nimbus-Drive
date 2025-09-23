import { Router } from "express"
import { createFolder, deleteFolder, getAllFolder } from "../controllers/folder.controller";
import userMiddleware from "../middlewares/user.middleware";
const folderRouter = Router();

folderRouter.post('/create', userMiddleware, createFolder);
folderRouter.get('/', userMiddleware, getAllFolder)

folderRouter.delete('/:id', userMiddleware, deleteFolder)

export default folderRouter;