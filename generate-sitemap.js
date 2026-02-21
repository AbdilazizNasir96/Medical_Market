// Script to generate sitemap dynamically from your products
// Run this script whenever you want to update your sitemap with new products
// Usage: node generate-sitemap.js

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Load environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Make sure .env file exists with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function generateSitemap() {
  try {
    console.log('Fetching products from database...');
    
    // Fetch all products
    const { data: products, error } = await supabase
      .from('products')
      .select('id, updated_at')
      .order('updated_at', { ascending: false });

    if (error) {
      throw error;
    }

    console.log(`Found ${products.length} products`);

    // Start building sitemap XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
  <url>
    <loc>https://reyanmedical-market.vercel.app/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://reyanmedical-market.vercel.app/about</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://reyanmedical-market.vercel.app/contact</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://reyanmedical-market.vercel.app/help</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://reyanmedical-market.vercel.app/cart</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- Product Pages -->
`;

    // Add product URLs
    products.forEach(product => {
      const lastmod = product.updated_at 
        ? new Date(product.updated_at).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];
      
      sitemap += `  <url>
    <loc>https://reyanmedical-market.vercel.app/product/${product.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;
    });

    sitemap += `</urlset>`;

    // Write to file
    fs.writeFileSync('./public/sitemap.xml', sitemap);
    console.log('✅ Sitemap generated successfully at public/sitemap.xml');
    console.log(`📊 Total URLs: ${products.length + 5}`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error.message);
    process.exit(1);
  }
}

generateSitemap();
