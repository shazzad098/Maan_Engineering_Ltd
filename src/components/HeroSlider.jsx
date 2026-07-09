import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaArrowRight, 
  FaChevronLeft, 
  FaChevronRight,
  FaPlug,
  FaProjectDiagram,
  FaSun,
  FaBolt,
  FaExpand
} from "react-icons/fa";
import { HiX } from "react-icons/hi";

const slides = [
  {
    id: 1,
    title: "Panel Boards & Electrical Solutions",
    subtitle: "Manufacturing & Supply",
    description: "Premium quality panel boards, busbar trunking systems, and complete electrical solutions for industrial and commercial needs.",
    ctaText: "Explore Products",
    ctaLink: "/products",
    video: "/assets/videos/panel.mp4",
    videoAttrs: { autoPlay: true, loop: true, muted: true, playsInline: true }
  },
  {
    id: 2,
    title: "Busbar Trunking Systems",
    subtitle: "Modern Power Distribution",
    description: "Efficient and reliable busbar trunking systems for optimal power distribution across your facility.",
    ctaText: "Learn More",
    ctaLink: "/products",
    video: "/assets/videos/BBT.mp4",
    videoAttrs: { autoPlay: true, loop: true, muted: true, playsInline: true }
  },
  {
    id: 3,
    title: "Solar Energy Solutions",
    subtitle: "Renewable Power Systems",
    description: "Sustainable solar energy systems for industrial and commercial applications, reducing energy costs and carbon footprint.",
    ctaText: "Learn More",
    ctaLink: "/products",
    video: "/assets/videos/solar.mp4",
    videoAttrs: { autoPlay: true, loop: true, muted: true, playsInline: true }
  },
  {
    id: 4,
    title: "Substation Equipment",
    subtitle: "Power Distribution Infrastructure",
    description: "HT switchgear, distribution transformers, LT switchgear, and PFI plants engineered for high reliability and performance.",
    ctaText: "Explore Products",
    ctaLink: "/products",
    video: "/assets/videos/sub_station.mp4",
    videoAttrs: { autoPlay: true, loop: true, muted: true, playsInline: true }
  }
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  // Prevent background scroll when video overlay is open
  useEffect(() => {
    if (showVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showVideo]);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "tween", duration: 0.6, ease: "easeInOut" },
        opacity: { duration: 0.4 }
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: {
        x: { type: "tween", duration: 0.6, ease: "easeInOut" },
        opacity: { duration: 0.3 }
      }
    })
  };

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-950 pt-20">
      {/* Clean gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

      {/* Video Background */}
      <div className="absolute inset-0 opacity-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <video
              src={currentSlide.video}
              {...currentSlide.videoAttrs}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[500px]">
          {/* Left Column - Slide Content (8 columns) */}
          <div className="lg:col-span-7 relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-6"
              >
                {/* Icon and Label */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 text-gray-400"
                >
                  <span className="text-blue-500">{currentSlide.icon}</span>
                  <span className="text-xs font-medium uppercase tracking-[0.2em]">{currentSlide.subtitle}</span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-white text-4xl sm:text-5xl lg:text-6xl font-light leading-tight tracking-tight"
                >
                  {currentSlide.title}
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-400 text-lg leading-relaxed max-w-xl font-light"
                >
                  {currentSlide.description}
                </motion.p>

                {/* Buttons Row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap items-center gap-4"
                >
                  <Link to={currentSlide.ctaLink}>
                    <motion.button
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className="group inline-flex items-center gap-3 px-6 py-3 border border-gray-700 text-white text-sm font-medium tracking-wide hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300"
                    >
                      {currentSlide.ctaText}
                      <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-200" />
                    </motion.button>
                  </Link>

                  <motion.button
                    onClick={() => setShowVideo(true)}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2.5 px-5 py-3 text-gray-400 text-sm tracking-wide hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    <FaExpand className="text-xs" />
                    View Full Video
                  </motion.button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column - Visual Element (5 columns) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 hidden lg:flex justify-end"
          >
          </motion.div>
        </div>

        {/* Minimal Slider Controls */}
        <div className="flex items-center justify-between mt-16 pt-8 border-t border-gray-800">
          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={goToPrev}
              className="w-12 h-12 flex items-center justify-center border border-gray-800 text-gray-500 hover:text-white hover:border-gray-600 transition-all duration-300"
              aria-label="Previous slide"
            >
              <FaChevronLeft className="text-sm" />
            </button>
            <button
              onClick={goToNext}
              className="w-12 h-12 flex items-center justify-center border border-gray-800 text-gray-500 hover:text-white hover:border-gray-600 transition-all duration-300"
              aria-label="Next slide"
            >
              <FaChevronRight className="text-sm" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-[2px] transition-all duration-500 ${
                  index === currentIndex
                    ? "w-12 bg-blue-500"
                    : "w-6 bg-gray-700 hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="text-gray-600 text-sm font-light tracking-wider">
            <span className="text-gray-300">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="mx-1">/</span>
            {String(slides.length).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Full Video Overlay */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVideo(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/95 p-4 md:p-8 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-950/80 hover:bg-blue-500 text-white transition-colors cursor-pointer"
                aria-label="Close video"
              >
                <HiX size={20} />
              </button>

              <video
                src={currentSlide.video}
                autoPlay
                loop
                muted
                playsInline
                controls
                className="w-full h-full object-contain bg-black"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
