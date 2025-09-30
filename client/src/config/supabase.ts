import { createClient } from "@supabase/supabase-js"

const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabaseUri = import.meta.env.VITE_SUPABASE_URI

const supabase = createClient(supabaseUri, supabaseKey);

export default supabase