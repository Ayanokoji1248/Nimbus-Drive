import { Folder } from "lucide-react";

type FolderProps = {
    name: string;
    filesCount?: number;
    createdAt?: string; // formatted date string
};

const FolderCard = ({ name, filesCount, createdAt }: FolderProps) => {
    return (
        <div className="w-full sm:w-fit flex items-center gap-3 bg-[#1E1E1E] rounded-lg p-3 border border-zinc-800 hover:border-violet-600 hover:shadow-[0_0_12px_rgba(139,92,246,0.5)] transition-all cursor-pointer">
            {/* Folder Icon */}
            <div className="flex-shrink-0 p-2 bg-zinc-900 rounded-md">
                <Folder className="text-yellow-400" size={28} />
            </div>

            {/* Folder Info */}
            <div className="flex flex-col overflow-hidden">
                <span className="text-white font-medium truncate">{name}</span>
                <span className="text-sm text-zinc-400">
                    {filesCount} {filesCount === 1 ? "file" : "files"} • {createdAt}
                </span>
            </div>
        </div>
    );
};

export default FolderCard;
