import useUserStore from "../store/userStore"
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import FolderCard from "../components/FolderCard";
import { CirclePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FolderModal from "../components/FolderModal";
import UploadFileModal from "../components/UploadFileModal";
import useFolderStore from "../store/folderStore";

const DashboardPage = () => {
    const { user } = useUserStore();
    const { folders, fetchFolder } = useFolderStore()

    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const [folderModal, setFolderModal] = useState(false);
    const [fileModal, setFileModal] = useState(false);

    const [currentFolder, setCurrentFolder] = useState<string | null>(null)

    const [breadCrumbs, setBreadCrumbs] = useState<{ id: string | null, name: string }[]>([]);

    // open folder → add crumb
    const handleOpenFolder = (folder: { _id: string, folderName: string }) => {
        setCurrentFolder(folder._id);
        setBreadCrumbs((prev) => [...prev, { id: folder._id, name: folder.folderName }]);
    };

    // go back via breadcrumb
    const handleBreadcrumbClick = (id: string | null, index: number) => {
        setCurrentFolder(id);
        setBreadCrumbs((prev) => prev.slice(0, index + 1)); // keep only till clicked
    };

    // Close modal on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                setShowModal(false);
            }
        };

        if (showModal) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showModal]);

    // fetch folders when folder changes
    useEffect(() => {
        fetchFolder(currentFolder)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentFolder])

    return (
        <div className="flex flex-col w-full h-screen bg-zinc-950 text-white">

            {folderModal &&
                <FolderModal setFolderModal={setFolderModal} folderModal={folderModal} currentFolder={currentFolder} />
            }

            {fileModal && <UploadFileModal setFileModal={setFileModal} fileModal={fileModal} />}

            {/* Top Navbar */}
            <NavBar />

            {/* Layout container */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <SideBar />

                {/* Main Content */}
                <main className="flex-1 p-6 overflow-y-auto relative">
                    <div className="flex justify-between items-center py-3">
                        <h1 className="text-2xl font-semibold">
                            Welcome, {user?.username}
                        </h1>

                        <div className="relative" ref={modalRef}>
                            <button
                                onClick={() => setShowModal(!showModal)}
                                className="flex  gap-3 items-center bg-violet-500 p-2 px-3 text-sm font-medium rounded-md hover:bg-violet-600 transition cursor-pointer"
                            >
                                <CirclePlus size={22} /> Add Item
                            </button>

                            {showModal && (
                                <div className="absolute right-0 mt-2 w-42 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg p-2 z-12">
                                    <button
                                        onClick={() => setFileModal(!fileModal)}
                                        className="w-full text-left px-3 py-2 hover:bg-violet-600 rounded-md cursor-pointer"
                                    >
                                        Upload File
                                    </button>
                                    <button
                                        onClick={() => setFolderModal(!folderModal)}
                                        className="w-full text-left px-3 py-2 hover:bg-violet-600 rounded-md cursor-pointer"
                                    >
                                        Create Folder
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Breadcrumbs */}
                    <div>
                        <button
                            onClick={() => {
                                setCurrentFolder(null);
                                setBreadCrumbs([]); // reset breadcrumbs on home
                            }}
                            className="text-sm text-zinc-400 hover:text-violet-500 cursor-pointer transition-all"
                        >
                            /Home
                        </button>
                        {breadCrumbs.map((crumb, index) => (
                            <button
                                key={crumb.id}
                                onClick={() => handleBreadcrumbClick(crumb.id, index)}
                                className="text-sm text-zinc-400 hover:text-violet-500 cursor-pointer transition-all"
                            >
                                /{crumb.name}
                            </button>
                        ))}
                    </div>

                    <div className="py-3 flex items-center gap-y-3 justify-start space-x-3 flex-wrap">
                        {folders.length === 0 && (
                            <p className="text-sm font-medium text-zinc-500">No Files or Folders.</p>
                        )}

                        {folders.map((folder) => (
                            <button key={folder._id} onClick={() => handleOpenFolder(folder)}>
                                <FolderCard
                                    id={folder._id}
                                    name={folder.folderName}
                                />
                            </button>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default DashboardPage
