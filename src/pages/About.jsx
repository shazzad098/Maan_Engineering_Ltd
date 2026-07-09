import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  FaEye, FaBullseye, FaHandHoldingHeart, FaAward, 
  FaEnvelope, FaUserCheck, FaChevronRight, FaPhone,
  FaIndustry, FaCogs, FaBolt, FaShieldAlt, FaCheckCircle,
  FaArrowRight, FaMapMarkerAlt, FaExternalLinkAlt, FaDownload
} from "react-icons/fa";
import { MdOutlineEngineering } from "react-icons/md";

// Reusable Components
import Lightbox from "../components/Lightbox";
import companyProfilePDF from "../assets/maan_profile.pdf";

// ─── DATA ───────────────────────────────────────────────

const departments = [
  {
    name: "Project Engineering",
    desc: "Complete layout engineering, structural load calculations, custom electrical designs, and end-to-end installation coordination for industrial power systems.",
    email: "project@maanengineeringltd.com",
    icon: <MdOutlineEngineering />,
    color: "from-teal-500 to-teal-600"
  },
  {
    name: "Marketing & Sales",
    desc: "Technical consultation, tender preparation, contract management, and precise project estimation for LV/MV distribution solutions.",
    email: "sales@maanengineeringltd.com",
    icon: <FaBolt />,
    color: "from-orange-500 to-amber-500"
  },
  {
    name: "Field Maintenance",
    desc: "Scheduled inspections, safety certifications, component replacements, and 24/7 emergency troubleshooting across Bangladesh.",
    email: "service@maanengineeringltd.com",
    icon: <FaCogs />,
    color: "from-cyan-500 to-blue-600"
  },
  {
    name: "Workshop & Fabrication",
    desc: "Precision panel assembly, switchgear construction, quality control testing, and advanced sheet-metal fabrication.",
    email: "workshop@maanengineeringltd.com",
    icon: <FaIndustry />,
    color: "from-zinc-500 to-zinc-700"
  },
  {
    name: "Customer Support",
    desc: "Round-the-clock operational assistance, urgent technical support, and dedicated customer query resolution.",
    email: "cs@maanengineeringltd.com",
    icon: <FaShieldAlt />,
    color: "from-rose-500 to-red-600"
  }
];

const stats = [
  { number: "20", label: "Years of Excellence", suffix: "+" },
  { number: "500", label: "Projects Completed", suffix: "+" },
  { number: "50", label: "Expert Engineers", suffix: "+" },
  { number: "100", label: "Client Retention", suffix: "%" }
];

// UPDATED: Global Technical Partners with correct Links & Data
const partnerships = [
  {
    name: "MIKRO BUSWAY Sdn Bhd",
    location: "Malaysia",
    type: "Sole Authorized Agent",
    description: "Leading manufacturer of compact and sandwich bus-bar trunking systems from 25A to 6300A.",
    logo: "MB",
    link: "https://itmikro.com.my/busway/",
    borderColor: "border-blue-500",
    textColor: "text-blue-700",
    accentColor: "bg-blue-600",
    badgeBg: "bg-blue-50"
  },
  {
    name: "DTM Elektroteknik A.Ş.",
    location: "Turkey",
    type: "Authorized Agent",
    description: "Reputed Turkish manufacturer of electrical switchgear, busbars, and control equipment.",
    logo: "DTM",
    link: "https://dtmbusbar.com/",
    borderColor: "border-teal-500",
    textColor: "text-teal-700",
    accentColor: "bg-teal-600",
    badgeBg: "bg-teal-50"
  },
  {
    name: "Haining XinGuangYuan",
    location: "China",
    type: "Exclusive Agent",
    description: "Direct import and distribution of certified LED tubes, panel lights, and outdoor lighting solutions.",
    logo: "XG",
    link: "https://xinguangyuan.goldsupplier.com/",
    borderColor: "border-orange-500",
    textColor: "text-orange-700",
    accentColor: "bg-orange-600",
    badgeBg: "bg-orange-50"
  },
  {
    name: "Schneider Electric",
    location: "France",
    type: "Components Partner",
    description: "Genuine Schneider Electric LV breakers, components, and contactors integrated into every custom panel.",
    logo: "SE",
    link: "https://www.se.com/",
    borderColor: "border-zinc-500",
    textColor: "text-zinc-700",
    accentColor: "bg-zinc-600",
    badgeBg: "bg-zinc-100"
  }
];

const coreValues = [
  {
    title: "Integrity",
    desc: "Transparent business practices and ethical engineering standards in every client relationship.",
    icon: <FaShieldAlt />
  },
  {
    title: "Safety First",
    desc: "Uncompromising adherence to international safety protocols and BUET-certified testing standards.",
    icon: <FaCheckCircle />
  },
  {
    title: "Innovation",
    desc: "Continuous adoption of cutting-edge electrical distribution technologies and automation systems.",
    icon: <FaBolt />
  },
  {
    title: "Partnership",
    desc: "Building lasting relationships through dedicated support and collaborative problem-solving.",
    icon: <FaHandHoldingHeart />
  }
];

// ─── ANIMATION VARIANTS ───────────────────────────────────

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

// ─── COMPONENT ──────────────────────────────────────────

export default function About() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("vision");
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);

  const [counters, setCounters] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const statsSection = document.getElementById('stats-section');
      if (statsSection && !hasAnimated) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          setHasAnimated(true);
          stats.forEach((stat, index) => {
            const target = parseInt(stat.number);
            const duration = 2000;
            const steps = 60;
            const increment = target / steps;
            let current = 0;
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              setCounters(prev => {
                const newCounters = [...prev];
                newCounters[index] = Math.floor(current);
                return newCounters;
              });
            }, duration / steps);
          });
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasAnimated]);

  const tabContent = {
    vision: {
      title: "Our Vision",
      text: "To be the most trusted provider of electrical power distribution and automation systems in South Asia, setting industry benchmarks for safety, reliability, and engineering innovation. We envision a future where every industrial facility in Bangladesh operates with world-class electrical infrastructure.",
      icon: <FaEye className="text-3xl" />,
      color: "text-teal-600",
      bg: "bg-teal-50"
    },
    mission: {
      title: "Our Mission",
      text: "To engineer top-quality low and medium-voltage equipment, foster international technical partnerships, and provide stellar post-deployment services that maximize system efficiency and safeguard resources. We commit to delivering BUET-tested solutions that exceed international standards.",
      icon: <FaBullseye className="text-3xl" />,
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
    values: {
      title: "Core Values",
      text: "Integrity, uncompromising safety standards, client satisfaction, and engineering excellence define our DNA. We believe in building long-lasting partnerships through transparency, technical precision, and dedicated after-sales support.",
      icon: <FaHandHoldingHeart className="text-3xl" />,
      color: "text-cyan-600",
      bg: "bg-cyan-50"
    }
  };

  return (
    <div className="bg-zinc-50 min-h-screen font-sans overflow-x-hidden">

      {/* ─── HERO SECTION ─────────────────────────────── */}
      <section className="relative h-[85vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.15),transparent_70%)]" />
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-bold text-4xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6 tracking-tight"
          >
            Powering Bangladesh's
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
              Industrial Future
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            For over two decades, Maan Engineering Ltd. has been the backbone of 
            electrical infrastructure for Bangladesh's leading industrial enterprises.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a 
              href={companyProfilePDF} 
              download="Maan_Engineering_Profile.pdf"
              className="px-8 py-3.5 bg-teal-800 hover:bg-teal-700 text-white font-semibold rounded-sm border border-teal-600 transition-all duration-300 flex items-center gap-2"
            >
              Company Profile
              <FaDownload className="text-sm" />
            </a>
          </motion.div>
        </motion.div>

        {/* Breadcrumb */}
        <div className="absolute bottom-6 left-0 right-0 z-10">
          <nav className="flex justify-center items-center space-x-3 text-xs sm:text-sm text-zinc-500 font-mono tracking-widest">
            <Link to="/" className="hover:text-teal-400 transition-colors">HOME</Link>
            <FaChevronRight className="text-[10px]" />
            <span className="text-white">ABOUT US</span>
          </nav>
        </div>
      </section>

      {/* ─── STATS BAR ──────────────────────────────── */}
      <section id="stats-section" className="relative z-20 -mt-12 sm:-mt-16 mx-4 sm:mx-8 lg:max-w-6xl lg:mx-auto">
        <div className="bg-white rounded-sm shadow-xl border-b-4 border-teal-500 p-6 sm:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.1 }}
                className="text-center md:border-r border-zinc-100 last:border-0"
              >
                <div className="text-2xl sm:text-4xl font-black text-zinc-900 mb-1 sm:mb-2 font-mono">
                  {counters[index]}{stat.suffix}
                </div>
                <div className="text-[10px] sm:text-xs text-zinc-500 font-bold uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STORY SECTION ──────────────────────────── */}
      <section id="story" className="py-20 sm:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-4">
                <div className="w-12 h-[2px] bg-teal-500"></div>
                <span className="text-teal-600 text-xs sm:text-sm font-bold tracking-widest uppercase">
                  Our Legacy
                </span>
              </motion.div>

              <motion.h2 
                variants={fadeInUp}
                className="font-bold text-3xl sm:text-4xl lg:text-5xl text-zinc-900 leading-tight mb-6"
              >
                Engineering Excellence Since 2004
              </motion.h2>

              <motion.div variants={fadeInUp} className="space-y-4 sm:space-y-5 text-zinc-600 leading-relaxed text-base sm:text-lg">
                <p>
                  Maan Engineering Ltd. was established in 2004 with a singular vision: to transform 
                  Bangladesh's electrical infrastructure with safe, reliable, and advanced distribution systems.
                </p>
                <p>
                  For over two decades, we have designed and manufactured low-voltage (LV) and medium-voltage 
                  (MV) panel boards, power and lighting Busbar Trunking Systems (BBT), distribution 
                  transformers, and custom control panels for the nation's most demanding industrial clients.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                className="mt-8 flex flex-wrap gap-4 sm:gap-6"
              >
                {['BUET Tested & Certified', 'ISO 9001:2015 Compliant', 'Certified Partners'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-xs sm:text-sm font-bold text-zinc-800">
                    <FaCheckCircle className="text-teal-500 text-base sm:text-lg" />
                    {item}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
              className="relative w-full"
            >
              <motion.div 
                variants={scaleIn}
                className="relative rounded-sm overflow-hidden shadow-2xl group cursor-pointer border border-zinc-200"
                onClick={() => setIsLightboxOpen(true)}
              >
                <img 
                  src="/assets/iso_certificate.png" 
                  alt="ISO 9001:2015 Certificate" 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-zinc-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-teal-600 text-white px-5 py-2.5 rounded-sm font-bold flex items-center gap-2 tracking-wide uppercase text-xs sm:text-sm shadow-lg">
                    <FaAward /> View Certificate
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── VISION / MISSION / VALUES TABS ─────────── */}
      <section className="py-20 sm:py-24 bg-white border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-bold text-3xl sm:text-4xl text-zinc-900">
              Vision, Mission & Values
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8 sm:mb-12 overflow-x-auto no-scrollbar pb-2">
              <div className="inline-flex bg-zinc-100 p-1 rounded-sm min-w-max">
                {Object.keys(tabContent).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 sm:px-8 py-2.5 sm:py-3 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 rounded-sm ${
                      activeTab === tab 
                        ? 'bg-teal-600 text-white shadow-md' 
                        : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                  >
                    {tabContent[tab].title}
                  </button>
                ))}
              </div>
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`border-l-4 border-teal-500 ${tabContent[activeTab].bg} p-6 sm:p-10 md:p-12 shadow-sm rounded-r-sm`}
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 text-center md:text-left">
                <div className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-white shadow-sm flex items-center justify-center ${tabContent[activeTab].color} rounded-sm`}>
                  {tabContent[activeTab].icon}
                </div>
                <div>
                  <h3 className="font-bold text-xl sm:text-2xl text-zinc-900 mb-3">
                    {tabContent[activeTab].title}
                  </h3>
                  <p className="text-zinc-600 text-base sm:text-lg leading-relaxed">
                    {tabContent[activeTab].text}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── PARTNERSHIPS SECTION ─────────────────────── */}
      <section className="py-20 sm:py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-bold text-3xl sm:text-4xl text-zinc-900 mb-4">
              Global Technical Partners
            </h2>
            <div className="w-16 h-1 bg-teal-500 mx-auto"></div>
            <p className="text-zinc-500 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
              We collaborate with world-leading manufacturers to bring certified, genuine electrical and automation components to Bangladesh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {partnerships.map((partner, idx) => (
              <motion.a
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                key={partner.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: idx * 0.15 }}
                className={`group block bg-white p-6 sm:p-8 border-l-4 ${partner.borderColor} shadow-sm hover:shadow-xl transition-all duration-300 rounded-sm cursor-pointer hover:-translate-y-1 relative overflow-hidden`}
              >
                {/* External Link Icon on Hover */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-zinc-400 group-hover:text-teal-500">
                  <FaExternalLinkAlt size={14} />
                </div>

                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 ${partner.accentColor} text-white flex items-center justify-center text-lg sm:text-xl font-black rounded-sm shadow-md group-hover:scale-105 transition-transform duration-300`}>
                      {partner.logo}
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-900 text-base sm:text-lg uppercase tracking-wide group-hover:text-teal-600 transition-colors duration-300">
                        {partner.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs sm:text-sm text-zinc-500 font-medium mt-0.5">
                        <FaMapMarkerAlt size={12} className="text-zinc-400" />
                        {partner.location}
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-zinc-600 leading-relaxed text-sm sm:text-base">
                  {partner.description}
                </p>
                
                <div className={`mt-5 inline-block px-3 py-1 ${partner.badgeBg} ${partner.textColor} text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-sm border ${partner.borderColor}`}>
                  {partner.type}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DEPARTMENTS SECTION ─────────────────────── */}
      <section className="py-20 sm:py-24 bg-zinc-950 text-white border-t border-zinc-900 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-bold text-3xl sm:text-4xl text-white mb-4">
              Specialized Divisions
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
              Five dedicated departments working in harmony to deliver comprehensive solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, idx) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-zinc-900/80 backdrop-blur-sm p-6 sm:p-8 border border-zinc-800 hover:border-teal-500/50 hover:bg-zinc-900 transition-all duration-300 rounded-sm"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${dept.color} flex items-center justify-center text-white text-lg sm:text-xl mb-5 sm:mb-6 rounded-sm shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {dept.icon}
                </div>

                <h3 className="font-bold text-lg sm:text-xl text-white mb-2 sm:mb-3 group-hover:text-teal-400 transition-colors">
                  {dept.name}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
                  {dept.desc}
                </p>

                <a 
                  href={`mailto:${dept.email}`}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm text-teal-400 hover:text-teal-300 font-mono tracking-tight"
                >
                  <FaEnvelope size={12} />
                  {dept.email}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-teal-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-bold text-3xl sm:text-4xl text-white mb-4 sm:mb-6 leading-tight">
              Ready to Power Your Next Project?
            </h2>
            <p className="text-teal-100 text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto">
              Let's discuss how Maan Engineering can deliver certified, reliable electrical 
              distribution solutions tailored to your industrial needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="mailto:sales@maanengineeringltd.com"
                className="px-8 py-3.5 bg-white text-teal-900 font-bold uppercase tracking-wider text-sm rounded-sm hover:bg-teal-50 hover:-translate-y-1 shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaEnvelope /> Request a Quote
              </a>
              <a 
                href="tel:+8801988887744"
                className="px-8 py-3.5 bg-transparent border-2 border-white text-white font-bold uppercase tracking-wider text-sm rounded-sm hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaPhone /> Call Us Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── LIGHTBOX ───────────────────────────────── */}
      <Lightbox 
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        imageSrc="/assets/iso_certificate.png"
        imageAlt="ISO 9001:2015 Certificate"
      />
    </div>
  );
}