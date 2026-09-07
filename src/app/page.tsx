"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { SiLaravel, SiReact, SiNextdotjs, SiTailwindcss, SiInertia, SiPostgresql, SiGithub, SiLinkerd, SiWhatsapp, SiPython } from 'react-icons/si';
import { FiArrowUpRight, FiCode, FiZap, FiGithub, FiExternalLink, FiMail } from 'react-icons/fi';
import { TiStarburst } from "react-icons/ti";
import AvatarCard from "@/components/Shared/AvatarCard";
import PortfolioCard from "@/components/Shared/PortofolioCard";
import ProfileCard from "@/components/Shared/ProfileCard";
import Navbar from "@/components/ui/Navbar";
import { useLanguage } from "@/context/LanguageContext";
import './globals.css';
import Avatar1 from '@/Assets/Images/Avatar/Avatar-1.png';
import Avatar2 from '@/Assets/Images/Avatar/Avatar-2.png';
import Profile from '@/Assets/Images/Profile/profile.jpeg';
import Damy from '@/Assets/Images/damy/image.png';
import { getProjects } from '@/services/projects';
import Image from 'next/image';

/* =========================
   ❌ DIHAPUS: fetchData global
   - ini ERROR karena pakai setState di luar component
   ========================= */


/* =========================
   ❌ DIHAPUS DUPLIKAT FETCH
   kamu punya 2 useEffect fetchData
   sekarang disatukan 1 saja
   ========================= */

export default function Home() {
  const { language, t } = useLanguage();

  const gridRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRightRef = useRef<HTMLDivElement>(null);
  const cardLeftRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const [activeTab, setActiveTab] = useState('projects');
  const [visibleItems, setVisibleItems] = useState(6);

  /* =========================
     FIX TYPE STATE (biar gak any kosong)
     ========================= */
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /* =========================
     SCROLL EFFECT (NO CHANGE)
     ========================= */
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

  /* =========================
     FETCH DATA FROM SUPABASE
     ========================= */
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getProjects()
      .then((data) => {
        if (isMounted) {
          setProjects(data);
        }
      })
      .catch((err) => {
        console.error("Error fetching projects from Supabase:", err);
        if (isMounted) {
          setProjects([]);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setVisibleItems(6);
  }, [activeTab]);

  /* =========================
     MAPPING PROJECT IMAGE & DATA FROM SUPABASE
     ========================= */
  const mappedProjects = projects.map((project) => ({
    title:
      language === "en"
        ? (project.name_project_en || project.name_project_id)
        : project.name_project_id,

    category: Array.isArray(project.technology)
      ? project.technology.join(", ")
      : (project.technology || ""),

    description:
      language === "en"
        ? (project.deskripsi_en || project.deskripsi_id)
        : project.deskripsi_id,

    tech: Array.isArray(project.technology) ? project.technology : [],

    image: project.image,

    slug: project.slug,

    link: `/projects/${project.slug}`,

    demo: project.link_demo,
  }));


  const currentData = activeTab === 'projects'
    ? mappedProjects
    : [];

  const title = language === 'id' ? 'PORTOFOLIO' : 'PORTFOLIO';

  const letterVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };


  const techStack = [
    {
      name: "React",
      icon: SiReact,
      bg: "bg-zinc-900",
      text: "text-[#00D8FF]",
    },
    {
      name: "Next.js",
      icon: SiNextdotjs,
      bg: "bg-zinc-100",
      text: "text-zinc-900",
    },
    {
      name: "Laravel",
      icon: SiLaravel,
      bg: "bg-[#FF2D20]",
      text: "text-white",
      level: "Intermediate",
    },
    {
      name: "Inertia.js",
      icon: SiInertia,
      bg: "bg-[#9553E9]",
      text: "text-white",
    },
    {
      name: "Tailwind",
      icon: SiTailwindcss,
      bg: "bg-white",
      text: "text-[#38BDF8]",
    },
    {
      name: "PostgreSQL",
      icon: SiPostgresql,
      bg: "bg-[#336791]",
      text: "text-white",
    },
    {
      name: "Python",
      icon: SiPython,
      bg: "bg-[#FFD43B]",
      text: "text-zinc-900",
    },
    {
      name: "GitHub",
      icon: SiGithub,
      bg: "bg-black",
      text: "text-white",
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2 // Memberikan jeda antar elemen (efek mengalir)
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col w-full bg-white">

        {/* SECTION 1: HERO */}
        <section ref={sectionRef} className="relative min-h-[200px] h-screen flex flex-col items-center justify-center bg-[#1a47ff] overflow-hidden p-4 md:p-10">
          {/* Grid Background dengan Fade In */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1.5 }}
            ref={gridRef}
            className="absolute inset-0 z-0 opacity-20"
            style={{ backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`, backgroundSize: '30px 30px' }}
          />

          {/* Container Utama untuk Stagger Effect */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="z-20 flex flex-col items-center"
          >
            {/* Badge Available */}
            <motion.div
              variants={fadeInUp}
              className="mb-2 md:mb-6 flex items-center gap-2 bg-black/20 backdrop-blur-md border border-white/10 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[8px] md:text-[10px] text-white font-bold uppercase tracking-[0.15em] shadow-lg"
            >
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 animate-pulse"></span>
              </span>
              {t('availableFreelance')}
            </motion.div>

            {/* Teks Utama (Batagor Full Stack Dev) */}
            <div ref={textRef} className="relative flex flex-col items-center justify-center pointer-events-none select-none text-center">
              <motion.h2 variants={fadeInUp} className="text-[13vw] md:text-[10vw] font-black text-[#c9e55e] leading-[0.85] uppercase">
                Batagor
              </motion.h2>
              <motion.h2 variants={fadeInUp} className="text-[13vw] md:text-[10vw] font-black text-white leading-[0.85] uppercase">
                Full Stack
              </motion.h2>
              <motion.h2 variants={fadeInUp} className="text-[13vw] md:text-[10vw] font-black text-white leading-[0.85] uppercase">
                Dev
              </motion.h2>
            </div>
          </motion.div>

          {/* Animasi Kartu Avatar (Kanan & Kiri) */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotate: 20 }}
            animate={{ opacity: 1, x: 0, rotate: 6 }}
            transition={{ delay: 0.8, duration: 1, type: "spring" }}
            className="absolute top-[18%] right-[4%] md:top-1/4 md:right-[8%] z-30"
          >
            <div ref={cardRightRef} className="transform scale-[0.70] md:scale-110 origin-right transition-transform duration-75">
              <AvatarCard name="Batagor" imageSrc={Avatar1} delay="-1.5s" className="shadow-2xl backdrop-blur-2xl border border-white/20" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50, rotate: -20 }}
            animate={{ opacity: 1, x: 0, rotate: -6 }}
            transition={{ delay: 1, duration: 1, type: "spring" }}
            className="absolute bottom-[18%] left-[4%] md:bottom-1/4 md:left-[8%] z-30"
          >
            <div ref={cardLeftRef} className="transform scale-[0.70] md:scale-110 origin-left transition-transform duration-75">
              <AvatarCard name="Web Dev" imageSrc={Avatar2} delay="0" className="shadow-2xl backdrop-blur-2xl border border-white/20" />
            </div>
          </motion.div>
        </section>

        {/* SECTION 2: ABOUT */}
        <section id="about" className="relative z-40 py-24 bg-white px-6 md:px-20 rounded-t-[60px] md:rounded-t-[100px] shadow-[0_-30px_60px_-15px_rgba(0,0,0,0.1)] -mt-20">
          <motion.div
            className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }} // Animasi hanya jalan sekali saat terlihat
          >

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <ProfileCard profileImage={Profile} />
        </motion.div>

            {/* Kolom Kanan: Teks & Info */}
            <div className="flex flex-col h-full pt-4 lg:pt-16">
              <div className="space-y-8">
                {/* Badge */}
                <motion.div variants={containerVariants} className="inline-flex items-center gap-2 bg-white text-black border border-[#c9e55e]/20 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  <span className="w-1.5 h-1.5 bg-[#c9e55e] rounded-full animate-pulse" />
                  {t('availableNewProjects')}
                </motion.div>

                {/* Heading */}
                <motion.h2 variants={containerVariants} className="text-3xl md:text-5xl font-bold text-zinc-900 leading-[1.1] tracking-tight">
                  {t('aboutHeading1')}<span className="text-[#1a47ff]">{t('aboutHeadingHighlight')}</span>{t('aboutHeading2')}
                </motion.h2>

                {/* Deskripsi */}
                <motion.p variants={containerVariants} className="text-base md:text-lg text-zinc-500 max-w-md leading-relaxed">
                  {t('aboutDesc')}
                </motion.p>

                <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">
    
                  {/* Tech Stack Icons */}
                  <motion.div
                    variants={containerVariants}
                    className="
                      flex flex-wrap
                      justify-center lg:justify-start
                      gap-3
                      w-full
                      lg:max-w-[420px]
                    "
                  >
                    {techStack.map((tech) => {
                      const Icon = tech.icon;

                      return (
                        <motion.div
                          key={tech.name}
                          whileHover={{ scale: 1.08 }}
                          className={`
                            flex items-center gap-2 md:gap-3
                            px-3 md:px-4
                            py-2
                            rounded-full
                            ${tech.bg}
                            ${tech.text}
                            shadow-sm
                            transition-all
                          `}
                        >
                          <Icon className="text-[16px] md:text-[18px]" />

                          <span className="text-[10px] md:text-xs font-bold">
                            {tech.name}
                          </span>
                        </motion.div>
                      );
                    })}
                  </motion.div>

                  {/* Experience Card */}
                  <motion.div
                    variants={containerVariants}
                    whileHover={{ y: -10, rotate: 2 }}
                    className="
                      bg-white

                      w-full
                      sm:w-fit

                      mx-auto
                      lg:mx-0

                      p-5 md:p-6 lg:p-8

                      rounded-[2rem]
                      md:rounded-[2.5rem]

                      shadow-xl
                      border-2 border-b-black

                      flex flex-col

                      items-center
                      lg:items-start

                      text-center
                      lg:text-left

                      gap-1 md:gap-2

                      relative z-10
                    "
                  >
                    <span className="
                      text-4xl
                      md:text-5xl
                      lg:text-6xl
                      font-black
                      text-[#1a47ff]
                      tracking-tighter
                    ">
                      1+
                    </span>

                    <span
                      className="
                        text-[8px]
                        md:text-[9px]
                        lg:text-[10px]

                        font-bold
                        text-zinc-400
                        uppercase

                        tracking-[0.15em]
                        md:tracking-[0.2em]

                        leading-tight
                        whitespace-pre-line
                      "
                    >
                      {t('yearsOf')}
                      <br />
                      {t('experience')}
                    </span>
                  </motion.div>

                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 4: PORTFOLIO */}
        <section id="porto" className="py-20 bg-white px-6 md:px-20 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="
                  text-5xl
                  sm:text-6xl
                  md:text-7xl
                  lg:text-8xl

                  font-black
                  text-zinc-900

                  tracking-[-0.08em]
                  sm:tracking-tighter

                  uppercase

                  flex items-center justify-center lg:justify-start
                  flex-wrap

                  gap-2 sm:gap-3 md:gap-4

                  leading-none
                  text-center lg:text-left
                "
              >
                {/* Huruf P */}
                <motion.span
                  custom={0}
                  variants={letterVariants}
                  className="inline-block"
                >
                  P
                </motion.span>

                {/* Bintang sebagai O */}
                <motion.span
                  custom={1}
                  variants={letterVariants}
                  className="
                    text-[#c9e55e]
                    animate-spin-slow

                    text-4xl
                    sm:text-5xl
                    md:text-6xl

                    shrink-0
                    inline-flex
                  "
                >
                  <TiStarburst />
                </motion.span>

                {/* Sisa text */}
                {(language === 'id' ? 'RTOFOLIO' : 'RTFOLIO')
                  .split('')
                  .map((letter, index) => (
                    <motion.span
                      key={index}
                      custom={index + 2}
                      variants={letterVariants}
                      className="inline-block"
                    >
                      {letter}
                    </motion.span>
                  ))}
              </motion.h2>
              <div className="flex justify-center lg:justify-start">
                <div className="flex p-1.5 bg-zinc-200/50 backdrop-blur-md rounded-2xl border border-zinc-300 w-fit">
                  {['projects', 'certs'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`
                        relative
                        px-5 md:px-6
                        py-2.5 md:py-3
                        rounded-xl
                        text-xs md:text-sm
                        font-bold
                        transition-all
                        ${activeTab === tab ? 'text-black' : 'text-zinc-500'}
                      `}
                    >
                      {activeTab === tab && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-[#c9e55e] rounded-xl shadow-lg"
                        />
                      )}

                      <span className="relative z-10 uppercase">
                        {tab === 'projects'
                          ? t('projectsTab')
                          : t('certsTab')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {!isLoading && currentData.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-60 text-center">
                <h3 className="text-xl md:text-2xl font-black text-zinc-800 tracking-tight">
                  {t('noDataTitle')}
                </h3>
                <p className="text-sm text-zinc-500 mt-2 max-w-md">
                  {t('noDataDesc')}
                </p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col gap-12"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentData.slice(0, visibleItems).map((item, index) => (
                      <PortfolioCard
                        key={`${activeTab}-${index}`}
                        item={item as any}
                        index={index}
                        loading={isLoading}
                        t={t}
                      />
                    ))}
                  </div>

                  {currentData.length > visibleItems && (
                    <div className="flex justify-center">
                      <button
                        onClick={() => setVisibleItems((prev) => prev + 6)}
                        className="px-10 py-4 bg-zinc-900 text-white rounded-2xl font-bold transition-all hover:-translate-y-1"
                      >
                        {t('loadMore')}
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </section>

        {/* SECTION 6: CONTACT */}
        <section id="contact" className="py-32 bg-[#1a47ff] px-6 md:px-20 rounded-t-[60px] md:rounded-t-[100px] text-white">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-5xl md:text-8xl font-black tracking-tighter mb-12 uppercase">
              {t('contactHeading')} <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>{t('contactHighlight')}</span>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: <FiMail />, label: t('emailMe'), detail: "farelhasdika@gmail.com", href: "mailto:farelhasdika@gmail.com?subject=Halo%20Farel" },
                { icon: <SiWhatsapp />, label: t('waLabel'), detail: t('waDetail'), href: "https://wa.me/6281313254902" },
                { icon: <SiLinkerd />, label: t('linkedinLabel'), detail: t('linkedinDetail'), href: "https://linkedin.com/in/batagordev" }
              ].map((item, i) => (
                <a 
                  key={i} 
                  href={item.href} 
                  // 👇 JIKA href mengandung 'mailto:', jangan gunakan '_blank'
                  target={item.href.startsWith('mailto:') ? undefined : '_blank'} 
                  rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'} // Tambahan keamanan untuk link luar
                  className="group p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-[2.5rem] flex flex-col items-center gap-4 hover:bg-[#c9e55e] transition-all duration-500"
                >
                  <div className="p-4 bg-white/20 rounded-2xl text-2xl group-hover:text-black">{item.icon}</div>
                  <span className="font-bold group-hover:text-black">{item.label}</span>
                  <p className="text-xs opacity-60 group-hover:text-black/60">{item.detail}</p>
                </a>
              ))}
            </div>
            <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-sm opacity-50">
                © {new Date().getFullYear()} Batagor Dev. {t('rightsReserved')}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}