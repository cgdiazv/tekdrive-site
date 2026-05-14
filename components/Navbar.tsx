import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav 
      className="w-full bg-white px-6 py-4 flex items-center justify-between shadow-sm"
      style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
    >
      {/* Logo Section */}
      <Link href="/" className="flex items-center">
        {/* Asegúrate de usar el nombre exacto de tu archivo en la carpeta public */}
        <Image 
          src="/logo.webp" 
          alt="Tekdrive Rent A Car Logo" 
          width={200} 
          height={60} 
          className="object-contain"
          priority
        />
      </Link>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center space-x-8">
        
        {/* Link: AUTOS */}
        <div className="group relative">
          <Link 
            href="/autos" 
            className="text-[#003853] font-semibold text-sm transition-colors duration-300 group-hover:text-[#db5576] tracking-wide"
          >
            AUTOS
          </Link>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#db5576] transition-all duration-300 group-hover:w-full"></span>
        </div>

        {/* Link: POLÍTICAS */}
        <div className="group relative">
          <Link 
            href="/politicas" 
            className="text-[#003853] font-semibold text-sm transition-colors duration-300 group-hover:text-[#db5576] tracking-wide"
          >
            POLÍTICAS
          </Link>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#db5576] transition-all duration-300 group-hover:w-full"></span>
        </div>

        {/* Link: PREGUNTAS FRECUENTES */}
        <div className="group relative">
          <Link 
            href="/preguntas" 
            className="text-[#003853] font-semibold text-sm transition-colors duration-300 group-hover:text-[#db5576] tracking-wide"
          >
            PREGUNTAS FRECUENTES
          </Link>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#db5576] transition-all duration-300 group-hover:w-full"></span>
        </div>

        {/* Link: CONTÁCTENOS */}
        <div className="group relative">
          <Link 
            href="/contacto" 
            className="text-[#003853] font-semibold text-sm transition-colors duration-300 group-hover:text-[#db5576] tracking-wide"
          >
            CONTÁCTENOS
          </Link>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#db5576] transition-all duration-300 group-hover:w-full"></span>
        </div>

      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button className="text-[#003853] hover:text-[#db5576] transition-colors focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}