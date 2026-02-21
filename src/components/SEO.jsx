import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'RayanMedical Market - Medical Equipment & Supplies Platform',
  description = 'Your trusted source for quality medical equipment and supplies. Browse our extensive catalog of healthcare products, medical devices, and professional medical supplies.',
  keywords = 'medical equipment, medical supplies, healthcare products, medical devices, hospital equipment, medical instruments',
  image = 'https://reyanmedical-market.vercel.app/vite.svg',
  url = 'https://reyanmedical-market.vercel.app/',
  type = 'website'
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
