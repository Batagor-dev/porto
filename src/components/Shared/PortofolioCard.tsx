"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { useLanguage, type Translations } from '@/context/LanguageContext';

// Definisi Tipe Data
export interface PortfolioItem {
  title?: string;
  name?: string;
  description?: string;
  deskripsi?: string;
  image?: any;
  img?: any;
  category?: string;
  tech?: string[];
  technology?: string[] | string;
  create_at?: string;
  created_at?: string;
  year?: string | number;
  slug?: string;
  type?: string;
  // Fallback untuk sertifikat atau tipe lain jika ada
  issuer?: string;
  date?: string;
  certId?: string;
  [key: string]: any;
}

export default function PortfolioCard({
  item,
  index,
  loading,
  t: propT,
}: {
  item: PortfolioItem;
  index: number;
  loading?: boolean;
  t?: (key: keyof Translations) => string;
}) {
  const { t: contextT } = useLanguage();
  const t = propT || contextT;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle ESC key to close modal & lock body scroll
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isModalOpen]);

  // Ekstraksi data dinamis
  const displayName = item.name || item.title || "Project Name";
  const displayDesc = item.deskripsi || item.description || "";
  const displayImg = item.img || item.image;

  // Ekstraksi tech list dinamis
  let techList: string[] = [];
  if (Array.isArray(item.tech) && item.tech.length > 0) {
    techList = item.tech;
  } else if (Array.isArray(item.technology) && item.technology.length > 0) {
    techList = item.technology;
  } else if (typeof item.technology === 'string' && item.technology) {
    techList = item.technology.split(',').map((s: string) => s.trim()).filter(Boolean);
  } else if (item.category) {
    techList = item.category.split(',').map((s: string) => s.trim()).filter(Boolean);
  }

  // Ekstraksi tahun dinamis dari create_at / created_at
  const rawDate = item.create_at || item.created_at || item.date || item.published_at;
  let displayYear = "";
  if (rawDate) {
    const d = new Date(rawDate);
    if (!isNaN(d.getFullYear())) {
      displayYear = String(d.getFullYear());
    }
  }
  if (!displayYear) {
    displayYear = item.year ? String(item.year) : String(new Date().getFullYear());
  }

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 35, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ 
          duration: 0.5, 
          ease: [0.25, 1, 0.5, 1],
          delay: (index % 3) * 0.1 
        }}
        whileHover={{ y: -6 }}
        onClick={() => {
          if (!loading) setIsModalOpen(true);
        }}
        className="group relative bg-white overflow-hidden rounded-2xl border border-zinc-200/80 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all duration-300 cursor-pointer"
      >
        {loading ? (
          <div className="animate-pulse">
            {/* Image placeholder */}
            <div className="relative aspect-video w-full bg-gray-300" />
            {/* Content placeholder */}
            <div className="p-6 space-y-4">
              <div className="h-4 bg-gray-300 rounded w-24" />
              <div className="h-6 bg-gray-300 rounded w-48" />
              <div className="h-4 bg-gray-300 rounded w-full" />
              <div className="h-4 bg-gray-300 rounded w-5/6" />
              <div className="h-10 bg-gray-300 rounded w-32 mt-4" />
            </div>
          </div>
        ) : (
          <>
            {/* Foto Area */}
            <div className="relative aspect-video w-full overflow-hidden bg-zinc-100">
              {displayImg ? (
                <Image 
                  src={displayImg} 
                  alt={displayName} 
                  fill 
                  priority
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-400">
                  No Image
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="p-6 space-y-3">
              <h3 className="text-xl md:text-2xl font-black text-zinc-900 mt-1 leading-tight">
                {displayName}
              </h3>

              {/* Tech preview pills */}
              {techList.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {techList.slice(0, 3).map((tItem: string, idx: number) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 bg-zinc-100 text-zinc-700 rounded-lg text-[11px] font-semibold"
                    >
                      {tItem}
                    </span>
                  ))}
                  {techList.length > 3 && (
                    <span className="px-2 py-1 bg-zinc-100 text-zinc-500 rounded-lg text-[11px] font-semibold">
                      +{techList.length - 3}
                    </span>
                  )}
                </div>
              )}

              <p className="text-sm text-zinc-600 leading-relaxed line-clamp-2 pt-1">
                {displayDesc}
              </p>
            </div>
          </>
        )}
      </motion.div>

      {/* MODAL BOX */}
      {mounted && createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <div 
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden my-auto"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close modal"
                  className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-lg hover:scale-105"
                >
                  <FiX className="text-lg" />
                </button>

                {/* Modal Header: Image */}
                <div className="relative w-full aspect-video sm:h-72 overflow-hidden bg-zinc-950">
                  {displayImg ? (
                    <Image
                      src={displayImg}
                      alt={displayName}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600 bg-zinc-900">
                      <span>No Image Available</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* Type badge on image */}
                  {item.type && (
                    <div className="absolute bottom-4 left-6 z-10">
                      <span className="px-3.5 py-1 bg-zinc-900/90 backdrop-blur-md text-[#c9e55e] text-[11px] font-bold rounded-lg uppercase tracking-wider border border-white/10 shadow-md">
                        {item.type}
                      </span>
                    </div>
                  )}
                </div>

                {/* Modal Content */}
                <div className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-16rem)] overflow-y-auto">
                  {/* Title & Year Text Minimalis */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-5">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
                        {displayName}
                      </h3>
                    </div>
                    
                    {/* Text Year Saja (Minimalis) */}
                    <span className="text-sm sm:text-base font-bold text-zinc-400 dark:text-zinc-500 font-mono shrink-0">
                      {displayYear}
                    </span>
                  </div>

                  {/* Technologies (Minimalis tanpa icon) */}
                  {techList.length > 0 && (
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-black uppercase tracking-[0.15em] text-zinc-400">
                        {t('technologies')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {techList.map((tItem: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-3.5 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700/60 rounded-xl text-xs font-semibold"
                          >
                            {tItem}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  {displayDesc && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-black uppercase tracking-[0.15em] text-zinc-400">
                        Deskripsi
                      </h4>
                      <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal whitespace-pre-line">
                        {displayDesc}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}