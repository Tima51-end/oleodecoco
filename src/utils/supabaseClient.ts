// src/utils/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../services/database.types";


// VITE_-переменные подтягиваются через import.meta.env
const SUPA_URL = import.meta.env.VITE_SUPAURL;
const SUPA_KEY = import.meta.env.VITE_SUPAKEY;

if (!SUPA_URL || !SUPA_KEY) {
  throw new Error("Не заданы VITE_SUPAURL или VITE_SUPAKEY в .env");
}

export const supabase = createClient<Database>(SUPA_URL, SUPA_KEY);
