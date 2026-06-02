"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiZap, FiCode } from 'react-icons/fi';
import { SiLaravel, SiReact, SiNextdotjs, SiTailwindcss, SiInertia } from 'react-icons/si';
import type { Translations } from '@/context/LanguageContext';

// Definisi Tipe Data
interface BaseItem {
  title: string;
  description: string;
  link: string;
  image: any;
}

interface ProjectItem extends BaseItem {
  category: string;
  tech: string[];
}

interface CertificationItem extends BaseItem {
  issuer: string;
  date: string;
  certId: string;
}

type PortfolioItem = ProjectItem | CertificationItem;


export default function PortfolioCard({ item, index, loading, t }: { item: PortfolioItem, index: number, loading?: boolean, t: (key: keyof Translations) => string }) {
  const isProject = 'tech' in item;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: index * 0.05 
      }}
      whileHover={{ y: -10 }}
      className="group relative bg-white overflow-hidden hover:scale-102 transition-all duration-500"
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
          <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 ">
            <Image 
              src={item.image} 
              alt={item.title} 
              fill 
              priority
              unoptimized
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
            
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 bg-white/90  backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                <FiArrowUpRight className="text-zinc-900 " />
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6 space-y-4">
            <div>

              <h3 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white mt-1 leading-tight">
                {item.title}
              </h3>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
              {item.description}
            </p>

            {/* BUTTON */}
            <div className="pt-2">
              <a
               href={item.link}
                 className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold 
                           bg-zinc-900 text-white rounded-lg 
                           hover:bg-zinc-800 transition-all duration-300
                           group-hover:translate-x-1"
              >
               {t('buttonDetail')}
                <FiArrowUpRight className="text-base transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}