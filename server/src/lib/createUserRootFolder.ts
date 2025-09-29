import supabase from "../config/supabaseClient"

const rootFolderCreate = async (userId: string) => {
    try {

        const { error } = await supabase.storage.from("nimbus-drive").upload(`${userId}/.init`, new Blob([]))

        if (error) throw error;
        console.log("Root folder created successfully")

    } catch (error) {
        console.error(error)
    }
}

export default rootFolderCreate