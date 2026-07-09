import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShieldAlt, FaChevronDown, FaArrowRight } from "react-icons/fa";

export default function HeroSection() {
  // Floating animation for the abstract shapes
  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const floatVariantsReverse = {
    initial: { y: 0 },
    animate: {
      y: [10, -10, 10],
      transition: { duration: 7, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const pulseVariants = {
    initial: { scale: 1, opacity: 0.6 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.6, 0.2, 0.6],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary via-primary/95 to-primary flex items-center overflow-hidden pt-16">
      {/* Minimalist Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Abstract Floating Elements */}
      <motion.div
        variants={floatVariants}
        initial="initial"
        animate="animate"
        className="absolute top-20 right-10 w-64 h-64 rounded-full bg-accent/5 blur-3xl"
      />
      <motion.div
        variants={floatVariantsReverse}
        initial="initial"
        animate="animate"
        className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-secondary-accent/5 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Column - Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-start text-left"
        >
          {/* ISO Badge - Minimal */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-1.5 rounded-full mb-6"
          >
            <FaShieldAlt className="text-accent text-xs" />
            <span className="font-sans text-xs font-medium text-gray-300 tracking-wide uppercase">
              ISO 9001:2015
            </span>
          </motion.div>

          {/* Headline - Clean & Bold */}
          <h1 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.2] mb-5">
            Engineering the{" "}
            <span className="text-accent relative inline-block">
              Future
              <motion.span
                variants={pulseVariants}
                initial="initial"
                animate="animate"
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent/40 rounded-full"
              />
            </span>{" "}
            of Bangladesh
          </h1>

          {/* Subheadline - Clean */}
          <p className="font-sans text-gray-400 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
            Premium panel boards, busbar trunking systems, and electrical solutions since 2004.
          </p>

          {/* CTAs - Minimal */}
          <div className="flex flex-wrap gap-4">
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group px-6 py-3 rounded-lg bg-accent text-white font-sans font-medium text-sm tracking-wide cursor-pointer shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all duration-300 flex items-center gap-2"
              >
                Explore Products
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm text-white font-sans font-medium text-sm tracking-wide cursor-pointer hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                Contact Us
              </motion.button>
            </Link>
          </div>

          {/* Trust Indicators - Minimal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex items-center gap-8 mt-10 pt-6 border-t border-white/10"
          >
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">20+</span>
              <span className="text-xs text-gray-500 tracking-wide">Years Excellence</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">500+</span>
              <span className="text-xs text-gray-500 tracking-wide">Projects Completed</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">100%</span>
              <span className="text-xs text-gray-500 tracking-wide">Client Satisfaction</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Minimalist Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="flex justify-center items-center relative"
        >
          <div className="relative w-full max-w-md aspect-square">
            {/* Outer Glow Ring */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-accent/20"
            />

            {/* Middle Ring */}
            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-full border border-white/10"
            />

            {/* Core - Year Badge */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-32 h-32 rounded-full bg-white/5 backdrop-blur-sm border border-white/20 flex flex-col justify-center items-center"
              >
                <span className="text-white font-display font-bold text-3xl tracking-wider">EST.</span>
                <span className="text-accent font-display font-bold text-xl mt-1">2004</span>
                
                {/* Inner Pulse */}
                <motion.div
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 rounded-full border border-accent/30"
                />
              </motion.div>
            </div>

            {/* Floating Dots */}
            <motion.div
              variants={floatVariants}
              initial="initial"
              animate="animate"
              className="absolute -top-4 -right-4 w-3 h-3 rounded-full bg-accent"
            />
            <motion.div
              variants={floatVariantsReverse}
              initial="initial"
              animate="animate"
              className="absolute -bottom-4 -left-4 w-2 h-2 rounded-full bg-secondary-accent"
            />
            <motion.div
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-1/2 -right-6 w-1.5 h-1.5 rounded-full bg-white/40"
            />
            <motion.div
              animate={{
                opacity: [1, 0.3, 1],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute bottom-1/4 -left-4 w-1 h-1 rounded-full bg-white/30"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Minimal */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <span className="text-gray-500 text-[10px] font-medium uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{
            y: [0, 6, 0],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-gray-400 text-xs"
        >
          <FaChevronDown />
        </motion.div>
      </div>
    </div>
  );
}