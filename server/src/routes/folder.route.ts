import { Router } from "express"
import { createFolder, getAllFolder } from "../controllers/folder.controller";
const folderRouter = Router();


folderRouter.post('/create', createFolder);
folderRouter.get('/', getAllFolder)


export default folderRouter;