"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "id" | "en";

export interface Translations {
  // Navbar
  navHome: string;
  navAbout: string;
  navPorto: string;
  navContact: string;
  hireMe: string;

  // Hero
  availableFreelance: string;

  // About
  availableNewProjects: string;
  aboutHeading1: string;
  aboutHeadingHighlight: string;
  aboutHeading2: string;
  aboutDesc: string;
  yearsOf: string;
  experience: string;

  // Portfolio
  portfolioTitle: string;
  projectsTab: string;
  certsTab: string;
  noDataTitle: string;
  noDataDesc: string;
  loadMore: string;
  buttonDetail: string;

  // Detail & Shared
  back: string;
  projectCaseStudy: string;
  certCaseStudy: string;
  technologies: string;
  livePreview: string;
  sourceCode: string;
  year: string;
  platform: string;
  role: string;
  fullstackDev: string;
  loading: string;
  projectNotFound: string;
  certNotFound: string;

  // Contact
  contactHeading: string;
  contactHighlight: string;
  emailMe: string;
  waLabel: string;
  waDetail: string;
  linkedinLabel: string;
  linkedinDetail: string;
  rightsReserved: string;
}

const translations: Record<Language, Translations> = {
  id: {
    navHome: "Beranda",
    navAbout: "Tentang",
    navPorto: "Portofolio",
    navContact: "Kontak",
    hireMe: "Hubungi Saya",

    availableFreelance: "Tersedia untuk Freelance",

    availableNewProjects: "Tersedia untuk Proyek Baru",
    aboutHeading1: "Menciptakan ",
    aboutHeadingHighlight: "pengalaman digital",
    aboutHeading2: " yang bermakna.",
    aboutDesc: "Spesialis dalam membangun aplikasi web berkinerja tinggi dengan fokus pada kode bersih dan pengalaman pengguna yang luar biasa menggunakan teknologi modern.",
    yearsOf: "Tahun",
    experience: "Pengalaman",

    portfolioTitle: "PORTOFOLIO",
    projectsTab: "Proyek",
    certsTab: "Sertifikat",
    noDataTitle: "Data Tidak Tersedia",
    noDataDesc: "Saat ini tidak ada konten untuk ditampilkan di bagian ini. Silakan kembali lagi nanti atau coba muat ulang halaman.",
    loadMore: "MUAT LEBIH BANYAK",

    back: "KEMBALI",
    projectCaseStudy: "Studi Kasus Proyek",
    certCaseStudy: "Studi Kasus Sertifikat",
    technologies: "Teknologi",
    livePreview: "PREVIEW LANGSUNG",
    sourceCode: "KODE SUMBER",
    year: "Tahun",
    platform: "Platform",
    role: "Peran Pengembangan",
    fullstackDev: "Pengembang Full Stack",
    loading: "MEMUAT DATA...",
    projectNotFound: "PROYEK TIDAK DITEMUKAN.",
    certNotFound: "SERTIFIKAT TIDAK DITEMUKAN.",
    buttonDetail: "LIHAT DETAIL",

    contactHeading: "Mari bekerja ",
    contactHighlight: "Sama",
    emailMe: "Email Saya",
    waLabel: "WhatsApp",
    waDetail: "Respon Cepat",
    linkedinLabel: "LinkedIn",
    linkedinDetail: "Profil Profesional",
    rightsReserved: "Semua hak dilindungi undang-undang."
  },
  en: {
    navHome: "Home",
    navAbout: "About",
    navPorto: "Portfolio",
    navContact: "Contact",
    hireMe: "Hire me",

    availableFreelance: "Available for Freelance",

    availableNewProjects: "Available for New Projects",
    aboutHeading1: "Crafting digital ",
    aboutHeadingHighlight: "experiences",
    aboutHeading2: " that matter.",
    aboutDesc: "Specializing in building high-performance web applications with a focus on clean code and exceptional user experience using modern tech stacks.",
    yearsOf: "Years of",
    experience: "Experience",

    portfolioTitle: "PORTFOLIO",
    projectsTab: "Projects",
    certsTab: "Certificates",
    noDataTitle: "No Data Available",
    noDataDesc: "There is currently no content to display in this section. Please check back later or try refreshing the page.",
    loadMore: "LOAD MORE",

    back: "BACK",
    projectCaseStudy: "Project Case Study",
    certCaseStudy: "Certificate Case Study",
    technologies: "Technologies",
    livePreview: "LIVE PREVIEW",
    sourceCode: "SOURCE",
    year: "Year",
    platform: "Platform",
    role: "Development Role",
    fullstackDev: "Full Stack Developer",
    loading: "LOADING DATA...",
    projectNotFound: "PROJECT NOT FOUND.",
    certNotFound: "CERTIFICATE NOT FOUND.",
    buttonDetail: "VIEW DETAIL",

    contactHeading: "Let's work ",
    contactHighlight: "Together",
    emailMe: "Email Me",
    waLabel: "WhatsApp",
    waDetail: "Fast Response",
    linkedinLabel: "LinkedIn",
    linkedinDetail: "Professional Profile",
    rightsReserved: "All rights reserved."
  }
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("id");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang === "id" || savedLang === "en") {
      setLanguageState(savedLang);
    } else {
      const browserLang = navigator.language.startsWith("id") ? "id" : "en";
      setLanguageState(browserLang);
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: keyof Translations) => {
    return translations[language][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {/* Prevent hydration mismatches by ensuring client-only values match on initial render */}
      {mounted ? children : <div style={{ visibility: "hidden" }}>{children}</div>}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
