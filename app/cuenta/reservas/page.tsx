'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Car, Calendar, MapPin, ChevronLeft, Clock } from 'lucide-react';

// Interfaz para definir la estructura de una reserva
interface Reserva {
  id: string;
  auto: string;
  modelo: string;
  fechaInicio: string;
  fechaFin: string;
  estado: 'Activa' | 'Completada' | 'Pendiente';
  precioTotal: number;
}

export default function MisReservasPage() {
  // Simulación de datos (En el futuro esto vendrá de Firestore)
  const [reservas, setReservas] = useState<Reserva[]>([
    {
      id: 'TK-8821',
      auto: 'Toyota Hilux',
      modelo: '2024 - 4x4 Diésel',
      fechaInicio: '20 May 2026',
      fechaFin: '25 May 2026',
      estado: 'Pendiente',
      precioTotal: 450.00
    }
  ]);

  return (
    <main className="min-h-screen bg-[#f8f9fb] pb-20">
      <div className="max-w-4xl mx-auto pt-12 px-6">
        
        {/* Botón Volver */}
        <Link 
          href="/cuenta" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#003853] mb-6 transition-colors text-sm font-medium"
        >
          <ChevronLeft size={16} />
          Volver a mi cuenta
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[#003853]">Mis Reservas</h1>
          <p className="text-gray-500">Gestiona tus alquileres de vehículos en Tekdrive</p>
        </header>

        {reservas.length === 0 ? (
          /* Estado Vacío */
          <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Car size={32} />
            </div>
            <h3 className="text-[#003853] font-bold text-lg mb-2">No tienes reservas aún</h3>
            <p className="text-gray-500 mb-6 max-w-xs mx-auto text-sm">
              Cuando alquiles un vehículo con nosotros, aparecerá en esta sección.
            </p>
            <Link 
              href="/flota" 
              className="inline-block bg-[#db5576] text-white font-bold py-3 px-8 rounded-lg uppercase tracking-widest text-xs shadow-md hover:bg-[#c24a68] transition-all"
            >
              Explorar Flota
            </Link>
          </div>
        ) : (
          /* Listado de Reservas */
          <div className="space-y-4">
            {reservas.map((reserva) => (
              <div 
                key={reserva.id} 
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#003853] p-3 rounded-xl text-white">
                        <Car size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#003853] text-lg">{reserva.auto}</h3>
                        <p className="text-gray-400 text-xs uppercase tracking-wider font-medium">{reserva.modelo}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                      reserva.estado === 'Activa' ? 'bg-green-100 text-green-700' : 
                      reserva.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {reserva.estado}
                    </span>
                  </div>

                  <hr className="border-gray-50 mb-4" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Calendar size={18} className="text-[#4882a1]" />
                      <div className="text-xs">
                        <p className="text-gray-400 uppercase font-bold text-[9px]">Periodo</p>
                        <p className="font-medium">{reserva.fechaInicio} - {reserva.fechaFin}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Clock size={18} className="text-[#4882a1]" />
                      <div className="text-xs">
                        <p className="text-gray-400 uppercase font-bold text-[9px]">ID de Reserva</p>
                        <p className="font-medium">#{reserva.id}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl flex justify-between items-center">
                    <div>
                      <p className="text-[9px] text-gray-400 uppercase font-bold">Total Pagado</p>
                      <p className="text-[#003853] font-black text-xl">${reserva.precioTotal.toFixed(2)}</p>
                    </div>
                    <button className="text-[#db5576] font-bold text-xs uppercase hover:underline cursor-pointer">
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}