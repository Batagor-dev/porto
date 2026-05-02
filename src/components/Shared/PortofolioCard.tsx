"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiZap, FiCode } from 'react-icons/fi';
import { SiLaravel, SiReact, SiNextdotjs, SiTailwindcss, SiInertia } from 'react-icons/si';

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

const getTechDetails = (tech: string) => {
  const config: Record<string, { bg: string, text: string, icon: any }> = {
    "React": { bg: "bg-zinc-900/80", text: "text-[#61DAFB]", icon: <SiReact /> },
    "React 19": { bg: "bg-zinc-900/80", text: "text-[#61DAFB]", icon: <SiReact /> },
    "Laravel": { bg: "bg-[#FF2D20]", text: "text-white", icon: <SiLaravel /> },
    "Next.js": { bg: "bg-zinc-100", text: "text-zinc-900", icon: <SiNextdotjs /> },
    "Tailwind": { bg: "bg-[#38BDF8]", text: "text-zinc-900", icon: <SiTailwindcss /> },
    "Inertia.js": { bg: "bg-[#9553E9]", text: "text-white", icon: <SiInertia /> },
    "PostgreSQL": { bg: "bg-[#336791]", text: "text-white", icon: <FiCode /> },
    "Python": { bg: "bg-[#FFD43B]", text: "text-zinc-900", icon: <FiCode /> },
    "MySQL": { bg: "bg-[#4479A1]", text: "text-white", icon: <FiCode /> },
    "Framer Motion": { bg: "bg-zinc-900", text: "text-white", icon: <FiZap /> },
  };

  return config[tech] || { bg: "bg-zinc-800", text: "text-white", icon: <FiCode /> };
};

export default function PortfolioCard({ item, index }: { item: PortfolioItem, index: number }) {
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
      className="group relative bg-white  rounded-[2.5rem] overflow-hidden border-2 border-zinc-100  shadow-sm hover:shadow-2xl hover:border-black transition-all duration-500"
    >
      <a href={item.link} className="block cursor-pointer">
        {/* Foto Area */}
        <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 ">
          <Image 
            src={item.image} 
            alt={item.title} 
            fill 
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
            <span className="inline-flex items-center px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-black bg-[#c9e55e] rounded-md">
              {isProject ? (item as ProjectItem).category : (item as CertificationItem).issuer}
            </span>
            <h3 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white mt-1 transition-colors leading-tight">
              {item.title}
            </h3>
          </div>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed h-10">
            {item.description}
          </p>

          {/* Footer Area */}
          <div className="pt-5 flex flex-wrap gap-2 border-t border-zinc-100 dark:border-zinc-800">
            {isProject ? (
              (item as ProjectItem).tech.map((t) => {
                const { bg, text, icon } = getTechDetails(t);
                return (
                  <span 
                    key={t} 
                    className={`flex items-center gap-1.5 px-3 py-1 text-[10px] font-black uppercase tracking-tight rounded-lg shadow-sm border border-black/5 ${bg} ${text}`}
                  >
                    <span className="text-sm">{icon}</span>
                    {t}
                  </span>
                );
              })
            ) : (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 text-xs font-bold bg-[#c9e55e] text-zinc-900 px-3 py-1 rounded-lg">
                  <FiZap /> {(item as CertificationItem).date}
                </div>
                <span className="text-[10px] text-zinc-400 font-mono font-bold">
                  {(item as CertificationItem).certId}
                </span>
              </div>
            )}
          </div>
        </div>
      </a>
    </motion.div>
  );
}