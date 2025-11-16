// supabase\admin.ts

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,   // your Supabase URL
  process.env.SUPABASE_SERVICE_KEY!        // your Service Role Key
);
