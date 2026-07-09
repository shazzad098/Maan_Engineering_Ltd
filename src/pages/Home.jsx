import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaRegCalendarAlt,
  FaHandshake,
  FaBoxes,
  FaBuilding,
  FaCogs,
  FaProjectDiagram,
  FaBullhorn,
  FaWrench,
  FaTools,
  FaHeadphonesAlt,
  FaChevronRight,
} from "react-icons/fa";
import {
  MdFlashOn,
  MdOutlineElectricalServices,
  MdOutlineLightbulb,
} from "react-icons/md";

// Reusable Components
import HeroSlider from "../components/HeroSlider";
import StatCounter from "../components/StatCounter";
import ProductCard from "../components/ProductCard";
import ClientMarquee from "../components/ClientMarquee";

// Animation variants (moved outside for better performance)
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const scaleOnHover = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.98 },
};

// Data configuration (easily maintainable)
const statsData = [
  {
    id: 1,
    icon: FaRegCalendarAlt,
    value: 20,
    suffix: "+",
    label: "Years of Experience",
  },
  {
    id: 2,
    icon: FaHandshake,
    value: 40,
    suffix: "+",
    label: "Major Clients",
  },
  {
    id: 3,
    icon: FaBoxes,
    value: 5,
    suffix: "",
    label: "Product Categories",
  },
  {
    id: 4,
    icon: FaBuilding,
    value: 5,
    suffix: "",
    label: "Specialized Depts",
  },
];

const categories = [
  {
    id: 1,
    title: "Busbar Trunking System (BBT)",
    description:
      "High-efficiency electrical power distribution solutions replacing traditional cabling systems in heavy industries.",
    icon: FaProjectDiagram,
    linkTo: "/products?tab=BBT",
  },
  {
    id: 2,
    title: "Sub Station Equipment",
    description:
      "HT Switchgear, Distribution Transformers, LT Switchgear, and PFI plants engineered for high reliability.",
    icon: MdOutlineElectricalServices,
    linkTo: "/products?tab=Sub Station",
  },
  {
    id: 3,
    title: "Lighting Services",
    description:
      "Industrial T8/T5 LED lights, flood lights, and high bay fixtures for factory workshops and outdoor settings.",
    icon: MdOutlineLightbulb,
    linkTo: "/products?tab=Lighting",
  },
  {
    id: 4,
    title: "LV Switchgear Components",
    description:
      "Premium ACBs, MCCBs, MCBs, contactors, and relays sourced from leading global brands.",
    icon: FaCogs,
    linkTo: "/products?tab=LV Switchgear",
  },
  {
    id: 5,
    title: "Control Systems",
    description:
      "Star-Delta panels, DOL starters, Automatic Change-over Switches (COS), and variable frequency inverters.",
    icon: FaTools,
    linkTo: "/products?tab=Control",
  },
  {
    id: 6,
    title: "Busduct Physical Components",
    description:
      "Standard elbows, offsets, flanges, tap-offs, and custom joint sections for edgewise and flatwise installations.",
    icon: FaBoxes,
    linkTo: "/products?tab=Busduct",
  },
];

const steps = [
  {
    id: 1,
    num: "01",
    title: "Project Department",
    desc: "Designing and engineering optimized layouts and power calculations.",
    icon: FaProjectDiagram,
  },
  {
    id: 2,
    num: "02",
    title: "Marketing Department",
    desc: "Assessing customer specifications and preparing tailored estimates.",
    icon: FaBullhorn,
  },
  {
    id: 3,
    num: "03",
    title: "Maintenance Department",
    desc: "Deploying routines and emergency support to ensure system uptime.",
    icon: FaWrench,
  },
  {
    id: 4,
    num: "04",
    title: "Workshop Service",
    desc: "Precision fabrication, testing, and panel board assembly.",
    icon: FaTools,
  },
  {
    id: 5,
    num: "05",
    title: "Support Services",
    desc: "24/7 support lines for electrical inquiries and diagnostics.",
    icon: FaHeadphonesAlt,
  },
];

const badges = [
  { id: 1, text: "Est. 2004", variant: "primary" },
  { id: 2, text: "Schneider Electric Partner", variant: "accent" },
  { id: 3, text: "China Lighting Agent", variant: "secondary" },
];

// Stat Item Component
const StatItem = ({ icon: Icon, value, suffix, label }) => (
  <div className="flex flex-col items-center justify-center text-center group">
    <div className="h-12 w-12 rounded bg-accent/15 flex items-center justify-center text-accent text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
      <Icon />
    </div>
    <div className="font-display font-extrabold text-3xl sm:text-4xl text-white">
      <StatCounter value={value} suffix={suffix} />
    </div>
    <p className="font-sans text-gray-400 text-xs sm:text-sm mt-1 uppercase tracking-wider">
      {label}
    </p>
  </div>
);

// Step Card Component
const StepCard = ({ step, index }) => {
  const StepIcon = step.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08 }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
      className="relative bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-6 overflow-hidden group hover:border-accent/40 hover:shadow-[0_10px_30px_rgba(30,144,255,0.15)] transition-all duration-300"
    >
      <div className="absolute top-4 right-4 text-5xl font-black text-white/[0.04] select-none">
        {step.num}
      </div>
      
      <div className="h-14 w-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent text-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
        <StepIcon />
      </div>
      
      <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
      
      <div className="mt-6 h-1 w-10 bg-accent rounded-full group-hover:w-full transition-all duration-300"></div>
    </motion.div>
  );
};

export default function Home() {
  // Memoized components to prevent unnecessary re-renders
  const statsSection = useMemo(() => (
    <section className="bg-primary py-12 border-t border-b border-white/5 relative z-10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {statsData.map((stat) => (
            <StatItem key={stat.id} {...stat} />
          ))}
        </div>
      </div>
    </section>
  ), []);

  const categoriesSection = useMemo(() => (
    <section className="py-24 bg-background-light border-t border-b border-gray-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary tracking-tight">
            Our Product Categories
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto mt-4 rounded-full"></div>
          <p className="font-sans text-gray-500 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
            We design, build, and deliver reliable solutions configured to
            international electrical standards.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category, idx) => (
            <motion.div key={category.id} variants={fadeInUp}>
              <ProductCard
                index={idx}
                icon={category.icon}
                title={category.title}
                description={category.description}
                linkTo={category.linkTo}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  ), []);

  const workflowSection = useMemo(() => (
    <section className="relative py-28 bg-gradient-to-br from-primary via-[#091524] to-[#10233f] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold tracking-wider uppercase">
            Our Workflow
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mt-2">
            How We Work
          </h2>
          <div className="w-8 h-px bg-accent mx-auto mt-4"></div>
          <p className="font-sans text-gray-400 text-sm mt-4 max-w-md mx-auto">
            Simple, transparent, and efficient workflow
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px bg-white/10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8">
            {steps.map((step, idx) => (
              <StepCard key={step.id} step={step} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  ), []);

  return (
    <div className="bg-background-light">
      {/* Hero Section */}
      <HeroSlider />

      {/* Stats Section */}
      {statsSection}

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="flex flex-col items-start text-left"
            >
              <span className="font-sans text-xs font-bold text-accent tracking-widest uppercase mb-3">
                Established in 2004
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary tracking-tight mb-6 leading-tight">
                Two Decades of Engineering Excellence in Bangladesh
              </h2>
              <p className="font-sans text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                Maan Engineering Ltd. has been at the forefront of providing
                quality electrical power distribution systems and engineering
                services to Bangladesh's industrial sector. Over the years, we
                have built a reputation for designing, fabricating, and
                supplying robust panel boards, substation components, and
                high-efficiency Busbar Trunking Systems (BBT).
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                {badges.map((badge) => (
                  <span
                    key={badge.id}
                    className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold ${
                      badge.variant === "primary"
                        ? "bg-primary/5 border-primary/10 text-primary"
                        : badge.variant === "accent"
                        ? "bg-accent/5 border-accent/10 text-accent"
                        : "bg-secondary-accent/5 border-secondary-accent/10 text-secondary-accent"
                    }`}
                  >
                    {badge.text}
                  </span>
                ))}
              </div>

              <Link to="/about">
                <motion.button
                  {...scaleOnHover}
                  className="px-6 py-3 rounded bg-primary text-white font-sans text-sm font-semibold tracking-wide flex items-center space-x-2 cursor-pointer shadow-md hover:bg-accent transition-colors duration-300"
                >
                  <span>Read More About Us</span>
                  <FaChevronRight className="text-xs" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative rounded-xl overflow-hidden shadow-xl"
            >
              <img
                src="/assets/electrical_setup.png"
                alt="Industrial Electrical Installation"
                className="w-full h-auto object-cover max-h-[450px]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6 glassmorphism p-5 rounded-lg border border-white/10 flex items-center justify-between backdrop-blur-md">
                <div>
                  <p className="text-white/70 text-xs font-sans uppercase tracking-widest">
                    Global Standards
                  </p>
                  <p className="text-white font-display font-bold text-sm sm:text-base mt-0.5">
                    Top-Tier Safety & Certification
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                  <MdFlashOn size={20} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      {categoriesSection}

      {/* Workflow Section */}
      {workflowSection}

      {/* Clients Section */}
      <ClientMarquee />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-[#0f213b] to-primary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 circuit-pattern pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
              Ready to Power Your Business?
            </h2>
            <p className="font-sans text-gray-300 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
              Contact us today for professional, safe, and certified electrical
              engineering solutions across Bangladesh.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 15px rgba(30,144,255,0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded bg-secondary-accent text-white font-sans font-bold text-sm sm:text-base tracking-wide shadow-lg cursor-pointer hover:bg-accent transition-colors duration-300"
              >
                Get in Touch
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}