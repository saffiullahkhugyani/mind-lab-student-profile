// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hqxhavqdfifdsorruiqp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxeGhhdnFkZmlmZHNvcnJ1aXFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE1Mjk5MDQsImV4cCI6MjAyNzEwNTkwNH0.yv1Kgjuufvm4_AHi5vdrqE6Ssh5FPh1Yr_xIHlcsAfA';

export const supabase = createClient(supabaseUrl, supabaseKey);
