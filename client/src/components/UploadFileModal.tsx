import { useState, type ChangeEvent } from "react";
import { UploadCloud, X } from "lucide-react";
import useUserStore from "../store/userStore";
import { uploadFile } from "../utils/uploadFile";
import useLoadingStore from "../store/loadingStore";
import useFileStore from "../store/fileStore";

interface UploadFileModalProps {
    fileModal: boolean;
    setFileModal: React.Dispatch<React.SetStateAction<boolean>>;
    currentFolder: string | null,
}

const UploadFileModal = ({ setFileModal, fileModal, currentFolder }: UploadFileModalProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState("");
    const { user } = useUserStore();
    const { loading, setLoading } = useLoadingStore();
    const { addFile } = useFileStore();

    // Handle file input
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            const MAX_SIZE = 50 * 1024 * 1024;

            if (selectedFile.size > MAX_SIZE) {
                setError("⚠️ File size cannot exceed 50 MB.");
                setFile(null);
                return;
            }

            setFile(e.target.files[0]);
            setError("");
        }
    };

    const handleSubmit = async () => {
        if (!file) {
            setError("⚠️ Please select a file before uploading.");
            return;
        }

        try {
            setLoading(true)
            const fileURL = await uploadFile(user?._id as string, currentFolder as string, file);

            await addFile(file, currentFolder, fileURL);

            setFileModal(false);

            console.log(fileURL)
        } catch (error) {
            console.error(error);

        } finally {
            setLoading(false);
        }


    };
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const sizes = ["Bytes", "KB", "MB", "GB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-lg p-5 relative animate-in fade-in zoom-in duration-200">
                {/* Close Button */}
                <button
                    onClick={() => setFileModal(!fileModal)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-800 transition-colors"
                >
                    <X size={18} className="text-zinc-400 hover:text-white" />
                </button>

                {/* Title */}
                <h1 className="text-lg font-semibold text-center text-white mb-4">
                    Upload File
                </h1>

                {/* Upload Box */}
                <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-zinc-700 rounded-xl cursor-pointer bg-zinc-900 hover:bg-zinc-800 transition group"
                >
                    <UploadCloud
                        size={36}
                        className="text-violet-500 mb-2 group-hover:scale-110 transition-transform"
                    />
                    <p className="text-sm text-zinc-400">
                        Click to <span className="text-violet-400">choose a file</span>
                    </p>
                    <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleChange}
                    />
                </label>

                {/* Error Message */}
                {error && (
                    <p className="text-sm text-red-400 mt-2 text-center">{error}</p>
                )}

                {/* File Preview */}
                {file && (
                    <div className="mt-4 p-3 bg-zinc-800 rounded-lg flex items-center justify-between">
                        <div>
                            <p className="text-white text-sm">{file.name}</p>
                            <p className="text-xs text-zinc-400">
                                {formatFileSize(file.size)}
                            </p>
                        </div>
                        <button
                            onClick={() => setFile(null)}
                            className="text-red-400 hover:text-red-500 text-sm font-medium cursor-pointer"
                        >
                            Remove
                        </button>
                    </div>
                )}


                {/* Submit Button */}
                <button
                    disabled={loading}
                    onClick={handleSubmit}
                    className="w-full mt-5 py-2 rounded-lg font-medium text-white bg-violet-600 hover:bg-violet-700 active:scale-[0.98] transition-all cursor-pointer"
                >
                    Upload File
                </button>
            </div>
        </div>
    );
};

export default UploadFileModal;
