// libreria oficial de Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// datos supabase
const supabaseUrl = 'https://bkitrbkuelwbcskqfwge.supabase.co';
const supabaseKey = 'sb_publishable_dnfs_V9IsyaLUn90SzC00w_o8BGit2d';

// conexión a db cloud
export const supabase = createClient(supabaseUrl, supabaseKey);

console.log("¡Conexión a Supabase preparada!");