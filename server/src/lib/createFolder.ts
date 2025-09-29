import supabase from "../config/supabaseClient"

const createFolder = async (userId: string, folderName: string, file: Blob) => {
    try {
        const { error } = await supabase.storage.from("nimbus-drive").upload(`${userId}/${folderName}/.init`, file)

        if (error) throw error;
        console.log("Folder created successfully");
    } catch (error) {
        console.error(error)
    }
}