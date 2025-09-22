import { CloudUpload } from "lucide-react"

const SideBar = () => {
    return (
        <div className='w-72 bg-[#141414] p-6'>
            <div className="group">

                <div className="flex items-center gap-3">
                    <div className='p-3 bg-[#1E1E1E] w-fit rounded-xl'>
                        <CloudUpload size={30} className='text-violet-500' />
                    </div>
                    <h1 className='text-violet-700 text-2xl font-bold'>Cimbus Drive</h1>
                </div>

                <div className="flex items-center justify-center mt-1">
                    <div className="border-[1.5px] border-violet-600 rounded-full w-12 transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(139,92,246)] group-hover:border-violet-500" />
                </div>
            </div>

        </div>
    )
}

export default SideBar