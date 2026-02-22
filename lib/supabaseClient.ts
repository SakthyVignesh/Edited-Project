
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Ensure we have the environment variables
if (!supabaseUrl || !supabaseAnonKey) {
    // We don't throw error to avoid crashing the whole app if variables are missing during build time
    console.warn('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
