import { useEffect, useState } from "react"
import { type fileProp } from "../interfaces"
import axios from "axios";
import { BACKEND_URL } from "../lib";
import FileCard from "../components/FileCard";

const SearchPage = () => {

    const [files, setFiles] = useState<fileProp[]>([]);
    const [query, setQuery] = useState("")

    useEffect(() => {

        if (!query) {
            setFiles([]);
            return
        }

        const timeout = setTimeout(async () => {
            const response = await axios.get(`${BACKEND_URL}/file/search?q=${query}`, { withCredentials: true })
            // console.log(response.data)
            setFiles(response.data.files)
        }, 500)

        return () => {
            clearTimeout(timeout)
        }

    }, [query])

    return (
        <div className="min-h-screen w-full bg-zinc-950 p-8">

            <div className="mb-4">
                <h1 className="text-3xl font-bold">Search your files</h1>
            </div>

            <div>
                <input value={query} onChange={(e) => {
                    setQuery(e.target.value)
                }} type="text" className="p-2 border outline-0 rounded-md bg-zinc-900 border-zinc-800 text-sm w-96" placeholder="Search your files" />
            </div>
            {
                files.length === 0 &&
                <div className="mt-4 p-3">
                    <p className="text-sm text-zinc-500 font-medium">No Files.</p>
                </div>
            }

            {files.length > 0 &&
                <div className="mt-5 flex flex-wrap gap-4">
                    {files.map((file) => (
                        <FileCard
                            key={file._id}
                            id={file._id}
                            name={file.fileName}
                            type={file.fileType}
                            size={file.fileSize}
                            uploadedAt={file.createdAt}
                        />
                    ))}
                </div>
            }


        </div>
    )
}

export default SearchPage