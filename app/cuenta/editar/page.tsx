'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { updateProfile, updateEmail, updatePassword, deleteUser } from 'firebase/auth';
import { doc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ChevronLeft, Save, User, Mail, Lock, Trash2, AlertTriangle, CheckCircle, MapPin, Home, Globe, Hash } from 'lucide-react';
import Link from 'next/link';
import Cookies from 'js-cookie';

export default function EditarCuentaPage() {
  const { user } = useAuth();
  const router = useRouter();
  
  // Estados de los campos
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [estado, setEstado] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Cargar datos actuales desde Auth y Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        setNombre(user.displayName || '');
        setEmail(user.email || '');
        
        // Obtener datos extendidos de Firestore
        const userRef = doc(db, 'usuarios', user.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          const data = userSnap.data();
          setDireccion(data.direccion || '');
          setCiudad(data.ciudad || '');
          setEstado(data.estado || '');
          setCodigoPostal(data.codigoPostal || '');
        }
      }
    };
    fetchUserData();
  }, [user]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje({ tipo: '', texto: '' });

    try {
      if (!user) return;

      // 1. Actualizar Auth
      await updateProfile(user, { displayName: nombre });
      if (email !== user.email) await updateEmail(user, email);
      if (password.length > 0) {
        if (password.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres.');
        await updatePassword(user, password);
      }

      // 2. Actualizar Firestore (incluyendo los nuevos campos)
      const userRef = doc(db, 'usuarios', user.uid);
      await updateDoc(userRef, {
        nombre,
        email,
        direccion,
        ciudad,
        estado,
        codigoPostal,
        ultimaActualizacion: new Date()
      });

      setMensaje({ tipo: 'success', texto: '¡Perfil actualizado con éxito!' });
      setPassword('');
      
    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/requires-recent-login') {
        setMensaje({ tipo: 'error', texto: 'Acción sensible: por favor cierra sesión e ingresa de nuevo.' });
      } else {
        setMensaje({ tipo: 'error', texto: error.message || 'Error al actualizar.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'usuarios', user.uid));
      await deleteUser(user);
      Cookies.remove('session', { path: '/' });
      window.location.href = '/login';
    } catch (error: any) {
      setMensaje({ tipo: 'error', texto: 'Error de seguridad al eliminar cuenta.' });
      setShowDeleteConfirm(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fb] pb-20">
      <div className="max-w-2xl mx-auto pt-12 px-6">
        
        <Link href="/cuenta" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#003853] mb-8 transition-colors text-[10px] font-black uppercase tracking-widest cursor-pointer">
          <ChevronLeft size={14} /> Volver
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 bg-[#003853] text-white">
            <h1 className="text-2xl font-bold">Configuración de Cuenta</h1>
            <p className="text-blue-100 text-xs opacity-80 uppercase tracking-wider mt-1">Información personal y de contacto</p>
          </div>

          <form onSubmit={handleUpdate} className="p-8 space-y-6">
            {mensaje.texto && (
              <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-3 border ${
                mensaje.tipo === 'success' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
              }`}>
                {mensaje.tipo === 'success' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                {mensaje.texto}
              </div>
            )}

            {/* Datos Básicos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black text-[#003853] uppercase mb-2 tracking-wider">Nombre Completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#db5576] text-sm" />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-[10px] font-black text-[#003853] uppercase mb-2 tracking-wider">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#db5576] text-sm" />
                </div>
              </div>
            </div>

            {/* Dirección (No Requeridos) */}
            <div className="pt-6 border-t border-gray-50 space-y-4">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Información de Dirección (Opcional)</h3>
              
              <div>
                <label className="block text-[10px] font-black text-[#003853] uppercase mb-2 tracking-wider">Dirección de Residencia</label>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Calle, número, colonia..." className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#db5576] text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-[#003853] uppercase mb-2 tracking-wider">Ciudad</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#db5576] text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#003853] uppercase mb-2 tracking-wider">Depto/Estado</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#db5576] text-sm" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-[#003853] uppercase mb-2 tracking-wider">Código Postal</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input type="text" value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#db5576] text-sm" />
                </div>
              </div>
            </div>

            {/* Seguridad */}
            <div className="pt-6 border-t border-gray-50">
              <label className="block text-[10px] font-black text-[#003853] uppercase mb-2 tracking-wider">Cambiar Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Dejar en blanco para no cambiar" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#db5576] text-sm" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-[#003853] text-white font-bold py-4 rounded-xl transition-all uppercase tracking-widest text-xs shadow-md hover:bg-[#002a3f] cursor-pointer flex items-center justify-center gap-2">
              <Save size={16} /> {loading ? 'Procesando...' : 'Actualizar Perfil'}
            </button>
          </form>

          <div className="p-8 bg-red-50/50 border-t border-red-100 text-center">
            {!showDeleteConfirm ? (
              <button onClick={() => setShowDeleteConfirm(true)} className="text-red-500 text-[10px] font-black uppercase tracking-widest hover:text-red-700 cursor-pointer flex items-center justify-center gap-2 mx-auto">
                <Trash2 size={14} /> Eliminar Cuenta Permanente
              </button>
            ) : (
              <div className="space-y-4">
                <p className="text-red-600 font-bold text-xs">¿Estás seguro de eliminar tu acceso a Tekdrive?</p>
                <div className="flex justify-center gap-4">
                  <button onClick={() => setShowDeleteConfirm(false)} className="text-gray-500 text-[10px] font-black uppercase cursor-pointer">No, cancelar</button>
                  <button onClick={handleDeleteAccount} className="bg-red-600 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest cursor-pointer">Sí, eliminar</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}