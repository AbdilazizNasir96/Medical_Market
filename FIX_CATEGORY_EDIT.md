# Fix Category Edit Issue

## Problem
Error: "Could not find the 'image_url' column of 'categories' in the schema cache"

## Root Cause
The `image_url` column is missing from your `categories` table in Supabase.

## Solution

### Option 1: Add the Missing Column (RECOMMENDED)

1. Open your **Supabase Dashboard**
2. Go to **SQL Editor**
3. Run this SQL command:

```sql
ALTER TABLE categories ADD COLUMN IF NOT EXISTS image_url TEXT;
```

4. Click **Run** or press `Ctrl+Enter`
5. Done! Now you can edit categories with images.

### Option 2: Quick Test (Temporary)

The code has been updated to handle missing columns gracefully. You can now:
- Edit category names without uploading images
- The system will skip the image_url field if it causes errors

## Verify the Fix

After running the SQL command, try editing a category again:
1. Go to Admin Dashboard
2. Click Categories tab
3. Click Edit on any category
4. Change the name (e.g., "microdcope" → "microscope")
5. Click Save

It should work without errors!

## Additional Notes

- The migration file `add-category-images.sql` contains this fix
- This column allows you to upload custom images for each category
- If you don't add the column, categories will still work but without custom images
