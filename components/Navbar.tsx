'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Simulación de estado de sesión (Integrar con tu Auth real después)
  const [isLoggedIn] = useState(false); 
  const cuentaPath = isLoggedIn ? "/cuenta" : "/login";

  return (
    <nav 
      className="w-full bg-white px-6 py-4 shadow-sm sticky top-0 z-50"
      style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo.webp" 
            alt="Tekdrive Rent A Car Logo" 
            width={180} 
            height={50} 
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {[
            { name: 'AUTOS', href: '/autos' },
            { name: 'POLÍTICAS', href: '/politicas' },
            { name: 'PREGUNTAS FRECUENTES', href: '/preguntas' },
            { name: 'CONTÁCTENOS', href: '/contacto' },
          ].map((link) => (
            <div key={link.name} className="group relative">
              <Link 
                href={link.href} 
                className="text-[#003853] font-semibold text-xs lg:text-sm transition-colors duration-300 group-hover:text-[#db5576] tracking-wide"
              >
                {link.name}
              </Link>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#db5576] transition-all duration-300 group-hover:w-full"></span>
            </div>
          ))}

          {/* Botón CUENTA - Desktop */}
          <Link 
            href={cuentaPath}
            className="flex items-center gap-2 bg-[#003853] text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-[#db5576] transition-all duration-300 shadow-sm"
          >
            <User className="w-4 h-4" />
            CUENTA
          </Link>
        </div>

        {/* Mobile: Actions (User Icon + Burger) */}
        <div className="md:hidden flex items-center gap-5">
          {/* Acceso rápido a cuenta en móvil */}
          <Link href={cuentaPath} className="text-[#003853] hover:text-[#db5576] transition-colors">
            <User className="w-6 h-6" />
          </Link>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#003853] hover:text-[#db5576] transition-colors focus:outline-none"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col p-6 space-y-4">
            <Link href="/autos" onClick={() => setIsOpen(false)} className="text-[#003853] font-bold text-sm uppercase border-b border-gray-50 pb-2">Autos</Link>
            <Link href="/politicas" onClick={() => setIsOpen(false)} className="text-[#003853] font-bold text-sm uppercase border-b border-gray-50 pb-2">Políticas</Link>
            <Link href="/preguntas" onClick={() => setIsOpen(false)} className="text-[#003853] font-bold text-sm uppercase border-b border-gray-50 pb-2">Preguntas Frecuentes</Link>
            <Link href="/contacto" onClick={() => setIsOpen(false)} className="text-[#003853] font-bold text-sm uppercase border-b border-gray-50 pb-2">Contáctenos</Link>
            
            {/* Botón CUENTA - Mobile */}
            <Link 
              href={cuentaPath}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-3 w-full bg-[#db5576] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-md"
            >
              <User className="w-5 h-5" />
              {isLoggedIn ? 'Mi Perfil' : 'Iniciar Sesión'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}