import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import Navbar from '../../components/public/Navbar';
import Footer from '../../components/public/Footer';
import ImageCarousel from '../../components/public/ImageCarousel';
import SEO from '../../components/SEO';
import { FiArrowLeft, FiPhone, FiSend, FiShoppingCart, FiCheck } from 'react-icons/fi';
import { FaTelegram } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart, cart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (id, name),
        product_images (id, image_url, is_primary)
      `)
      .eq('id', id)
      .single();

    if (!error && data) {
      setProduct(data);
    }
    setLoading(false);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const isInCart = cart.some(item => item.id === product?.id);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
            <p className="text-gray-300 text-lg">Loading product...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
            <p className="text-gray-300 mb-6 text-xl">Product not found</p>
            <Link to="/" className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <SEO 
        title={product ? `${product.name} - RayanMedical Market` : 'Product Details - RayanMedical Market'}
        description={product ? product.description : 'View detailed information about medical equipment and supplies at RayanMedical Market'}
        keywords={product ? `${product.name}, medical equipment, healthcare products, ${product.categories?.name}` : 'medical equipment, healthcare products'}
        url={`https://reyanmedical-market.vercel.app/product/${id}`}
        image={product?.product_images?.find(img => img.is_primary)?.image_url || 'https://reyanmedical-market.vercel.app/vite.svg'}
        type="product"
      />
      <Navbar categories={[]} />
      
      <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8 flex-grow">
        {/* Back Button - Mobile optimized */}
        <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4 sm:mb-6 md:mb-8 group transition-all duration-300 touch-manipulation">
          <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" size={18} />
          <span className="font-medium text-sm sm:text-base">Back to Products</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* Image Carousel - Mobile optimized */}
          <div className="relative">
            <div className="lg:sticky lg:top-8">
              <div className="bg-gray-800/50 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-gray-700 shadow-2xl">
                <ImageCarousel images={product.product_images || []} />
              </div>
            </div>
          </div>

          {/* Product Info - Mobile optimized */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {/* Category and Condition Badge - Mobile optimized */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="text-xs sm:text-sm text-gray-400 bg-gray-800/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-gray-700">
                {product.categories?.name}
              </span>
              {product.condition && (
                <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold text-white shadow-lg ${
                  product.condition === 'new' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                  product.condition === 'discount' ? 'bg-gradient-to-r from-red-500 to-pink-600' :
                  'bg-gradient-to-r from-blue-500 to-cyan-600'
                }`}>
                  {product.condition.toUpperCase()}
                </span>
              )}
            </div>

            {/* Product Title - Mobile optimized */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Price - Mobile optimized */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-2xl border border-blue-500/50">
              <p className="text-gray-200 text-xs sm:text-sm mb-1">Price</p>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                {product.price?.toFixed(2)} <span className="text-lg sm:text-xl md:text-2xl">ETB</span>
              </div>
            </div>

            {/* Description - Mobile optimized */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-gray-700">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center">
                <span className="w-1 h-5 sm:h-6 bg-gradient-to-b from-blue-500 to-purple-500 mr-2 sm:mr-3 rounded-full"></span>
                Description
              </h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line text-sm sm:text-base md:text-lg">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector and Add to Cart - Mobile optimized */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-gray-700">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-3 sm:mb-4">Quantity</h3>
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <button
                  onClick={decrementQuantity}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 hover:bg-gray-600 active:bg-gray-600 text-white rounded-lg font-bold text-lg sm:text-xl transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="text-2xl sm:text-3xl font-bold text-white min-w-[50px] sm:min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 hover:bg-gray-600 active:bg-gray-600 text-white rounded-lg font-bold text-lg sm:text-xl transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              
              <button
                onClick={handleAddToCart}
                disabled={addedToCart}
                className={`group relative w-full flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg touch-manipulation ${
                  addedToCart
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 hover:shadow-orange-500/50'
                } text-white`}
              >
                {addedToCart ? (
                  <>
                    <FiCheck className="text-xl sm:text-2xl animate-bounce" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <FiShoppingCart className="text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-300" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
              
              {isInCart && !addedToCart && (
                <p className="text-green-400 text-xs sm:text-sm mt-2 text-center">
                  ✓ This item is already in your cart
                </p>
              )}
            </div>

            {/* Contact Buttons - Mobile optimized */}
            <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-3 sm:mb-4">Get in Touch</h3>
              
              <a 
                href="tel:+251901525863" 
                className="group relative w-full flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 active:from-green-700 active:to-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-green-500/50 touch-manipulation"
              >
                <FiPhone className="text-lg sm:text-xl md:text-2xl group-hover:rotate-12 transition-transform duration-300" />
                <span>Call: +251 90 152 5863</span>
              </a>

              <a 
                href="https://t.me/reyan701" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 active:from-blue-700 active:to-cyan-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-blue-500/50 touch-manipulation"
              >
                <FaTelegram className="text-lg sm:text-xl md:text-2xl group-hover:scale-110 transition-transform duration-300" />
                <span>Telegram: @reyan701</span>
              </a>

              <Link 
                to="/contact" 
                className="group relative w-full flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 active:from-purple-700 active:to-pink-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/50 touch-manipulation"
              >
                <FiSend className="text-lg sm:text-xl md:text-2xl group-hover:translate-x-1 transition-transform duration-300" />
                <span>Send Message</span>
              </Link>
            </div>

            {/* Payment Methods - Mobile optimized */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-gray-700 mt-4 sm:mt-5 md:mt-6">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center">
                <span className="w-1 h-5 sm:h-6 bg-gradient-to-b from-green-500 to-blue-500 mr-2 sm:mr-3 rounded-full"></span>
                Payment Methods
              </h3>
              <p className="text-gray-300 mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base">We accept multiple payment options for your convenience</p>
              
              <div className="space-y-4">
                {/* TeleBirr */}
                <div className="group bg-gray-900/50 p-4 rounded-xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white font-bold text-xl">TB</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold text-lg mb-1">TeleBirr</h4>
                      <p className="text-gray-400 text-sm">Fast and secure mobile payment. Pay instantly using your TeleBirr wallet.</p>
                    </div>
                  </div>
                </div>

                {/* CBE Birr */}
                <div className="group bg-gray-900/50 p-4 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white font-bold text-xl">CBE</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold text-lg mb-1">CBE Birr</h4>
                      <p className="text-gray-400 text-sm">Commercial Bank of Ethiopia mobile banking. Secure transactions directly from your CBE account.</p>
                    </div>
                  </div>
                </div>

                {/* Bank Transfer */}
                <div className="group bg-gray-900/50 p-4 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white font-bold text-xl">🏦</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold text-lg mb-1">Bank Transfer</h4>
                      <p className="text-gray-400 text-sm">Direct bank transfer to our account. Contact us for bank details and transfer instructions.</p>
                    </div>
                  </div>
                </div>

                {/* Cash on Delivery */}
                <div className="group bg-gray-900/50 p-4 rounded-xl border border-gray-700 hover:border-green-500/50 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white font-bold text-xl">💵</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold text-lg mb-1">Cash on Delivery</h4>
                      <p className="text-gray-400 text-sm">Pay with cash when you receive your order. Available for local deliveries.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <p className="text-blue-300 text-sm">
                  <span className="font-semibold">💡 Note:</span> All payments are secure and processed safely. Contact us for any payment-related questions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
