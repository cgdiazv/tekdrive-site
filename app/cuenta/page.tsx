import { User, Settings, Car, LogOut } from 'lucide-react';

export default function ProfilePage() {
  // Aquí vendría la lógica para obtener los datos de Carlos Diaz
  const userName = "Carlos Diaz del Valle";

  return (
    <main className="min-h-screen bg-[#f8f9fb] pb-20">
      <div className="max-w-4xl mx-auto pt-12 px-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Perfil Header */}
          <div className="p-8 bg-gray-50 border-b border-gray-100 flex items-center gap-6">
            <div className="w-20 h-20 bg-[#003853] rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {userName.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#003853]">{userName}</h1>
              <p className="text-gray-500 text-sm">Miembro de Tekdrive</p>
            </div>
          </div>

          {/* Menú de Cuenta */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="p-4">
              <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-all group text-left">
                <Car className="w-6 h-6 text-[#4882a1]" />
                <div>
                  <p className="font-bold text-[#003853] uppercase text-xs">Mis Reservas</p>
                  <p className="text-gray-400 text-xs">Historial y reservas activas</p>
                </div>
              </button>
            </div>
            <div className="p-4">
              <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-all group text-left">
                <Settings className="w-6 h-6 text-[#4882a1]" />
                <div>
                  <p className="font-bold text-[#003853] uppercase text-xs">Configuración</p>
                  <p className="text-gray-400 text-xs">Editar datos y contraseña</p>
                </div>
              </button>
            </div>
          </div>

          <div className="p-8 bg-white border-t border-gray-100">
            <button className="flex items-center gap-2 text-red-500 font-bold uppercase text-xs hover:text-red-700 transition-all">
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}