import { useState, type ChangeEvent } from "react";
import { UploadCloud, X } from "lucide-react";

interface UploadFileModalProps {
    fileModal: boolean;
    setFileModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadFileModal = ({ setFileModal, fileModal }: UploadFileModalProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState("");

    // Handle file input
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setError("");
        }
    };

    const handleSubmit = () => {
        if (!file) {
            setError("⚠️ Please select a file before uploading.");
            return;
        }
        console.log(file);
    };

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
                                {(file.size / 1024).toFixed(2)} KB
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
