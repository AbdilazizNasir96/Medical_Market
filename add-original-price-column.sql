-- Add original_price column to products table for discount display
-- Run this SQL in your Supabase SQL Editor

ALTER TABLE products 
ADD COLUMN IF NOT EXISTS original_price DECIMAL(10, 2);

-- Add comment to explain the column
COMMENT ON COLUMN products.original_price IS 'Original price before discount (optional). If set and greater than price, will show as crossed out.';
