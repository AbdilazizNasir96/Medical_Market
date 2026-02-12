-- Migration: Add image_url column to categories table
-- Run this if you already created the categories table without image_url

-- Add image_url column to categories
ALTER TABLE categories ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Done! Now you can upload category images from the admin dashboard
