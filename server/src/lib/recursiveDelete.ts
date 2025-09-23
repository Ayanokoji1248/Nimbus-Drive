import File from "../models/file.model";
import Folder from "../models/folder.model"

export const deleteFolderRecursive = async (folderId: string) => {
    const folder = await Folder.findById(folderId).populate("files");

    if (!folder) return

    if (folder.files && folder.files.length > 0) {
        await File.deleteMany({ _id: { $in: folder.files } })
    }

    const subFolders = await Folder.find({ parentFolder: folder._id });


    for (const subFolder of subFolders) {
        await deleteFolderRecursive(subFolder._id.toString())
    }

    await Folder.findByIdAndDelete(folder._id)

}