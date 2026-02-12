import { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import Navbar from '../../components/public/Navbar';
import Footer from '../../components/public/Footer';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Save contact request to Supabase
    const { error: submitError } = await supabase
      .from('contact_requests')
      .insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        is_handled: false
      }]);

    setLoading(false);

    if (submitError) {
      setError('Failed to send message. Please try again.');
    } else {
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12 flex-grow">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 sm:mb-3 md:mb-4 text-white">Contact Us</h1>
        <p className="text-center text-gray-400 mb-6 sm:mb-8 md:mb-12 text-sm sm:text-base">
          Have questions? We'd love to hear from you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Contact Form - Mobile optimized */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Send us a message</h2>
            
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                Message sent successfully! We'll get back to you soon.
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2 text-sm sm:text-base">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2 text-sm sm:text-base">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2 text-sm sm:text-base">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
                  placeholder="+251 900 000 000"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2 text-sm sm:text-base">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm sm:text-base resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 active:from-pink-600 active:to-purple-600 text-white font-bold py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-sm sm:text-base touch-manipulation"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <div className="card p-8 mb-6">
              <h2 className="text-2xl font-bold mb-6">Get in touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary text-white p-3 rounded-lg">
                    <FiPhone size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <p className="text-gray-600">+251 90 152 5863</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary text-white p-3 rounded-lg">
                    <FiMail size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-gray-600">rayanmedicalmarket@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary text-white p-3 rounded-lg">
                    <FiMapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Location</h3>
                    <p className="text-gray-600">Addis Ababa, Ethiopia</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-8 bg-gradient-to-br from-primary to-dark text-white">
              <h3 className="text-xl font-bold mb-3">Business Hours</h3>
              <div className="space-y-2">
                <p>Monday - Friday: 24hrs</p>
                <p>Saturday: 24hrs</p>
                <p>Sunday: 24hrs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
