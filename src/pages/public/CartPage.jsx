import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Navbar from '../../components/public/Navbar';
import Footer from '../../components/public/Footer';
import { FiTrash2, FiShoppingCart, FiArrowLeft, FiPhone } from 'react-icons/fi';
import { FaTelegram } from 'react-icons/fa';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Navbar />
        <div className="flex-grow flex items-center justify-center px-4">
          <div className="text-center bg-gray-800/50 backdrop-blur-sm p-12 rounded-2xl border border-gray-700 max-w-md">
            <FiShoppingCart className="text-6xl text-gray-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h2>
            <p className="text-gray-400 mb-8">Add some products to get started!</p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <FiArrowLeft />
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8 flex-grow">
        <div className="mb-4 sm:mb-6 md:mb-8">
          <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-3 sm:mb-4 group transition-all duration-300 touch-manipulation">
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" size={18} />
            <span className="font-medium text-sm sm:text-base">Continue Shopping</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">Shopping Cart</h1>
          <p className="text-gray-400 text-sm sm:text-base">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Cart Items - Mobile optimized */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-gray-800/50 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300">
                <div className="flex gap-3 sm:gap-4 md:gap-6">
                  {/* Product Image - Mobile optimized */}
                  <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <img 
                      src={item.product_images?.[0]?.image_url || '/placeholder.jpg'} 
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-lg"
                    />
                  </Link>

                  {/* Product Info - Mobile optimized */}
                  <div className="flex-grow min-w-0">
                    <Link to={`/product/${item.id}`} className="text-base sm:text-lg md:text-xl font-bold text-white hover:text-blue-400 transition-colors line-clamp-2">
                      {item.name}
                    </Link>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1">{item.categories?.name}</p>
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-400 mt-1 sm:mt-2">
                      {item.price?.toFixed(2)} ETB
                    </div>
                  </div>

                  {/* Quantity Controls - Mobile optimized */}
                  <div className="flex flex-col items-end gap-2 sm:gap-3 md:gap-4">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-300 active:text-red-300 p-1.5 sm:p-2 hover:bg-red-500/10 active:bg-red-500/10 rounded-lg transition-all touch-manipulation"
                      title="Remove from cart"
                      aria-label="Remove from cart"
                    >
                      <FiTrash2 size={18} className="sm:w-5 sm:h-5" />
                    </button>

                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-700 hover:bg-gray-600 active:bg-gray-600 text-white rounded-lg font-bold transition-all text-sm sm:text-base touch-manipulation"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="text-white font-bold min-w-[30px] sm:min-w-[40px] text-center text-base sm:text-lg">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-700 hover:bg-gray-600 active:bg-gray-600 text-white rounded-lg font-bold transition-all text-sm sm:text-base touch-manipulation"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-white font-semibold text-sm sm:text-base">
                      {(item.price * item.quantity).toFixed(2)} ETB
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-red-400 hover:text-red-300 active:text-red-300 font-semibold flex items-center gap-2 hover:bg-red-500/10 active:bg-red-500/10 px-3 sm:px-4 py-2 rounded-lg transition-all text-sm sm:text-base touch-manipulation"
            >
              <FiTrash2 />
              Clear Cart
            </button>
          </div>

          {/* Order Summary - Mobile optimized */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-gray-700 lg:sticky lg:top-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Order Summary</h2>
              
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex justify-between text-gray-300 text-sm sm:text-base">
                  <span>Subtotal</span>
                  <span className="font-semibold">{getCartTotal().toFixed(2)} ETB</span>
                </div>
                <div className="flex justify-between text-gray-300 text-sm sm:text-base">
                  <span>Items</span>
                  <span className="font-semibold">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="border-t border-gray-700 pt-3 sm:pt-4">
                  <div className="flex justify-between text-white text-lg sm:text-xl font-bold">
                    <span>Total</span>
                    <span>{getCartTotal().toFixed(2)} ETB</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">Contact to Order</h3>
                
                <a 
                  href="tel:+251901525863" 
                  className="group w-full flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 active:from-green-700 active:to-emerald-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-green-500/50 text-sm sm:text-base touch-manipulation"
                >
                  <FiPhone className="text-lg sm:text-xl group-hover:rotate-12 transition-transform duration-300" />
                  <span>Call Now</span>
                </a>

                <a 
                  href="https://t.me/reyan701" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 active:from-blue-700 active:to-cyan-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-blue-500/50 text-sm sm:text-base touch-manipulation"
                >
                  <FaTelegram className="text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300" />
                  <span>Telegram</span>
                </a>

                <Link 
                  to="/contact" 
                  className="group w-full flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 active:from-purple-700 active:to-pink-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/50 text-sm sm:text-base touch-manipulation"
                >
                  <span>Send Message</span>
                </Link>
              </div>

              <p className="text-gray-400 text-xs sm:text-sm mt-4 sm:mt-6 text-center">
                Contact us to complete your order
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
