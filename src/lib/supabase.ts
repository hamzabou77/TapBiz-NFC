import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://gsunyzsfvfmckjgtcrej.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_3Zq5StCp23iRyzljCrle_g_EqTbXgaN';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
