// src/app/layout.tsx
import Navbar from '@/components/ui/Navbar'; 
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="bg-white antialiased overflow-x-hidden">
        {/* Navbar tetap fixed di atas */}
        {/* <Navbar /> */}
        
        {/* Hapus pt-16 agar Hero Section bisa memenuhi layar dari paling atas */}
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}