const SUPABASE_URL = "https://risltjbtijejfvtfooyh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpc2x0amJ0aWplamZ2dGZvb3loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3NjkyMzEsImV4cCI6MjA5OTM0NTIzMX0.CdxUVBsQ0pDR8eAKbbCnjlLTSWJhW9lMdZEM04KIM4o";

window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

console.log("Supabase Connected!");


