import Image from "next/image";
import Link from "next/link";
import FeaturedCars from "@/components/FeaturedCars";
import { ShieldCheck, Tag, Truck, Settings } from 'lucide-react';

export default function Home() {
  return (
    <main 
      className="min-h-screen flex flex-col"
      style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
    >
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[80vh] flex items-center justify-center">
        {/* Background Image Container */}
        <div className="absolute inset-0 w-full h-full -z-10">
          <Image
            src="/header.webp"
            alt="Tekdrive Rent A Car Header"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[#003853]/60 mix-blend-multiply"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-start px-6 md:px-12 w-full max-w-screen-xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-md text-left">
            Tu viaje ideal comienza aquí
          </h1>
          
          <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-2xl drop-shadow text-left">
            Descubre nuestra amplia flota de vehículos y elige el ideal para tu próxima aventura o viaje de negocios. Seguro, rápido y confiable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/autos"
              className="bg-[#db5576] hover:bg-[#c24a68] text-white px-8 py-3 rounded-full font-semibold text-lg transition-colors shadow-lg flex items-center justify-center"
            >
              Reservar Ahora
            </Link>
            <Link
              href="/contacto"
              className="bg-white hover:bg-gray-100 text-[#003853] px-8 py-3 rounded-full font-semibold text-lg transition-colors shadow-lg flex items-center justify-center"
            >
              Contáctenos
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SECCIÓN DE AUTOS DESTACADOS */}
      <FeaturedCars />

      {/* 3. SECCIÓN DE TEXTO INFORMATIVO */}
      <section 
        className="w-full bg-[#f8f9fb] py-20 px-6 md:px-12"
        style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col gap-6 text-[#003853]">
            <h2 className="text-2xl md:text-3xl font-bold">
              Tekdrive Rent a Car en San Pedro Sula
            </h2>

            <div className="flex flex-col gap-6 text-gray-600 leading-relaxed text-sm md:text-base text-justify">
              <p>
                Tekdrive Renta a Car en San Pedro Sula, es una empresa independiente, si llegas a San Pedro Sula puedes rentar uno de nuestros autos y tener más comodidad que otros medios de transporte. ¡Ha llegado el momento de pensar en la renta de autos en San Pedro Sula! Tekdrive Rent a Car en San Pedro Sula es tu mejor opción para rentar un auto en San Pedro Sula, entre otras razones por lo reciente de nuestras unidades y nuestro servicio las 24 horas desde el aeropuerto de San Pedro Sula, también en nuestras oficinas, ya que contamos con atención las 24 horas. También contamos con atractivas promociones que siempre tenemos para la renta de autos en San Pedro Sula.
              </p>
              <p>
                Explora y recorre los atractivos turísticos más importantes de la zona a tu tiempo y ritmo, visita Puerto Cortes, Lago de Yojoa, Tela y diversos parques de la región, así como decenas de puntos atractivos, visita zonas arqueológicas como Copán y Gracias, entre otros. No te arrepentirás en lo más mínimo de haber optado por la renta de autos en San Pedro Sula con Tekdrive, ¡es lo más cómodo y seguro!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE BENEFICIOS (Iconos de Librería Profesional) */}
<section 
  className="w-full bg-[#f8f9fb] pb-20 px-6 md:px-12"
  style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
>
  <div className="max-w-screen-xl mx-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* Tarjeta 1: Servicio Confiable */}
      <div className="bg-[#003853] hover:bg-[#4882a1] p-10 flex flex-col items-center text-center justify-center rounded-2xl shadow-sm transition-all duration-300 cursor-default group">
        <ShieldCheck className="w-12 h-12 mb-4 text-white" strokeWidth={1.5} />
        <h3 className="text-white font-bold text-lg leading-tight uppercase tracking-wider">
          Servicio<br/>Confiable
        </h3>
      </div>

      {/* Tarjeta 2: Precios Competitivos */}
      <div className="bg-[#003853] hover:bg-[#4882a1] p-10 flex flex-col items-center text-center justify-center rounded-2xl shadow-sm transition-all duration-300 cursor-default group">
        <Tag className="w-12 h-12 mb-4 text-white" strokeWidth={1.5} />
        <h3 className="text-white font-bold text-lg leading-tight uppercase tracking-wider">
          Precios<br/>Competitivos
        </h3>
      </div>

      {/* Tarjeta 3: Servicio de Asistencia (Icono de Grúa/Remolque) */}
      <div className="bg-[#003853] hover:bg-[#4882a1] p-10 flex flex-col items-center text-center justify-center rounded-2xl shadow-sm transition-all duration-300 cursor-default group">
        <Truck className="w-12 h-12 mb-4 text-white" strokeWidth={1.5} />
        <h3 className="text-white font-bold text-lg leading-tight uppercase tracking-wider">
          Servicio de<br/>Asistencia
        </h3>
      </div>

      {/* Tarjeta 4: Mantenimiento Constante (Icono de Ajustes/Soporte) */}
      <div className="bg-[#003853] hover:bg-[#4882a1] p-10 flex flex-col items-center text-center justify-center rounded-2xl shadow-sm transition-all duration-300 cursor-default group">
        <Settings className="w-12 h-12 mb-4 text-white" strokeWidth={1.5} />
        <h3 className="text-white font-bold text-lg leading-tight uppercase tracking-wider">
          Mantenimiento<br/>Constante
        </h3>
      </div>

    </div>
  </div>
</section>

{/* SECCIÓN DE UBICACIÓN (Basada en image_d89962.jpg) */}
<section 
  className="w-full bg-white py-16 px-6 md:px-12"
  style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
>
  <div className="max-w-screen-xl mx-auto">
    
    {/* Encabezado */}
    <div className="mb-8 text-left">
      <h2 className="text-2xl md:text-3xl font-bold text-[#003853] mb-1">
        Nuestras Oficinas en San Pedro Sula
      </h2>
      <a 
        href="https://goo.gl/maps/TuLinkDeGoogleMapsAqui" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-[#4882a1] font-semibold text-sm hover:underline uppercase tracking-wide"
      >
        ¿CÓMO LLEGAR?
      </a>
    </div>

    {/* Contenedor del Mapa */}
    <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-md border border-gray-100">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3844.572457816047!2d-88.02856262413554!3d15.507563185135678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6643666579899d%3A0x7d00f73f8e535272!2s2%20Calle%2C%20San%20Pedro%20Sula!5e0!3m2!1ses-419!2shn!4v1715635000000!5m2!1ses-419!2shn"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>

  </div>
</section>
      
    </main>
  );
}