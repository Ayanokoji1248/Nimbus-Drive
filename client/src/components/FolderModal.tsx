import { X } from "lucide-react";
import { useState } from "react";
import useFolderStore from "../store/folderStore";
import useLoadingStore from "../store/loadingStore";

interface FolderModalProps {
    folderModal: boolean;
    setFolderModal: React.Dispatch<React.SetStateAction<boolean>>;
    currentFolder: string | null
}

const FolderModal = ({ setFolderModal, folderModal, currentFolder }: FolderModalProps) => {
    const [folderName, setFolderName] = useState("");
    const [error, setError] = useState("");

    const { addFolder } = useFolderStore();
    const { loading, setLoading } = useLoadingStore();

    const handleSubmit = async () => {
        if (folderName.trim() === "") {
            setError("Please enter folder name");
            return
        }
        setLoading(true)
        await addFolder(folderName, currentFolder)
        setFolderModal(false)
        setLoading(false)
    }

    return (
        <div className="absolute inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-15">
            <div className="w-80 bg-zinc-900 rounded-2xl shadow-xl p-5 relative">
                {/* Close Button */}
                <button
                    onClick={() => setFolderModal(!folderModal)}
                    className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-zinc-800 transition-colors"
                >
                    <X size={18} className="text-zinc-400 hover:text-white" />
                </button>

                {/* Content */}
                <div className="flex flex-col gap-3 mt-2">
                    <h1 className="text-xl font-semibold text-center text-white">
                        Create New Folder
                    </h1>

                    <input
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        className="w-full p-2 text-sm rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white placeholder-zinc-500"
                        type="text"
                        placeholder="Enter folder name"
                    />

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <button
                        onClick={() => handleSubmit()}
                        className="w-full py-2 rounded-lg font-medium text-white bg-violet-600 hover:bg-violet-700 active:scale-[0.98] transition-all cursor-pointer"
                    >
                        {loading ? "Creating Folder..." : "Create Folder"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FolderModal;
