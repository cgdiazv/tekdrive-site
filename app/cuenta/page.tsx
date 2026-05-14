'use client';

import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link'; // Importamos Link para la navegación
import { User, Settings, Car, LogOut } from 'lucide-react';
// Importamos useAuth para obtener los datos reales del usuario
import { useAuth } from '@/context/AuthContext'; 

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  // Obtenemos el nombre del usuario o usamos uno por defecto mientras carga
  const userName = user?.displayName || "Carlos Diaz del Valle";

  const handleLogout = async () => {
    try {
      // 1. Cerrar sesión en Firebase
      await signOut(auth);
      
      // 2. Eliminar la cookie de sesión (CRÍTICO para el middleware)
      Cookies.remove('session', { path: '/' });
      
      // 3. Forzamos la redirección al login con una carga limpia
      window.location.href = '/login';
    
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fb] pb-20">
      <div className="max-w-4xl mx-auto pt-12 px-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Perfil Header */}
          <div className="p-8 bg-gray-50 border-b border-gray-100 flex items-center gap-6">
            <div className="w-20 h-20 bg-[#003853] rounded-full flex items-center justify-center text-white text-3xl font-bold uppercase">
              {userName.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#003853]">{userName}</h1>
              <p className="text-gray-500 text-sm">{user?.email || "Miembro de Tekdrive"}</p>
            </div>
          </div>

          {/* Menú de Cuenta */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            
            {/* Enlace a Mis Reservas */}
            <div className="p-4">
              <Link href="/cuenta/reservas" className="block group">
                <div className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-all text-left cursor-pointer">
                  <Car className="w-6 h-6 text-[#4882a1]" />
                  <div>
                    <p className="font-bold text-[#003853] uppercase text-xs tracking-wider">
                      Mis Reservas
                    </p>
                    <p className="text-gray-400 text-xs">
                      Historial y reservas activas
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="p-4">
              <Link href="/cuenta/editar" className="block group">
                <div className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-all text-left cursor-pointer">
                  <Settings className="w-6 h-6 text-[#4882a1]" />
                  <div>
                    <p className="font-bold text-[#003853] uppercase text-xs tracking-wider">
                      Configuración
                    </p>
                  <p className="text-gray-400 text-xs">
                    Editar datos y contraseña
                  </p>
                </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Botón de Logout Funcional */}
          <div className="p-8 bg-white border-t border-gray-100">
            <button 
              onClick={handleLogout}
              style={{ cursor: 'pointer' }} 
              className="flex items-center gap-2 text-red-500 font-bold uppercase text-xs hover:text-red-700 transition-all active:scale-95 cursor-pointer border-none bg-transparent"
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}