"use client";
import { motion } from 'framer-motion';
import ProfileCard from "@/components/Shared/ProfileCard";
import Profile from '@/Assets/Images/Profile/profile.jpeg';

interface AboutProps {
  techStack: any[];
}

export default function AboutSection({ techStack }: AboutProps) {
  return (
    <section id="about" className="relative z-40 py-24 bg-white px-6 md:px-20 rounded-t-[60px] md:rounded-t-[100px] shadow-[0_-30px_60px_-15px_rgba(0,0,0,0.1)] -mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <ProfileCard profileImage={Profile} />
        <div className="flex flex-col h-full pt-4 lg:pt-16">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white text-black border border-[#c9e55e]/20 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
              <span className="w-1.5 h-1.5 bg-[#c9e55e] rounded-full animate-pulse" />
              Available for New Projects
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 leading-[1.1] tracking-tight">
              Crafting digital <span className="text-[#1a47ff]">experiences</span> that matter.
            </h2>
            <p className="text-base md:text-lg text-zinc-500 max-w-md leading-relaxed">
              Specializing in building high-performance web applications with a focus on clean code and exceptional user experience using modern tech stacks.
            </p>
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="flex flex-wrap gap-3 max-w-[420px]">
                {techStack.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <div key={tech.name} className={`flex items-center gap-3 px-4 py-2 rounded-full ${tech.bg} ${tech.text} shadow-sm hover:-translate-y-1 transition-all`}>
                      <Icon className="text-[18px]" />
                      <div className="flex flex-col leading-tight">
                        <span className="text-xs font-bold">{tech.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <motion.div whileHover={{ y: -10 }} className="bg-white p-8 rounded-[2.5rem] shadow-xl border-2 border-b-black flex flex-col gap-2 relative z-10">
                <span className="text-6xl font-black text-[#1a47ff] tracking-tighter">1+</span>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] leading-tight">
                  Years of<br />Experience
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}