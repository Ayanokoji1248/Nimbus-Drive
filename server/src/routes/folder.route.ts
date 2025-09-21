import { Router } from "express"
import { createFolder, getAllFolder } from "../controllers/folder.controller";
import userMiddleware from "../middlewares/user.middleware";
const folderRouter = Router();

folderRouter.post('/create', userMiddleware, createFolder);
folderRouter.get('/', userMiddleware, getAllFolder)

export default folderRouter;