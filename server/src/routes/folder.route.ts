import { Router } from "express"
import { createFolder } from "../controllers/folder.controller";
const folderRouter = Router();


folderRouter.post('/create', createFolder)


export default folderRouter;