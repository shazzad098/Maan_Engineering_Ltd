import React from "react";
import { Link } from "react-router-dom";
import { 
  FaBolt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaArrowUp,
  FaClock,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white">
      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-secondary-accent/5 pointer-events-none"></div>
      
      {/* Circuit Pattern Background */}
      <div className="absolute inset-0 circuit-pattern opacity-5 pointer-events-none"></div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        
        {/* Top Section with Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12 pb-12 border-b border-white/10">
          
          {/* Company Info - Modern */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-5">
              {/* 👇 লোগো ইমেজ এখানে যুক্ত করা হয়েছে 👇 */}
              <Link to="/" className="block">
                <img 
                  src="/assets/logo.png" 
                  alt="MAAN ENGINEERING LTD. Logo" 
                  className="h-10 w-auto object-contain" 
                />
              </Link>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Engineering excellence since 2004. Delivering innovative electrical solutions that power Bangladesh's industrial future.
            </p>
          </div>

          {/* Quick Links - Modern Cards Style */}
          <div>
            <h3 className="font-display font-semibold text-base mb-6 relative inline-block">
              Quick Links
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-accent rounded-full"></div>
            </h3>
            <ul className="space-y-3 text-sm">
              {['Home', 'About Us', 'Our Products', 'Our Clients', 'Contact Us'].map((item, idx) => (
                <li key={idx}>
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '')}`} 
                    className="text-gray-300 hover:text-accent transition-all duration-300 flex items-center space-x-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-accent transition-all duration-300"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products - With Icons */}
          <div>
            <h3 className="font-display font-semibold text-base mb-6 relative inline-block">
              Our Solutions
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-accent rounded-full"></div>
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                'Busbar Trunking System',
                'Sub Station Equipment',
                'Lighting Services',
                'LV Switchgear Components',
                'Control Systems'
              ].map((product, idx) => (
                <li key={idx}>
                  <Link 
                    to={`/products?tab=${product.split(' ')[0]}`}
                    className="text-gray-300 hover:text-accent transition-all duration-300 flex items-center space-x-2 group"
                  >
                    <span className="w-1 h-1 bg-accent rounded-full group-hover:scale-150 transition-transform duration-300"></span>
                    <span>{product}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - Modern Cards */}
          <div>
            <h3 className="font-display font-semibold text-base mb-6 relative inline-block">
              Get In Touch
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-accent rounded-full"></div>
            </h3>
            <div className="space-y-4">
              <div className="group bg-white/5 hover:bg-white/10 rounded-xl p-3 transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-start space-x-3">
                  <div className="bg-accent/20 p-2 rounded-lg group-hover:bg-accent/30 transition-colors">
                    <FaMapMarkerAlt className="text-accent text-sm" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Head Office</p>
                    <p className="text-sm text-gray-200 leading-relaxed">111, Nayapaltan 3rd Floor, Dhaka-1000, Bangladesh</p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-white/5 hover:bg-white/10 rounded-xl p-3 transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="bg-accent/20 p-2 rounded-lg group-hover:bg-accent/30 transition-colors">
                    <FaPhoneAlt className="text-accent text-sm" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Phone</p>
                    <p className="text-sm text-gray-200">+880 1988 887744</p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-white/5 hover:bg-white/10 rounded-xl p-3 transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="bg-accent/20 p-2 rounded-lg group-hover:bg-accent/30 transition-colors">
                    <FaEnvelope className="text-accent text-sm" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Email</p>
                    <p className="text-sm text-gray-200">info@maanengineeringltd.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Modern */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6">
          <div className="text-center md:text-left">
            <p className="text-xs text-gray-400">
              © 2004–{currentYear} Maan Engineering Ltd. 
              <span className="hidden sm:inline mx-2">•</span>
              <br className="block sm:hidden" />
              All Rights Reserved.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Scroll to Top Button */}
            <button 
              onClick={scrollToTop}
              className="bg-accent/20 hover:bg-accent p-2 rounded-lg transition-all duration-300 hover:scale-110 group"
              aria-label="Scroll to top"
            >
              <FaArrowUp className="text-accent group-hover:text-white text-sm transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}