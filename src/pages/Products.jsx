import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaProjectDiagram, FaCogs, FaTools, 
  FaBoxes, FaEye 
} from "react-icons/fa";
import { MdOutlineElectricalServices, MdOutlineLightbulb } from "react-icons/md";

// Reusable Components
import Lightbox from "../components/Lightbox";

// Product Data by Category
const productsData = {
  BBT: {
    title: "Busbar Trunking System (BBT)",
    icon: FaProjectDiagram,
    desc: "Compact, flexible, and robust electrical power transmission system substituting conventional cable runs.",
    items: [
      { name: "Power Busbar Trunking System", desc: "For heavy-duty plant energy transmission, rated up to 6300A with copper/aluminum conductors." },
      { name: "Lighting Busbar Trunking System", desc: "Optimized for textile floor or warehouse lighting installations, rated up to 160A with easy plug-in taps." }
    ]
  },
  "Sub Station": {
    title: "Sub Station Equipment",
    icon: MdOutlineElectricalServices,
    desc: "Complete custom engineering, assembly, and testing of medium-voltage substation components.",
    items: [
      { name: "Drop-Out Fuse (DOF)", desc: "Essential outdoor high-voltage protection for transformers." },
      { name: "Lightning Arrestor", desc: "High-grade surge protectors protecting power equipment from atmospheric discharges." },
      { name: "HT Switchgear", desc: "Reliable Vacuum Circuit Breakers (VCB) or LBS panels up to 11kV/33kV." },
      { name: "Distribution Transformer", desc: "High-efficiency oil-immersed transformers, BUET tested, up to 2500kVA." },
      { name: "LT Switchgear", desc: "Main LT distribution panel boards configured with high rupturing capacity breakers." },
      { name: "PFI Plant", desc: "Power Factor Improvement capacitor panels with automatic regulators to eliminate reactive energy charges." }
    ]
  },
  Lighting: {
    title: "Lighting Services",
    icon: MdOutlineLightbulb,
    desc: "Exclusive agent of Haining XinGuangYuan (China) supplying industrial energy-saving fixtures.",
    items: [
      { name: "Maan LED Light (T8 & T5)", desc: "High-lumen replacement LED tubes for commercial garment stitching lines." },
      { name: "Fluorescent Light (T5)", desc: "Energy-efficient traditional slim fluorescent fixtures." },
      { name: "Panel Type LED Light", desc: "Sleek, glare-free recessed LED panel lights for office and showroom spaces." },
      { name: "LED Street Light", desc: "Weatherproof IP66 streetlights for factory perimeters and municipal roadways." },
      { name: "LED Flood Light", desc: "High-power directional floodlights for security perimeters and loading docks." },
      { name: "LED High Bay Light", desc: "Heavy-duty fixtures for high-ceiling warehouses and assembly bays." }
    ]
  },
  "LV Switchgear": {
    title: "LV Switchgear Component",
    icon: FaCogs,
    desc: "Authorized dealer and system integrator of Schneider Electric (France) and leading switchgear brands.",
    items: [
      { name: "ACB (Air Circuit Breaker)", desc: "Main power protection breakers rated up to 6300A." },
      { name: "MCCB (Molded Case Circuit Breaker)", desc: "Feeder protection breakers with thermal-magnetic trip units." },
      { name: "MCB / ELCB / RCCB / MPCB", desc: "Miniature circuit protection, earth leakage protection, and motor circuit protectors." },
      { name: "Magnetic Contactor & Overload Relay", desc: "Heavy-duty motor starters and overload protection modules." },
      { name: "Timer, PF Capacitor & PF Regulator", desc: "Control components, power factor capacitors, and micro-processor controllers." }
    ]
  },
  Control: {
    title: "Control System",
    icon: FaTools,
    desc: "Custom-built control panel boards for industrial machinery and motor start-ups.",
    items: [
      { name: "Star-Delta & DOL Starters", desc: "Standard motor starters with phase-failure protection." },
      { name: "Change-over Switch (COS)", desc: "Manual and Automatic Transfer Switches (ATS) for main-generator transitions." },
      { name: "Frequency Inverter Panel", desc: "VFD panels for smooth motor speed control and energy conservation." }
    ]
  },
  Busduct: {
    title: "Physical Data of Busduct",
    icon: FaBoxes,
    desc: "Standard modular fittings and structural components engineered for sandwich-type busbar routes.",
    items: [
      { name: "Edgewise Elbow with Flange End", desc: "Transition fitting connecting busway runs to panel boards horizontally." },
      { name: "Busduct Straight Feeder", desc: "Standard linear feeder sections available in 1m to 3m configurations." },
      { name: "Combination Elbow", desc: "Multi-axis bend fitting adjusting runs in both vertical and horizontal directions." },
      { name: "Flatwise Offset / Edgewise Offset Elbow", desc: "Fittings used to bypass structural beams and columns." },
      { name: "Flexible Link / Copper Braids", desc: "Absorbs thermal expansions and transformer vibrations." },
      { name: "Flange End Box / End Cap", desc: "Terminating enclosure boxes safeguarding raw conductor terminals." },
      { name: "Tap Box (Bolt-On-Type) & Tap Off Unit", desc: "Branching plug-in disconnect breakers up to 630A." },
      { name: "Reducer", desc: "Transitions busway ratings down (e.g., from 2000A to 1000A)." },
      { name: "Vertical Spring Hanger & Vertical Hanger", desc: "Spring support brackets absorbing riser weight across building floors." },
      { name: "Busduct Joint Section", desc: "Double-headed shear-bolt joint blocks for quick torque calibration." },
      { name: "Edgewise Elbow, Flatwise Elbow, Edgewise Tee Elbow", desc: "Standard 90-degree bend fittings." },
      { name: "End Closure / Terminal Cover", desc: "Moisture-resistant cover caps for sealing open runs." }
    ]
  }
};

// Gallery Items
const galleryItems = [
  { id: 1, title: "Substation Panel Assembly", src: "/assets/electrical_setup.png" },
  { id: 2, title: "Busbar Trunking Installation", src: "/assets/electrical_setup.png" },
  { id: 3, title: "LT Switchboard Testing", src: "/assets/electrical_setup.png" },
  { id: 4, title: "PFI Capacitor Bank Installation", src: "/assets/electrical_setup.png" },
  { id: 5, title: "Industrial LED Lighting layout", src: "/assets/electrical_setup.png" },
  { id: 6, title: "Generator Change-Over board", src: "/assets/electrical_setup.png" },
];

const tabs = ["All", "BBT", "Sub Station", "Lighting", "LV Switchgear", "Control", "Busduct"];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "All";
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleTabChange = (tab) => {
    setSearchParams({ tab });
  };

  const handleOpenLightbox = (src, title) => {
    setSelectedImage({ src, title });
    setLightboxOpen(true);
  };

  // Determine what categories to display
  const categoriesToRender = activeTab === "All" 
    ? Object.keys(productsData) 
    : [activeTab];

  return (
    <div className="bg-slate-50 min-h-screen pb-16 font-sans text-slate-800">
      
      {/* Tabs Filter */}
      <section className="py-6 bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2 sm:pb-0 justify-start md:justify-center items-center">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 shrink-0 border ${
                  activeTab === tab
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:text-blue-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Display */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="space-y-16">
            {categoriesToRender.map((key) => {
              const cat = productsData[key];
              const CatIcon = cat.icon;
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm"
                >
                  {/* Category Header */}
                  <div className="flex items-center space-x-5 mb-8 pb-6 border-b border-slate-100">
                    <div className="h-16 w-16 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 text-3xl shadow-inner">
                      <CatIcon />
                    </div>
                    <div>
                      <h2 className="font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                        {cat.title}
                      </h2>
                      <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-2xl">
                        {cat.desc}
                      </p>
                    </div>
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cat.items.map((item, idx) => (
                      <div 
                        key={item.name}
                        className="group p-6 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-blue-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
                      >
                        <div>
                          <div className="flex items-start justify-between">
                            <span className="h-7 w-7 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                              {idx + 1}
                            </span>
                            <h3 className="font-bold text-slate-800 text-base leading-snug flex-grow group-hover:text-blue-700 transition-colors duration-300">
                              {item.name}
                            </h3>
                          </div>
                          <p className="text-slate-500 text-sm mt-3 pl-11 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-3 block">
            Installation Records
          </span>
          <h2 className="font-bold text-3xl sm:text-4xl text-white tracking-tight mb-6">
            Product & Project Gallery
          </h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mb-16 rounded-full"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -5 }}
                onClick={() => handleOpenLightbox(item.src, item.title)}
                className="relative rounded-xl overflow-hidden group shadow-lg cursor-zoom-in aspect-video bg-slate-800 border border-slate-700"
              >
                <img 
                  src={item.src} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 flex flex-col justify-end p-6 text-left transition-all duration-300">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-blue-400 text-xl mb-2 block"><FaEye /></span>
                    <span className="text-white font-bold text-lg block mb-1">{item.title}</span>
                    <span className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Click to expand</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reusable Lightbox */}
      {selectedImage && (
        <Lightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          imageSrc={selectedImage.src}
          imageAlt={selectedImage.title}
        />
      )}
    </div>
  );
}