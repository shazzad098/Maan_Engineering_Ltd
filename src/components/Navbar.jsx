import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

const navigationLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Products", path: "/products" },
  { name: "Clients", path: "/clients" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Variants for animations
  const logoVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const navItemVariants = {
    initial: { opacity: 0, y: -10 },
    animate: (i) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" } 
    }),
  };

  const ctaVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.2 } },
    hover: { 
      scale: 1.05, 
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.98 }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
    visible: { 
      opacity: 1, 
      height: "auto", 
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled
          ? "py-2.5 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "py-4 bg-white shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
          >
            <Link to="/" className="block group">
              <img 
                src="/assets/logo.png" 
                alt="MAAN ENGINEERING LTD. Logo" 
                className={`w-auto object-contain transition-all duration-300 ${
                  isScrolled ? "h-9" : "h-10"
                }`} 
              />
            </Link>
          </motion.div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link, index) => {
              const isActive = location.pathname === link.path;
              return (
                <motion.div
                  key={link.name}
                  custom={index}
                  variants={navItemVariants}
                  initial="initial"
                  animate="animate"
                >
                  <Link
                    to={link.path}
                    className={`relative font-sans text-sm font-medium tracking-wide transition-colors duration-200 ${
                      isActive 
                        ? "text-primary font-semibold" 
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute left-0 right-0 -bottom-1.5 h-0.5 bg-primary rounded-full"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    {!isActive && (
                      <motion.span
                        className="absolute left-0 right-0 -bottom-1.5 h-0.5 bg-primary rounded-full"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link to="/contact?subject=Quote Request">
              <motion.button
                variants={ctaVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                className="px-6 py-2.5 rounded-lg bg-primary text-white font-sans text-sm font-semibold tracking-wide cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Get a Quote
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
              className="text-gray-600 hover:text-gray-900 p-2 rounded-lg focus:outline-none bg-gray-50"
              aria-label="Toggle Menu"
            >
              {isOpen ? <HiX className="h-5 w-5" /> : <HiMenu className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navigationLinks.map((link, index) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-all duration-150 ${
                        isActive
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div 
                className="pt-4 px-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link to="/contact?subject=Quote Request">
                  <button className="w-full py-2.5 rounded-lg bg-primary text-white font-semibold text-center transition-all duration-200 shadow-md hover:shadow-lg">
                    Get a Quote
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}