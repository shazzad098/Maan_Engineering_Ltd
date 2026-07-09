import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function ProductCard({ icon: Icon, title, description, linkTo, index }) {
  // Entrance animations
  const isEven = index % 2 === 0;
  const slideDirection = isEven ? -50 : 50;

  return (
    <motion.div
      initial={{ opacity: 0, x: slideDirection }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full"
    >
      {/* Animated Border Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-secondary-accent to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      <div className="p-8 flex flex-col h-full relative z-10">
        {/* Icon Section */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center text-accent text-2xl group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-md group-hover:shadow-accent/30">
            <Icon />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-display font-bold text-xl text-primary mb-3 group-hover:text-accent transition-colors duration-300">
            {title}
          </h3>
          <p className="font-sans text-gray-500 text-sm leading-relaxed mb-6">
            {description}
          </p>
        </div>

        {/* Link Section */}
        <div className="mt-4">
          <Link
            to={linkTo}
            className="inline-flex items-center gap-2 text-accent text-sm font-semibold group-hover:text-secondary-accent transition-all duration-300 group/link"
          >
            <span>View Details</span>
            <FiArrowRight className="transform group-hover/link:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>

      {/* Background Pattern on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}