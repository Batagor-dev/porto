"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Logika untuk mendeteksi scroll background navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll Spy: Deteksi section aktif berdasarkan posisi scroll
  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('');
      return;
    }

    const handleScrollSpy = () => {
      const sectionIds = ['hero', 'about', 'porto', 'contact'];

      // Jika scroll mencapai bagian paling bawah halaman
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        setActiveSection('contact');
        return;
      }

      let currentActive = 'hero';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Jika batas atas section sudah melewati offset atas (200px) dan batas bawahnya belum lewat
          if (rect.top <= 200 && rect.bottom >= 200) {
            currentActive = id;
            break;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScrollSpy);
    handleScrollSpy(); // Jalankan sekali di awal

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [pathname]);

  const navLinks = [
    { name: t('navHome'), href: '/#hero', id: 'hero' },
    { name: t('navAbout'), href: '/#about', id: 'about' },
    { name: t('navPorto'), href: '/#porto', id: 'porto' },
    { name: t('navContact'), href: '/#contact', id: 'contact' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-0 w-full z-[100] transition-all duration-500 ease-in-out py-4">
      <div
        className={`max-w-6xl mx-auto flex items-center justify-between p-3 rounded-full transition-all duration-500 ${isScrolled
          ? ""
          : "bg-transparent px-4"
          }`}
      >

        {/* LOGO AREA */}
        <Link href="/" className="group flex items-center gap-1 font-black">
          <div className={`relative px-4 py-1.5 rounded-full rounded-bl-none shadow-md transform transition-all duration-300 ${isScrolled ? "bg-[#1a47ff] text-white" : "bg-white text-black"
            }`}>
            <span className="text-sm tracking-tighter uppercase">Batagor</span>
          </div>
          <div className="bg-[#c9e55e] text-black px-6 py-1.5 rounded-full shadow-md transform transition-transform group-hover:scale-105">
            <span className="text-sm tracking-tighter uppercase">Dev</span>
          </div>
        </Link>

        {/* DESKTOP MENU AREA */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleScroll(e, link.id)}
              className={`px-5 py-2 text-sm font-semibold transition-all duration-300 rounded-full hover:bg-[#c9e55e] hover:text-black ${activeSection === link.id
                ? "bg-[#c9e55e] text-black shadow-lg"
                : isScrolled
                  ? "bg-white/80 backdrop-blur-md shadow-lg px-6 text-black"
                  : "text-white"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* HIRE ME & HAMBURGER */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div
            className={`flex px-3 py-2 rounded-full border transition-all duration-300 ${isScrolled
              ? "bg-white shadow-lg border-black/20"
              : "bg-white/10 border-white/20"
              }`}
          >
            <button
              onClick={() => setLanguage('id')}
              className={`px-3 py-1 text-xs font-black rounded-full transition-all duration-300 ${language === 'id'
                ? 'bg-[#c9e55e] text-black shadow-sm'
                : isScrolled
                  ? 'text-zinc-600 hover:text-black'
                  : 'text-zinc-300 hover:text-white'
                }`}
            >
              ID
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-xs font-black rounded-full transition-all duration-300 ${language === 'en'
                ? 'bg-[#c9e55e] text-black shadow-sm'
                : isScrolled
                  ? 'text-zinc-600 hover:text-black'
                  : 'text-zinc-300 hover:text-white'
                }`}
            >
              EN
            </button>
          </div>

          <a
            href="mailto:batagordev@gmail.com"
            className={`hidden sm:block px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${isScrolled
              ? "bg-[#1a47ff] text-white border-transparent backdrop-blur-md shadow-lg hover:bg-black hover:shadow-lg"
              : "border-white/40 text-white hover:bg-white hover:text-black"
              }`}
          >
            {t('hireMe')}
          </a>

          {/* HAMBURGER BUTTON */}
          <button
            onClick={toggleMenu}
            className={`md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full border transition-all ${isScrolled
              ? "bg-zinc-100 dark:bg-white/10 border-zinc-200 text-black dark:text-white"
              : "bg-white/10 border-white/20 text-white"
              }`}
          >
            <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'}`}></span>
            <span className={`block w-5 h-0.5 bg-current transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'}`}></span>
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <div className={`md:hidden absolute top-24 left-4 right-4 transition-all duration-500 transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="bg-white border border-zinc-200 backdrop-blur-xl rounded-3xl p-6 flex flex-col gap-4 shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => {
                setIsOpen(false);
                handleScroll(e, link.id);
              }}
              className={`text-lg font-bold py-2 border-b transition-colors hover:text-[#1a47ff] ${activeSection === link.id
                ? "text-[#1a47ff] border-[#1a47ff]"
                : "text-zinc-900 border-zinc-100"
                }`}
            >
              {link.name}
            </Link>
          ))}
          {/* Mobile Language Switcher */}
          <div className="flex items-center justify-between mt-4 p-2 bg-zinc-100 rounded-2xl border border-zinc-200">
            <span className="text-sm font-bold text-zinc-600 px-2">Language</span>
            <div className="flex p-0.5 bg-zinc-200/50 rounded-full border border-zinc-300">
              <button
                onClick={() => setLanguage('id')}
                className={`px-3.5 py-1 text-xs font-black rounded-full transition-all ${language === 'id'
                  ? 'bg-[#c9e55e] text-black shadow-sm'
                  : 'text-zinc-500 hover:text-black'
                  }`}
              >
                ID
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3.5 py-1 text-xs font-black rounded-full transition-all ${language === 'en'
                  ? 'bg-[#c9e55e] text-black shadow-sm'
                  : 'text-zinc-500 hover:text-black'
                  }`}
              >
                EN
              </button>
            </div>
          </div>

          <a
            href="mailto:batagordev@gmail.com"
            className="mt-4 bg-[#1a47ff] text-white text-center py-4 rounded-2xl font-bold uppercase tracking-wider"
          >
            {t('hireMe')}
          </a>
        </div>
      </div>
    </nav>
  );
}