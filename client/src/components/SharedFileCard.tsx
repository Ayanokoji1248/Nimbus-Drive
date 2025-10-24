import { FileText, Image, Video, Music, Download, User } from "lucide-react";
import { useState } from "react";
import downloadFile from "../utils/downloadFile";

type SharedFileProps = {
    id: string;
    name: string;
    type: string;
    size: number;
    uploadedAt: string;
    sharedBy: {
        _id: string;
        username: string;
        email: string;
    };
    parentFolder?: string;
};

const SharedFileCard = ({
    name,
    type,
    size,
    uploadedAt,
    sharedBy,
    parentFolder,
}: SharedFileProps) => {
    const [downloading, setDownloading] = useState(false);

    const renderIcon = () => {
        if (!type) return <FileText className="text-gray-400" size={28} />;
        if (type.startsWith("image")) return <Image className="text-green-400" size={28} />;
        if (type.startsWith("video")) return <Video className="text-red-400" size={28} />;
        if (type.startsWith("audio")) return <Music className="text-yellow-400" size={28} />;
        if (type === "application/pdf") return <FileText className="text-pink-400" size={28} />;
        return <FileText className="text-blue-400" size={28} />;
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const handleDownload = async () => {
        if (!sharedBy?._id) return console.error("Missing user or folder");
        setDownloading(true);
        try {
            await downloadFile(sharedBy._id, parentFolder as string, name);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div
            className="w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 
                 bg-[#1E1E1E] rounded-xl p-4 border border-zinc-800 
                 hover:border-violet-500 hover:shadow-[0_0_8px_rgba(139,92,246)] 
                 transition-all duration-200"
        >
            {/* Left Section */}
            <div className="flex items-start sm:items-center gap-3 w-full sm:w-auto">
                <div className="flex-shrink-0 p-2 bg-zinc-900 rounded-lg">{renderIcon()}</div>

                <div className="flex flex-col w-full overflow-hidden">
                    <span className="text-white font-medium text-sm sm:text-base truncate">{name}</span>
                    <span className="text-xs sm:text-sm text-zinc-400">
                        {formatFileSize(size)} • {formatDate(uploadedAt)}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] sm:text-xs text-violet-400 mt-1">
                        <User size={12} />
                        <span>
                            Shared by{" "}
                            <span className="text-white font-medium">
                                {sharedBy.username || sharedBy.email}
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full sm:w-auto flex justify-center items-center gap-2 px-4 py-2 
                   rounded-md bg-violet-600 hover:bg-violet-700 text-white text-sm 
                   active:scale-[0.98] transition-all disabled:opacity-60"
            >
                <Download size={16} />
                {downloading ? "Downloading..." : "Download"}
            </button>
        </div>
    );
};

export default SharedFileCard;
