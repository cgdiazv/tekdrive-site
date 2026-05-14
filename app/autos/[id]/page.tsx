'use client';

import { useState, useEffect, use } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { 
  ChevronRight, 
  Users, 
  Fuel, 
  Gauge, 
  Snowflake, 
  Info, 
  Briefcase 
} from 'lucide-react';
import Link from 'next/link'; 
import { useRouter } from 'next/navigation';
import { carsData } from '@/data/cars';

export default function ReservaAutoPage({ params }: { params: Promise<{ id: string }> }) {
  const { user } = useAuth();
  const router = useRouter();
  
  // Desenvolvemos los params para obtener el ID de forma segura en Next.js 15+
  const resolvedParams = use(params);
  const autoId = resolvedParams.id;

  // Buscamos el auto específico en nuestra data centralizada
  const autoSeleccionado = carsData.find(car => car.id.toString() === autoId);

  const [loading, setLoading] = useState(false);
  const [fechaRecogida, setFechaRecogida] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [diasTotales, setDiasTotales] = useState(0);
  const [total, setTotal] = useState(0);

  // Convertimos el precio de string (ej: "1,725") a número para cálculos
  const precioPorDia = autoSeleccionado 
    ? parseFloat(autoSeleccionado.price.replace(/,/g, '')) 
    : 0;

  const [datosCliente, setDatosCliente] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  });

  // Cálculo automático de días y total cuando cambian las fechas
  useEffect(() => {
    if (fechaRecogida && fechaEntrega) {
      const inicio = new Date(fechaRecogida);
      const fin = new Date(fechaEntrega);
      const diferencia = fin.getTime() - inicio.getTime();
      const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
      
      if (dias > 0) {
        setDiasTotales(dias);
        setTotal(dias * precioPorDia);
      } else {
        setDiasTotales(0);
        setTotal(0);
      }
    }
  }, [fechaRecogida, fechaEntrega, precioPorDia]);

  // Autocompletar datos si el usuario tiene sesión iniciada
  useEffect(() => {
    if (user) {
      const nombreCompleto = user.displayName?.split(' ') || ['', ''];
      setDatosCliente({
        nombre: nombreCompleto[0],
        apellido: nombreCompleto.slice(1).join(' '),
        email: user.email || '',
        telefono: '' 
      });
    }
  }, [user]);

  // Pantalla de error si el ID no coincide con ningún auto
  if (!autoSeleccionado) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fb]" style={{ fontFamily: 'var(--font-roboto), sans-serif' }}>
        <h2 className="text-[#003853] font-bold text-xl uppercase">Vehículo no encontrado</h2>
        <Link href="/autos" className="mt-4 bg-[#db5576] text-white px-6 py-2 rounded-full font-bold uppercase text-xs tracking-widest">
          Volver a la flota
        </Link>
      </div>
    );
  }

  const handleReserva = async (e: React.FormEvent) => {
    e.preventDefault();
    if (diasTotales <= 0) return alert("Por favor, selecciona un rango de fechas válido.");
    
    setLoading(true);
    try {
      const nuevaReserva = {
        autoId: autoSeleccionado.id,
        nombreAuto: autoSeleccionado.name,
        clienteId: user?.uid || 'invitado',
        ...datosCliente,
        fechaInicio: fechaRecogida,
        fechaFin: fechaEntrega,
        dias: diasTotales,
        total,
        estado: 'Pendiente',
        fechaCreacion: new Date()
      };

      await addDoc(collection(db, 'reservas'), nuevaReserva);
      alert('¡Reserva enviada con éxito! Nos comunicaremos contigo pronto.');
      router.push('/cuenta/reservas'); 
    } catch (error) {
      console.error("Error al procesar reserva:", error);
      alert("Hubo un problema al procesar tu reserva. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main 
      className="min-h-screen bg-[#f8f9fb] pb-20 pt-10 px-6"
      style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Navegación Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-gray-400 mb-8">
          <Link href="/" className="hover:text-[#003853]">Inicio</Link> 
          <ChevronRight size={12} />
          <Link href="/autos" className="hover:text-[#003853]">Autos</Link> 
          <ChevronRight size={12} />
          <span className="text-[#db5576]">{autoSeleccionado.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Columna Izquierda: Información del Vehículo */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="relative w-full h-64 mb-8">
                <img 
                  src={autoSeleccionado.image} 
                  alt={autoSeleccionado.name} 
                  className="w-full object-contain h-full" 
                />
              </div>
              
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h1 className="text-4xl font-black text-[#003853] uppercase tracking-tighter leading-none">
                    {autoSeleccionado.name}
                  </h1>
                  <p className="text-[#db5576] font-bold text-xl mt-2">
                    L.{autoSeleccionado.price} <span className="text-sm font-medium text-gray-400">/ Día</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="bg-gray-100 px-4 py-1.5 rounded-full text-[10px] font-black uppercase text-gray-500 tracking-widest">
                    Modelo {autoSeleccionado.year}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-gray-50 mt-6">
                <div className="flex items-center gap-2">
                  <Snowflake size={20} className="text-[#4882a1]"/> 
                  <span className="text-xs font-bold text-[#003853]">{autoSeleccionado.hasAC ? 'A/C' : 'No A/C'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gauge size={20} className="text-[#4882a1]"/> 
                  <span className="text-xs font-bold text-[#003853]">{autoSeleccionado.transmission}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={20} className="text-[#4882a1]"/> 
                  <span className="text-xs font-bold text-[#003853]">{autoSeleccionado.passengers} Pasajeros</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase size={20} className="text-[#4882a1]"/> 
                  <span className="text-xs font-bold text-[#003853]">{autoSeleccionado.bags} Maletas</span>
                </div>
              </div>

              <div className="mt-8 flex items-start gap-3 bg-blue-50/50 p-5 rounded-2xl text-[#003853] text-[11px] leading-relaxed border border-blue-100">
                <Info size={18} className="shrink-0 text-[#4882a1]" />
                <p>
                  <span className="font-bold uppercase block mb-1">Información Importante:</span>
                  El vehículo mostrado es para fines ilustrativos. Los modelos pueden variar ligeramente en color y año según la disponibilidad técnica en el momento de la entrega.
                </p>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario de Reserva */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden sticky top-10">
              <div className="bg-[#003853] p-6 text-white text-center">
                <h2 className="text-xl font-bold uppercase tracking-tight">Reservar Ahora</h2>
                <p className="text-blue-100 text-[10px] uppercase tracking-widest mt-1 opacity-80 font-medium">
                  Renta Seguridad y Confianza
                </p>
              </div>

              <form onSubmit={handleReserva} className="p-6 space-y-4">
                {/* Fechas de Alquiler */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#003853] uppercase tracking-widest">Periodo de Alquiler</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[9px] text-gray-400 uppercase font-bold mb-1 ml-1">Recogida</p>
                      <input 
                        type="date" 
                        required 
                        value={fechaRecogida} 
                        onChange={(e) => setFechaRecogida(e.target.value)} 
                        min={new Date().toISOString().split('T')[0]} 
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-[#db5576] transition-all" 
                      />
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-400 uppercase font-bold mb-1 ml-1">Entrega</p>
                      <input 
                        type="date" 
                        required 
                        value={fechaEntrega} 
                        onChange={(e) => setFechaEntrega(e.target.value)} 
                        min={fechaRecogida || new Date().toISOString().split('T')[0]} 
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-[#db5576] transition-all" 
                      />
                    </div>
                  </div>
                  {diasTotales > 0 && (
                    <div className="bg-gray-50 p-2 rounded-lg text-center mt-2 border border-gray-100">
                      <p className="text-[10px] text-[#4882a1] font-black uppercase italic">
                        {diasTotales} {diasTotales === 1 ? 'Día de alquiler' : 'Días de alquiler'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Datos del Cliente */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-[#003853] uppercase tracking-widest">Información de contacto</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder="Nombre" 
                      value={datosCliente.nombre} 
                      onChange={(e) => setDatosCliente({...datosCliente, nombre: e.target.value})} 
                      required 
                      className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#db5576]" 
                    />
                    <input 
                      type="text" 
                      placeholder="Apellido" 
                      value={datosCliente.apellido} 
                      onChange={(e) => setDatosCliente({...datosCliente, apellido: e.target.value})} 
                      required 
                      className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#db5576]" 
                    />
                  </div>
                  <input 
                    type="email" 
                    placeholder="Correo Electrónico" 
                    value={datosCliente.email} 
                    onChange={(e) => setDatosCliente({...datosCliente, email: e.target.value})} 
                    required 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#db5576]" 
                  />
                  <input 
                    type="tel" 
                    placeholder="Teléfono (WhatsApp)" 
                    value={datosCliente.telefono} 
                    onChange={(e) => setDatosCliente({...datosCliente, telefono: e.target.value})} 
                    required 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#db5576]" 
                  />
                </div>

                {!user && (
                  <div className="py-2 text-center">
                    <Link href="/login" className="text-[9px] text-[#db5576] font-black uppercase tracking-tighter hover:underline">
                      Inicia sesión para autocompletar tus datos
                    </Link>
                  </div>
                )}

                {/* Resumen de Pago y Botón */}
                <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase leading-none mb-1">Total Estimado</p>
                    <p className="text-2xl font-black text-[#003853]">
                      L.{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <button 
                    type="submit" 
                    disabled={loading} 
                    className="bg-[#db5576] text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-pink-200/50 hover:bg-[#c24a68] transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    {loading ? 'Procesando...' : 'Reservar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}