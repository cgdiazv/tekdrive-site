'use client';
import { useState } from 'react';

export default function ContactoPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <main className="min-h-screen bg-white pb-20" style={{ fontFamily: 'var(--font-roboto), sans-serif' }}>
      {/* Header Corporativo */}
      <div className="relative w-full h-[300px] bg-[#003853] flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 uppercase tracking-tight">Contáctenos</h1>
          <div className="w-20 h-1 bg-[#db5576] mx-auto mb-4"></div>
          <p className="text-white text-sm md:text-base uppercase tracking-[0.2em] font-light">Renta Seguridad y Confianza</p>
        </div>
      </div>

      {/* Sección del Formulario */}
      <div className="max-w-3xl mx-auto mt-16 px-6">
        <h2 className="text-[#003853] text-2xl font-bold text-center mb-8 uppercase tracking-tight">Envíenos Su Consulta</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              required
              className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#db5576]"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#db5576]"
            />
          </div>
          <textarea
            name="mensaje"
            placeholder="Mensaje"
            required
            rows={6}
            className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#db5576] resize-none"
          ></textarea>
          
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-[#db5576] hover:bg-[#c24a68] text-white font-bold py-3 px-6 rounded-md transition-colors uppercase tracking-widest disabled:opacity-50"
          >
            {status === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
          </button>

          {status === 'success' && (
            <p className="text-green-600 text-center font-semibold animate-fade-in">¡Mensaje enviado con éxito!</p>
          )}
          {status === 'error' && (
            <p className="text-red-600 text-center font-semibold">Hubo un error. Intente de nuevo.</p>
          )}
        </form>
      </div>
    </main>
  );
}