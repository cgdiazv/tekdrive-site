'use client';
import { useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Crear el usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Crear el perfil en Firestore
      // Usamos el UID de Auth para que ambos registros estén vinculados
      await setDoc(doc(db, "usuarios", user.uid), {
        uid: user.uid,
        nombre: nombre,
        email: email,
        rol: 'cliente',
        fechaRegistro: new Date().toISOString(),
        preferencias: {
          idioma: 'es',
          notificacionesEmail: true
        }
      });

      // El AuthContext detectará el cambio, creará la cookie y el middleware permitirá el acceso
      router.push('/cuenta');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Este correo electrónico ya está registrado.');
      } else {
        setError('Ocurrió un error al crear la cuenta. Inténtalo de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fb] flex items-center justify-center p-6" style={{ fontFamily: 'var(--font-roboto), sans-serif' }}>
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header con identidad Tekdrive */}
        <div className="bg-[#003853] p-8 text-center">
          <h2 className="text-white text-2xl font-bold uppercase tracking-tight">Crear Cuenta</h2>
          <p className="text-blue-100 text-[10px] mt-2 uppercase tracking-[0.2em] opacity-80">
            Forma parte de Tekdrive Rent a Car
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-100 font-bold text-center">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-[10px] font-black text-[#003853] uppercase mb-1 tracking-wider">Nombre Completo</label>
              <input 
                type="text" 
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#db5576] transition-all text-sm"
                placeholder="Ej: Juan López"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-[#003853] uppercase mb-1 tracking-wider">Correo Electrónico</label>
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
  <label className="block text-[10px] font-black text-[#003853] uppercase mb-1 tracking-wider">Contraseña</label>
  <div className="relative">
    <input 
      type={showPassword ? "text" : "password"} 
      required
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#db5576] transition-all text-sm pr-10"
      placeholder="••••••••"
      minLength={6}
    />
    <button 
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#db5576] transition-colors"
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>
</div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full bg-[#db5576] hover:bg-[#c24a68] text-white font-bold py-3 rounded-lg transition-all uppercase tracking-widest mt-4 text-xs shadow-md ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Procesando...' : 'Registrarme'}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-gray-50 pt-6">
            <p className="text-xs text-gray-400">
              ¿Ya tienes una cuenta?{' '}
              <Link href="/login" className="text-[#003853] font-bold hover:text-[#db5576] transition-colors underline underline-offset-4">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}