const CategoryCard = ({ category, onClick }) => {
  // Category icons mapping
  const categoryIcons = {
    'Diagnostic Tools': '🩺',
    'Imagings': '📷',
    'Laboratory equipments': '🔬',
    'Lab Equipments': '🔬',
    'Respiratory care': '🫁',
    'Supportive and physiotherapy': '🦴',
    'Homecare': '🏠',
    'Furnitures': '🪑'
  };

  // Category image mapping (fallback if no image uploaded)
  const categoryImages = {
    'Diagnostic Tools': 'https://images.unsplash.com/photo-1581093458791-9d42e1c5e2e4?w=400&h=300&fit=crop',
    'Imagings': 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=300&fit=crop',
    'Laboratory equipments': 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop',
    'Lab Equipments': 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop',
    'Respiratory care': 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400&h=300&fit=crop',
    'Supportive and physiotherapy': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop',
    'Homecare': 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=300&fit=crop',
    'Furnitures': 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop'
  };

  const defaultImage = 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400&h=300&fit=crop';
  
  // Use uploaded image if available, otherwise use fallback
  const imageUrl = category.image_url || categoryImages[category.name] || defaultImage;
  const icon = categoryIcons[category.name] || '🏥';

  return (
    <div 
      onClick={() => onClick(category.id)}
      className="group relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer transform transition-all duration-300 md:hover:scale-105 active:scale-95"
    >
      {/* Gradient Border Effect - DESKTOP ONLY */}
      <div className="hidden md:block absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>
      
      {/* Card Content */}
      <div className="relative bg-gray-800/90 backdrop-blur-xl rounded-xl sm:rounded-2xl overflow-hidden border border-gray-700 group-hover:border-transparent transition-all duration-500">
        {/* Image Section - MOBILE OPTIMIZED */}
        <div className="relative h-32 sm:h-36 md:h-40 lg:h-48 overflow-hidden">
          <img 
            src={imageUrl}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src = defaultImage;
            }}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
          
          {/* Icon Badge - MOBILE OPTIMIZED - NO ROTATION ON MOBILE */}
          <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 md:top-3 md:right-3 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center text-base sm:text-xl md:text-2xl shadow-2xl shadow-pink-500/50 md:group-hover:scale-110 md:group-hover:rotate-12 transition-all duration-500">
            {icon}
          </div>

          {/* Hover Shine Effect - DESKTOP ONLY */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>

        {/* Text Section - MOBILE OPTIMIZED */}
        <div className="relative p-2 sm:p-3 md:p-4 lg:p-5 bg-gradient-to-br from-gray-800 to-gray-900">
          <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white mb-1 md:group-hover:text-transparent md:group-hover:bg-gradient-to-r md:group-hover:from-pink-400 md:group-hover:to-purple-400 md:group-hover:bg-clip-text transition-all duration-300 line-clamp-2">
            {category.name}
          </h3>
          
          {/* View Button - MOBILE OPTIMIZED */}
          <div className="flex items-center text-purple-400 font-semibold md:group-hover:text-pink-400 transition-colors">
            <span className="text-xs sm:text-sm">Explore</span>
            <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 md:group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>

          {/* Decorative Corner - DESKTOP ONLY */}
          <div className="hidden md:block absolute bottom-0 right-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
