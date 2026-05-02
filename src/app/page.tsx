"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion'; 
import { SiLaravel, SiReact, SiNextdotjs, SiTailwindcss, SiInertia, SiPostgresql, SiGithub, SiLinkerd, SiWhatsapp } from 'react-icons/si';
import { FiArrowUpRight, FiCode, FiZap, FiGithub, FiExternalLink, FiMail } from 'react-icons/fi';
import { TiStarburst } from "react-icons/ti";
import AvatarCard from "@/components/Shared/AvatarCard";
import PortfolioCard from "@/components/Shared/PortofolioCard";
import ProfileCard from "@/components/Shared/ProfileCard";
import './globals.css';
import Avatar1 from '@/Assets/Images/Avatar/Avatar-1.png';
import Avatar2 from '@/Assets/Images/Avatar/Avatar-2.png';
import Profile from '@/Assets/Images/Profile/profile.jpeg';
import Damy from '@/Assets/Images/damy/image.png';
import Image from 'next/image';

export default function Home() {
  const gridRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRightRef = useRef<HTMLDivElement>(null);
  const cardLeftRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // --- STATE ---
  const [activeTab, setActiveTab] = useState('projects');
  const [visibleItems, setVisibleItems] = useState(6);

  // --- LOGIC ---
  useEffect(() => {
    setVisibleItems(6);
  }, [activeTab]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const scrollY = window.scrollY;
      const sectionHeight = sectionRef.current.offsetHeight;
      if (scrollY > sectionHeight) return;

      if (gridRef.current) gridRef.current.style.transform = `translateY(${scrollY * 0.2}px)`;
      if (textRef.current) textRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
      if (cardRightRef.current) cardRightRef.current.style.transform = `translateY(${scrollY * -0.35}px)`;
      if (cardLeftRef.current) cardLeftRef.current.style.transform = `translateY(${scrollY * -0.5}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- DATA ---
  const experiences = [
    {
      company: "PT Esto Kreasi Nusantara",
      role: "Full Stack Developer Intern",
      period: "Jan 2025 - Juni 2025",
      description: "Mengembangkan sistem manajemen internal perusahaan dengan fokus pada efisiensi alur kerja dan otomatisasi data.",
      achievements: ["Payroll System", "QR Attendance", "Auto-Letter Gen"]
    },
    {
      company: "Vocational High School 7 Baleendah",
      role: "Student / Web Developer",
      period: "2023 - 2026",
      description: "Mempelajari fundamental pemrograman web dan memenangkan kompetensi internal dalam pengembangan aplikasi.",
      achievements: ["BNSP Certified", "Project Leader"]
    }
  ];

  const techStack = [
    { name: "React 19", icon: <SiReact className="text-[#61DAFB]" />, level: "Advanced" },
    { name: "Next.js", icon: <SiNextdotjs className="text-white bg-black rounded-full" />, level: "Advanced" },
    { name: "Laravel", icon: <SiLaravel className="text-[#FF2D20]" />, level: "Intermediate" },
    { name: "Inertia.js", icon: <SiInertia className="text-[#9553E9]" />, level: "Advanced" },
    { name: "Tailwind", icon: <SiTailwindcss className="text-[#38BDF8]" />, level: "Expert" },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-[#336791]" />, level: "Basic" },
  ];

  const projects = [
    {
      title: "Digital Recruitment System",
      category: "Web Application",
      description: "Digitalisasi proses rekrutmen manual menjadi sistem otomatis berbasis web menggunakan Laravel.",
      tech: ["Laravel", "Tailwind", "MySQL"],
      link: "#",
      image: Damy,
    },
    {
      title: "Payroll & Attendance QR",
      category: "Internal System",
      description: "Sistem absensi QR Code dan pengelolaan penggajian otomatis di PT Esto Kreasi Nusantara.",
      tech: ["React", "Inertia.js", "Laravel"],
      link: "#",
      image: Damy,
    },
    {
      title: "Batagor Portfolio",
      category: "Personal Brand",
      description: "Portfolio modern dengan React 19, Framer Motion, dan desain bento-style yang interaktif.",
      tech: ["Next.js", "React 19", "Framer Motion"],
      link: "#",
      image: Damy,
    },
    // Tambahkan lebih banyak data di sini untuk mencoba Load More
  ];

  const certifications = [
    {
      title: "Junior Web Developer",
      issuer: "BNSP Indonesia",
      description: "Sertifikasi kompetensi nasional untuk pengembangan web standar industri.",
      date: "2026",
      certId: "LSP-INF-2026",
      link: "#",
      image: Damy,
    }
  ];

  const currentData = activeTab === 'projects' ? projects : certifications;

  return (
    <div className="flex flex-col w-full bg-white ">
      
      {/* SECTION 1: HERO */}
      <section ref={sectionRef} className="relative min-h-[200px] h-screen flex flex-col items-center justify-center bg-[#1a47ff] overflow-hidden p-4 md:p-10">
        <div ref={gridRef} className="absolute inset-0 z-0 opacity-20 will-change-transform" style={{ backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
        
        <div className="z-20 mb-2 md:mb-6 flex items-center gap-2 bg-black/20 backdrop-blur-md border border-white/10 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[8px] md:text-[10px] text-white font-bold uppercase tracking-[0.15em] shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 animate-blink"></span>
          </span>
          Available for Freelance
        </div>

        <div ref={textRef} className="relative flex flex-col items-center justify-center pointer-events-none select-none z-10 will-change-transform text-center">
          <h2 className="text-[13vw] md:text-[10vw] font-black text-[#c9e55e] leading-[0.85] uppercase text-shadow">Batagor</h2>
          <h2 className="text-[13vw] md:text-[10vw] font-black text-white leading-[0.85] uppercase outline-text">Full Stack</h2>
          <h2 className="text-[13vw] md:text-[10vw] font-black text-white leading-[0.85] uppercase text-shadow">Dev</h2>
        </div>

        <div className="absolute top-[18%] right-[4%] md:top-1/4 md:right-[8%] z-30 animate-bounce-slow">
          <div ref={cardRightRef} className="transform scale-[0.70] md:scale-110 origin-right">
            <AvatarCard name="Batagor" imageSrc={Avatar1} delay="-1.5s" className="rotate-6 shadow-2xl backdrop-blur-2xl border border-white/20" />
          </div>
        </div>

        <div className="absolute bottom-[18%] left-[4%] md:bottom-1/4 md:left-[8%] z-30 animate-bounce-slow-reverse">
          <div ref={cardLeftRef} className="transform scale-[0.70] md:scale-110 origin-left">
            <AvatarCard name="Web Dev" imageSrc={Avatar2} delay="0" className="-rotate-6 shadow-2xl backdrop-blur-2xl border border-white/20" />
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT */}
      <section
        id="about"
        className="relative z-40 py-24 bg-white px-6 md:px-20 rounded-t-[60px] md:rounded-t-[100px] shadow-[0_-30px_60px_-15px_rgba(0,0,0,0.1)] -mt-20"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <ProfileCard profileImage={Profile} />

          <div className="flex flex-col h-full pt-4 lg:pt-16">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-white text-black border border-[#c9e55e]/20 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                <span className="w-1.5 h-1.5 bg-[#c9e55e] rounded-full animate-pulse" />
                Available for New Projects
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white leading-[1.1] tracking-tight">
                Crafting digital <span className="text-[#1a47ff]">experiences</span> that matter.
              </h2>
              <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed">
                Specializing in building high-performance web applications with a focus on clean code and exceptional user experience using modern tech stacks.
              </p>
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="flex flex-wrap gap-2.5 max-w-[400px]">
                  {[
                    { name: "React", bg: "bg-[#00D8FF]", text: "text-zinc-900" },
                    { name: "Laravel", bg: "bg-[#FF2D20]", text: "text-white" },
                    { name: "Next.js", bg: "bg-zinc-100", text: "text-zinc-900" },
                    { name: "Tailwind", bg: "bg-[#38BDF8]", text: "text-zinc-900" },
                    { name: "PostgreSQL", bg: "bg-[#336791]", text: "text-white" },
                    { name: "Python", bg: "bg-[#FFD43B]", text: "text-zinc-900" },
                  ].map((skill) => (
                    <span key={skill.name} className={`${skill.bg} ${skill.text} px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-tight shadow-md border border-black/5 flex-shrink-0`}>
                      {skill.name}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                  <motion.div whileHover={{ y: -10, transition: { duration: 0.2 } }} className="bg-white p-8 rounded-[2.5rem] shadow-xl border-2 border-b-black dark:border-zinc-800 flex flex-col gap-2 relative z-10">
                    <span className="text-6xl font-black text-[#1a47ff] tracking-tighter">1+</span>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] leading-tight">
                      Years of<br />Experience
                    </span>
                    <div className="absolute -top-3 -right-3 bg-[#c9e55e] p-3.5 rounded-2xl rotate-12 border-2 border-black shadow-lg">
                      <FiArrowUpRight size={22} className="text-black" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: EXPERIENCE TIMELINE (NEW) */}
      {/* <section id="experience" className="py-24 bg-white dark:bg-zinc-950 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase">
              Career <span className="text-[#1a47ff]">Journey</span>
            </h2>
            <p className="text-zinc-500 mt-4 max-w-xl">Rekam jejak profesional dan kontribusi saya dalam industri teknologi.</p>
          </div>
          <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-4 md:ml-0 md:left-1/2 md:-translate-x-1/2">
            {experiences.map((exp, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className={`relative mb-12 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                <div className={`absolute top-0 w-4 h-4 bg-[#c9e55e] rounded-full border-4 border-white dark:border-zinc-950 z-10 ${index % 2 === 0 ? 'md:right-[-9px] right-auto -left-[9px]' : '-left-[9px]'}`} />
                <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <span className="text-[10px] font-bold text-[#1a47ff] uppercase tracking-widest">{exp.period}</span>
                  <h3 className="text-xl font-black text-zinc-900 dark:text-white mt-1">{exp.role}</h3>
                  <p className="text-[#8ba32d] font-bold text-sm mb-4">{exp.company}</p>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-4">{exp.description}</p>
                  <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    {exp.achievements.map((ach, i) => (
                      <span key={i} className="px-3 py-1 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-full text-[10px] font-medium">✨ {ach}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* SECTION 4: PORTFOLIO */}
      <section id="porto" className="py-24 bg-zinc-50 px-6 md:px-20 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
            <h2 className="text-6xl md:text-8xl font-black text-zinc-900  tracking-tighter uppercase flex items-center gap-4">
              P <span className="text-[#c9e55e] animate-spin-slow"><TiStarburst /></span> RTFOLIO
            </h2>
            <div className="flex p-1.5 bg-zinc-200/50 backdrop-blur-md rounded-2xl border border-zinc-300 w-fit">
              {['projects', 'certs'].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`relative px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab ? 'text-black' : 'text-zinc-500'}`}>
                  {activeTab === tab && <motion.div layoutId="activeTab" className="absolute inset-0 bg-[#c9e55e] rounded-xl shadow-lg" />}
                  <span className="relative z-10 uppercase">{tab}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col gap-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentData.slice(0, visibleItems).map((item, index) => (
                    <PortfolioCard key={`${activeTab}-${index}`} item={item as any} index={index} />
                  ))}
                </div>
                {currentData.length > visibleItems && (
                  <div className="flex justify-center">
                    <button onClick={() => setVisibleItems(prev => prev + 6)} className="px-10 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl font-bold transition-all hover:-translate-y-1">
                      LOAD MORE
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTION 5: TECH STACK GRID (NEW) */}
      {/* <section id="tech" className="py-24 bg-white dark:bg-zinc-950 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-1">
              <h2 className="text-7xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase leading-none">
                <h2>
                  Crafting <br /> 
                  <span className="text-[#c9e55e] bg-zinc-900 px-3 py-1 rounded-md">
                    Impactful Solutions
                  </span>
                </h2>
              </h2>
              <p className="text-zinc-500 mt-6 leading-relaxed">Fokus utama saya adalah membangun aplikasi web modern dengan performa tinggi.</p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
              {techStack.map((tech, i) => (
                <motion.div key={i} whileHover={{ y: -5 }} className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center gap-4 text-center group transition-all">
                  <div className="text-4xl group-hover:scale-110 transition-transform">{tech.icon}</div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white text-sm">{tech.name}</h4>
                    <span className="text-[9px] uppercase tracking-tighter text-zinc-400">{tech.level}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* SECTION 6: CONTACT (UPDATED) */}
      <section id="contact" className="py-32 bg-[#1a47ff] px-6 md:px-20 rounded-t-[60px] md:rounded-t-[100px] text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-5xl md:text-8xl font-black tracking-tighter mb-12 uppercase">
            Let's work <br /> <span className="outline-text-white">Together</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <FiMail />, label: "Email Me", detail: "batagordev@gmail.com", href: "mailto:batagordev@gmail.com" },
              { icon: <SiWhatsapp />, label: "WhatsApp", detail: "Fast Response", href: "https://wa.me/62xxxxxxxx" },
              { icon: <SiLinkerd />, label: "LinkedIn", detail: "Professional Profile", href: "https://linkedin.com/in/batagordev" }
            ].map((item, i) => (
              <a key={i} href={item.href} target="_blank" className="group p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-[2.5rem] flex flex-col items-center gap-4 hover:bg-[#c9e55e] transition-all duration-500">
                <div className="p-4 bg-white/20 rounded-2xl text-2xl group-hover:text-black">{item.icon}</div>
                <span className="font-bold group-hover:text-black">{item.label}</span>
                <p className="text-xs opacity-60 group-hover:text-black/60">{item.detail}</p>
              </a>
            ))}
          </div>
          <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm opacity-50">© 2026 Batagor Dev. All rights reserved.</p>
            <div className="flex gap-8 font-bold text-sm">
              <a href="#" className="hover:text-[#c9e55e] transition-colors">GitHub</a>
              <a href="#" className="hover:text-[#c9e55e] transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}