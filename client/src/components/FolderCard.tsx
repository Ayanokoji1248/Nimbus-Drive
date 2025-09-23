import { Folder, MoreVertical, Trash2, Pencil } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type FolderProps = {
    id: string;
    name: string;
    filesCount?: number;
    createdAt?: string;
    onDelete?: (id: string) => void;
    onRename?: (id: string) => void;
};

const FolderCard = ({ id, name, filesCount = 0, createdAt, onDelete, onRename }: FolderProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            className="relative w-full sm:w-fit flex items-center justify-between gap-3 bg-[#1E1E1E] rounded-lg p-3 border border-zinc-800 hover:border-violet-600 hover:shadow-[0_0_12px_rgba(139,92,246,0.5)] transition-all cursor-pointer"
            ref={menuRef}
        >
            {/* Left side */}
            <div className="flex items-center gap-3 overflow-hidden">
                <div className="flex-shrink-0 p-2 bg-zinc-900 rounded-md">
                    <Folder className="text-yellow-400" size={28} />
                </div>
                <div className="flex flex-col overflow-hidden">
                    <span className="text-white font-medium truncate">{name}</span>
                    <span className="text-sm text-zinc-400">
                        {filesCount} {filesCount === 1 ? "file" : "files"} • {createdAt}
                    </span>
                </div>
            </div>

            {/* 3-dot context menu */}
            <div className="relative">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen((prev) => !prev);
                    }}
                    className="p-2 rounded-md hover:bg-zinc-800 transition-colors"
                >
                    <MoreVertical size={20} className="text-zinc-400" />
                </button>

                {menuOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-[#1E1E1E] border border-zinc-700 rounded-lg shadow-lg overflow-hidden z-20">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setMenuOpen(false);
                                onRename?.(id);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 transition"
                        >
                            <Pencil size={16} /> Rename
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setMenuOpen(false);
                                onDelete?.(id);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 transition"
                        >
                            <Trash2 size={16} /> Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FolderCard;
