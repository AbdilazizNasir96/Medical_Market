import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // Get primary image or first image
  const primaryImage = product.product_images?.find(img => img.is_primary)?.image_url 
    || product.product_images?.[0]?.image_url 
    || '/placeholder.jpg';

  return (
    <Link to={`/product/${product.id}`}>
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 md:hover:scale-105 md:hover:shadow-2xl md:hover:shadow-purple-500/20">
        {/* Image Container - MOBILE OPTIMIZED */}
        <div className="relative overflow-hidden h-40 sm:h-48 md:h-56 lg:h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
          <img 
            src={primaryImage} 
            alt={product.name}
            className="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src = '/placeholder.jpg';
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
          
          {/* Condition Badge - MOBILE OPTIMIZED - NO ANIMATION ON MOBILE */}
          {product.condition && (
            <span className={`absolute top-2 right-2 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold text-white shadow-lg ${
              product.condition === 'new' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
              product.condition === 'discount' ? 'bg-gradient-to-r from-red-500 to-pink-500 md:animate-pulse' :
              'bg-gradient-to-r from-blue-500 to-cyan-500'
            }`}>
              {product.condition === 'discount' ? 'DISCOUNT' : product.condition.toUpperCase()}
            </span>
          )}

          {/* Hover Shine Effect - DESKTOP ONLY */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>

        {/* Content - MOBILE OPTIMIZED */}
        <div className="p-3 sm:p-4">
          {/* Category */}
          <p className="text-[10px] sm:text-xs text-purple-400 mb-1 font-semibold uppercase tracking-wide">
            {product.categories?.name || 'Medical Equipment'}
          </p>
          
          {/* Product Name - MOBILE OPTIMIZED */}
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-2 line-clamp-2 md:group-hover:text-transparent md:group-hover:bg-gradient-to-r md:group-hover:from-pink-400 md:group-hover:to-purple-400 md:group-hover:bg-clip-text transition-all">
            {product.name}
          </h3>
          
          {/* Price Section - MOBILE OPTIMIZED */}
          <div className="flex items-center justify-between">
            {product.original_price && product.original_price > product.price ? (
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <p className="text-lg sm:text-xl md:text-2xl font-black text-pink-500">
                  {product.price?.toFixed(2)} <span className="text-xs sm:text-sm">ETB</span>
                </p>
                <p className="text-xs sm:text-sm text-gray-500 line-through">
                  {product.original_price?.toFixed(2)} ETB
                </p>
              </div>
            ) : (
              <p className="text-lg sm:text-xl md:text-2xl font-black text-purple-400">
                {product.price?.toFixed(2)} <span className="text-xs sm:text-sm">ETB</span>
              </p>
            )}

            {/* View Button - MOBILE OPTIMIZED - NO HOVER SCALE ON MOBILE */}
            <button className="p-2 sm:p-2.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg sm:rounded-xl md:hover:scale-110 transition-transform shadow-lg shadow-pink-500/50">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Decorative Corner - DESKTOP ONLY */}
        <div className="hidden md:block absolute bottom-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </Link>
  );
};

export default ProductCard;
