import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  FaChevronRight,
  FaHandshake,
  FaEnvelope,
  FaTimes,
  FaProjectDiagram,
  FaCheckCircle,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserTie,
  FaChartLine,
  FaAward,
  FaArrowRight,
  FaStar,
  FaBuilding,
  FaIndustry,
  FaGraduationCap,
  FaMobileAlt,
  FaTshirt,
} from "react-icons/fa";

/* ─── Logo helper ─────────────────────────────────────────── */
// Maps client id → image filename under /assets/clients/
const LOGO_MAP = {
  1: "buet-logo.png",
  2: "ghorashal-logo.png",
  3: "ccc-logo.png",
  4: "ru-logo.png",
  5: "bsrm-logo.png",
  6: "gph-logo.png",
  7: "abulkhair-logo.png",
  8: "fair-logo.png",
  9: "transcom-logo.png",
  10: "knitasia-logo.png",   // Fariha Knit Tex — use closest available
  11: "samycon-logo.png",    // Mondol Group
  12: "lipy-logo.png",       // Supreme Out Fit
  13: "epic-logo.png",       // Essential Clothing
  14: "dekko-logo.png",
  15: "samycon-logo.png",    // Quasem
  16: "lipy-logo.png",       // Bashundhara
};

const categoryIcon = {
  "Gov & Education": <FaGraduationCap />,
  "Heavy Industry": <FaIndustry />,
  "Electronics & Beverage": <FaMobileAlt />,
  "Garments & Textile": <FaTshirt />,
};

/* ─── Data ────────────────────────────────────────────────── */
const clientsData = [
  {
    id: 1,
    name: "Fariha Knit Tex Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "BBT System Installation",
        description: "Supply, Installation & Commissioning of Busbar Trunking System (5000A, 4000A, 3200A, 1000A).",
        scope: ["5000A BBT", "4000A BBT", "3200A BBT", "1000A BBT"],
        location: "Fatullah, Narayanganj",
        contact: "Engr. Shahedur Rahman (General manager)"
      }
    ]
  },
  {
    id: 2,
    name: "Mondol Group",
    category: "Garments & Textile",
    projects: [
      {
        title: "Comprehensive BBT Installation",
        description: "Supply, Installation & Commissioning of Busbar Trunking System (6300A,4000A, 2500A, 2000A, 1600A,400A to 25A).",
        scope: ["6300A BBT", "4000A BBT", "2500A BBT", "2000A BBT", "1600A BBT"],
        contact: "Eng. Mominul Islam"
      }
    ]
  },
  {
    id: 3,
    name: "Supreme Out Fit Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "BBT & LT Panel Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical 5000A, 4000A, 3200A, 2500A BBT & 6300A LT Panel.",
        scope: ["5000A BBT", "4000A BBT", "3200A BBT", "6300A LT Panel"],
        location: "Kalampur, Dhamrai",
        contact: "MD Akmol Hossain (Director)"
      }
    ]
  },
  {
    id: 5,
    name: "Ripon Dyeing Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Electrical Panel & BBT Installation",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Busbar Trunking System (2000A) and LED Light.",
        scope: ["Electrical Panel Boards", "2000A BBT", "LED Lighting Systems"],
        location: "Konabari, Gazipur",
        contact: "Eng Md.Zahir"
      }
    ]
  },
  {
    id: 6,
    name: "Sadma Fashion Wear Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Heavy BBT & LT Panel Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical 5000A & 4000A, 3200A BBT & 10000A LT Panel.",
        scope: ["5000A BBT", "4000A BBT", "3200A BBT", "10000A LT Panel"],
        location: "Mouchak, Gazipur",
        contact: "MD Nasir Uddin (Managing Director)"
      }
    ]
  },
  {
    id: 7,
    name: "Hamza Apparel Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Busbar Trunking Installation",
        description: "Supply, Installation & Commissioning of Busbar Trunking System (4000A, 630A, 400A to 25A).",
        scope: ["4000A BBT", "630A BBT", "Distribution BBT"],
        location: "Vobanipur, Gazipur, Bangladesh",
        contact: "Md. Zahirul Islam (General manager)"
      }
    ]
  },
  {
    id: 8,
    name: "Essential Clothing Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "BBT & LED Light Installation",
        description: "Supply, Installation & Commissioning of Busbar Trunking System (1250A) and LED Light.",
        scope: ["1250A BBT", "LED Lighting Systems"],
        location: "Kaliakor, Gazipur",
        contact: "MD. Saiful Islam Khan (Managing Director)"
      }
    ]
  },
  {
    id: 10,
    name: "Expo Accessories Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Busbar Trunking Installation",
        description: "Supply, Installation & Commissioning of Busbar Trunking System (4000A, 1600A, 1250A, 800A).",
        scope: ["4000A BBT", "1600A BBT", "1250A BBT", "800A BBT"],
        location: "Porabari, Gazipur",
        contact: "Md. Eanamul Haque (Managing Director)"
      }
    ]
  },
  {
    id: 11,
    name: "Quasem Industries Ltd",
    category: "Heavy Industry",
    projects: [
      {
        title: "BBT & Bridge Installation",
        description: "Supply, Installation & Commissioning of Busbar Trunking System (5000A, 2500A, 2000A) and Bridge.",
        scope: ["5000A BBT", "2500A BBT", "2000A BBT", "Structural Bridge"],
        location: "Gorail, Mirzapur",
        contact: "Mr. Mohshin Ali (General Manager)"
      }
    ]
  },
  {
    id: 12,
    name: "Dekko Readywear Ltd",
    category: "Garments & Textile",
    projects: [
      {
        title: "Electrical Panel & BBT Installation",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Busbar Trunking System (2000A)and LED Light.",
        scope: ["Electrical Panel Boards", "2000A BBT", "LED Lighting Systems"],
        location: "Gazipur, Mirpur, Ashulia",
        contact: "Tapash Krishna Kundu (General Manager)"
      }
    ]
  },
  {
    id: 13,
    name: "Shangu Group (Farseeing Knit Composite Ltd)",
    category: "Garments & Textile",
    projects: [
      {
        title: "Busbar Trunking System",
        description: "Supply, Installation & Commissioning of Busbar Trunking System (2500A & 800A).",
        scope: ["2500A BBT", "800A BBT"],
        location: "Shreepur, Gazipur",
        contact: "Taslim Khan (Project Director)"
      }
    ]
  },
  {
    id: 14,
    name: "Lipy Paper Mills Ltd.",
    category: "Heavy Industry",
    projects: [
      {
        title: "High Capacity BBT System",
        description: "Supply, Installation & Commissioning of Busbar Trunking System (5000A).",
        scope: ["5000A BBT"],
        location: "Madanpur, Narayangonj",
        contact: "Mr. Shahariar (DMD)"
      }
    ]
  },
  {
    id: 15,
    name: "BBKPL, ITTIFAQ TOWER",
    category: "Garments & Textile",
    projects: [
      {
        title: "Panel Board & BBT Installation",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Busbar Trunking System (2500A & 1600A).",
        scope: ["Electrical Panel Boards", "2500A BBT", "1600A BBT"],
        location: "Magbazar, Dhaka",
        contact: "Engr. Rezwan"
      }
    ]
  },
  {
    id: 16,
    name: "RRP Footwear Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "BBT Installation",
        description: "Supply, Installation & Commissioning of Busbar Trunking System (1600A & 1250A).",
        scope: ["1600A BBT", "1250A BBT"],
        location: "Ishardi, Pabna",
        contact: "Engr. Shabuz"
      }
    ]
  },
  {
    id: 17,
    name: "Surma Dyeing Ltd",
    category: "Garments & Textile",
    projects: [
      {
        title: "BBT & LED Light Installation",
        description: "Supply, Installation & Commissioning of Busbar Trunking System (2500A) and LED Light.",
        scope: ["2500A BBT", "LED Lighting Systems"],
        location: "Savar",
        contact: "Engr. Shafiqul Islam"
      }
    ]
  },
  {
    id: 18,
    name: "Surma Garments Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Complete Electrical Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Busbar Trunking System (2000A), and LED Light.",
        scope: ["Electrical Panel Boards", "2000A BBT", "LED Lighting Systems"],
        location: "Birulia Road, Savar",
        contact: "Mr. Ismail Hossain (Technical Manager)"
      }
    ]
  },
  {
    id: 19,
    name: "JM Fabrics Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Panel Board & BBT Installation",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board (4000A), Busbar Trunking System (2500A), and LED Light.",
        scope: ["4000A Electrical Panel Board", "2500A BBT", "LED Lighting Systems"],
        location: "Banglabazar, Gazipur",
        contact: "Mr. Alamgir Kabir"
      }
    ]
  },
  {
    id: 20,
    name: "Globus Garments.",
    category: "Garments & Textile",
    projects: [
      {
        title: "BBT & LED Setup",
        description: "Supply, Installation & Commissioning of Busbar Trunking System (2000A) and LED Light.",
        scope: ["2000A BBT", "LED Lighting Systems"],
        location: "Mouchak, Gazipur",
        contact: "Mr. Mamun"
      }
    ]
  },
  {
    id: 21,
    name: "Dewan Fashion Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "BBT Installation",
        description: "Supply, Installation & Commissioning of Busbar Trunking System (2000A).",
        scope: ["2000A BBT"],
        location: "Mamun Nagar, Chakraborty, Savar",
        contact: "MD. Kabir Hossain (Managing Director)"
      }
    ]
  },
  {
    id: 22,
    name: "Rafia Apparels Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "BBT Installation",
        description: "Supply, Installation & Commissioning of Busbar Trunking System (1000A).",
        scope: ["1000A BBT"],
        location: "Mauna, Gazipur",
        contact: "Mr. Kutub Uddin Ahammed (Managing Director)"
      }
    ]
  },
  {
    id: 23,
    name: "Silken Sewing Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "BBT & Lighting System",
        description: "Supply, Installation & Commissioning of Busbar Trunking System (1600A) and LED Light.",
        scope: ["1600A BBT", "LED Lighting Systems"],
        location: "Gazipur",
        contact: "MD. Saiful Islam Khan (Managing Director)"
      }
    ]
  },
  {
    id: 24,
    name: "Network Group.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Substation & Electrical Infrastructure",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Busbar Trunking System (2000A), Substation and LED Light.",
        scope: ["Electrical Panel Boards", "2000A BBT", "Substation", "LED Lighting"],
        location: "Gazipur",
        contact: "Eng. Md. Rajib"
      }
    ]
  },
  {
    id: 25,
    name: "Tanaz Fashion Ltd. (WINDY GROUP)",
    category: "Garments & Textile",
    projects: [
      {
        title: "Complete Electrical Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Busbar Trunking System (1600A) and LED Light.",
        scope: ["Electrical Panel Boards", "1600A BBT", "LED Lighting"],
        location: "Gazipura 27",
        contact: "Md. Maftahur Rahman Eusufi (Eusuf)"
      }
    ]
  },
  {
    id: 26,
    name: "Vintage Garments Ltd. (WINDY GROUP)",
    category: "Garments & Textile",
    projects: [
      {
        title: "Panel Board & Cable Tray Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Cable Tray, Busbar Trunking Busbar (1600A), and LED Light.",
        scope: ["Electrical Panel Boards", "Cable Trays", "1600A BBT", "LED Lighting"],
        location: "Ashulia",
        contact: "Md. Maftahur Rahman Eusufi (Eusuf)"
      }
    ]
  },
  {
    id: 27,
    name: "Euro Knit wear Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Substation & Electrical Infrastructure",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Busbar Trunking System (1000A), Substation and LED Light.",
        scope: ["Electrical Panel Boards", "1000A BBT", "Substation", "LED Lighting"],
        location: "Gazipur",
        contact: "Engr. Tagdir"
      }
    ]
  },
  {
    id: 28,
    name: "Al Fashion Ltd",
    category: "Garments & Textile",
    projects: [
      {
        title: "Substation & Electrical Infrastructure",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Busbar Trunking System (1000A), Substation and LED Light.",
        scope: ["Electrical Panel Boards", "1000A BBT", "Substation", "LED Lighting"],
        location: "Taltola, Gazipur",
        contact: "Engr. Tagdir"
      }
    ]
  },
  {
    id: 29,
    name: "Roar Fashion Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Panel Board & Cable Tray Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Cable Tray, Busbar Trunking System (1250) and LED Light.",
        scope: ["Electrical Panel Boards", "Cable Trays", "1250A BBT", "LED Lighting"],
        location: "Valuka",
        contact: "Md. Sohel"
      }
    ]
  },
  {
    id: 30,
    name: "Fashion Flow Apparels Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Electrical Panel Board Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Busbar Trunking System.",
        scope: ["Electrical Panel Boards", "Busbar Trunking System"],
        location: "Kaliakor, Gazipur",
        contact: "Mr. Mostafiz (Director)"
      }
    ]
  },
  {
    id: 31,
    name: "Latest Fashion Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Panel Board & Cable Tray Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Cable Tray, Busbar Trunking System (1250A) and LED Light.",
        scope: ["Electrical Panel Boards", "Cable Trays", "1250A BBT", "LED Lighting"],
        location: "Gazipur",
        contact: "Md Aminul Islam (Managing Director)"
      }
    ]
  },
  {
    id: 32,
    name: "Confidence Knit Wear Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Electrical Panel & BBT Installation",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Cable Tray, Busbar Trunking System (1600A) and LED Light.",
        scope: ["Electrical Panel Boards", "Cable Trays", "1600A BBT", "LED Lighting"],
        location: "Mauna",
        contact: "Md. Taufiqul Islam(Kanchan) Managing Director"
      }
    ]
  },
  {
    id: 33,
    name: "Sensible Fashion Ltd (Asrotex Group)",
    category: "Garments & Textile",
    projects: [
      {
        title: "Electrical Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Busbar Trunking System (630A) and LED Light.",
        scope: ["Electrical Panel Boards", "630A BBT", "LED Lighting"],
        location: "Police Line, Narayanganj",
        contact: "Engr. Koushik"
      }
    ]
  },
  {
    id: 34,
    name: "Nikita Apparels Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "BBT Installation",
        description: "Supply, Installation & Commissioning of Busbar Trunking Busbar, (630A to 25A) LED Light.",
        scope: ["Distribution BBT", "LED Lighting"],
        location: "Arihazar, Narayangonj",
        contact: "Engr. Moniruzzaman"
      }
    ]
  },
  {
    id: 35,
    name: "S.S Printing Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "BBT System Installation",
        description: "Supply, Installation & Commissioning of Busbar Trunking System(160A).",
        scope: ["160A BBT"],
        location: "Tongi"
      }
    ]
  },
  {
    id: 36,
    name: "BSRM Steel.",
    category: "Heavy Industry",
    projects: [
      {
        title: "Street & Industrial Lighting",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Street Light, Street Light Pole, High Must Pole and LED Light.",
        scope: ["Electrical Panel Boards", "Street Light Systems", "High Mast Poles", "LED Lighting"],
        location: "Baroiyar Hat, Chittagong",
        contact: "Engr. Iqbal Hossain"
      }
    ]
  },
  {
    id: 37,
    name: "BUET.",
    category: "Gov & Education",
    projects: [
      {
        title: "Substation Installation",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Cable Laying & Substation (2000KVA Dry Type).",
        scope: ["Electrical Panel Boards", "Cable Laying", "2000KVA Dry Type Substation"],
        location: "Dhaka, Bangladesh",
        contact: "Engr. Masud"
      }
    ]
  },
  {
    id: 38,
    name: "ACI Ltd.",
    category: "Electronics & Beverage",
    projects: [
      {
        title: "Panel Board & Cable Tray Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Cable Tray, Busbar Trunking Busbar (2500A), and LED Light.",
        scope: ["Electrical Panel Boards", "Cable Trays", "2500A BBT", "LED Lighting"],
        location: "Narayangonj",
        contact: "Mr. Masum Billa"
      }
    ]
  },
  {
    id: 39,
    name: "Monoara Spinning Mills Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Electrical Panel Board Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Busbar Trunking System (3200A), and LED Light.",
        scope: ["Electrical Panel Boards", "3200A BBT", "LED Lighting"],
        location: "Gazipur",
        contact: "Mr. Mahbubar Rahman (Managing Director)"
      }
    ]
  },
  {
    id: 40,
    name: "New Asia Group.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Panel Board & BBT Installation",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Busbar Trunking System (2000A) and LED Light.",
        scope: ["Electrical Panel Boards", "2000A BBT", "LED Lighting"],
        location: "Gazipur, Ashulia",
        contact: "Mr. Alamgir Kabir"
      }
    ]
  },
  {
    id: 41,
    name: "New Rakhi Textile Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "BBT System Installation",
        description: "Supply, Installation & Commissioning of Busbar Trunking System (2000A).",
        scope: ["2000A BBT"],
        location: "Narayangonj",
        contact: "Mr. Sanowar Hossain (Managing Director)"
      }
    ]
  },
  {
    id: 42,
    name: "South East Composite Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Electrical Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Busbar Trunking System (2000A), and LED Light.",
        scope: ["Electrical Panel Boards", "2000A BBT", "LED Lighting"],
        location: "Gazipur",
        contact: "Mr. Mahbubar Rahman (General Director)"
      }
    ]
  },
  {
    id: 43,
    name: "Sparkel Knit Composite Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Substation & Electrical Infrastructure",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Cable Tray, Busbar Trunking System (1600A), Substation and LED Light.",
        scope: ["Electrical Panel Boards", "Cable Trays", "1600A BBT", "Substation", "LED Lighting"],
        location: "Kabirpur, Savar",
        contact: "Mr. Shahidul Islam Khan"
      }
    ]
  },
  {
    id: 44,
    name: "Fin Bangla Apparels Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "BBT Installation",
        description: "Supply, Installation & Commissioning of Busbar Trunking Busbar (1600A).",
        scope: ["1600A BBT"],
        location: "Gazipur",
        contact: "Md. Ismail"
      }
    ]
  },
  {
    id: 45,
    name: "Unitex Knit Wear Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Substation & Electrical Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Cable Tray, Busbar Trunking System (1250A), Substation and LED Light.",
        scope: ["Electrical Panel Boards", "Cable Trays", "1250A BBT", "Substation", "LED Lighting"],
        location: "Hotapara, Gazipur",
        contact: "Md. Kazi Rakinubbi Sujon (Managing Director)"
      }
    ]
  },
  {
    id: 46,
    name: "MOF Fashion Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Panel Board & BBT Installation",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Busbar Trunking System (1250A) and LED Light.",
        scope: ["Electrical Panel Boards", "1250A BBT", "LED Lighting"],
        location: "Gazipura 27",
        contact: "Md. Masudur Rahman (Managing Director)"
      }
    ]
  },
  {
    id: 47,
    name: "Meem Knitting Mills Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Electrical Works",
        description: "Electrical infrastructure project.",
        scope: ["General Electrical Works"],
        location: "Konabari, Gazipur",
        contact: "Md. Arafat Hossain Rony (Director)"
      }
    ]
  },
  {
    id: 48,
    name: "Tex Apparels Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Panel Board & Cable Tray Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Cable Tray, Busbar Trunking System (1000A), and LED Light.",
        scope: ["Electrical Panel Boards", "Cable Trays", "1000A BBT", "LED Lighting"],
        location: "Uttarkhan",
        contact: "A.K.M Abdullah (Managing Director)"
      }
    ]
  },
  {
    id: 49,
    name: "Afroz Spinning Mills Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Electrical Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Busbar Trunking System (800A & 3200A), and LED Light.",
        scope: ["Electrical Panel Boards", "800A & 3200A BBT", "LED Lighting"],
        location: "Gazipur",
        contact: "Mr. Kazi Anowar (Managing Director)"
      }
    ]
  },
  {
    id: 50,
    name: "Amarat Builders Ltd.",
    category: "Heavy Industry",
    projects: [
      {
        title: "Substation Installation",
        description: "Supply, Installation & Commissioning of 400KVA Substation.",
        scope: ["400KVA Substation"],
        location: "Uttara",
        contact: "Mr. Razon Mahmud (Managing Director)"
      }
    ]
  },
  {
    id: 52,
    name: "Kunjo Devolapers",
    category: "Heavy Industry",
    projects: [
      {
        title: "Substation Installation",
        description: "Supply, Installation & Commissioning of 400KVA Substation.",
        scope: ["400KVA Substation"],
        location: "Uttara",
        contact: "Mr. Nasir Uddin (MD)"
      }
    ]
  },
  {
    id: 54,
    name: "Safid Proparties",
    category: "Heavy Industry",
    projects: [
      {
        title: "Substation Installation",
        description: "Supply, Installation & Commissioning of 150KVA Substation.",
        scope: ["150KVA Substation"],
        location: "Uttara",
        contact: "Mr. Jasimuddin (MD)"
      }
    ]
  },
  {
    id: 55,
    name: "Nuhas Nabbo",
    category: "Heavy Industry",
    projects: [
      {
        title: "Substation Installation",
        description: "Supply, Installation & Commissioning of 100KVA Substation.",
        scope: ["100KVA Substation"],
        location: "Padma Residential Area, Rajshahi",
        contact: "Dr.Kabir"
      }
    ]
  },
  {
    id: 56,
    name: "Abul Khaier Ceramics",
    category: "Heavy Industry",
    projects: [
      {
        title: "Electrical Panel Board Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board.",
        scope: ["Electrical Panel Boards"],
        location: "Ghorashal",
        contact: "Engr. Sayem"
      }
    ]
  },
  {
    id: 57,
    name: "GPH Ispat Ltd.",
    category: "Heavy Industry",
    projects: [
      {
        title: "Panel Board & LED Light Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board & LED Light.",
        scope: ["Electrical Panel Boards", "LED Lighting Systems"],
        location: "Shitakundo, CTG",
        contact: "Abdullah Hil Yeakub"
      }
    ]
  },
  {
    id: 58,
    name: "Fair Electronics Ltd. (Samsung)",
    category: "Electronics & Beverage",
    projects: [
      {
        title: "Complete Electrical Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Busbar Trunking System, Cable Tray and LED Light.",
        scope: ["Electrical Panel Boards", "Busbar Trunking System", "Cable Trays", "LED Lighting"],
        location: "Norshingdi",
        contact: "Engr. Abul Kalam Azad"
      }
    ]
  },
  {
    id: 59,
    name: "Ghorashal Power Plant",
    category: "Gov & Education",
    projects: [
      {
        title: "LED Light with Street Pole Setup",
        description: "Supply, Installation & Commissioning of LED Light with Street Pole.",
        scope: ["LED Street Lights", "Street Lighting Poles"],
        location: "Ghorashal",
        contact: "Engr. Sabbir"
      }
    ]
  },
  {
    id: 60,
    name: "Chittagong City Corporation",
    category: "Gov & Education",
    projects: [
      {
        title: "Urban Lighting Setup",
        description: "Supply, Installation & Commissioning of Panel Board & LED Light.",
        scope: ["Electrical Panel Boards", "LED Lighting Systems"],
        location: "Chittagong",
        contact: "Engr. Jhulon Kumar Das"
      }
    ]
  },
  {
    id: 61,
    name: "Rajshahi University",
    category: "Gov & Education",
    projects: [
      {
        title: "Diesel Generator Installation",
        description: "Supply, Installation & Commissioning of Diesel Generator.",
        scope: ["Diesel Generator Setup"],
        location: "Rajshahi",
        contact: "Register Rajshahi University"
      }
    ]
  },
  {
    id: 62,
    name: "Tarasima Apparels Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Panel Board & Cable Tray Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Cable Tray and LED Light.",
        scope: ["Electrical Panel Boards", "Cable Trays", "LED Lighting"],
        location: "Manikgonj",
        contact: "Engr. Azhar Ali"
      }
    ]
  },
  {
    id: 63,
    name: "Aftab Garments Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Substation & Electrical Infrastructure",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Cable Tray, Busbar Trunking System, Substation and LED Light.",
        scope: ["Electrical Panel Boards", "Cable Trays", "Busbar Trunking System", "Substation", "LED Lighting"],
        location: "Mouchak, Gazipur",
        contact: "Mr. Akkas Ali (General Manager)"
      }
    ]
  },
  {
    id: 64,
    name: "Tanzina Fashion Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Panel Board & BBT Installation",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Busbar Trunking System (400A) and LED Light.",
        scope: ["Electrical Panel Boards", "400A BBT", "LED Lighting"],
        location: "Demra",
        contact: "Hasanul Mujib (Maneging Director)"
      }
    ]
  },
  {
    id: 65,
    name: "Mashiyat Apparel Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Panel Board Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Busbar Trunking System (400A).",
        scope: ["Electrical Panel Boards", "400A BBT"],
        location: "Mondal Para, Ashulia, Savar",
        contact: "Hasanul Mujib (Maneging Director)"
      }
    ]
  },
  {
    id: 66,
    name: "Bashundhara Group",
    category: "Heavy Industry",
    projects: [
      {
        title: "Panel Board & Cable Tray Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Cable Tray and LED Light.",
        scope: ["Electrical Panel Boards", "Cable Trays", "LED Lighting"],
        location: "Dhaka Bangladesh",
        contact: "Mr. Enamul Haque (Executive Director)"
      }
    ]
  },
  {
    id: 67,
    name: "Unity Dyeing Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Electrical Works",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Cable Tray and LED Light.",
        scope: ["Electrical Panel Boards", "Cable Trays", "LED Lighting"],
        location: "Narayangonj",
        contact: "Mr.Moshiur Rahman (Director)"
      }
    ]
  },
  {
    id: 68,
    name: "Perpoace Knit Wear Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Panel Board & Cable Tray Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Cable Tray, Busbar Trunking System (1000A), and LED Light.",
        scope: ["Electrical Panel Boards", "Cable Trays", "1000A BBT", "LED Lighting"],
        location: "Mollartek, Dhakinkhan",
        contact: "Mr.Sabbir Mahabub (Managing director)"
      }
    ]
  },
  {
    id: 69,
    name: "South East Sweaters Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Electrical Panel Board Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Cable Tray, Busbar Trunking System, and LED Light.",
        scope: ["Electrical Panel Boards", "Cable Trays", "Busbar Trunking System", "LED Lighting"],
        location: "Mollartek, Dhakinkhan",
        contact: "Mr.Mahabubur Rahaman (General Manager)"
      }
    ]
  },
  {
    id: 70,
    name: "Arcorp Denim Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Electrical Panel Board Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Cable Tray, Busbar Trunking System, and LED Light.",
        scope: ["Electrical Panel Boards", "Cable Trays", "Busbar Trunking System", "LED Lighting"],
        location: "Ashulia, savar",
        contact: "Raqien Karim (Chairman)"
      }
    ]
  },
  {
    id: 71,
    name: "Doctor's Cattle Feed Complex Ltd.",
    category: "Electronics & Beverage",
    projects: [
      {
        title: "Electrical Panel & Cable Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Cable Tray, and LED Light.",
        scope: ["Electrical Panel Boards", "Cable Trays", "LED Lighting"],
        location: "Bogra",
        contact: "Mr.Fazlur Rahman (Managing Director)"
      }
    ]
  },
  {
    id: 72,
    name: "Glaze Knit wear Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Electrical Panel Board Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Cable Tray, Busbar Trunking System, and LED Light.",
        scope: ["Electrical Panel Boards", "Cable Trays", "Busbar Trunking System", "LED Lighting"],
        location: "Gazipur",
        contact: "Mr.Faysal (Managing Director)"
      }
    ]
  },
  {
    id: 73,
    name: "KL Fashion Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Electrical Works",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Cable Tray, and LED Light.",
        scope: ["Electrical Panel Boards", "Cable Trays", "LED Lighting"],
        location: "Tongi",
        contact: "MD. Zakir Hossain Talukder (Managing Director)"
      }
    ]
  },
  {
    id: 74,
    name: "Provatex Apparels Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "BBT System Setup",
        description: "Supply, Installation & Commissioning of Busbar Trunking System.",
        scope: ["Busbar Trunking System"],
        location: "Dhaka, Bangladesh",
        contact: "MR. M.N.A SHAHEEN (Managing Director)"
      }
    ]
  },
  {
    id: 75,
    name: "Tex Tech Co. Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Electrical Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Cable Tray, Busbar Trunking System, and LED Light.",
        scope: ["Electrical Panel Boards", "Cable Trays", "Busbar Trunking System", "LED Lighting"],
        location: "Gazipur",
        contact: "Mr. Turan shithe (Managing Director)"
      }
    ]
  },
  {
    id: 76,
    name: "General Pharmaceuitical Ltd.",
    category: "Heavy Industry",
    projects: [
      {
        title: "Electrical Works",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Cable Tray and LED Light.",
        scope: ["Electrical Panel Boards", "Cable Trays", "LED Lighting"],
        location: "Gazipur",
        contact: "Mr. Azaharul Haque"
      }
    ]
  },
  {
    id: 77,
    name: "Mascot Knits Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Electrical Panel Board Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Cable Tray and LED Light.",
        scope: ["Electrical Panel Boards", "Cable Trays", "LED Lighting"],
        location: "Zirabo, Savar",
        contact: "Engr. Shiraj"
      }
    ]
  },
  {
    id: 78,
    name: "British American Tobacco Ltd.",
    category: "Electronics & Beverage",
    projects: [
      {
        title: "Electrical Panel & LED Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, and LED Light.",
        scope: ["Electrical Panel Boards", "LED Lighting"],
        location: "Mohakhali",
        contact: "Mr. Ronald Greig"
      }
    ]
  },
  {
    id: 79,
    name: "Business Solution Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Electrical Works",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Cable Tray and LED Light.",
        scope: ["Electrical Panel Boards", "Cable Trays", "LED Lighting"],
        location: "Kamarpara"
      }
    ]
  },
  {
    id: 80,
    name: "Bappy Dairy & Food Products Ltd.",
    category: "Electronics & Beverage",
    projects: [
      {
        title: "Substation & Electrical Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Substation and LED Light.",
        scope: ["Electrical Panel Boards", "Substation", "LED Lighting"],
        location: "Pabna",
        contact: "Mr. Babul (Managing Director)"
      }
    ]
  },
  {
    id: 81,
    name: "Barison Creations Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Electrical Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Cable Tray, Busbar trunking System, and LED Light.",
        scope: ["Electrical Panel Boards", "Cable Trays", "Busbar Trunking System", "LED Lighting"],
        location: "Gazipur"
      }
    ]
  },
  {
    id: 82,
    name: "Pantex Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Electrical Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Cable Tray and LED Light.",
        scope: ["Electrical Panel Boards", "Cable Trays", "LED Lighting"],
        location: "Zirani Bazar, Gazipur",
        contact: "Mr. Himu (Deputy Managing Director)"
      }
    ]
  },
  {
    id: 83,
    name: "Bengal Footwear Ltd.",
    category: "Garments & Textile",
    projects: [
      {
        title: "Electrical Panel & LED Setup",
        description: "Supply, Installation & Commissioning of Different Types of Electrical Panel Board, Cable Tray and LED Light.",
        scope: ["Electrical Panel Boards", "Cable Trays", "LED Lighting"],
        location: "Chamorkhan, Uttara",
        contact: "Saidul Islam (Managing Director)"
      }
    ]
  }
];
const industryTabs = [
  { label: "All", icon: <FaBuilding /> },
  { label: "Gov & Education", icon: <FaGraduationCap /> },
  { label: "Heavy Industry", icon: <FaIndustry /> },
  { label: "Electronics & Beverage", icon: <FaMobileAlt /> },
  { label: "Garments & Textile", icon: <FaTshirt /> },
];

/* ─── Logo Component ──────────────────────────────────────── */
const ClientLogo = ({ id, name }) => {
  const [hasError, setHasError] = useState(false);
  const filename = LOGO_MAP[id];
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  if (!filename || hasError) {
    return (
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center">
        <span className="text-xl font-black text-primary/60 tracking-tight">{initials}</span>
      </div>
    );
  }

  return (
    <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden p-2">
      <img
        src={`/assets/clients/${filename}`}
        alt={`${name} logo`}
        className="max-w-full max-h-full object-contain"
        onError={() => setHasError(true)}
      />
    </div>
  );
};

/* ─── Project Popup ───────────────────────────────────────── */
const ProjectPopup = ({ client, onClose }) => {
  const totalScopes = client.projects.reduce((s, p) => s + p.scope.length, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ type: "spring", damping: 30, stiffness: 350 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-8 py-6 rounded-t-3xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <ClientLogo id={client.id} name={client.name} />
            <div>
              <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-1 flex items-center gap-1.5">
                {categoryIcon[client.category]}
                {client.category}
              </p>
              <h2 className="font-display font-bold text-xl text-primary leading-tight">
                {client.name}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-500 text-gray-500 flex items-center justify-center transition-colors duration-200"
          >
            <FaTimes size={14} />
          </button>
        </div>

        {/* Stats */}
        <div className="px-8 py-6 grid grid-cols-3 gap-4">
          {[
            { label: "Projects", value: client.projects.length, color: "text-accent", bg: "bg-accent/6" },
            { label: "Work Scopes", value: totalScopes, color: "text-secondary-accent", bg: "bg-secondary-accent/6" },
            { label: "Satisfaction", value: "100%", color: "text-emerald-600", bg: "bg-emerald-50" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-2xl p-4 text-center`}>
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Project cards */}
        <div className="px-8 pb-8 space-y-6">
          {client.projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="border border-gray-100 rounded-2xl overflow-hidden"
            >
              {/* Project title bar */}
              <div className="bg-gray-50 px-6 py-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-primary text-base">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.year && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-accent/10 text-accent px-2.5 py-1 rounded-full">
                        <FaCalendarAlt size={9} />
                        {project.year}
                      </span>
                    )}
                    {project.value && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-secondary-accent/10 text-secondary-accent px-2.5 py-1 rounded-full">
                        <FaChartLine size={9} />
                        {project.value}
                      </span>
                    )}
                  </div>
                </div>
                <div className="bg-accent/10 p-2.5 rounded-xl flex-shrink-0">
                  <FaProjectDiagram className="text-accent" />
                </div>
              </div>

              <div className="px-6 py-5">
                <p className="text-sm text-gray-600 leading-relaxed mb-5">{project.description}</p>

                {/* Scope chips */}
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Scope of Work</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.scope.map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full"
                    >
                      <FaCheckCircle className="text-accent text-[10px]" />
                      {item}
                    </span>
                  ))}
                </div>

                {/* Location / Contact */}
                {(project.location || project.contact) && (
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 space-y-3">
                    {project.location && (
                      <div className="flex items-center gap-3 text-sm">
                        <FaMapMarkerAlt className="text-accent flex-shrink-0" />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Location</span>
                          <span className="text-gray-700 font-medium">{project.location}</span>
                        </div>
                      </div>
                    )}
                    {project.contact && (
                      <div className="flex items-center gap-3 text-sm">
                        <FaUserTie className="text-accent flex-shrink-0" />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Contact</span>
                          <span className="text-gray-700 font-medium">{project.contact}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mx-8 mb-8 p-4 bg-gray-50 rounded-2xl flex items-center justify-center gap-2 text-xs text-gray-400">
          <FaAward className="text-accent" />
          Completed to the highest industry & safety standards
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Client Card ─────────────────────────────────────────── */
const ClientCard = ({ client, index }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.35, delay: index * 0.04 }}
        whileHover={{ y: -4 }}
        onClick={() => setShowPopup(true)}
        className="group relative bg-white border border-gray-100 rounded-2xl p-6 cursor-pointer hover:border-accent/30 hover:shadow-lg transition-all duration-300"
      >
        {/* Top row: logo + category badge */}
        <div className="flex items-start justify-between mb-5">
          <ClientLogo id={client.id} name={client.name} />
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/8 border border-accent/15 px-2.5 py-1.5 rounded-full">
            {categoryIcon[client.category]}
            {client.category}
          </span>
        </div>

        {/* Name */}
        <h3 className="font-display font-bold text-primary text-[15px] leading-snug mb-4 group-hover:text-accent transition-colors duration-250">
          {client.name}
        </h3>

        {/* Footer row */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 font-medium">
            <FaProjectDiagram size={11} className="text-accent" />
            {client.projects.length} project{client.projects.length !== 1 ? "s" : ""}
          </span>
          <span className="text-xs font-semibold text-accent opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity duration-200">
            View details <FaArrowRight size={10} />
          </span>
        </div>

        {/* Accent bottom bar */}
        <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-accent to-secondary-accent rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
      </motion.div>

      <AnimatePresence>
        {showPopup && <ProjectPopup client={client} onClose={() => setShowPopup(false)} />}
      </AnimatePresence>
    </>
  );
};

/* ─── Stat Counter ────────────────────────────────────────── */
const Stat = ({ value, label }) => (
  <div className="text-center">
    <p className="text-4xl font-black text-white">{value}</p>
    <p className="text-sm text-white/60 mt-1 font-medium">{label}</p>
  </div>
);

/* ─── Main Page ───────────────────────────────────────────── */
export default function Clients() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredClients =
    activeTab === "All" ? clientsData : clientsData.filter((c) => c.category === activeTab);

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ── Intro ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">Our Clients</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary mb-5">
              Powering Bangladesh's{" "}
              <span className="text-accent">Prominent Enterprises</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-accent to-secondary-accent mx-auto rounded-full mb-6" />
            <p className="text-gray-500 text-base leading-relaxed">
              Over 20 years, Maan Engineering Ltd. has built long-term engineering and supply
              contracts with key government projects, educational institutions, global electronics
              conglomerates, heavy metallurgy mills, and over 30 leading garment and textile
              exporters across Bangladesh.
            </p>
            <p className="mt-5 text-sm text-accent/80 font-medium">
              ↓ Click any client card to explore detailed project information
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Tabs ── */}
      <div className="sticky top-[64px] z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-4">
            {industryTabs.map((tab) => {
              const count =
                tab.label === "All"
                  ? clientsData.length
                  : clientsData.filter((c) => c.category === tab.label).length;
              const active = activeTab === tab.label;
              return (
                <motion.button
                  key={tab.label}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveTab(tab.label)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 border ${
                    active
                      ? "bg-primary text-white border-primary shadow"
                      : "bg-white text-gray-500 border-gray-200 hover:border-accent/40 hover:text-accent"
                  }`}
                >
                  <span className={active ? "text-white" : "text-accent/70"}>{tab.icon}</span>
                  {tab.label}
                  <span
                    className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${
                      active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Client Grid ── */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredClients.map((client, idx) => (
                <ClientCard key={client.id} client={client} index={idx} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredClients.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className="text-gray-400 text-lg">No clients in this category yet.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">Get in touch</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-5">
              Ready to Join Our{" "}
              <span className="text-accent">Trusted Partners</span>?
            </h2>
            <p className="text-white/50 text-base mb-10">
              Upgrade your industrial power infrastructure with Bangladesh's most trusted electrical
              engineering partner.
            </p>
            <motion.a
              href="mailto:sales@maanengineeringltd.com"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-accent text-white font-bold text-sm shadow-lg shadow-accent/30 hover:bg-accent/90 transition-colors"
            >
              <FaEnvelope />
              Contact Our Sales Team
              <FaArrowRight size={12} />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}