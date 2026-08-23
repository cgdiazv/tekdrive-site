'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { 
  Car, 
  Calendar, 
  Clock, 
  ChevronLeft, 
  AlertCircle, 
  ExternalLink,
  MapPin
} from 'lucide-react';
import Link from 'next/link';

// Definimos la interfaz para TypeScript según lo que guardamos en Autos/Id
interface Reserva {
  id: string;
  nombreAuto: string;
  fechaInicio: string;
  fechaFin: string;
  total: number;
  estado: string;
  dias: number;
}

export default function MisReservasPage() {
  const { user } = useAuth();
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservas = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Consultamos la colección 'reservas' filtrando por el UID del usuario logueado
        const qUid = query(collection(db, 'reservas'), where('clienteId', '==', user.uid));
        
        // También consultamos por email por si hizo reservas como "invitado" antes de registrarse
        const fetchPromises = [getDocs(qUid)];
        if (user.email) {
          const qEmail = query(collection(db, 'reservas'), where('email', '==', user.email));
          fetchPromises.push(getDocs(qEmail));
        }

        const snapshots = await Promise.all(fetchPromises);
        
        // Usamos un Map para evitar duplicados si una reserva coincide en uid y email
        const reservasMap = new Map();
        snapshots.forEach(snapshot => {
          snapshot.docs.forEach(doc => {
            reservasMap.set(doc.id, { id: doc.id, ...doc.data() });
          });
        });

        const listaReservas = Array.from(reservasMap.values()) as any[];

        // Ordenamos localmente por fecha de creación (más reciente primero)
        listaReservas.sort((a, b) => {
          const dateA = a.fechaCreacion?.toDate ? a.fechaCreacion.toDate() : new Date(a.fechaCreacion || 0);
          const dateB = b.fechaCreacion?.toDate ? b.fechaCreacion.toDate() : new Date(b.fechaCreacion || 0);
          return dateB.getTime() - dateA.getTime();
        });

        setReservas(listaReservas as Reserva[]);
      } catch (error) {
        console.error("Error al obtener reservas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, [user]);

  // Función para dar color al badge de estado
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmada': return 'bg-green-100 text-green-700 border-green-200';
      case 'pendiente': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelada': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fb] pb-20 pt-10 px-6" style={{ fontFamily: 'var(--font-roboto), sans-serif' }}>
      <div className="max-w-4xl mx-auto">
        
        <Link href="/cuenta" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#003853] mb-8 transition-colors text-[10px] font-black uppercase tracking-widest cursor-pointer">
          <ChevronLeft size={14} /> Volver a mi cuenta
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl font-black text-[#003853] uppercase tracking-tight">Mis Reservas</h1>
          <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">Historial de alquileres en Tekdrive</p>
          {user && (
            <p className="text-gray-300 text-[9px] uppercase tracking-widest mt-2 border border-gray-100 bg-white inline-block px-2 py-1 rounded">
              Depuración - Mi UID: {user.uid}
            </p>
          )}
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#db5576]"></div>
          </div>
        ) : reservas.length > 0 ? (
          <div className="space-y-4">
            {reservas.map((reserva) => (
              <div key={reserva.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-[#4882a1]">
                    <Car size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#003853] uppercase text-sm">{reserva.nombreAuto}</h3>
                    <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {reserva.fechaInicio}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {reserva.dias} días</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto border-t md:border-none pt-4 md:pt-0">
                  <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${getStatusStyle(reserva.estado)}`}>
                    {reserva.estado}
                  </div>
                  <p className="text-lg font-black text-[#003853] mt-1">L.{reserva.total.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200">
            <AlertCircle className="mx-auto text-gray-200 mb-4" size={48} />
            <h2 className="text-[#003853] font-bold uppercase text-sm">No tienes reservas activas</h2>
            <p className="text-gray-400 text-xs mt-2 mb-6">Parece que aún no has alquilado ningún vehículo con nosotros.</p>
            <Link href="/autos" className="bg-[#db5576] text-white px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest shadow-lg shadow-pink-100 hover:bg-[#c24a68] transition-all">
              Explorar Flota
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}