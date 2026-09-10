import {createClient} from '@supabase/supabase-js'
import {logger} from './logger.js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

if(!supabaseUrl || !supabaseKey){
    logger.error('Supabase URL or Key is missing in environment variables');
}

export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;
export const BUCKET_NAME = process.env.SUPABASE_BUCKET_NAME || 'E-commerce-bucket'  