import Image from 'next/image';
import Link from 'next/link';
import { carsData } from '@/data/cars';
import { 
  Users, 
  Gauge, 
  Briefcase, 
  Snowflake, 
  Calendar, 
  Palette, 
  Phone, 
  MessageCircle, 
  Clock 
} from 'lucide-react';

export default function AutosPage() {
  return (
    <main 
      className="min-h-screen bg-[#f8f9fb] pb-20"
      style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
    >
      {/* Header de la Página */}
      <div className="relative w-full h-[300px] bg-[#003853] flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 uppercase">
            Nuestros Autos
          </h1>
          <div className="w-20 h-1 bg-[#db5576] mx-auto mb-4"></div>
          <p className="text-white text-sm md:text-base uppercase tracking-[0.2em] font-light">
            Renta Seguridad y Confianza
          </p>
        </div>
      </div>

      {/* Contenedor Principal con Grid para Sidebar */}
      <div className="max-w-screen-xl mx-auto mt-12 px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Lado Izquierdo: Lista de Autos (2 columnas) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="mb-4 border-l-4 border-[#003853] pl-4">
            <h2 className="text-[#003853] text-xl font-bold uppercase tracking-tight">
              Flota Disponible
            </h2>
            <p className="text-[#003853] text-xs uppercase tracking-wider opacity-70">
              San Pedro Sula, Honduras
            </p>
          </div>

          {carsData.map((car) => (
            <div 
              key={car.id} 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row p-4 transition-all hover:shadow-md"
            >
              {/* Imagen del Auto */}
              <div className="relative w-full md:w-2/5 h-48 md:h-auto min-h-[180px]">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-contain p-2"
                />
              </div>

              {/* Información y Detalles */}
              <div className="flex-1 px-4 py-2 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-100">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800 uppercase">
                    {car.name}
                  </h3>
                  <p className="text-[#db5576] font-bold text-lg">
                    Desde L.{car.price} / Día
                  </p>
                </div>

                {/* Grid de Especificaciones */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 border-t border-gray-50 pt-4">
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Snowflake className="w-4 h-4 text-[#4882a1]" />
                    <span>{car.hasAC ? 'A/C' : 'Sin A/C'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Calendar className="w-4 h-4 text-[#4882a1]" />
                    <span>{car.year}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Users className="w-4 h-4 text-[#4882a1]" />
                    <span>{car.passengers} Pasajeros</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Palette className="w-4 h-4 text-[#4882a1]" />
                    <span>Color: {car.color}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Gauge className="w-4 h-4 text-[#4882a1]" />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Briefcase className="w-4 h-4 text-[#4882a1]" />
                    <span>{car.bags} Maletas</span>
                  </div>
                </div>

                {/* Botón de Acción */}
                <div className="mt-6 flex justify-end">
                  <Link
                    href={`/reservar/${car.id}`}
                    className="bg-[#db5576] hover:bg-[#c24a68] text-white px-10 py-2.5 rounded-full font-bold text-sm transition-colors uppercase tracking-widest"
                  >
                    Reservar
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lado Derecho: Panel de Ayuda (1 columna) */}
        <aside className="flex flex-col gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h3 className="text-[#003853] text-xl font-bold mb-2 uppercase tracking-tight">
              ¿Necesitas Ayuda?
            </h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Nuestro equipo está disponible para asistirte con tu reservación o cualquier consulta sobre nuestra flota.
            </p>

            <div className="space-y-4">
              {/* WhatsApp */}
              <a 
                href="https://wa.me/50496732842" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 transition-colors group"
              >
                <div className="bg-green-500 p-2 rounded-lg text-white">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold opacity-70 leading-none mb-1">WhatsApp</p>
                  <p className="font-bold text-sm">+504 9673-2842</p>
                </div>
              </a>

              {/* Teléfono */}
              <a 
                href="tel:+50496732842" 
                className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 text-[#003853] hover:bg-blue-100 transition-colors"
              >
                <div className="bg-[#003853] p-2 rounded-lg text-white">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold opacity-70 leading-none mb-1">Llámanos</p>
                  <p className="font-bold text-sm">+504 9673-2842</p>
                </div>
              </a>

              {/* Horario */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 text-gray-600 border border-gray-100">
                <div className="bg-gray-400 p-2 rounded-lg text-white">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold opacity-70 leading-none mb-1">Aeropuerto</p>
                  <p className="font-bold text-sm tracking-tight">Atención 24 Horas</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center italic">
                Tekdrive: Renta Seguridad y Confianza en San Pedro Sula.
              </p>
            </div>
          </div>
        </aside>

      </div>
    </main>
  );
}