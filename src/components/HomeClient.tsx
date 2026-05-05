"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion'; 
import { SiLinkerd, SiWhatsapp } from 'react-icons/si';
import { FiArrowUpRight, FiMail } from 'react-icons/fi';
import { TiStarburst } from "react-icons/ti";
import AvatarCard from "@/components/Shared/AvatarCard";
import PortfolioCard from "@/components/Shared/PortofolioCard";
import ProfileCard from "@/components/Shared/ProfileCard";
import Avatar1 from '@/Assets/Images/Avatar/Avatar-1.png';
import Avatar2 from '@/Assets/Images/Avatar/Avatar-2.png';
import Profile from '@/Assets/Images/Profile/profile.jpeg';

interface HomeClientProps {
  initialProjects: any[];
  initialCerts: any[];
}

export default function HomeClient({ initialProjects, initialCerts }: HomeClientProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRightRef = useRef<HTMLDivElement>(null);
  const cardLeftRef = useRef<HTMLDivElement>(null);

  // --- RE-SYNC STATE ---
  // Gunakan state untuk menampung data agar React bisa mendeteksi perubahan saat navigasi back
  const [activeTab, setActiveTab] = useState<'projects' | 'certs'>('projects');
  const [visibleItems, setVisibleItems] = useState(6);

  // Scroll Animation Logic (Optimized)
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const scrollY = window.scrollY;
      const threshold = sectionRef.current.offsetHeight;
      if (scrollY > threshold) return;

      requestAnimationFrame(() => {
        if (gridRef.current) gridRef.current.style.transform = `translateY(${scrollY * 0.2}px)`;
        if (textRef.current) textRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
        if (cardRightRef.current) cardRightRef.current.style.transform = `translateY(${scrollY * -0.35}px)`;
        if (cardLeftRef.current) cardLeftRef.current.style.transform = `translateY(${scrollY * -0.5}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset jumlah item saat ganti tab
  const handleTabChange = (tab: 'projects' | 'certs') => {
    setActiveTab(tab);
    setVisibleItems(6);
  };

  const currentData = activeTab === 'projects' ? initialProjects : initialCerts;

  return (
    <div className="flex flex-col w-full bg-white">
      {/* SECTION 1: HERO (Sama seperti sebelumnya) */}
      <section ref={sectionRef} className="relative h-screen flex flex-col items-center justify-center bg-[#1a47ff] overflow-hidden p-4 md:p-10">
        <div ref={gridRef} className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
        <div ref={textRef} className="relative flex flex-col items-center justify-center z-10 text-center">
          <h2 className="text-[13vw] md:text-[10vw] font-black text-[#c9e55e] leading-[0.85] uppercase">Batagor</h2>
          <h2 className="text-[13vw] md:text-[10vw] font-black text-white leading-[0.85] uppercase outline-text">Full Stack</h2>
          <h2 className="text-[13vw] md:text-[10vw] font-black text-white leading-[0.85] uppercase">Dev</h2>
        </div>
        <div className="absolute top-[18%] right-[4%] z-30"><div ref={cardRightRef}><AvatarCard name="Batagor" imageSrc={Avatar1} className="rotate-6" /></div></div>
        <div className="absolute bottom-[18%] left-[4%] z-30"><div ref={cardLeftRef}><AvatarCard name="Web Dev" imageSrc={Avatar2} className="-rotate-6" /></div></div>
      </section>

      {/* SECTION 2: ABOUT (Sama seperti sebelumnya) */}
      <section id="about" className="relative z-40 py-24 bg-white px-6 md:px-20 rounded-t-[60px] md:rounded-t-[100px] shadow-[0_-30px_60px_-15px_rgba(0,0,0,0.1)] -mt-20">
         {/* Isi About kamu... */}
      </section>

      {/* SECTION 3: PORTFOLIO (FIXED) */}
      <section id="porto" className="py-24 bg-zinc-50 px-6 md:px-20 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
            <h2 className="text-6xl md:text-8xl font-black text-zinc-900 tracking-tighter uppercase flex items-center gap-4">
              P <span className="text-[#c9e55e] animate-spin-slow"><TiStarburst /></span> RTFOLIO
            </h2>
            
            {/* Navigasi Tab */}
            <div className="flex p-1.5 bg-zinc-200/50 backdrop-blur-md rounded-2xl border border-zinc-300 w-fit">
              {(['projects', 'certs'] as const).map((tab) => (
                <button 
                  key={tab} 
                  onClick={() => handleTabChange(tab)} 
                  className={`relative px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === tab ? 'text-black' : 'text-zinc-500 hover:text-zinc-700'}`}
                >
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="activeTabBackground" 
                      className="absolute inset-0 bg-[#c9e55e] rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 uppercase">{tab === 'certs' ? 'Certificates' : 'Projects'}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Grid Content dengan AnimatePresence yang Benar */}
          <div className="min-h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab} // Sangat penting agar React tahu kapan harus ganti konten
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {currentData.slice(0, visibleItems).map((item, index) => (
                  <PortfolioCard 
                    key={`${activeTab}-${index}`} // Key gabungan agar unik antar tab
                    item={item} 
                    index={index} 
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Load More Button */}
          {currentData.length > visibleItems && (
            <div className="flex justify-center mt-12">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setVisibleItems(prev => prev + 6)} 
                className="px-10 py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-[#1a47ff] transition-all shadow-xl"
              >
                LOAD MORE
              </motion.button>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4: CONTACT (Sama seperti sebelumnya) */}
      {/* ... */}
    </div>
  );
}