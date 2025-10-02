import supabase from "../config/supabase";

export const uploadFile = async (userId: string, folderName: string, file: File): Promise<string> => {
    try {
        const fileName = file.name
            .replace(/[^\w\s]/gi, "") // remove emojis/special chars
            .replace(/\s+/g, "_")     // spaces → underscores
            .replace(/_+/g, "_")      // collapse multiple underscores
            .toLowerCase();            // lowercase
        const filePath = `${userId}/${folderName}/${fileName}`;

        const { error } = await supabase.storage.from("nimbus-drive").upload(filePath, file);

        if (error) throw error;

        const { data } = supabase.storage.from("nimbus-drive").getPublicUrl(filePath);

        if (!data.publicUrl || !data) throw new Error("Could not get public URL");

        console.log("File Uploaded Successfully");
        return data.publicUrl;

    } catch (error) {
        console.error(error)
        throw error
    }
}