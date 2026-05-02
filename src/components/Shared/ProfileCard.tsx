"use client";

import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import { SiReact, SiLaravel, SiNextdotjs } from 'react-icons/si';
import { FiZap, FiCode } from 'react-icons/fi';

interface ProfileCardProps {
  profileImage: string | StaticImageData;
}

const ProfileCard = ({ profileImage }: ProfileCardProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-center justify-center">
      <div className="flex flex-col justify-center text-center lg:text-left p-10">
        <div className="relative group shrink-0 mx-auto lg:mx-0 w-fit">
          
          {/* Dot Grid Decoration */}
          <div className="absolute -top-6 -left-6 w-20 h-20 opacity-40 z-0">
            <div className="grid grid-cols-4 gap-3">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-[#c9e55e] rounded-full animate-pulse" />
              ))}
            </div>
          </div>

          {/* Floating Icons */}
          <motion.div 
            animate={{ y: [0, -12, 0] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
            className="absolute -left-12 top-20 z-20 bg-zinc-900/80 backdrop-blur-md p-3 rounded-2xl border border-zinc-700 shadow-xl hidden md:block"
          >
            <SiReact className="text-[#61DAFB] text-2xl" />
          </motion.div>

          <motion.div 
            animate={{ y: [0, 12, 0] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} 
            className="absolute -right-10 top-40 z-20 bg-neutral-100 backdrop-blur-md p-3 rounded-2xl border border-zinc-700 shadow-xl hidden md:block"
          >
            <SiLaravel className="text-[#FF2D20] text-2xl" />
          </motion.div>

          <motion.div 
            animate={{ x: [0, 10, 0] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} 
            className="absolute -left-8 bottom-32 z-20 bg-zinc-900/80 backdrop-blur-md p-3 rounded-2xl border border-zinc-700 shadow-xl hidden md:block"
          >
            <SiNextdotjs className="text-white text-2xl" />
          </motion.div>

          {/* Main Image Card */}
          <motion.div
            whileHover={{ y: -10, rotateY: 8, perspective: 1000 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative z-10 w-72 h-[450px] md:w-80 md:h-[500px] rounded-[3rem] p-[2px] bg-gradient-to-b from-[#c9e55e] via-[#1a47ff] to-[#c9e55e] shadow-[0_0_50px_-12px_rgba(26,71,255,0.5)] overflow-hidden"
          >
            <div className="relative w-full h-full rounded-[2.9rem] overflow-hidden bg-zinc-900">
              <Image 
                src={profileImage} 
                alt="Profile" 
                fill 
                priority 
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" 
              />
              
              {/* Availability Badge */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-2xl z-30">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-[10px] text-[#c9e55e] font-bold uppercase tracking-widest">Available for hire</p>
                    <h3 className="text-white font-bold text-sm">Fullstack Developer</h3>
                  </div>
                  <FiZap className="text-[#c9e55e] fill-[#c9e55e]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Right Code Icon */}
          <motion.div 
            animate={{ boxShadow: ["0px 0px 0px rgba(26,71,255,0)", "0px 0px 20px rgba(26,71,255,0.6)", "0px 0px 0px rgba(26,71,255,0)"] }} 
            transition={{ duration: 2, repeat: Infinity }} 
            className="absolute -bottom-4 -right-4 z-20 bg-[#c9e55e] p-3 rounded-2xl shadow-2xl border-4 border-zinc-900"
          >
            <FiCode className="text-black text-2xl" />
          </motion.div>

          {/* Animated Dashed Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-dashed border-zinc-800 rounded-full -z-10 animate-[spin_20s_linear_infinite]" />
          
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;