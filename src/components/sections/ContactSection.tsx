"use client";
import { motion } from 'framer-motion';
import { FiMail } from 'react-icons/fi';
import { SiWhatsapp, SiLinkerd } from 'react-icons/si';

export default function ContactSection() {
  return (
    <section id="contact" className="py-32 bg-[#1a47ff] px-6 md:px-20 rounded-t-[60px] md:rounded-t-[100px] text-white">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-5xl md:text-8xl font-black tracking-tighter mb-12 uppercase">
          Let's work <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Together</span>
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
        </div>
      </div>
    </section>
  );
}