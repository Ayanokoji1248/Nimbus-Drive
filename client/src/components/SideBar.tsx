import { CloudUpload, Home, LogOut, Search, Share } from "lucide-react"
import useUserStore from "../store/userStore"
import { Link } from "react-router-dom";

const SideBar = () => {

    const { clearUser } = useUserStore();
    return (
        <div className='lg:w-72 w-20 bg-[#141414] lg:p-6 py-5 flex flex-col justify-between h-screen border-r-[1px] border-zinc-800'>
            {/* Top Logo */}
            <div className="flex flex-col">
                <div className="group">
                    <div className="flex justify-center items-center gap-3">
                        <div className='p-3 bg-[#1E1E1E] w-fit rounded-xl'>
                            <CloudUpload size={30} className='text-violet-500' />
                        </div>
                        <h1 className='text-violet-700 text-2xl hidden lg:block font-bold'>Nimbus Drive</h1>
                    </div>

                    <div className="flex items-center justify-center mt-1">
                        <div className="border-[1.5px] border-violet-600 rounded-full w-12 transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(139,92,246)] group-hover:border-violet-500" />
                    </div>
                </div>


                <div className="flex flex-col p-4 mt-5 ">
                    <Link to={'/dashboard'} className="w-fit font-semibold text-lg hover:bg-zinc-800 transtion-all duration-300 p-3 rounded-full flex cursor-pointer items-center gap-4"><Home /> <span className="hidden lg:flex">Home</span></Link>
                    <Link to={'/search'} className="w-fit font-semibold text-lg hover:bg-zinc-800 transtion-all duration-300 p-3 rounded-full flex cursor-pointer items-center gap-4"><Search /> <span className="hidden lg:flex">Search</span></Link>
                    <Link to={'/share-with-me'} className="w-fit flex font-semibold text-lg hover:bg-zinc-800 transtion-all duration-300 p-3 rounded-full  cursor-pointer items-center gap-4"><Share />
                        <span className="hidden lg:flex">Share with me</span></Link>

                </div>
            </div>

            {/* Logout Button */}
            <button onClick={clearUser} className="flex justify-center lg:justify-start cursor-pointer hover:bg-red-700/20 p-3 rounded-lg items-center gap-3">
                <LogOut size={20} className="text-red-500" />
                <span className="hidden lg:block text-red-500 font-semibold">Logout</span>
            </button>
        </div>
    )
}

export default SideBar
