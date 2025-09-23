import useUserStore from "../store/userStore"
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import FileCard from "../components/FileCard";
import FolderCard from "../components/FolderCard";
import { CirclePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FolderModal from "../components/FolderModal";
import UploadFileModal from "../components/UploadFileModal";

const DashboardPage = () => {
    const { user } = useUserStore();

    // const logout = async () => {
    //     try {
    //         await axios.post(`${BACKEND_URL}/auth/logout`, {}, {
    //             withCredentials: true
    //         })
    //         clearUser()
    //         navigate('/login')
    //         // console.log(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const [folderModal, setFolderModal] = useState(false);
    const [fileModal, setFileModal] = useState(false);

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

    return (
        <div className="flex flex-col w-full h-screen bg-zinc-950 text-white">

            {folderModal &&
                <FolderModal setFolderModal={setFolderModal} folderModal={folderModal} />
            }

            {
                fileModal && <UploadFileModal setFileModal={setFileModal} fileModal={fileModal} />
            }
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
                                <div className="absolute right-0 mt-2 w-42 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg p-2">
                                    <button onClick={() => setFileModal(!fileModal)} className="w-full text-left px-3 py-2 hover:bg-violet-600 rounded-md cursor-pointer">Upload File</button>
                                    <button onClick={() => setFolderModal(!folderModal)} className="w-full text-left px-3 py-2 hover:bg-violet-600 rounded-md cursor-pointer">Create Folder</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="py-3 flex items-center gap-y-3 justify-start space-x-3 flex-wrap">
                        <FileCard
                            name="ProjectReport.pdf"
                            type="document"
                            size="2.3 MB"
                            uploadedAt="Sep 20, 2025"
                        />
                        <FolderCard
                            name="College Projects"
                            filesCount={12}
                            createdAt="Sep 21, 2025"
                        />
                        <FolderCard
                            name="Personal Documents"
                            filesCount={5}
                            createdAt="Sep 15, 2025"
                        />
                        <FolderCard
                            name="Personal Documents"
                            filesCount={5}
                            createdAt="Sep 15, 2025"
                        />
                        <FileCard
                            name="VacationPhoto.png"
                            type="image"
                            size="1.1 MB"
                            uploadedAt="Sep 18, 2025"
                        />
                        <FileCard
                            name="LectureRecording.mp4"
                            type="video"
                            size="45 MB"
                            uploadedAt="Sep 15, 2025"
                        />
                    </div>


                </main>
            </div>
        </div>
    )
}

export default DashboardPage