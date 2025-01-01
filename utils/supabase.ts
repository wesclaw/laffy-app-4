import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

//  "output": "static", to "output": "single" had to change this in the app.json for the code to work


// import dotenv from 'dotenv';
// dotenv.config();
// const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string
// const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string

const EXPO_PUBLIC_SUPABASE_URL = "https://mduejjfymfqtmqbqdiwn.supabase.co"
const EXPO_PUBLIC_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kdWVqamZ5bWZxdG1xYnFkaXduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzMzE5MjksImV4cCI6MjA1MDkwNzkyOX0.hzTinYuY_vXwUJYsoLsyvi-AWtbPBwiVHDt46Vy-FzI"

export const supabase = createClient(EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});