import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiHeart, FiInstagram, FiFacebook, FiTwitter, FiLinkedin, FiCode, FiExternalLink } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900"></div>
      
      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ top: '-10%', left: '10%' }}></div>
        <div className="absolute w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-float" style={{ bottom: '-10%', right: '10%', animationDelay: '2s' }}></div>
        <div className="absolute w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ top: '30%', right: '30%', animationDelay: '1s' }}></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(236, 72, 153, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About - Full width on mobile */}
          <div className="space-y-4 col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
                <FiHeart className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">RayanMedical</h3>
                <span className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Market</span>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your trusted platform for premium medical equipment. Quality healthcare solutions delivered to your doorstep.
            </p>
            {/* Social Media */}
            <div className="flex space-x-3 pt-4">
              {[
                { icon: FiFacebook, color: 'from-blue-500 to-blue-600' },
                { icon: FiTwitter, color: 'from-cyan-500 to-blue-500' },
                { icon: FiInstagram, color: 'from-pink-500 to-purple-500' },
                { icon: FiLinkedin, color: 'from-blue-600 to-indigo-600' }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  className={`w-10 h-10 bg-gradient-to-br ${social.color} rounded-lg flex items-center justify-center hover:scale-110 transition-transform shadow-lg`}
                >
                  <social.icon className="text-white" size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links, Categories, and Get In Touch - Horizontal on mobile */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-3 gap-4 md:gap-8">
            {/* Quick Links */}
            <div>
            <h3 className="text-base md:text-xl font-black mb-3 md:mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-pink-400 transition-colors flex items-center space-x-1 md:space-x-2 group text-xs md:text-base"
                >
                  <span className="w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-4 transition-all"></span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-pink-400 transition-colors flex items-center space-x-1 md:space-x-2 group text-xs md:text-base"
                >
                  <span className="w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-4 transition-all"></span>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    window.location.href = '/';
                  }}
                  className="text-gray-300 hover:text-pink-400 transition-colors flex items-center space-x-1 md:space-x-2 group text-xs md:text-base"
                >
                  <span className="w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-4 transition-all"></span>
                  <span>Products</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-pink-400 transition-colors flex items-center space-x-1 md:space-x-2 group text-xs md:text-base"
                >
                  <span className="w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-4 transition-all"></span>
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-base md:text-xl font-black mb-3 md:mb-6 bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Categories
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {[
                { name: 'Diagnostic Tools', icon: '🩺' },
                { name: 'Laboratory Equipment', icon: '🔬' },
                { name: 'Imaging Systems', icon: '📷' },
                { name: 'Respiratory Care', icon: '🫁' }
              ].map((category, idx) => (
                <li key={idx}>
                  <Link
                    to="/"
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setTimeout(() => {
                        window.location.href = '/';
                      }, 300);
                    }}
                    className="text-gray-300 hover:text-purple-400 transition-colors flex items-center space-x-1 md:space-x-2 group text-xs md:text-base"
                  >
                    <span className="w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:w-4 transition-all"></span>
                    <span className="flex items-center gap-1 md:gap-2">
                      <span className="hidden md:inline">{category.icon}</span>
                      <span>{category.name}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Help */}
          <div>
            <h3 className="text-base md:text-xl font-black mb-3 md:mb-6 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              Get In Touch
            </h3>
            <div className="space-y-2 md:space-y-4">
              <a
                href="tel:+251901525863"
                className="flex items-center space-x-2 md:space-x-3 text-gray-300 hover:text-cyan-400 transition-colors group"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <FiPhone className="text-white" size={14} />
                </div>
                <span className="text-xs md:text-base truncate">+251 90 152 5863</span>
              </a>
              <a
                href="mailto:rayanmedicalmarket@gmail.com"
                className="flex items-center space-x-2 md:space-x-3 text-gray-300 hover:text-cyan-400 transition-colors group"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <FiMail className="text-white" size={14} />
                </div>
                <span className="text-xs md:text-sm break-all">rayanmedicalmarket@gmail.com</span>
              </a>
              <div className="flex items-start space-x-2 md:space-x-3 text-gray-300">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiMapPin className="text-white" size={14} />
                </div>
                <span className="text-xs md:text-base">Addis Ababa, Ethiopia</span>
              </div>
              
              {/* Help Button */}
              <Link
                to="/help"
                className="mt-2 md:mt-4 flex items-center justify-center space-x-1 md:space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-2 md:px-4 py-2 md:py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg text-xs md:text-base"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <span>Need Help?</span>
              </Link>
            </div>
          </div>
          </div>
        </div>

        {/* Developer Section */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/50 group-hover:scale-110 transition-transform">
                <FiCode className="text-white" size={24} />
              </div>
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-400 mb-1">Developed & Designed by</p>
                <a
                  href="https://abdilazizn.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-start space-x-2 text-xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent hover:from-emerald-300 hover:via-teal-300 hover:to-cyan-300 transition-all group"
                >
                  <span>Abdilaziz Nasir</span>
                  <FiExternalLink className="text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span>Full Stack Developer & UI/UX Designer</span>
              </div>
              <a
                href="https://abdilazizn.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400 text-white font-semibold rounded-lg shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all hover:scale-105 flex items-center space-x-2 group"
              >
                <span className="text-base">Visit Portfolio</span>
                <FiExternalLink className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-center md:text-left text-sm">
              &copy; 2026 RayanMedical Market. All rights reserved. Made with{' '}
              <span className="text-pink-500 animate-pulse">❤️</span> in Ethiopia
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm">
              <Link to="/admin/login" className="text-gray-400 hover:text-pink-400 transition-colors">
                Admin Portal
              </Link>
              <Link to="/about" className="text-gray-400 hover:text-pink-400 transition-colors">
                About Us
              </Link>
              <Link to="/help" className="text-gray-400 hover:text-pink-400 transition-colors">
                Help Center
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-pink-400 transition-colors">
                Support
              </Link>
              <a 
                href="tel:+251901525863" 
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"></div>
    </footer>
  );
};

export default Footer;
