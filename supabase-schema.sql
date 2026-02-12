-- Doctera Market Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories Table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    icon TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products Table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    original_price NUMERIC(10, 2),
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    condition TEXT CHECK (condition IN ('new', 'used', 'discount')) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Images Table (stores Cloudinary URLs)
CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Requests Table
CREATE TABLE contact_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    is_handled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_product_images_product ON product_images(product_id);
CREATE INDEX idx_contact_requests_handled ON contact_requests(is_handled);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- Public read access for categories
CREATE POLICY "Public can view categories" ON categories
    FOR SELECT USING (true);

-- Admin full access for categories
CREATE POLICY "Authenticated users can manage categories" ON categories
    FOR ALL USING (auth.role() = 'authenticated');

-- Public read access for products
CREATE POLICY "Public can view products" ON products
    FOR SELECT USING (true);

-- Admin full access for products
CREATE POLICY "Authenticated users can manage products" ON products
    FOR ALL USING (auth.role() = 'authenticated');

-- Public read access for product images
CREATE POLICY "Public can view product images" ON product_images
    FOR SELECT USING (true);

-- Admin full access for product images
CREATE POLICY "Authenticated users can manage product images" ON product_images
    FOR ALL USING (auth.role() = 'authenticated');

-- Public can insert contact requests
CREATE POLICY "Anyone can submit contact requests" ON contact_requests
    FOR INSERT WITH CHECK (true);

-- Admin can view and update contact requests
CREATE POLICY "Authenticated users can view contact requests" ON contact_requests
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update contact requests" ON contact_requests
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Insert sample categories
INSERT INTO categories (name, icon) VALUES
    ('Diagnostic Tools', '🩺'),
    ('Imagings', '📷'),
    ('Laboratory equipments', '🔬'),
    ('Respiratory care', '😷'),
    ('Supportive and physiotherapy', '🦽'),
    ('Homecare', '🏠'),
    ('Furnitures', '🪑');

-- Insert sample products (optional)
INSERT INTO products (name, description, price, category_id, condition) VALUES
    ('Digital Microscope CX23', 
     'High-quality digital microscope with advanced imaging capabilities. Perfect for laboratory use with 1000x magnification.',
     2499.99,
     (SELECT id FROM categories WHERE name = 'Laboratory equipments'),
     'new'),
    ('Blood Glucose Monitor', 
     'Accurate and easy-to-use blood glucose monitoring system for home care.',
     89.99,
     (SELECT id FROM categories WHERE name = 'Homecare'),
     'new'),
    ('Wheelchair Standard', 
     'Comfortable and durable standard wheelchair with adjustable features.',
     299.99,
     (SELECT id FROM categories WHERE name = 'Supportive and physiotherapy'),
     'new');

-- Note: After creating products, you'll need to add product images through the admin dashboard
-- The images will be uploaded to Cloudinary and URLs stored in product_images table
