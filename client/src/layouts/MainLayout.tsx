import SideBar from "../components/SideBar"
import { Toaster } from "react-hot-toast"
import { Outlet } from "react-router-dom"


const MainLayout = () => {
    return (
        <div className="flex h-screen bg-zinc-950 text-white">
            <Toaster position="bottom-right" />

            {/* Sidebar */}
            <SideBar />

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout