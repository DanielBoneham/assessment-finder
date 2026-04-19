import { createClient } from '@supabase/supabase-js'

// These values come from your Supabase project settings.
// Never commit real keys – they live in .env.local (see below).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
