import React from "react";
import { Link } from "react-router-dom";

const marqueeClients = [
  { name: "BUET", type: "Education", logo: "/assets/clients/buet-logo.png" },
  { name: "BSRM Steel", type: "Steel Industry", logo: "/assets/clients/bsrm-logo.png" },
  { name: "GPH Ispat", type: "Heavy Industry", logo: "/assets/clients/gph-logo.png" },
  { name: "EPIC Group", type: "Garments", logo: "/assets/clients/epic-logo.png" },
  { name: "Dekko Group", type: "Textile", logo: "/assets/clients/dekko-logo.png" },
  { name: "Fair Electronics (Samsung)", type: "Electronics", logo: "/assets/clients/fair-logo.png" },
  { name: "Transcom Beverages", type: "Food & Beverage", logo: "/assets/clients/transcom-logo.png" },
  { name: "Chattogram City Corp.", type: "Government", logo: "/assets/clients/ccc-logo.png" },
  { name: "Rajshahi University", type: "Education", logo: "/assets/clients/ru-logo.png" },
  { name: "Ghorashal Power Plant", type: "Government", logo: "/assets/clients/ghorashal-logo.png" },
  { name: "Abul Khair Ceramics", type: "Ceramics", logo: "/assets/clients/abulkhair-logo.png" },
  { name: "SAMYCON Group", type: "Garments", logo: "/assets/clients/samycon-logo.png" },
  { name: "Lipy Paper Mills", type: "Paper Mill", logo: "/assets/clients/lipy-logo.png" },
  { name: "Knit Asia Group", type: "Textile", logo: "/assets/clients/knitasia-logo.png" },
];

export default function ClientMarquee() {
  // Double the list to create a seamless infinite loop
  const doubleClients = [...marqueeClients, ...marqueeClients, ...marqueeClients];

  return (
    <section className="py-20 bg-white overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-primary tracking-tight">
          Trusted by Bangladesh's Leading Industries
        </h2>
        <div className="w-12 h-1 bg-accent mx-auto mt-4 rounded-full"></div>
        <p className="font-sans text-gray-500 text-sm mt-4 max-w-md mx-auto">
          Our valued partners and clients across the nation
        </p>
      </div>

      <div className="relative w-full flex items-center">
        {/* Gradients to fade out edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex w-max animate-marquee">
          {doubleClients.map((client, idx) => (
            <div
              key={idx}
              className="mx-4 px-6 py-4 rounded-xl bg-gray-50 border border-gray-100 flex flex-col justify-center items-center w-44 text-center shadow-sm hover:shadow-md hover:border-accent/30 transition-all duration-300 group"
            >
              {/* Logo Container - Full Color, No Grayscale */}
              <div className="h-16 w-full flex items-center justify-center mb-3">
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className="max-h-12 max-w-full object-contain transition-all duration-300 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback if logo image doesn't exist - show text with colored background
                    e.target.style.display = 'none';
                    const parent = e.target.parentElement;
                    const colors = ['#1E90FF', '#FF6B00', '#0A1628', '#10B981', '#EF4444', '#8B5CF6'];
                    const randomColor = colors[client.name.length % colors.length];
                    parent.innerHTML += `
                      <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background: ${randomColor}20">
                        <span class="font-display font-bold text-base" style="color: ${randomColor}">${client.name.charAt(0)}</span>
                      </div>
                    `;
                  }}
                />
              </div>
              <span className="text-xs text-text-secondary mt-1 font-medium bg-white px-2 py-0.5 rounded-full border border-gray-200">
                {client.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* View All Clients Link */}
      <div className="text-center mt-12">
        <Link 
          to="/clients" 
          className="inline-flex items-center gap-2 text-accent text-sm font-semibold hover:text-secondary-accent transition-colors group"
        >
          View All Clients
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}