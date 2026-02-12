# Quick Start Guide - RayanMedical Market

## Step 1: Setup Database (5 minutes)

### 1.1 Run SQL Schema
1. Open Supabase SQL Editor: https://supabase.com/dashboard/project/gnvtmlseaplshrrdfqmg/sql/new
2. Copy ALL the content from `supabase-schema.sql` file
3. Paste it into the SQL Editor
4. Click "RUN" button
5. You should see: "Success. No rows returned"

This creates:
- ✅ Categories table (with 7 sample categories)
- ✅ Products table
- ✅ Product_images table (for Cloudinary URLs)
- ✅ Contact_requests table
- ✅ Sample products (3 products to test)

## Step 2: Create Admin User (2 minutes)

### 2.1 Add Admin User
1. Go to Authentication: https://supabase.com/dashboard/project/gnvtmlseaplshrrdfqmg/auth/users
2. Click "Add user" button (top right)
3. Select "Create new user"
4. Enter:
   - Email: `admin@rayanmedical.com` (or your email)
   - Password: `Admin123!` (or your secure password)
5. Click "Create user"

**IMPORTANT:** Remember this email and password - you'll use it to login!

## Step 3: Test the Application

### 3.1 View Public Site
1. Open: http://localhost:5173/
2. You should see:
   - ✅ Hero section with "Welcome to RayanMedical"
   - ✅ Category cards (4 categories displayed)
   - ✅ Sample products (3 products)
   - ✅ Menu button (click to see all categories)

### 3.2 Login to Admin Dashboard
1. Open: http://localhost:5173/admin/login
2. Enter the email and password you created in Step 2
3. Click "Sign In"
4. You should see the Admin Dashboard with 3 tabs:
   - Products
   - Categories
   - Messages

## Step 4: Add Your First Product (Admin)

### 4.1 Add a Product with Images
1. In Admin Dashboard, click "Products" tab
2. Click "Add Product" button
3. Fill in the form:
   - **Product Name**: e.g., "Digital Blood Pressure Monitor"
   - **Price**: e.g., 149.99
   - **Category**: Select from dropdown (e.g., "Diagnostic Tools")
   - **Condition**: Select "new", "used", or "discount"
   - **Description**: Write product details
   - **Product Images**: Click "Choose Files" and select 1-5 images
4. Click "Save Product"
5. Wait for upload (images go to Cloudinary, then URLs saved to database)
6. Product appears in the table!

### 4.2 View Product on Public Site
1. Go back to: http://localhost:5173/
2. Your new product should appear in the grid!
3. Click on it to see the product detail page with image carousel

## Step 5: Manage Categories (Admin)

### 5.1 Add or Edit Categories
1. In Admin Dashboard, click "Categories" tab
2. You'll see 7 default categories
3. To add new category:
   - Click "Add Category"
   - Enter name (e.g., "Surgical Tools")
   - Enter icon (emoji like 🔪 or leave blank)
   - Click "Save Category"
4. To edit: Click the edit icon (pencil)
5. To delete: Click the trash icon

## Step 6: View Contact Messages (Admin)

### 6.1 Test Contact Form
1. Go to public site: http://localhost:5173/contact
2. Fill in the contact form
3. Click "Send Message"
4. Go to Admin Dashboard → Messages tab
5. You'll see the message!
6. Click "Mark as Handled" when done

## How It Works

### Data Flow:
```
Admin adds product → Uploads images to Cloudinary → Gets URLs
                  ↓
            Saves to Supabase (products + product_images tables)
                  ↓
Public site fetches from Supabase → Displays images from Cloudinary URLs
```

### Category Filtering:
```
User clicks category in menu → Filters products by category_id
                             ↓
                    Shows only products in that category
```

## Troubleshooting

### Problem: Can't see products on homepage
**Solution:** 
- Make sure you ran the SQL schema
- Check browser console (F12) for errors
- Verify products exist in Supabase: https://supabase.com/dashboard/project/gnvtmlseaplshrrdfqmg/editor

### Problem: Can't login to admin
**Solution:**
- Make sure you created admin user in Supabase Auth
- Check email/password are correct
- Try resetting password in Supabase Auth panel

### Problem: Images not uploading
**Solution:**
- Verify Cloudinary credentials in `.env` file
- Make sure upload preset is "Unsigned" in Cloudinary settings
- Check browser console for error messages

### Problem: Categories not showing in menu
**Solution:**
- Make sure SQL schema was run successfully
- Check categories table in Supabase has data
- Refresh the page

## Next Steps

1. ✅ Add more products with real images
2. ✅ Customize categories for your needs
3. ✅ Update contact information (phone, email, address)
4. ✅ Test on mobile devices
5. ✅ Deploy to production (Vercel/Netlify)

## Support Links

- Supabase Dashboard: https://supabase.com/dashboard/project/gnvtmlseaplshrrdfqmg
- Cloudinary Dashboard: https://cloudinary.com/console
- Local App: http://localhost:5173/
- Admin Login: http://localhost:5173/admin/login

---

**Need Help?** Check the browser console (F12) for error messages!
