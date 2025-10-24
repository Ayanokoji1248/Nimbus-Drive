import axios from "axios"
import { X } from "lucide-react"
import type React from "react"
import { useState } from "react"
import { BACKEND_URL } from "../lib"
import { createPortal } from "react-dom"
import toast from "react-hot-toast"


interface ShareModalProps {
    setShareModal: React.Dispatch<React.SetStateAction<boolean>>
    shareModal: boolean,
    fileId: string,
}

const ShareModel = ({ setShareModal, fileId }: ShareModalProps) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [shareEmail, setShareEmail] = useState<string>("");
    const [error, setError] = useState("");
    const root = document.getElementById("root")

    const handleShare = async () => {
        if (!shareEmail || !shareEmail.includes("@")) {
            setError("Enter Email")
            return
        }
        setLoading(true)
        try {
            await axios.post(`${BACKEND_URL}/file/${fileId}/share`, { email: shareEmail }, { withCredentials: true })
            // console.log(response.data)
            toast.success("File Share Successfully", { duration: 1000 })
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
            setShareModal(false)
        }
    }

    if (!root) return;



    return createPortal(
        <div className="absolute inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-99">
            <div className="w-80 bg-zinc-900 rounded-2xl shadow-xl p-5 relative">
                {/* Close Button */}
                <button
                    onClick={() => {
                        console.log("Share Click")
                        setShareModal(false)
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-zinc-800 transition-colors"
                >
                    <X size={18} className="text-zinc-400 hover:text-white" />
                </button>

                {/* Content */}
                <div className="flex flex-col gap-3 mt-2">
                    <h1 className="text-xl font-semibold text-center text-white">
                        Enter Email of user
                    </h1>

                    <input
                        value={shareEmail}
                        onChange={(e) => {
                            setError("")
                            setShareEmail(e.target.value)
                        }}
                        className="w-full p-2 text-sm rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white placeholder-zinc-500"
                        type="email"
                        placeholder="Enter Email"
                    />

                    {error && <p className="text-xs font-medium text-red-500">{error}</p>}

                    <button
                        onClick={() => handleShare()}
                        className="w-full py-2 rounded-lg font-medium text-white bg-violet-600 hover:bg-violet-700 active:scale-[0.98] transition-all cursor-pointer"
                    >
                        {loading ? "Sharing..." : "Share"}
                    </button>
                </div>
            </div>
        </div>,
        root
    )
}

export default ShareModel