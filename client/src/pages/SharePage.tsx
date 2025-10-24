import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../lib";
import { type fileProp } from "../interfaces";
import SharedFileCard from "../components/SharedFileCard";

const SharePage = () => {

    const [files, setFiles] = useState<fileProp[]>([]);


    const getSharedFiles = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/file/sharedFile`, { withCredentials: true });
            // console.log(response.data)
            setFiles(response.data.files);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getSharedFiles()
    }, [])

    return (
        <div className="p-8">
            <h1 className="font-bold text-3xl">Shared Files</h1>
            {files.length === 0 &&
                <p className="text-zinc-500 mt-3 text-sm">No Files Shared.</p>
            }
            {
                files.length > 0 &&
                <div className="mt-5 flex flex-wrap gap-3">
                    {files.map((file) => (
                        <SharedFileCard
                            key={file._id}
                            id={file._id}
                            name={file.fileName}
                            type={file.fileType}
                            size={file.fileSize}
                            uploadedAt={file.createdAt}
                            parentFolder={file.parentFolder}
                            sharedBy={file.user}
                        />
                    ))}
                </div>
            }
        </div>
    )
}

export default SharePage