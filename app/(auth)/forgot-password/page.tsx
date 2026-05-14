'use client';

import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import Link from 'next/link';
import { ArrowLeft, MailCheck } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Te hemos enviado un enlace a tu correo para restablecer tu contraseña.');
    } catch (err: any) {
      console.error("Error:", err.code);
      if (err.code === 'auth/user-not-found') {
        setError('No existe una cuenta con este correo electrónico.');
      } else {
        setError('Ocurrió un error. Por favor intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fb] flex items-center justify-center p-6" style={{ fontFamily: 'var(--font-roboto), sans-serif' }}>
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header Identidad Tekdrive */}
        <div className="bg-[#003853] p-8 text-center">
          <h2 className="text-white text-2xl font-bold uppercase tracking-tight">Recuperar Acceso</h2>
          <p className="text-blue-100 text-[10px] mt-2 uppercase tracking-[0.2em] opacity-80">
            Tekdrive Rent a Car
          </p>
        </div>

        <div className="p-8">
          {!message ? (
            <form onSubmit={handleReset} className="space-y-5">
              <p className="text-sm text-gray-500 leading-relaxed text-center">
                Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
              </p>

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
                  placeholder="tu-correo@ejemplo.com"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className={`w-full bg-[#db5576] hover:bg-[#c24a68] text-white font-bold py-3 rounded-lg transition-all uppercase tracking-widest mt-2 text-xs shadow-md ${
                  loading ? 'opacity-70 cursor-not-allowed' : 'active:scale-[0.98]'
                }`}
              >
                {loading ? 'Enviando...' : 'Enviar instrucciones'}
              </button>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                  <MailCheck size={32} />
                </div>
              </div>
              <h3 className="text-[#003853] font-bold mb-2 uppercase text-sm">¡Correo Enviado!</h3>
              <p className="text-xs text-gray-500 mb-6 px-4 leading-relaxed">
                {message}
              </p>
              <Link 
                href="/login" 
                className="inline-block bg-[#003853] text-white font-bold py-2 px-6 rounded-lg uppercase tracking-widest text-[10px]"
              >
                Volver al inicio
              </Link>
            </div>
          )}

          <div className="mt-8 text-center border-t border-gray-50 pt-6">
            <Link 
              href="/login" 
              className="inline-flex items-center text-xs text-gray-400 hover:text-[#003853] transition-colors gap-2"
            >
              <ArrowLeft size={14} />
              Volver al inicio de sesión
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}