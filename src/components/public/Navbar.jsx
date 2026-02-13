import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart, FiSearch, FiHeart, FiActivity, FiCamera, FiDroplet, FiWind, FiHome, FiZap } from 'react-icons/fi';
import { MdOutlineChair } from 'react-icons/md';
import { useCart } from '../../context/CartContext';

const Navbar = ({ categories = [], onCategoryClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getCartCount } = useCart();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Icon mapping for categories
  const categoryIcons = {
    'Diagnostic Tools': <FiHeart className="text-pink-400" />,
    'Imagings': <FiCamera className="text-purple-400" />,
    'Laboratory equipments': <FiActivity className="text-cyan-400" />,
    'Respiratory care': <FiWind className="text-blue-400" />,
    'Supportive and physiotherapy': <FiDroplet className="text-indigo-400" />,
    'Homecare': <FiHome className="text-green-400" />,
    'Furnitures': <MdOutlineChair className="text-orange-400" />
  };

  const handleCategoryClick = (categoryId) => {
    setIsMenuOpen(false);
    if (onCategoryClick) {
      onCategoryClick(categoryId);
      // Scroll to products section after a short delay
      setTimeout(() => {
        const productsSection = document.getElementById('products-section');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (onCategoryClick) {
      onCategoryClick('all');
    }
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* CRAZY ATTRACTIVE NAVBAR */}
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-gray-900/95 backdrop-blur-2xl shadow-2xl shadow-purple-500/20' 
          : 'bg-gradient-to-r from-gray-900/90 via-purple-900/90 to-gray-900/90 backdrop-blur-xl'
      }`}>
        {/* Animated Border */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-gradient bg-300%"></div>
        
        {/* Floating Particles Effect - DESKTOP ONLY */}
        <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-32 h-32 bg-pink-500/10 rounded-full blur-3xl animate-float-slow" style={{ top: '-20%', left: '10%' }}></div>
          <div className="absolute w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-float-slow" style={{ top: '-20%', right: '10%', animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between h-20">
            {/* Menu Button with Glow Effect */}
            <button 
              className="group relative text-white p-3 hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-purple-500/20 rounded-xl transition-all duration-300 transform hover:scale-110"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
              <FiMenu size={26} className="relative z-10 group-hover:rotate-180 transition-transform duration-500" />
            </button>

            {/* Logo with CRAZY Animation */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                {/* Rotating Glow Ring - DESKTOP ONLY */}
                <div className="hidden md:block absolute -inset-2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-2xl opacity-75 group-hover:opacity-100 blur-lg animate-spin-slow"></div>
                
                {/* Logo Icon */}
                <div className="relative w-14 h-14 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center transform md:group-hover:scale-110 md:group-hover:rotate-12 transition-all duration-500 shadow-2xl shadow-purple-500/50">
                  <FiZap className="w-8 h-8 text-white md:animate-pulse" />
                </div>
              </div>
              
              <div>
                <div className="flex items-center">
                  <span className="text-lg sm:text-2xl font-black text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                    Reyan
                  </span>
                  <span className="text-lg sm:text-2xl font-black ml-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent animate-gradient bg-300%">
                    Medical
                  </span>
                </div>
                <div className="text-[9px] sm:text-xs text-purple-300 font-semibold tracking-wider">PREMIUM MARKET</div>
              </div>
            </Link>

            {/* Desktop Navigation with CRAZY Hover Effects */}
            <div className="hidden lg:flex items-center space-x-2">
              {[
                { label: 'Home', onClick: handleHomeClick, icon: <FiHome size={16} /> },
                { label: 'Discount', onClick: () => handleCategoryClick('discount'), icon: '🔥' },
                { label: 'New', onClick: () => handleCategoryClick('new'), icon: '✨' },
                { label: 'Used', onClick: () => handleCategoryClick('used'), icon: '♻️' },
                { label: 'Popular', onClick: () => handleCategoryClick('all'), icon: '⭐' }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={item.onClick}
                  className="group relative px-5 py-2.5 font-bold text-white hover:text-transparent hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-400 hover:bg-clip-text transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-pink-500/20 group-hover:via-purple-500/20 group-hover:to-cyan-500/20 rounded-xl transition-all duration-300"></div>
                  <div className="relative flex items-center gap-2">
                    <span className="group-hover:scale-125 transition-transform duration-300">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300 rounded-full"></div>
                </button>
              ))}
            </div>

            {/* Right Side Icons with CRAZY Effects */}
            <div className="flex items-center space-x-2">
              {/* Search Button */}
              <button className="group relative hidden md:block p-3 hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-purple-500/20 rounded-xl transition-all duration-300 transform hover:scale-110">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
                <FiSearch size={22} className="text-white relative z-10 group-hover:rotate-90 transition-transform duration-500" />
              </button>

              {/* Cart Button with Bounce Animation */}
              <Link 
                to="/cart" 
                className="group relative p-3 hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-purple-500/20 rounded-xl transition-all duration-300 transform hover:scale-110"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
                <FiShoppingCart size={22} className="text-white relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-xs flex items-center justify-center font-black text-white group-hover:scale-125 transition-transform shadow-2xl shadow-pink-500/50 animate-bounce">
                    {getCartCount()}
                  </span>
                )}
              </Link>

              {/* Telegram Button with Pulse - REDUCED ANIMATION ON MOBILE */}
              <a 
                href="https://t.me/health_market_et" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-r from-[#0088cc] to-[#0077b3] text-white w-12 h-12 rounded-xl flex items-center justify-center md:hover:scale-110 transition-all shadow-2xl shadow-cyan-500/50 md:hover:shadow-cyan-500/80 md:animate-pulse-slow"
                title="Join our Telegram channel"
              >
                <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 blur transition-all duration-300"></div>
                <svg 
                  className="w-6 h-6 relative z-10 md:group-hover:scale-125 transition-transform duration-300" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        .bg-300% {
          background-size: 300% 300%;
        }
      `}</style>

      {/* Sidebar Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar Menu - DARK THEME */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Menu Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={() => setIsMenuOpen(false)}>
            <FiX size={24} className="text-white hover:text-red-300 transition-colors" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="overflow-y-auto h-full pb-32">
          {/* Home Link */}
          <div className="py-2 border-b border-gray-700">
            <button
              onClick={handleHomeClick}
              className="flex items-center space-x-3 px-6 py-3 hover:bg-white/10 transition-colors w-full text-left"
            >
              <FiHome className="text-purple-400 text-xl" />
              <span className="text-white font-medium">Home</span>
            </button>
          </div>

          {/* Categories */}
          <div className="py-4">
            {categories.length > 0 ? (
              categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="flex items-center space-x-3 px-6 py-3 hover:bg-white/10 transition-colors w-full text-left"
                >
                  <span className="text-xl">
                    {categoryIcons[category.name] || <FiActivity className="text-purple-400" />}
                  </span>
                  <span className="text-white font-medium">{category.name}</span>
                </button>
              ))
            ) : (
              <>
                <button onClick={() => handleCategoryClick('all')} className="flex items-center space-x-3 px-6 py-3 hover:bg-white/10 w-full text-left">
                  <FiHeart className="text-pink-400 text-xl" />
                  <span className="text-white font-medium">All Products</span>
                </button>
              </>
            )}
          </div>

          {/* Footer Links */}
          <div className="absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4">
            <div className="flex items-center justify-between text-sm mb-3">
              <a href="tel:+251901525863" className="text-purple-400 hover:text-purple-300 hover:underline">+251 90 152 5863</a>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-purple-400 hover:text-purple-300 hover:underline">Contact Us</Link>
            </div>
            <Link 
              to="/admin/login" 
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all font-bold"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
