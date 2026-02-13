import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import Navbar from '../../components/public/Navbar';
import Footer from '../../components/public/Footer';
import ProductCard from '../../components/public/ProductCard';
import CategoryCard from '../../components/public/CategoryCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentEquipment, setCurrentEquipment] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const equipmentList = [
    'Lab Equipment',
    'Ultrasound',
    'Ultrasound Probe',
    'Ultrasound Printers',
    'Stethoscope',
    'Microscope'
  ];

  const images = [
    '/image/1.jpg',
    '/image/2.jpg',
    '/image/3.jpg',
    '/image/4.jpg',
    '/image/5.jpg',
    '/image/6.jpg',
    '/image/7.jpg',
    '/image/8.jpg'
  ];

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [selectedCategory, searchQuery]);

  // Typing animation effect
  useEffect(() => {
    const currentWord = equipmentList[currentEquipment];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    const timer = setTimeout(() => {
      if (!isDeleting && typedText === currentWord) {
        // Pause before deleting
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && typedText === '') {
        // Move to next word
        setIsDeleting(false);
        setCurrentEquipment((prev) => (prev + 1) % equipmentList.length);
      } else if (isDeleting) {
        // Delete character
        setTypedText(currentWord.substring(0, typedText.length - 1));
      } else {
        // Type character
        setTypedText(currentWord.substring(0, typedText.length + 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, currentEquipment]);

  // Animate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (!error) setCategories(data || []);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    // Scroll to products section smoothly
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    let query = supabase
      .from('products')
      .select(`
        *,
        categories (id, name),
        product_images (id, image_url, is_primary)
      `)
      .order('created_at', { ascending: false });

    // Filter by condition (new, used, discount)
    if (['new', 'used', 'discount'].includes(selectedCategory)) {
      query = query.eq('condition', selectedCategory);
    } 
    // Filter by category
    else if (selectedCategory !== 'all') {
      query = query.eq('category_id', selectedCategory);
    }

    const { data, error } = await query;
    
    if (!error) {
      let filteredData = data || [];
      
      // Apply search filter
      if (searchQuery.trim()) {
        filteredData = filteredData.filter(product => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      setProducts(filteredData);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar categories={categories} onCategoryClick={handleCategoryClick} />
      
      {/* Premium Hero Section with Dark Vibrant Background - MOBILE OPTIMIZED */}
      <section className="relative overflow-hidden pt-2 pb-4 sm:pt-4 sm:pb-6 md:pt-6 md:pb-8 lg:pt-6 lg:pb-16">
        {/* Animated Dark Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 opacity-95"></div>
        
        {/* CRAZY ANIMATED BACKGROUND EFFECTS - Hidden on mobile for performance */}
        {/* Moving Gradient Waves */}
        <div className="hidden md:block absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20" style={{
            animation: 'wave 15s ease-in-out infinite',
            backgroundSize: '200% 200%'
          }}></div>
        </div>

        {/* Rotating Gradient Circles - Reduced on mobile for performance */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[200px] md:w-[600px] h-[200px] md:h-[600px] bg-gradient-to-r from-pink-500/20 md:from-pink-500/40 to-transparent rounded-full blur-2xl md:blur-3xl" style={{
            animation: 'rotate-slow 20s linear infinite',
            top: '-10%',
            left: '-10%'
          }}></div>
          <div className="absolute w-[180px] md:w-[500px] h-[180px] md:h-[500px] bg-gradient-to-r from-cyan-500/20 md:from-cyan-500/40 to-transparent rounded-full blur-2xl md:blur-3xl" style={{
            animation: 'rotate-reverse 25s linear infinite',
            bottom: '-10%',
            right: '-10%'
          }}></div>
        </div>
        
        {/* Vibrant Floating Orbs - Hidden on mobile */}
        <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-pink-500/30 rounded-full blur-3xl" style={{
            animation: 'float-crazy 8s ease-in-out infinite',
            top: '20%',
            left: '10%'
          }}></div>
          <div className="absolute w-80 h-80 bg-cyan-500/30 rounded-full blur-3xl" style={{
            animation: 'float-crazy-reverse 10s ease-in-out infinite',
            bottom: '20%',
            right: '20%',
            animationDelay: '2s'
          }}></div>
        </div>

        {/* Animated Grid Pattern - Hidden on mobile */}
        <div className="hidden md:block absolute inset-0 opacity-20" style={{
          backgroundImage: 'linear-gradient(rgba(236, 72, 153, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.4) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          animation: 'grid-pulse 3s ease-in-out infinite'
        }}></div>

        {/* Shooting Stars - Hidden on mobile */}
        <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `shooting-star ${3 + i}s linear infinite`,
                animationDelay: `${i * 2}s`,
                boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8)'
              }}
            ></div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 gap-4 items-center">
            {/* Left Content - Premium Typography - MOBILE OPTIMIZED - Takes 60% on mobile */}
            <div className="col-span-1 space-y-2 md:space-y-3 lg:space-y-4 text-left">
              {/* Trust Badge with Vibrant Glow - Hidden on small mobile */}
              <div className="hidden sm:inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl px-3 md:px-6 py-1.5 md:py-3 rounded-full animate-slide-down border border-purple-500/30">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse shadow-lg shadow-pink-500/50"></div>
                <span className="text-white text-[10px] md:text-sm font-semibold">Trusted by 10,000+ Healthcare Professionals</span>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight animate-fade-in">
                Hi, Welcome to <br/>
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  RayanMedical Market.
                </span>
              </h1>
              
              <p className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-cyan-400 animate-fade-in animation-delay-300">
                You get premium
              </p>
              
              {/* Typing Animation Equipment Text */}
              <div className="h-8 sm:h-12 md:h-16 lg:h-20 xl:h-24 flex items-center justify-start">
                <h2 
                  className="text-base sm:text-xl md:text-3xl lg:text-4xl xl:text-6xl font-black"
                  style={{
                    color: 'transparent',
                    backgroundImage: 'linear-gradient(135deg, #ec4899, #8b5cf6, #06b6d4)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.6))'
                  }}
                >
                  {typedText}
                  <span className="animate-pulse">|</span>
                </h2>
              </div>
              
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-300 leading-relaxed animate-fade-in animation-delay-600">
                Experience the future of medical equipment shopping. Premium quality, instant delivery, trusted by professionals worldwide.
              </p>

              {/* CTA Buttons - Hidden on mobile, shown on tablet+ */}
              <div className="hidden md:flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 pt-4 animate-slide-up justify-start">
                <button 
                  onClick={() => {
                    const productsSection = document.getElementById('products-section');
                    if (productsSection) {
                      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold rounded-xl overflow-hidden transform hover:scale-105 transition-all shadow-2xl shadow-purple-500/50 text-sm md:text-base"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Explore Products
                    <svg className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </div>

              {/* Stats - Hidden on mobile, shown on tablet+ */}
              <div className="hidden md:grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 pt-6 md:pt-8 animate-fade-in animation-delay-1000">
                {[
                  { value: '10K+', label: 'Products', color: 'from-pink-500 to-rose-500' },
                  { value: '50K+', label: 'Customers', color: 'from-purple-500 to-indigo-500' },
                  { value: '99.9%', label: 'Satisfaction', color: 'from-cyan-500 to-blue-500' }
                ].map((stat, idx) => (
                  <div key={idx} className={`text-center bg-gradient-to-br ${stat.color} rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 hover:scale-110 transition-transform shadow-xl`}>
                    <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-white animate-heartbeat">{stat.value}</div>
                    <div className="text-[10px] sm:text-xs text-white/90 mt-1 font-semibold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Premium Image Carousel - MOBILE OPTIMIZED - Takes 40% on mobile */}
            <div className="col-span-1 flex justify-end items-center">
              <div className="relative w-full max-w-[120px] h-[120px] sm:max-w-[180px] sm:h-[180px] md:max-w-[280px] md:h-[280px] lg:max-w-md lg:h-[350px] mb-6 sm:mb-8 md:mb-0">
                {/* Vibrant Glow Ring - Reduced on mobile */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-2xl sm:rounded-3xl blur-2xl sm:blur-3xl opacity-30 sm:opacity-50 animate-pulse"></div>
                
                {images.map((img, index) => {
                  const direction = index % 4;
                  const isActive = index === currentImage;
                  
                  return (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-1000 ${
                        isActive 
                          ? 'opacity-100 scale-100 rotate-0 blur-0 z-10' 
                          : 'opacity-0 scale-75 blur-md pointer-events-none z-0'
                      }`}
                      style={{
                        transform: isActive 
                          ? 'translate(0, 0) rotate(0deg)' 
                          : direction === 0 
                          ? 'translate(0, 120%) rotate(20deg)'
                          : direction === 1 
                          ? 'translate(120%, 0) rotate(-20deg)'
                          : direction === 2 
                          ? 'translate(-120%, 0) rotate(20deg)'
                          : 'translate(0, -120%) rotate(-20deg)',
                      }}
                    >
                      <div className="relative w-full h-full group">
                        {/* Vibrant Border with Rainbow Gradient - Reduced on mobile */}
                        <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-2xl sm:rounded-3xl opacity-50 sm:opacity-75 group-hover:opacity-100 blur-sm sm:blur-lg transition-all animate-gradient bg-300%"></div>
                        
                        {/* Image Container */}
                        <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-2xl shadow-purple-500/30 sm:shadow-purple-500/50">
                          <img 
                            src={img}
                            alt={`Medical Equipment ${index + 1}`}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            style={{
                              animation: isActive ? 'float 6s ease-in-out infinite' : 'none',
                            }}
                          />
                          
                          {/* Dark Overlay with Gradient - Hidden on mobile */}
                          <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        
                        {/* Vibrant Floating Particles - Hidden on mobile for performance */}
                        {isActive && (
                          <>
                            <div className="hidden lg:block absolute top-8 right-8 w-4 h-4 bg-pink-500 rounded-full animate-ping shadow-lg shadow-pink-500/50"></div>
                            <div className="hidden lg:block absolute bottom-12 left-12 w-3 h-3 bg-cyan-400 rounded-full animate-ping animation-delay-500 shadow-lg shadow-cyan-400/50"></div>
                            <div className="hidden lg:block absolute top-1/2 left-8 w-2 h-2 bg-purple-500 rounded-full animate-ping animation-delay-1000 shadow-lg shadow-purple-500/50"></div>
                            <div className="hidden lg:block absolute bottom-1/3 right-12 w-3 h-3 bg-blue-400 rounded-full animate-ping animation-delay-300 shadow-lg shadow-blue-400/50"></div>
                          </>
                        )}

                        {/* Vibrant Corner Accents - Hidden on mobile */}
                        <div className="hidden sm:block absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-pink-500 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-pink-500/50"></div>
                        <div className="hidden sm:block absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-500 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-cyan-500/50"></div>
                      </div>
                    </div>
                  );
                })}

                {/* Vibrant Image Counter - MUCH SMALLER ON MOBILE */}
                <div className="absolute -bottom-4 sm:-bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2 z-20">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`h-1 sm:h-2 rounded-full transition-all ${
                        idx === currentImage 
                          ? 'bg-gradient-to-r from-pink-500 to-purple-500 w-3 sm:w-8 shadow-sm sm:shadow-lg shadow-pink-500/50' 
                          : 'bg-white/30 w-1 sm:w-2 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(2deg);
          }
        }

        @keyframes float-crazy {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(30px, -40px) scale(1.1);
          }
          50% {
            transform: translate(-20px, -60px) scale(0.9);
          }
          75% {
            transform: translate(40px, -30px) scale(1.05);
          }
        }

        @keyframes float-crazy-reverse {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(-30px, 40px) scale(0.9);
          }
          50% {
            transform: translate(20px, 60px) scale(1.1);
          }
          75% {
            transform: translate(-40px, 30px) scale(0.95);
          }
        }

        @keyframes float-diagonal {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(50px, 50px) rotate(180deg);
          }
        }

        @keyframes float-diagonal-reverse {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-50px, -50px) rotate(-180deg);
          }
        }

        @keyframes rotate-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes rotate-reverse {
          0% {
            transform: rotate(360deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        @keyframes wave {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes grid-pulse {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.02);
          }
        }

        @keyframes shooting-star {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateX(300px) translateY(300px);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
          opacity: 0;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        /* Reduce animations on mobile for better performance */
        @media (max-width: 768px) {
          .animate-pulse {
            animation: none;
          }
          .animate-gradient {
            animation: none;
          }
          .animate-heartbeat {
            animation: none;
          }
          .animate-ping {
            animation: none;
          }
          /* Disable float animation on mobile */
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
          }
          /* Disable rotation animations on mobile */
          @keyframes rotate-slow {
            0%, 100% {
              transform: rotate(0deg);
            }
          }
          @keyframes rotate-reverse {
            0%, 100% {
              transform: rotate(0deg);
            }
          }
        }
      `}</style>

      {/* Mobile-only CTA Buttons and Stats - Below Hero */}
      <section className="md:hidden container mx-auto px-4 py-6 relative z-10">
        {/* CTA Button */}
        <div className="mb-6">
          <button 
            onClick={() => {
              const productsSection = document.getElementById('products-section');
              if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="w-full group relative px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold rounded-xl overflow-hidden transform active:scale-95 transition-all shadow-2xl shadow-purple-500/50 text-sm"
          >
            <span className="relative z-10 flex items-center justify-center">
              Explore Products
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: '10K+', label: 'Products', color: 'from-pink-500 to-rose-500' },
            { value: '50K+', label: 'Customers', color: 'from-purple-500 to-indigo-500' },
            { value: '99.9%', label: 'Satisfaction', color: 'from-cyan-500 to-blue-500' }
          ].map((stat, idx) => (
            <div key={idx} className={`text-center bg-gradient-to-br ${stat.color} rounded-xl p-3 shadow-lg`}>
              <div className="text-xl font-black text-white">{stat.value}</div>
              <div className="text-[10px] text-white/90 mt-1 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Premium Categories Section with Dark Theme - MOBILE OPTIMIZED */}
      <section className="container mx-auto px-4 py-8 md:py-16 lg:py-20 relative">
        {/* Decorative Background Elements - Hidden on mobile and tablet */}
        <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none opacity-50">
          <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl top-0 left-1/4"></div>
          <div className="absolute w-96 h-96 bg-pink-500/10 rounded-full blur-3xl bottom-0 right-1/4"></div>
        </div>

        {/* Section Header - MOBILE OPTIMIZED */}
        <div className="text-center mb-8 md:mb-16 relative z-10">
          {/* Badge - Hidden on mobile */}
          <div className="hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl px-4 md:px-6 py-2 rounded-full mb-4 md:mb-6 border border-purple-500/30">
            <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
            <span className="text-purple-300 text-xs md:text-sm font-semibold">BROWSE BY CATEGORY</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 md:mb-6 text-orange-500">
            Categories For You
          </h2>
          <p className="hidden md:block text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4">
            Find exactly what you need from our comprehensive collection of medical equipment. 
            <span className="text-purple-400 font-semibold"> Click any category to explore products.</span>
          </p>
        </div>

        {/* Categories Grid - MOBILE OPTIMIZED - 2 columns like products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-8 md:mb-12 relative z-10">
          {categories.length > 0 ? (
            categories.slice(0, 8).map((category, idx) => (
              <div
                key={category.id}
                className="md:animate-scale-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <CategoryCard 
                  category={category}
                  onClick={handleCategoryClick}
                />
              </div>
            ))
          ) : (
            // Placeholder cards while loading
            [...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse"
              >
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700 overflow-hidden">
                  <div className="h-40 sm:h-48 md:h-56 bg-gray-700/50"></div>
                  <div className="p-4 md:p-6">
                    <div className="h-5 md:h-6 bg-gray-700/50 rounded mb-2"></div>
                    <div className="h-3 md:h-4 bg-gray-700/50 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* View All Categories Button - MOBILE OPTIMIZED */}
        {categories.length > 8 && (
          <div className="text-center relative z-10">
            <button 
              onClick={() => setSelectedCategory('all')}
              className="group inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-sm md:text-base lg:text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-purple-500/50"
            >
              <span>View All Categories</span>
              <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        )}

        {/* Info Cards - HIDDEN ON MOBILE */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-10 md:mt-16 relative z-10">
          {[
            {
              icon: '🎯',
              title: 'Easy Navigation',
              description: 'Click any category card to filter products instantly',
              color: 'from-pink-500 to-rose-500'
            },
            {
              icon: '⚡',
              title: 'Quick Filters',
              description: 'Use filter pills below to find New, Used, or Discounted items',
              color: 'from-purple-500 to-indigo-500'
            },
            {
              icon: '🔍',
              title: 'Smart Search',
              description: 'Search by product name or description for precise results',
              color: 'from-cyan-500 to-blue-500'
            }
          ].map((info, idx) => (
            <div
              key={idx}
              className="bg-gray-800/50 backdrop-blur-xl rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center text-2xl md:text-3xl mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {info.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">{info.title}</h3>
              <p className="text-gray-400 leading-relaxed">{info.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Premium Filter Section - MOBILE OPTIMIZED */}
      <section className="container mx-auto px-4 mb-6 md:mb-12">
        {/* Smart Search Card - MOBILE OPTIMIZED */}
        <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 backdrop-blur-xl rounded-2xl p-6 md:p-8 mb-6 md:mb-8 shadow-2xl border border-purple-500/30">
          {/* Icon and Title */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl">
              <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-white">Smart Search</h3>
              <p className="text-sm text-gray-400">Search by product name or description for precise results</p>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search for medical equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 md:px-6 py-3 md:py-4 pl-12 md:pl-14 bg-white/5 border-2 border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all backdrop-blur-sm text-sm md:text-base"
            />
            <svg className="absolute left-4 md:left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <div className="hidden md:block absolute right-4 md:right-5 top-1/2 transform -translate-y-1/2">
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse shadow-lg shadow-pink-500/50"></div>
            </div>
          </div>
        </div>

        {/* Filter Pills - REDESIGNED FOR MOBILE */}
        <div className="space-y-3">
          {/* Main Filters Row */}
          <div className="flex flex-wrap gap-2 md:gap-3">
            {[
              { id: 'all', label: 'All Products', icon: '🏥', color: 'from-purple-500 to-indigo-500' },
              { id: 'discount', label: 'Discount', icon: '🔥', color: 'from-red-500 to-pink-500' },
              { id: 'new', label: 'New', icon: '✨', color: 'from-green-500 to-emerald-500' },
              { id: 'used', label: 'Used', icon: '♻️', color: 'from-blue-500 to-cyan-500' },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleCategoryClick(filter.id)}
                className={`flex items-center gap-1.5 px-4 md:px-5 py-2.5 md:py-3 rounded-xl font-bold transition-all transform active:scale-95 text-xs md:text-sm ${
                  selectedCategory === filter.id 
                    ? `bg-gradient-to-r ${filter.color} text-white shadow-xl scale-105` 
                    : 'bg-white/5 backdrop-blur-xl border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:scale-105'
                }`}
              >
                <span className="text-base">{filter.icon}</span>
                <span>{filter.label}</span>
              </button>
            ))}
          </div>

          {/* Categories Row - Scrollable on mobile */}
          {categories.length > 0 && (
            <div className="relative">
              <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`flex-shrink-0 snap-start px-4 md:px-5 py-2.5 md:py-3 rounded-xl font-bold transition-all transform active:scale-95 text-xs md:text-sm whitespace-nowrap ${
                      selectedCategory === category.id 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-xl scale-105' 
                        : 'bg-white/5 backdrop-blur-xl border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:scale-105'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              {/* Scroll indicator */}
              <div className="absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none md:hidden"></div>
            </div>
          )}
        </div>

        {/* Add scrollbar hide utility */}
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </section>

      {/* Premium Products Grid - MOBILE OPTIMIZED */}
      <section id="products-section" className="container mx-auto px-4 pb-12 md:pb-16 lg:pb-20 flex-grow">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-12 gap-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-pink-500">
            Products
          </h2>
          
          {/* View Toggle */}
          <div className="flex gap-2">
            <button className="p-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 transition-all text-purple-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-pink-500 rounded-full animate-spin shadow-lg shadow-purple-500/50"></div>
              <p className="text-gray-300 mt-4 font-semibold">Loading premium products...</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-xl rounded-2xl p-12 max-w-md mx-auto border border-purple-500/30">
              <svg className="w-20 h-20 mx-auto text-purple-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-white text-lg font-bold">No products found</p>
              <p className="text-gray-400 mt-2">Try adjusting your filters</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {products.map((product, idx) => (
              <div
                key={product.id}
                className="md:animate-scale-in"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
