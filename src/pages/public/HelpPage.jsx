import { useState } from 'react';
import Navbar from '../../components/public/Navbar';
import Footer from '../../components/public/Footer';
import BackButton from '../../components/public/BackButton';
import { FiSearch, FiShoppingCart, FiPackage, FiCreditCard, FiTruck, FiHelpCircle, FiPhone, FiMail, FiMessageSquare } from 'react-icons/fi';
import { FaTelegram } from 'react-icons/fa';

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const helpCategories = [
    { id: 'all', label: 'All Topics', icon: FiHelpCircle },
    { id: 'ordering', label: 'Ordering', icon: FiShoppingCart },
    { id: 'payment', label: 'Payment', icon: FiCreditCard },
    { id: 'delivery', label: 'Delivery', icon: FiTruck },
    { id: 'products', label: 'Products', icon: FiPackage }
  ];

  const faqs = [
    {
      category: 'ordering',
      question: 'How do I place an order?',
      answer: 'Browse our products, add items to your cart, and contact us via phone, Telegram, or the contact form to complete your order. Our team will guide you through the process and confirm your order details.'
    },
    {
      category: 'ordering',
      question: 'Can I modify or cancel my order?',
      answer: 'Yes, you can modify or cancel your order by contacting us immediately via phone (+251 90 152 5863) or Telegram. Once the order is shipped, modifications may not be possible.'
    },
    {
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept TeleBirr, CBE Birr, bank transfers, and cash on delivery for local orders. Contact us for specific payment instructions for your order.'
    },
    {
      category: 'payment',
      question: 'Is my payment information secure?',
      answer: 'Yes, all payment transactions are processed securely. We use trusted payment platforms and never store your payment information on our servers.'
    },
    {
      category: 'delivery',
      question: 'How long does delivery take?',
      answer: 'Delivery times vary based on your location. Within Addis Ababa, orders typically arrive within 1-3 business days. For other cities, delivery may take 3-7 business days.'
    },
    {
      category: 'delivery',
      question: 'Do you deliver nationwide?',
      answer: 'Yes, we deliver to all major cities in Ethiopia. Delivery fees vary based on location and order size. Contact us for specific delivery information for your area.'
    },
    {
      category: 'delivery',
      question: 'How can I track my order?',
      answer: 'Once your order is shipped, we will provide you with tracking information via phone or Telegram. You can also contact us anytime for order status updates.'
    },
    {
      category: 'products',
      question: 'Are your products genuine?',
      answer: 'Yes, all our products are sourced from certified manufacturers and authorized distributors. We guarantee the authenticity and quality of every item we sell.'
    },
    {
      category: 'products',
      question: 'Do you offer warranties?',
      answer: 'Yes, most of our products come with manufacturer warranties. Warranty terms vary by product. Contact us for specific warranty information for any item.'
    },
    {
      category: 'products',
      question: 'Can I return a product?',
      answer: 'Returns are accepted for defective or damaged products within 7 days of delivery. Please contact us immediately if you receive a defective item, and we will arrange a replacement or refund.'
    },
    {
      category: 'products',
      question: 'Do you offer bulk discounts?',
      answer: 'Yes, we offer special pricing for bulk orders and institutional purchases. Contact us with your requirements, and we will provide a customized quote.'
    },
    {
      category: 'ordering',
      question: 'How do I know if a product is in stock?',
      answer: 'All products displayed on our website are generally in stock. However, for large quantities or specific items, we recommend contacting us to confirm availability before placing your order.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      <BackButton />
      
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 flex-grow">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-6 border border-purple-500/30">
            <FiHelpCircle className="text-pink-500" size={20} />
            <span className="text-white text-xs sm:text-sm font-semibold">Help Center</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4">
            How Can We{' '}
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Help You?
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-6 sm:mb-8">
            Find answers to common questions or contact our support team for assistance.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <FiSearch className="absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 sm:pl-14 pr-4 py-3 sm:py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 sm:mb-12">
          {helpCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all text-sm sm:text-base ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
              }`}
            >
              <category.icon size={18} />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 sm:mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-3 sm:space-y-4">
            {filteredFaqs.map((faq, idx) => (
              <details
                key={idx}
                className="bg-gray-800/50 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all group"
              >
                <summary className="cursor-pointer p-4 sm:p-6 font-bold text-white text-sm sm:text-base md:text-lg list-none flex items-center justify-between">
                  <span className="flex-1 pr-4">{faq.question}</span>
                  <span className="text-purple-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-gray-300 leading-relaxed text-sm sm:text-base">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 bg-gray-800/50 rounded-2xl border border-gray-700">
              <FiSearch className="mx-auto text-gray-500 mb-4" size={48} />
              <p className="text-gray-400 text-lg">No results found. Try a different search term.</p>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-xl rounded-2xl p-6 sm:p-8 md:p-12 border border-purple-500/30">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4 text-center">
            Still Need Help?
          </h2>
          <p className="text-gray-300 text-center mb-6 sm:mb-8 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Our support team is available 24/7 to assist you. Choose your preferred contact method below.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Phone */}
            <a
              href="tel:+251901525863"
              className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-gray-700 hover:border-green-500/50 transition-all hover:scale-105 group"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <FiPhone className="text-white" size={24} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Call Us</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-2">Available 24/7</p>
              <p className="text-green-400 font-semibold text-sm sm:text-base">+251 90 152 5863</p>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/reyan701"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-gray-700 hover:border-blue-500/50 transition-all hover:scale-105 group"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <FaTelegram className="text-white" size={24} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Telegram</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-2">Quick responses</p>
              <p className="text-blue-400 font-semibold text-sm sm:text-base">@reyan701</p>
            </a>

            {/* Email */}
            <a
              href="mailto:rayanmedicalmarket@gmail.com"
              className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-gray-700 hover:border-purple-500/50 transition-all hover:scale-105 group sm:col-span-2 lg:col-span-1"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <FiMail className="text-white" size={24} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Email Us</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-2">Detailed inquiries</p>
              <p className="text-purple-400 font-semibold text-xs sm:text-sm break-all">rayanmedicalmarket@gmail.com</p>
            </a>
          </div>

          {/* Contact Form Link */}
          <div className="mt-6 sm:mt-8 text-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg text-sm sm:text-base"
            >
              <FiMessageSquare size={20} />
              <span>Send Us a Message</span>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HelpPage;
