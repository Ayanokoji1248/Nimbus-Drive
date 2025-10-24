import FolderCard from "../components/FolderCard"
import FileCard from "../components/FileCard"
import FolderModal from "../components/FolderModal"
import UploadFileModal from "../components/UploadFileModal"
import SkeletonCard from "../components/SkeletonCard"
import useFolderStore from "../store/folderStore"
import useFileStore from "../store/fileStore"
import useLoadingStore from "../store/loadingStore"
// import { Toaster } from "react-hot-toast"
import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import useUserStore from "../store/userStore"

const DashboardPage = () => {
    const { user } = useUserStore()
    const { folders, fetchFolder } = useFolderStore()
    const { files, fetchFiles } = useFileStore()
    const { loading, setLoading } = useLoadingStore()

    const [currentFolder, setCurrentFolder] = useState<string | null>(null)
    const [breadCrumbs, setBreadCrumbs] = useState<{ id: string | null; name: string }[]>([])
    const [folderModal, setFolderModal] = useState(false)
    const [fileModal, setFileModal] = useState(false)

    // open folder → add crumb
    const handleOpenFolder = (folder: { _id: string; folderName: string }) => {
        setCurrentFolder(folder._id)
        setBreadCrumbs((prev) => [...prev, { id: folder._id, name: folder.folderName }])
    }

    // go back via breadcrumb
    const handleBreadcrumbClick = (id: string | null, index: number) => {
        setCurrentFolder(id)
        setBreadCrumbs((prev) => prev.slice(0, index + 1))
    }

    // fetch folders/files on folder change
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

        <>
            <div className="flex flex-1 flex-col overflow-hidden" id="root">
                {/* Top Navbar */}
                {/* <NavBar /> */}


                {/* Breadcrumb + Actions */}
                <div
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between 
             gap-4 sm:gap-0 px-4 sm:px-8 py-4 sm:py-5 
             border-b border-zinc-800 bg-zinc-950"
                >
                    {/* Left Section */}
                    <div>
                        <h1 className="capitalize text-lg sm:text-xl lg:text-2xl font-bold text-white">
                            Welcome {user?.username}
                        </h1>
                    </div>

                    {/* Right Section */}
                    <div className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-3">
                        <button
                            onClick={() => setFileModal(true)}
                            className="flex items-center justify-center gap-2 rounded-md bg-violet-600 
                 px-4 py-2 text-sm sm:text-md font-medium 
                 hover:bg-violet-700 transition-colors cursor-pointer 
                 w-full sm:w-auto"
                        >
                            <Plus size={16} /> Upload File
                        </button>

                        <button
                            onClick={() => setFolderModal(true)}
                            className="flex items-center justify-center gap-2 rounded-md bg-violet-600 
                 px-4 py-2 text-sm sm:text-md font-medium 
                 hover:bg-violet-700 transition-colors cursor-pointer 
                 w-full sm:w-auto"
                        >
                            <Plus size={16} /> New Folder
                        </button>
                    </div>
                </div>


                <div className="flex items-center gap-2 text-sm py-4 px-8 ">
                    <button
                        onClick={() => {
                            setCurrentFolder(null)
                            setBreadCrumbs([])
                        }}
                        className="text-zinc-400 hover:text-violet-500 transition-colors text-md font-semibold cursor-pointer"
                    >
                        Home
                    </button>
                    {breadCrumbs.map((crumb, index) => (
                        <button
                            key={crumb.id}
                            onClick={() => handleBreadcrumbClick(crumb.id, index)}
                            className="text-zinc-400 hover:text-violet-500 transition-colors text-md font-semibold cursor-pointer"
                        >
                            / {crumb.name}
                        </button>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="flex-1 overflow-auto px-6 py-4">
                    {loading ? (
                        <div className="flex gap-3 flex-wrap">
                            {[...Array(6)].map((_, i) => (
                                <SkeletonCard key={i} />
                            ))}
                        </div>
                    ) : folders.length === 0 && files.length === 0 ? (
                        <div className="flex h-full items-center justify-center text-zinc-500 text-sm">
                            No files or folders found.
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-4">
                            {folders.map((folder) => (
                                <div key={folder._id} onClick={() => handleOpenFolder(folder)} className="cursor-pointer">
                                    <FolderCard id={folder._id} name={folder.folderName} createdAt={folder.createdAt} />
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
                        </div>
                    )}
                </div>
            </div>

            {/* Modals */}
            {folderModal && <FolderModal setFolderModal={setFolderModal} folderModal={folderModal} currentFolder={currentFolder} />}
            {fileModal && <UploadFileModal setFileModal={setFileModal} fileModal={fileModal} currentFolder={currentFolder} />}
        </>

    )
}

export default DashboardPage
