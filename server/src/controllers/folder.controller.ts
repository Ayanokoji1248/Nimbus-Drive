import { Request, Response, NextFunction } from "express";
import Folder from "../models/folder.model";
import { deleteFolderRecursive } from "../lib/recursiveDelete";


export const createFolder = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = req.user.id;
        const { folderName } = req.body;
        let { parentFolder } = req.query;

        if (parentFolder === "null" || parentFolder === undefined) {
            parentFolder = null as any;
        }

        const folder = new Folder({
            folderName,
            parentFolder,
            user: userId
        })

        await folder.save();

        res.status(201).json({
            message: "Folder Created Successfully",
            folder
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}


export const getAllFolder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id
        let { parentFolder } = req.query

        if (parentFolder === "null" || parentFolder === undefined) {
            parentFolder = null as any;
        }

        const folders = await Folder.find({ parentFolder, user: userId });

        res.status(200).json({
            folders
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}

export const deleteFolder = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { id } = req.params;

        if (!id) {
            res.status(404).json({
                message: "Id not there"
            })
            return
        }

        const folder = await Folder.findById(id);

        if (!folder) {
            res.status(404).json({
                message: "Folder not found"
            })
            return
        }

        deleteFolderRecursive(id);

        res.status(200).json({
            message: "Folder Deleted Successfully"
        })
        return

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}