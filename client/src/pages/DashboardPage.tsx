import useUserStore from "../store/userStore"
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import FolderCard from "../components/FolderCard";
import { CirclePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FolderModal from "../components/FolderModal";
import UploadFileModal from "../components/UploadFileModal";
import useFolderStore from "../store/folderStore";
import useLoadingStore from "../store/loadingStore";
import useFileStore from "../store/fileStore";
import FileCard from "../components/FileCard";
import SkeletonCard from "../components/SkeletonCard";
import { Toaster } from "react-hot-toast";

const DashboardPage = () => {
    const { user } = useUserStore();
    const { folders, fetchFolder } = useFolderStore()
    const { files, fetchFiles } = useFileStore();
    const { loading, setLoading } = useLoadingStore()

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
        const fetch = async () => {
            setLoading(true)
            await fetchFolder(currentFolder)
            await fetchFiles(currentFolder)
            setLoading(false)
        }
        fetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentFolder])

    return (
        <div className="flex flex-col w-full h-screen bg-zinc-950 text-white">
            <Toaster position="bottom-right" reverseOrder={false} />

            {folderModal &&
                <FolderModal setFolderModal={setFolderModal} folderModal={folderModal} currentFolder={currentFolder} />
            }

            {fileModal && <UploadFileModal setFileModal={setFileModal} fileModal={fileModal} currentFolder={currentFolder} />}

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

                        {loading ? (
                            // Show skeletons while fetching
                            <div className="flex gap-3 flex-wrap">
                                {[...Array(6)].map((_, i) => (
                                    <SkeletonCard key={i} />
                                ))}
                            </div>
                        ) : (
                            <>
                                {(folders.length === 0 && files.length === 0) && (
                                    <p className="text-sm font-medium text-zinc-500">
                                        No Files or Folders.
                                    </p>
                                )}

                                {folders.map((folder) => (
                                    <div key={folder._id} onClick={() => handleOpenFolder(folder)}>
                                        <FolderCard
                                            id={folder._id}
                                            name={folder.folderName}
                                            createdAt={folder.createdAt}
                                        />
                                    </div>
                                ))}

                                {files.map((file) => (
                                    <FileCard
                                        key={file._id}
                                        id={file._id}
                                        name={file.fileName}
                                        type={file.fileType}
                                        size={file.fileSize}
                                        uploadedAt={file.createdAt}
                                        parentFolder={file.parentFolder}
                                    />
                                ))}
                            </>
                        )}



                    </div>
                </main>
            </div>
        </div>
    )
}

export default DashboardPage
