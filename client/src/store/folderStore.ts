import { create } from "zustand";
import type { folderProp } from "../interfaces";
import axios from "axios";
import { BACKEND_URL } from "../lib";

type folderStoreType = {
    folders: folderProp[],
    fetchFolder: (currentFolder: string | null) => void,
    addFolder: (folder: string, parentFolder: string | null) => void;
}

const useFolderStore = create<folderStoreType>((set) => ({
    folders: [],
    fetchFolder: async (currentFolder) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/folder?parentFolder=${currentFolder}`, { withCredentials: true })
            console.log(response.data);
            set({ folders: response.data.folders })
        } catch (error) {
            console.error(error)
        }
    },
    addFolder: async (newFolder, parentFolder) => {

        try {

            const response = await axios.post(`${BACKEND_URL}/folder/create?parentFolder=${parentFolder}`, {
                folderName: newFolder
            }, { withCredentials: true })

            set((state) => ({
                folders: [...state.folders, response.data.folder]
            }))

        } catch (error) {
            console.error(error)
        }

    }
}))

export default useFolderStore;