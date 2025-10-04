import { CloudUpload, LogOut } from "lucide-react"
import useUserStore from "../store/userStore"

const SideBar = () => {

    const {clearUser} = useUserStore();
    return (
        <div className='lg:w-72 w-20 bg-[#141414] lg:p-6 flex flex-col justify-between h-screen'>
            {/* Top Logo */}
            <div className="group">
                <div className="flex justify-center items-center gap-3">
                    <div className='p-3 bg-[#1E1E1E] w-fit rounded-xl'>
                        <CloudUpload size={30} className='text-violet-500' />
                    </div>
                    <h1 className='text-violet-700 text-2xl hidden lg:block font-bold'>Cimbus Drive</h1>
                </div>

                <div className="flex items-center justify-center mt-1">
                    <div className="border-[1.5px] border-violet-600 rounded-full w-12 transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(139,92,246)] group-hover:border-violet-500" />
                </div>
            </div>

            {/* Logout Button */}
            <button onClick={clearUser} className="flex justify-center lg:justify-start mt-6 cursor-pointer hover:bg-red-700/20 p-3 rounded-lg items-center gap-3">
                <LogOut size={20} className="text-red-500" />
                <span className="hidden lg:block text-red-500 font-semibold">Logout</span>
            </button>
        </div>
    )
}

export default SideBar
