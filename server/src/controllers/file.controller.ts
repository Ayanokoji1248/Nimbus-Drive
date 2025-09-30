import e, { Request, Response, NextFunction } from "express";
import File from "../models/file.model";

export const fileUpload = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, size, type, fileUrl, parentFolder } = req.body;

        const userId = req.user.id

        const file = new File({
            fileName: name,
            fileSize: size,
            fileType: type,
            fileUrl: fileUrl,
            parentFolder: parentFolder,
            user: userId
        })

        await file.save();

        res.status(200).json({
            message: "File Upload Successfully",
            file
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getAllFiles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { parentFolder } = req.query;
        const userId = req.user.id;


        if (parentFolder === "null" || parentFolder === undefined) {
            parentFolder = null as any;
        }

        const files = await File.find({ parentFolder: parentFolder, user: userId });

        res.status(200).json({
            message: "All user files",
            files
        })


    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}