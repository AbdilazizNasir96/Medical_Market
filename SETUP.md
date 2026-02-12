# Quick Setup Guide

## Step 1: Run SQL Schema in Supabase

1. Go to your Supabase SQL Editor: https://supabase.com/dashboard/project/gnvtmlseaplshrrdfqmg/sql/new
2. Copy and paste the entire content from `supabase-schema.sql`
3. Click "Run" to create all tables and sample data

## Step 2: Create Admin User

1. Go to Authentication: https://supabase.com/dashboard/project/gnvtmlseaplshrrdfqmg/auth/users
2. Click "Add user" → "Create new user"
3. Enter email and password (e.g., admin@doctera.com / Admin123!)
4. Click "Create user"

## Step 3: Setup Cloudinary (Optional - for image uploads)

1. Sign up at https://cloudinary.com (free account)
2. Go to Dashboard and copy your "Cloud name"
3. Go to Settings → Upload → Upload presets
4. Click "Add upload preset"
5. Set "Signing Mode" to "Unsigned"
6. Save and copy the preset name
7. Update `.env` file with your credentials:
   ```
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=your_preset_name
   ```

## Step 4: Test the Application

### Public Site (http://localhost:5173/)
- ✅ View products grid
- ✅ Filter by category
- ✅ Search products
- ✅ View product details
- ✅ Submit contact form
- ✅ Mobile sidebar menu

### Admin Dashboard (http://localhost:5173/admin/login)
- Login with the admin credentials you created
- ✅ Add/Edit/Delete products
- ✅ Upload images to Cloudinary
- ✅ Manage categories
- ✅ View contact messages

## Features Implemented

### UI/UX Matching docteramarket.com
- ✅ Blue/Orange color scheme
- ✅ Sidebar menu with categories
- ✅ Hero section with welcome message
- ✅ Category cards with images
- ✅ Product grid with hover effects
- ✅ Search functionality
- ✅ Filter by condition (New/Used/Discount)
- ✅ Responsive design
- ✅ Install App button

### Backend Integration
- ✅ Supabase database
- ✅ Supabase Auth for admin
- ✅ Cloudinary image uploads
- ✅ Contact form submissions
- ✅ Product CRUD operations
- ✅ Category management

## Troubleshooting

### Products not showing?
- Make sure you ran the SQL schema
- Check browser console for errors
- Verify `.env` file has correct Supabase credentials

### Can't login to admin?
- Make sure you created an admin user in Supabase Auth
- Check email/password are correct
- Clear browser cache and try again

### Images not uploading?
- Verify Cloudinary credentials in `.env`
- Make sure upload preset is set to "Unsigned"
- Check browser console for errors

## Next Steps

1. Add your own product images
2. Customize categories
3. Update contact information
4. Deploy to production (Vercel/Netlify)
5. Add custom domain

## Support

For issues, check:
- Supabase logs: https://supabase.com/dashboard/project/gnvtmlseaplshrrdfqmg/logs
- Browser console (F12)
- Network tab for API errors
