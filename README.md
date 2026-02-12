# Doctera Market - Medical Equipment E-commerce Platform

A complete React + Vite application replicating the UI and functionality of docteramarket.com for buying and selling medical equipment.

## Features

### Public Site
- **Homepage**: Product grid with category filters, search, and responsive design
- **Product Details**: Image carousel, full descriptions, contact buttons
- **Contact Page**: Form to submit inquiries (saved to Supabase)
- **Category Filtering**: Browse products by medical equipment categories

### Admin Dashboard
- **Secure Login**: Supabase Auth authentication
- **Product Management**: Add, edit, delete products with image uploads
- **Category Management**: Create and manage product categories
- **Image Upload**: Direct upload to Cloudinary with URL storage in Supabase
- **Message Management**: View and handle contact form submissions

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: TailwindCSS
- **Routing**: React Router v6
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Image Storage**: Cloudinary
- **Icons**: React Icons

## Setup Instructions

### 1. Install Dependencies

```bash
cd doctera-market
npm install
```

### 2. Configure Supabase

1. Create a Supabase project at https://supabase.com
2. Run the SQL schema (see `supabase-schema.sql`)
3. Create an admin user in Supabase Auth
4. Copy your project URL and anon key

### 3. Configure Cloudinary

1. Create a Cloudinary account at https://cloudinary.com
2. Get your cloud name
3. Create an unsigned upload preset:
   - Go to Settings > Upload
   - Scroll to "Upload presets"
   - Click "Add upload preset"
   - Set signing mode to "Unsigned"
   - Save the preset name

### 4. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### 5. Run the Application

```bash
npm run dev
```

Visit http://localhost:5173

## Project Structure

```
doctera-market/
├── src/
│   ├── components/
│   │   ├── admin/          # Admin-specific components
│   │   │   └── ProtectedRoute.jsx
│   │   └── public/         # Public site components
│   │       ├── Navbar.jsx
│   │       ├── Footer.jsx
│   │       ├── ProductCard.jsx
│   │       ├── CategoryCard.jsx
│   │       └── ImageCarousel.jsx
│   ├── pages/
│   │   ├── admin/          # Admin pages
│   │   │   ├── AdminLogin.jsx
│   │   │   └── AdminDashboard.jsx
│   │   └── public/         # Public pages
│   │       ├── HomePage.jsx
│   │       ├── ProductDetailPage.jsx
│   │       └── ContactPage.jsx
│   ├── utils/
│   │   ├── supabaseClient.js      # Supabase configuration
│   │   └── cloudinaryUploader.js  # Cloudinary upload utility
│   ├── App.jsx             # Main app with routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles + Tailwind
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## How It Works

### Data Flow

1. **Public Site**:
   - Fetches products and categories from Supabase using anon key (read-only)
   - Displays images from Cloudinary URLs stored in Supabase
   - Contact form submissions saved to `contact_requests` table

2. **Admin Dashboard**:
   - Protected by Supabase Auth (email/password)
   - Admin uploads images → Cloudinary API → Returns secure URL
   - URL saved to `product_images` table in Supabase
   - Full CRUD operations on products and categories

### Image Upload Process

```
Admin selects image
    ↓
uploadToCloudinary() sends to Cloudinary API
    ↓
Cloudinary returns secure_url
    ↓
URL saved to product_images table in Supabase
    ↓
Public site fetches URLs from Supabase
    ↓
Images rendered from Cloudinary CDN
```

## Database Schema

See `supabase-schema.sql` for complete schema including:
- `categories` - Product categories
- `products` - Product information
- `product_images` - Cloudinary image URLs
- `contact_requests` - Contact form submissions

## Admin Access

Default route: `/admin/login`

Create admin users in Supabase Dashboard:
1. Go to Authentication > Users
2. Add new user with email/password
3. Use these credentials to login

## Deployment

### Build for Production

```bash
npm run build
```

The `dist` folder contains the production build.

### Deploy Options

- **Vercel**: Connect GitHub repo, add environment variables
- **Netlify**: Drag & drop `dist` folder or connect repo
- **Cloudflare Pages**: Connect repo, set build command

## Color Palette

Matching docteramarket.com design:
- Primary: `#1e5a7d` (Dark blue)
- Secondary: `#ff8c42` (Orange)
- Dark: `#0f2c3d` (Navy)

## Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Hamburger menu on mobile
- Grid layouts adapt to screen size

## License

MIT License - Feel free to use for your projects
