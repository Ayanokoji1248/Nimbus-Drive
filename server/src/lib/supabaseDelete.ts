import supabase from "../config/supabaseClient";

const deleteFromSupabase = async (filePath: string): Promise<boolean> => {
    try {
        const { data, error } = await supabase
            .storage
            .from("nimbus-drive") // your bucket name
            .remove([filePath]); // remove takes an array of paths

        if (error) {
            console.error("Supabase delete error:", error.message);
            throw new Error("Error deleting file from Supabase");
        }

        return true;
    } catch (err: unknown) {
        console.error("Unexpected error:", err);
        if (err instanceof Error) return false;
        return false;
    }
};

export default deleteFromSupabase;
