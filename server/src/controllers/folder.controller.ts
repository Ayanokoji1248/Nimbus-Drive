import { Request, Response, NextFunction } from "express";
import Folder from "../models/folder.model";


export const createFolder = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { folderName } = req.body;
        let { parentFolder } = req.query;

        if (parentFolder === "null" || parentFolder === undefined) {
            parentFolder = null as any;
        }

        const folder = new Folder({
            folderName,
            parentFolder
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

        let { parentFolder } = req.query

        if (parentFolder === "null" || parentFolder === undefined) {
            parentFolder = null as any;
        }

        const folders = await Folder.find({ parentFolder });

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