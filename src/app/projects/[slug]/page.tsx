"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation"; // Ambil slug dari URL
import { useLanguage } from "@/context/LanguageContext";
import {
  FiArrowLeft,
  FiExternalLink,
  FiCalendar,
  FiTag,
  FiGithub,
  FiBox,
  FiCpu,
} from "react-icons/fi";

import Damy from '@/Assets/Images/damy/image.png'; // Fallback jika gambar error

// Cache to store fetched project details
const projectCache: Record<string, any> = {};

export default function ProjectDetailPage() {
  const { language, t } = useLanguage();
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<any>(() => {
    return slug ? projectCache[slug] : null;
  });
  const [loading, setLoading] = useState(() => {
    return slug ? !projectCache[slug] : true;
  });

  useEffect(() => {
    const fetchProjectDetail = async () => {
      if (!slug) return;
      
      // Jika sudah ada cache, set state dan matikan loading
      if (projectCache[slug]) {
        setProject(projectCache[slug]);
        setLoading(false);
      } else {
        setLoading(true);
      }

      try {
        const res = await fetch(`http://127.0.0.1:8000/api/projects/${slug}`);
        const result = await res.json();
        const projectData = result.data;
        setProject(projectData);
        projectCache[slug] = projectData;
      } catch (error) {
        console.error("Gagal mengambil detail project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetail();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center font-black text-zinc-400 animate-pulse">
      {t('loading')}
    </div>
  );

  if (!project) return (
    <div className="min-h-screen flex items-center justify-center font-black">
      {t('projectNotFound')}
    </div>
  );

  // Helper untuk URL Gambar
  const imageUrl = project.image 
    ? `http://127.0.0.1:8000/storage/${project.image}` 
    : Damy;

  const tech = Array.isArray(project.technology) ? project.technology : [];

  return (
    <main className="min-h-screen bg-white text-zinc-900 pb-20">
      <nav className="max-w-[1400px] mx-auto px-6 py-10">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 font-black text-2xl hover:text-[#1a47ff] transition-all"
        >
          <FiArrowLeft className="group-hover:-translate-x-2 transition-transform" /> 
          {t('back')}
        </Link>
      </nav>

      <section className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          <div className="lg:col-span-5 space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#c9e55e] text-black text-[10px] font-black rounded-md uppercase">
                  {project.type || "Enterprise"}
                </span>
                <span className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                  {t('projectCaseStudy')}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black leading-[0.85] uppercase tracking-tighter">
                {language === "en" ? (project.name_project_en || project.name_project_id) : project.name_project_id}
              </h1>

              <p className="text-zinc-600 text-lg md:text-xl leading-relaxed font-medium pt-4">
                {language === "en" ? (project.deskripsi_en || project.deskripsi_id) : project.deskripsi_id}
              </p>
            </motion.div>

            <div className="space-y-6">
              <h2 className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                <FiCpu className="text-[#1a47ff]" /> {t('technologies')}
              </h2>
              <div className="flex flex-wrap gap-2">
                {tech.map((item: string) => (
                  <span key={item} className="px-4 py-2 bg-zinc-100 border border-zinc-200 rounded-lg text-xs font-bold">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href={project.link_demo} target="_blank" className="flex-1 flex items-center justify-center gap-3 py-4 bg-[#1a47ff] text-white font-black rounded-xl hover:bg-blue-700 transition-all shadow-lg">
                {t('livePreview')} <FiExternalLink />
              </a>
              {project.link_github && (
                <a href={project.link_github} target="_blank" className="flex-1 flex items-center justify-center gap-3 py-4 bg-zinc-900 text-white font-black rounded-xl hover:bg-black transition-all">
                  {t('sourceCode')} <FiGithub />
                </a>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative aspect-video rounded-[2rem] overflow-hidden border-[4px] border-zinc-900 bg-zinc-100 group"
            >
                <Image
                    src={imageUrl}
                    alt={project.name_project_id}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized={true} // Karena kita fetch dari Localhost Laravel
                />
            </motion.div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="p-8 bg-zinc-50 border border-zinc-100 rounded-[1.5rem] flex items-start gap-5 hover:bg-white transition-colors">
                   <div className="p-3 bg-white rounded-xl shadow-sm border border-zinc-100">
                       <FiCalendar size={24} className="text-[#1a47ff]" />
                   </div>
                   <div>
                       <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{t('year')}</h4>
                       <p className="font-bold text-xl">{new Date(project.created_at).getFullYear()}</p>
                   </div>
                 </div>

                 <div className="p-8 bg-zinc-50 border border-zinc-100 rounded-[1.5rem] flex items-start gap-5 hover:bg-white transition-colors">
                   <div className="p-3 bg-white rounded-xl shadow-sm border border-zinc-100">
                       <FiTag size={24} className="text-[#1a47ff]" />
                   </div>
                   <div>
                       <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{t('platform')}</h4>
                       <p className="font-bold text-xl">Web Application</p>
                   </div>
                 </div>

                 <div className="sm:col-span-2 p-8 bg-zinc-900 text-white rounded-[1.5rem] flex items-center justify-between overflow-hidden relative group">
                   <div className="relative z-10">
                       <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">{t('role')}</h4>
                       <p className="font-bold text-2xl uppercase tracking-tight">{t('fullstackDev')}</p>
                   </div>
                   <FiBox size={80} className="absolute -right-4 -bottom-4 text-white/5 group-hover:text-white/10 group-hover:rotate-12 transition-all duration-500" />
                 </div>
             </div>
          </div>
        </div>
      </section>
    </main>
  );
}