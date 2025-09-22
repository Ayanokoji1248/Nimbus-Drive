import axios from "axios";
import useUserStore from "../store/userStore"
import { BACKEND_URL } from "../lib";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import FileCard from "../components/FileCard";
import FolderCard from "../components/FolderCard";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
    const navigate = useNavigate()
    const { user, clearUser } = useUserStore();

    const logout = async () => {
        try {
            await axios.post(`${BACKEND_URL}/auth/logout`, {}, {
                withCredentials: true
            })
            clearUser()
            navigate('/login')
            // console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex flex-col w-full h-screen bg-zinc-950 text-white">
            {/* Top Navbar */}
            <NavBar />

            {/* Layout container */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <SideBar />

                {/* Main Content */}
                <main className="flex-1 p-6 overflow-y-auto">

                    <div className="flex justify-between items-center">

                        <h1 className="text-2xl font-semibold mb-4">
                            Welcome, {user?.username}
                        </h1>
                        <button
                            onClick={logout}
                            className="bg-red-500 p-2 px-5 text-sm font-medium rounded-md hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
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