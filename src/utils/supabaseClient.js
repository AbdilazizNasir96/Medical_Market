import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// Get these values from your Supabase project settings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client
// This client uses the anon key for public read operations
// Admin operations will use Supabase Auth for secure access
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Database Schema:
 * 
 * Table: categories
 * - id (uuid, primary key)
 * - name (text)
 * - icon (text, optional)
 * - created_at (timestamp)
 * 
 * Table: products
 * - id (uuid, primary key)
 * - name (text)
 * - description (text)
 * - price (numeric)
 * - category_id (uuid, foreign key to categories)
 * - condition (text: 'new', 'used', 'discount')
 * - created_at (timestamp)
 * 
 * Table: product_images
 * - id (uuid, primary key)
 * - product_id (uuid, foreign key to products)
 * - image_url (text, Cloudinary URL)
 * - is_primary (boolean)
 * - created_at (timestamp)
 * 
 * Table: contact_requests
 * - id (uuid, primary key)
 * - name (text)
 * - email (text)
 * - phone (text, optional)
 * - message (text)
 * - is_handled (boolean, default false)
 * - created_at (timestamp)
 * 
 * Table: admins (managed by Supabase Auth)
 * - Uses Supabase Auth for authentication
 */
