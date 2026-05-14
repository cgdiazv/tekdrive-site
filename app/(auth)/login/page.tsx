'use client';

import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// Importamos los iconos para la visibilidad de la contraseña
import { Eye, EyeOff } from 'lucide-react';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Estado para controlar si se muestra la contraseña
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setLoading(true);
  
  try {
    // 1. Autenticar con Firebase
    await signInWithEmailAndPassword(auth, email, password);
    
    // 2. Forzamos la escritura de la cookie aquí también por si el Context tarda
    Cookies.set('session', 'true', { expires: 7, path: '/' });

    // 3. Pequeño respiro para que el navegador asiente la cookie
    // y el Middleware no nos rebote
    setTimeout(() => {
      window.location.href = '/cuenta'; 
      // Usar window.location.href en lugar de router.push 
      // fuerza una carga limpia que garantiza que el middleware lea la cookie nueva.
    }, 800);
    
  } catch (err: any) {
    setLoading(false);
    setError('Credenciales incorrectas.');
  }
};

  return (
    <main className="min-h-screen bg-[#f8f9fb] flex items-center justify-center p-6" style={{ fontFamily: 'var(--font-roboto), sans-serif' }}>
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header Identidad Tekdrive */}
        <div className="bg-[#003853] p-8 text-center">
          <h2 className="text-white text-2xl font-bold uppercase tracking-tight">Iniciar Sesión</h2>
          <p className="text-blue-100 text-[10px] mt-2 uppercase tracking-[0.2em] opacity-80">
            Bienvenido de nuevo a Tekdrive
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            
            {error && (
              <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-100 font-bold text-center">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-[10px] font-black text-[#003853] uppercase mb-1 tracking-wider">
                Correo Electrónico
              </label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#db5576] transition-all text-sm"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[10px] font-black text-[#003853] uppercase tracking-wider">
                  Contraseña
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-[10px] text-gray-400 hover:text-[#db5576] transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              
              {/* Contenedor relativo para el input y el icono */}
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#db5576] transition-all text-sm pr-10"
                  placeholder="••••••••"
                />
                {/* Botón para alternar visibilidad */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#db5576] transition-colors"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full bg-[#db5576] hover:bg-[#c24a68] text-white font-bold py-3 rounded-lg transition-all uppercase tracking-widest mt-4 text-xs shadow-md ${
                loading ? 'opacity-70 cursor-not-allowed' : 'active:scale-[0.98]'
              }`}
            >
              {loading ? 'Verificando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-gray-50 pt-6">
            <p className="text-xs text-gray-400">
              ¿Aún no tienes cuenta?{' '}
              <Link href="/register" className="text-[#003853] font-bold hover:text-[#db5576] transition-colors underline underline-offset-4">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}