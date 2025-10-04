import e, { Request, Response, NextFunction } from "express";
import File from "../models/file.model";
import deleteFromSupabase from "../lib/supabaseDelete";

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
        const userEmail = req.user.email


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


export const deleteFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const fileId = req.params.id;
        const userId = req.user.id

        const file = await File.findById(fileId);

        if (!file) {
            res.status(404).json({
                message: "File not found"
            })
            return
        }

        const filePath = `${userId}/${file?.parentFolder}/${file?.fileName}`
        console.log(filePath)
        const supabaseDeleted = await deleteFromSupabase(filePath)

        console.log(supabaseDeleted);

        if (!supabaseDeleted) {
            res.status(500).json({ message: "Error deleting file from Supabase" });
            return
        }


        const deletedFile = await File.deleteOne({ _id: fileId, user: userId });

        if (deletedFile.deletedCount === 0) {
            return res.status(404).json({ message: "File not found or unauthorized" });
        }

        res.status(200).json({
            message: "File Deleted Successfully"
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


export const shareFile = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = req.user.id;
        const { email } = req.body;
        const fileId = req.params.id

        const file = await File.findById(fileId);

        if (!file) {
            res.status(404).json({
                message: "File not found"
            })
            return
        }

        if (file.user?.toString() !== userId) {
            res.status(403).json({
                message: "Unauthorized Access"
            })
            return
        }

        if (!file.sharedWith.includes(email)) {
            file.sharedWith.push(email);
        }

        await file.save()


    } catch (error) {
        console.error(error);
    }
}

export const getSharedFiles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userEmail = req.user.email;

        const files = await File.find({ sharedWith: userEmail });

        res.status(200).json({
            message: "All Shared Files",
            files
        })

    } catch (error) {
        console.error(error);
    }
}