import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://faewrhljljuactdxwema.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhZXdyaGxqbGp1YWN0ZHh3ZW1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNjQ3MTYsImV4cCI6MjA5MDY0MDcxNn0.Mc6QYn7aYT9vHycjYrb5f8dZQCXrPSNAfVMoBiYTif4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
