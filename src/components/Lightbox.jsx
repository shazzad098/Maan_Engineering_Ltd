import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";

export default function Lightbox({ isOpen, onClose, imageSrc, imageAlt }) {
  // Prevent background scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary/90 p-4 md:p-8 backdrop-blur-sm cursor-zoom-out"
        >
          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()} // Stop click propagation to background
            className="relative max-w-4xl max-h-[85vh] w-full bg-white rounded-lg overflow-hidden shadow-2xl flex flex-col items-center justify-center p-2 cursor-default"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-primary/80 hover:bg-secondary-accent text-white shadow-lg transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <HiX size={20} />
            </button>

            {/* Image */}
            <img
              src={imageSrc}
              alt={imageAlt || "Full preview"}
              className="max-w-full max-h-[80vh] object-contain rounded"
            />
            
            {imageAlt && (
              <div className="py-2 text-center text-sm font-sans font-medium text-gray-800">
                {imageAlt}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
