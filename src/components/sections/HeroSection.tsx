"use client";
import { motion } from 'framer-motion';
import AvatarCard from "@/components/Shared/AvatarCard";
import Avatar1 from '@/Assets/Images/Avatar/Avatar-1.png';
import Avatar2 from '@/Assets/Images/Avatar/Avatar-2.png';

interface HeroProps {
  sectionRef: React.RefObject<HTMLElement>;
  gridRef: React.RefObject<HTMLDivElement>;
  textRef: React.RefObject<HTMLDivElement>;
  cardRightRef: React.RefObject<HTMLDivElement>;
  cardLeftRef: React.RefObject<HTMLDivElement>;
}

export default function HeroSection({ sectionRef, gridRef, textRef, cardRightRef, cardLeftRef }: HeroProps) {
  return (
    <section ref={sectionRef} className="relative min-h-[200px] h-screen flex flex-col items-center justify-center bg-[#1a47ff] overflow-hidden p-4 md:p-10">
      <div ref={gridRef} className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
      
      <div className="z-20 mb-2 md:mb-6 flex items-center gap-2 bg-black/20 backdrop-blur-md border border-white/10 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[8px] md:text-[10px] text-white font-bold uppercase tracking-[0.15em] shadow-lg">
        <span className="relative flex h-2 w-2">
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 animate-pulse"></span>
        </span>
        Available for Freelance
      </div>

      <div ref={textRef} className="relative flex flex-col items-center justify-center pointer-events-none select-none z-10 text-center">
        <h2 className="text-[13vw] md:text-[10vw] font-black text-[#c9e55e] leading-[0.85] uppercase">Batagor</h2>
        <h2 className="text-[13vw] md:text-[10vw] font-black text-white leading-[0.85] uppercase">Full Stack</h2>
        <h2 className="text-[13vw] md:text-[10vw] font-black text-white leading-[0.85] uppercase">Dev</h2>
      </div>

      <div className="absolute top-[18%] right-[4%] md:top-1/4 md:right-[8%] z-30">
        <div ref={cardRightRef} className="transform scale-[0.70] md:scale-110 origin-right transition-transform duration-75">
          <AvatarCard name="Batagor" imageSrc={Avatar1} delay="-1.5s" className="rotate-6 shadow-2xl backdrop-blur-2xl border border-white/20" />
        </div>
      </div>

      <div className="absolute bottom-[18%] left-[4%] md:bottom-1/4 md:left-[8%] z-30">
        <div ref={cardLeftRef} className="transform scale-[0.70] md:scale-110 origin-left transition-transform duration-75">
          <AvatarCard name="Web Dev" imageSrc={Avatar2} delay="0" className="-rotate-6 shadow-2xl backdrop-blur-2xl border border-white/20" />
        </div>
      </div>
    </section>
  );
}