import Navbar from '../../components/public/Navbar';
import Footer from '../../components/public/Footer';
import BackButton from '../../components/public/BackButton';
import SEO from '../../components/SEO';
import { FiHeart, FiShield, FiTruck, FiAward, FiUsers, FiTarget, FiCheckCircle } from 'react-icons/fi';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <SEO 
        title="About Us - RayanMedical Market"
        description="Learn about RayanMedical Market, your trusted partner in medical equipment. We provide premium quality medical equipment to healthcare professionals across Ethiopia."
        keywords="about RayanMedical, medical equipment Ethiopia, healthcare solutions, medical supplies company"
        url="https://reyanmedical-market.vercel.app/about"
      />
      <Navbar />
      <BackButton />
      
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 flex-grow">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-6 border border-purple-500/30">
            <FiHeart className="text-pink-500" size={20} />
            <span className="text-white text-xs sm:text-sm font-semibold">About RayanMedical Market</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6">
            Your Trusted Partner in{' '}
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Medical Equipment
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We provide premium quality medical equipment to healthcare professionals and institutions across Ethiopia, 
            ensuring the best care for patients through reliable and innovative solutions.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-purple-500/30">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
              <FiTarget className="text-white" size={28} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              To provide accessible, high-quality medical equipment to healthcare providers across Ethiopia, 
              supporting better patient outcomes and advancing healthcare standards in our community.
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-900/50 to-purple-900/50 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-pink-500/30">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
              <FiAward className="text-white" size={28} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Our Vision</h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              To become the leading medical equipment marketplace in Ethiopia, known for reliability, 
              quality, and exceptional customer service, while contributing to the advancement of healthcare infrastructure.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-center text-white mb-8 sm:mb-12">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              RayanMedical Market
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: FiShield,
                title: 'Quality Assurance',
                description: 'All our products are sourced from certified manufacturers and undergo strict quality checks.',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: FiTruck,
                title: 'Fast Delivery',
                description: 'Quick and reliable delivery service across Addis Ababa and major cities in Ethiopia.',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: FiUsers,
                title: 'Expert Support',
                description: '24/7 customer support from our knowledgeable team to help you make the right choice.',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: FiAward,
                title: 'Competitive Pricing',
                description: 'Best prices in the market with special discounts for bulk orders and regular customers.',
                color: 'from-orange-500 to-red-500'
              },
              {
                icon: FiCheckCircle,
                title: 'Wide Selection',
                description: 'Extensive range of medical equipment from diagnostic tools to laboratory equipment.',
                color: 'from-cyan-500 to-blue-500'
              },
              {
                icon: FiHeart,
                title: 'Trusted by Professionals',
                description: 'Serving hospitals, clinics, and healthcare professionals across Ethiopia.',
                color: 'from-pink-500 to-rose-500'
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-gray-800/50 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700 hover:border-purple-500/50 transition-all hover:scale-105 group"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${feature.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Story */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-6 sm:p-8 md:p-12 border border-gray-700 mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 sm:mb-6">Our Story</h2>
          <div className="space-y-4 sm:space-y-6 text-gray-300 leading-relaxed text-sm sm:text-base">
            <p>
              RayanMedical Market was founded with a simple yet powerful vision: to make high-quality medical equipment 
              accessible to healthcare providers across Ethiopia. We recognized the challenges faced by hospitals, clinics, 
              and medical professionals in sourcing reliable equipment, and we set out to bridge that gap.
            </p>
            <p>
              Starting as a small operation in Addis Ababa, we've grown into a trusted marketplace serving healthcare 
              institutions throughout the country. Our success is built on three pillars: quality products, exceptional 
              service, and a deep commitment to improving healthcare outcomes.
            </p>
            <p>
              Today, we work with leading manufacturers and suppliers worldwide to bring you the latest medical technology 
              and equipment. From diagnostic tools to laboratory equipment, from imaging systems to respiratory care devices, 
              we offer a comprehensive range of products to meet all your medical equipment needs.
            </p>
            <p>
              Our team of experienced professionals is dedicated to understanding your specific requirements and providing 
              personalized solutions. We don't just sell equipment – we build lasting partnerships with our customers, 
              supporting them every step of the way.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 md:mb-16">
          {[
            { value: '10,000+', label: 'Products', color: 'from-pink-500 to-rose-500' },
            { value: '50,000+', label: 'Happy Customers', color: 'from-purple-500 to-indigo-500' },
            { value: '99.9%', label: 'Satisfaction Rate', color: 'from-cyan-500 to-blue-500' },
            { value: '24/7', label: 'Support Available', color: 'from-green-500 to-emerald-500' }
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${stat.color} rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:scale-105 transition-transform shadow-xl`}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 sm:mb-2">{stat.value}</div>
              <div className="text-xs sm:text-sm text-white/90 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 sm:p-8 md:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/90 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Browse our extensive collection of medical equipment or contact our team for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="/"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-purple-600 font-bold rounded-xl hover:scale-105 transition-transform shadow-lg text-sm sm:text-base"
            >
              Browse Products
            </a>
            <a
              href="/contact"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-lg text-sm sm:text-base"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
