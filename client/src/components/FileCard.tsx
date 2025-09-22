import { FileText, Image, Video, Music } from "lucide-react";

type FileProps = {
    name: string;
    type: "document" | "image" | "video" | "audio" | "other";
    size: string; // e.g. "2.3 MB"
    uploadedAt: string; // formatted date string
};

const FileCard = ({ name, type, size, uploadedAt }: FileProps) => {
    const renderIcon = () => {
        switch (type) {
            case "document":
                return <FileText className="text-blue-400" size={28} />;
            case "image":
                return <Image className="text-green-400" size={28} />;
            case "video":
                return <Video className="text-red-400" size={28} />;
            case "audio":
                return <Music className="text-yellow-400" size={28} />;
            default:
                return <FileText className="text-gray-400" size={28} />;
        }
    };

    return (
        <div className="flex items-center gap-3 bg-[#1E1E1E] rounded-lg p-3 border border-zinc-800 hover:border-violet-500 hover:shadow-[0_0_8px_rgba(139,92,246)] transition-all cursor-pointer">
            {/* File Icon */}
            <div className="flex-shrink-0 p-2 bg-zinc-900 rounded-md">{renderIcon()}</div>

            {/* File Info */}
            <div className="flex flex-col overflow-hidden">
                <span className="text-white font-medium truncate">{name}</span>
                <span className="text-sm text-zinc-400">{size} • {uploadedAt}</span>
            </div>
        </div>
    );
};

export default FileCard;
