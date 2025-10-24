import { FileText, Image, Video, Music, MoreVertical, Download, Trash2, Share } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import useFileStore from "../store/fileStore";
import downloadFile from "../utils/downloadFile";
import useUserStore from "../store/userStore";
import ShareModel from "./ShareModel";

type FileProps = {
    id: string;
    name: string;
    type: string;         // mime or category
    size: number;         // raw bytes
    uploadedAt: string;   // ISO string
    parentFolder?: string;
};

const FileCard = ({ id, name, type, size, uploadedAt, parentFolder }: FileProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const { removeFile } = useFileStore();
    const { user } = useUserStore()

    const [shareModal, setShareModal] = useState(false)


    // Close menu if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    // Choose icon by type/mime
    const renderIcon = () => {
        if (!type) return <FileText className="text-gray-400" size={28} />;
        if (type.startsWith("image")) return <Image className="text-green-400" size={28} />;
        if (type.startsWith("video")) return <Video className="text-red-400" size={28} />;
        if (type.startsWith("audio")) return <Music className="text-yellow-400" size={28} />;
        if (type === "application/pdf") return <FileText className="text-pink-400" size={28} />; // PDF
        return <FileText className="text-blue-400" size={28} />;
    };


    // Convert bytes → KB / MB / GB
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const sizes = ["Bytes", "KB", "MB", "GB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    }

    // Format date nicely
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="w-full sm:w-fit flex items-center justify-between gap-3 bg-[#1E1E1E] rounded-lg p-3 border border-zinc-800 hover:border-violet-500 hover:shadow-[0_0_8px_rgba(139,92,246)] transition-all">
            {/* Left Section: Icon + File Info */}
            <div className="flex items-center gap-3 overflow-hidden">
                <div className="flex-shrink-0 p-2 bg-zinc-900 rounded-md">{renderIcon()}</div>
                <div className="flex flex-col overflow-hidden">
                    <span className="text-white font-medium truncate">{name}</span>
                    <span className="text-sm text-zinc-400">
                        {formatFileSize(size)} • {formatDate(uploadedAt)}
                    </span>
                </div>
            </div>

            {/* Right Section: Menu */}
            <div className="relative" ref={menuRef}>
                <button
                    className="p-2 rounded-md hover:bg-zinc-800"
                    onClick={() => setMenuOpen((prev) => !prev)}
                >
                    <MoreVertical className="text-zinc-400" size={18} />
                </button>

                {menuOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-[#2A2A2A] border border-zinc-700 rounded-lg shadow-lg z-20">
                        <button
                            onClick={() => {
                                if (user?._id) {
                                    downloadFile(user._id, parentFolder as string, name);
                                } else {
                                    console.error("User ID and parentFolder is undefined");
                                }
                                setMenuOpen(false);
                            }}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white hover:bg-zinc-700"
                        >
                            <Download size={16} /> Download
                        </button>
                        <button
                            onClick={async () => {
                                setMenuOpen(false);
                                const deleteConfirm = confirm("Are you sure?");
                                if (deleteConfirm) {
                                    await removeFile(id)
                                }
                            }}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-zinc-700"
                        >
                            <Trash2 size={16} /> Delete
                        </button>
                        <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white hover:bg-zinc-700" onClick={() => setShareModal(!shareModal)}>
                            <Share size={16} /> Share
                        </button>
                    </div>
                )}
            </div>
            {shareModal &&
                <ShareModel
                    setShareModal={setShareModal}
                    shareModal={shareModal}
                    fileId={id}
                />
            }
        </div>
    );
};

export default FileCard;
