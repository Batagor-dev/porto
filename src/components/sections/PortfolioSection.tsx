"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { TiStarburst } from "react-icons/ti";
import PortfolioCard from "@/components/Shared/PortofolioCard";

interface PortfolioProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentData: any[];
  visibleItems: number;
  setVisibleItems: (val: any) => void;
  isLoading: boolean;
}

export default function PortfolioSection({ activeTab, setActiveTab, currentData, visibleItems, setVisibleItems, isLoading }: PortfolioProps) {
  return (
    <section id="porto" className="py-24 bg-zinc-50 px-6 md:px-20 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <h2 className="text-6xl md:text-8xl font-black text-zinc-900 tracking-tighter uppercase flex items-center gap-4">
            P <span className="text-[#c9e55e] animate-spin-slow"><TiStarburst /></span> RTFOLIO
          </h2>
          <div className="flex p-1.5 bg-zinc-200/50 backdrop-blur-md rounded-2xl border border-zinc-300 w-fit">
            {['projects', 'certs'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`relative px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab ? 'text-black' : 'text-zinc-500'}`}>
                {activeTab === tab && <motion.div layoutId="activeTab" className="absolute inset-0 bg-[#c9e55e] rounded-xl shadow-lg" />}
                <span className="relative z-10 uppercase">{tab === 'projects' ? 'Projects' : 'Certificates'}</span>
              </button>
            ))}
          </div>
        </div>
        
        {!isLoading && currentData.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-60 text-center">
            <h3 className="text-xl md:text-2xl font-black text-zinc-800 tracking-tight">No Data Available</h3>
            <p className="text-sm text-zinc-500 mt-2 max-w-md">There is currently no content to display.</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col gap-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentData.slice(0, visibleItems).map((item, index) => (
                  <PortfolioCard key={`${activeTab}-${index}`} item={item} index={index} />
                ))}
              </div>
              {currentData.length > visibleItems && (
                <div className="flex justify-center">
                  <button onClick={() => setVisibleItems((prev: number) => prev + 6)} className="px-10 py-4 bg-zinc-900 text-white rounded-2xl font-bold transition-all hover:-translate-y-1">
                    LOAD MORE
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}