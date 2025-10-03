import supabase from "../config/supabase"

async function downloadFile(userId: string, folderName: string, fileName: string) {
    const santizeFileName = fileName
        .replace(/[^\w\s]/gi, "") // remove emojis/special chars
        .replace(/\s+/g, "_")     // spaces → underscores
        .replace(/_+/g, "_")      // collapse multiple underscores
        .toLowerCase();
    const filePath = `${userId}/${folderName}/${santizeFileName}`
    console.log(filePath)
    const { data, error } = await supabase.storage.from('nimbus-drive').download(filePath)
    console.log(data)
    if (error) {
        console.error("Error in downloading file: ", error);
        return
    }

    const url = URL.createObjectURL(data);

    const a = document.createElement('a');
    a.href = url
    a.download = fileName;
    document.body.appendChild(a);
    a.click()
    a.remove()

    URL.revokeObjectURL(url)

}

export default downloadFile;