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
          {/* About */}
          <div className="space-y-4">
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

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-black mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/products', label: 'Products' },
                { to: '/contact', label: 'Contact Us' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-pink-400 transition-colors flex items-center space-x-2 group"
                  >
                    <span className="w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-4 transition-all"></span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-black mb-6 bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Categories
            </h3>
            <ul className="space-y-3">
              {[
                'Diagnostic Tools',
                'Laboratory Equipment',
                'Imaging Systems',
                'Surgical Instruments'
              ].map((category, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-purple-400 transition-colors flex items-center space-x-2 group"
                  >
                    <span className="w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:w-4 transition-all"></span>
                    <span>{category}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-black mb-6 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              Get In Touch
            </h3>
            <div className="space-y-4">
              <a
                href="tel:+251900763647"
                className="flex items-center space-x-3 text-gray-300 hover:text-cyan-400 transition-colors group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FiPhone className="text-white" size={18} />
                </div>
                <span>+251 90 152 5863</span>
              </a>
              <a
                href="mailto:info@docteramarket.com"
                className="flex items-center space-x-3 text-gray-300 hover:text-cyan-400 transition-colors group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FiMail className="text-white" size={18} />
                </div>
                <span>rayanmedicalmarket@gmail.com</span>
              </a>
              <div className="flex items-start space-x-3 text-gray-300">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiMapPin className="text-white" size={18} />
                </div>
                <span>Addis Ababa, Ethiopia</span>
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
            <p className="text-gray-400 text-center md:text-left">
              &copy; 2026 RayanMedical Market. All rights reserved. Made with{' '}
              <span className="text-pink-500 animate-pulse">❤️</span> in Ethiopia
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link to="/admin/login" className="text-gray-400 hover:text-pink-400 transition-colors">
                Admin Portal
              </Link>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                Cookie Policy
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
