import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vmxhejxzzscqcutipbgf.supabase.co'
const supabaseAnonKey = 'sb_publishable_ewUrt-_f9ejFhpAKtHRqtA_DZTcUmQJ'

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)
