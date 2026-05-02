// src/components/AvatarCard.tsx
import Image, { StaticImageData } from "next/image";

interface AvatarCardProps {
  name: string;
  imageSrc: string | StaticImageData;
  className?: string;
  delay?: string; // Tambahkan prop delay opsional
}

export default function AvatarCard({ name, imageSrc, className, delay = "0s" }: AvatarCardProps) {
  return (
    <div 
      style={{ animationDelay: delay }} // Memberikan delay agar gerakan tidak seragam
      className={`group relative flex flex-col items-center p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] shadow-2xl transition-all duration-500 hover:bg-white/20 hover:scale-105 animate-floating ${className}`}
    >
      
      {/* Frame Lingkaran */}
      <div className="relative w-24 h-24 mb-4 rounded-full p-1">
        <div className="w-full h-full rounded-full overflow-hidden bg-slate-800 border-2 border-white">
          <Image 
            src={imageSrc} 
            alt={name}
            width={100}
            height={100}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Nama */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-white tracking-tight">
          {name}
        </h3>
      </div>

      {/* Dekorasi Glow */}
      <div className="absolute -z-10 inset-0 bg-[#c9e55e]/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
}