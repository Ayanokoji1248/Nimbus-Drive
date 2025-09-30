import { create } from "zustand";
import type { fileProp } from "../interfaces";
import axios from "axios";
import { BACKEND_URL } from "../lib";

type fileStoreType = {
    files: fileProp[],
    fetchFiles: (currentFolder: string | null) => Promise<void>
    addFile: (file: File, parentFolder: string | null, fileURL: string) => Promise<void>
}

const useFileStore = create<fileStoreType>((set) => ({
    files: [],

    fetchFiles: async (currentFolder) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/file/all?parentFolder=${currentFolder}`, { withCredentials: true })
            console.log(response.data)
            set({ files: response.data.files });
        } catch (error) {
            console.error(error);
        }
    },

    addFile: async (file, parentFolder, fileURL) => {
        try {
            const { name, size, type } = file;

            const response = await axios.post(`${BACKEND_URL}/file/upload`, {
                name,
                size,
                type,
                fileUrl: fileURL,
                parentFolder
            }, { withCredentials: true })

            set((state) => ({
                files: [...state.files, response.data.file]
            }))
        } catch (error) {
            console.error(error)
        }
    }
}))

export default useFileStore;