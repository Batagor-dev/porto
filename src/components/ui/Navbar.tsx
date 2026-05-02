"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Logika untuk mendeteksi scroll
  useEffect(() => {
    const handleScroll = () => {
      // Jika scroll lebih dari 50px, aktifkan background
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' }, // Sesuaikan dengan ID di page.tsx
    { name: 'About', href: '#about' },
    { name: 'Portofolio', href: '#portofolio' },
    { name: 'Concat', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] transition-all duration-500 ease-in-out py-4">
      <div 
        className={`max-w-6xl mx-auto flex items-center justify-between p-3 rounded-full transition-all duration-500 ${
          isScrolled 
          ? "" 
          : "bg-transparent px-4"
        }`}
      >
        
        {/* LOGO AREA */}
        <Link href="/" className="group flex items-center gap-1 font-black">
          <div className={`relative px-4 py-1.5 rounded-full rounded-bl-none shadow-md transform transition-all duration-300 ${
            isScrolled ? "bg-[#1a47ff] text-white" : "bg-white text-black"
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
                    className={`px-5 py-2 text-sm font-semibold transition-all duration-300 rounded-full hover:bg-[#c9e55e] hover:text-black ${
                        isScrolled ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md shadow-lg px-6 text-black" : "text-white"
                    }`}
                >
                    {link.name}
                </Link>
            ))}
        </div>

        {/* HIRE ME & HAMBURGER */}
        <div className="flex items-center gap-2">
            <a
                href="mailto:batagordev@gmail.com"
                className={`hidden sm:block px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                    isScrolled 
                    ? "bg-[#1a47ff] text-white border-transparent hover:bg-black" 
                    : "border-white/40 text-white hover:bg-white hover:text-black"
                }`}
            >
                Hire me
            </a>

            {/* HAMBURGER BUTTON */}
            <button 
                onClick={toggleMenu}
                className={`md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full border transition-all ${
                    isScrolled 
                    ? "bg-zinc-100 dark:bg-white/10 border-zinc-200 dark:border-white/20 text-black dark:text-white" 
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
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 backdrop-blur-xl rounded-3xl p-6 flex flex-col gap-4 shadow-2xl">
            {navLinks.map((link) => (
                <Link 
                    key={link.name}
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="text-zinc-900 dark:text-white text-lg font-bold py-2 border-b border-zinc-100 dark:border-white/5 hover:text-[#1a47ff]"
                >
                    {link.name}
                </Link>
            ))}
            <a
                href="mailto:batagordev@gmail.com"
                className="mt-4 bg-[#1a47ff] text-white text-center py-4 rounded-2xl font-bold uppercase tracking-wider"
            >
                Hire Me
            </a>
        </div>
      </div>
    </nav>
  );
}