'use client';

import { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import TermsModal from '@/components/TermsModal';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore'; 
import { storage, db } from '@/lib/firebase'; 
import { 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  Camera, 
  Trash2, 
  FileText, 
  ArrowRight,
  User,
  Briefcase,
  Home,
  CalendarDays,
  ShieldCheck,
  PenTool,
  UploadCloud
} from 'lucide-react';

const initialFormData = {
  firstName: '', 
  lastName: '', 
  idNumber: '', 
  birthDate: '', 
  licenseNumber: '', 
  licenseExpiry: '', 
  email: '', 
  phone: '', 
  address: '', 
  referencePoint: '', 
  city: '', 
  state: '', 
  zipCode: '', 
  country: 'Honduras',
  workCompany: '', 
  workPosition: '', 
  workEmail: '', 
  workPhone: '', 
  workAddress1: '', 
  workAddress2: '', 
  workCity: '', 
  workState: '', 
  workZipCode: '',
  stayAddress1: '', 
  stayAddress2: '', 
  stayCity: '', 
  stayState: '', 
  stayZipCode: '',
  pickupDate: '', 
  pickupTime: '', 
  returnDate: '', 
  returnTime: '', 
  vehicleType: ''
};

export default function RentarAutoPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState(initialFormData);

  // Estado multimedia
  const [licenseImg, setLicenseImg] = useState<string>('');
  const [idImg, setIdImg] = useState<string>('');
  const [selfieImg, setSelfieImg] = useState<string>('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  // Estados de proceso
  const [loadingFile, setLoadingFile] = useState<{ [key: string]: boolean }>({});
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Referencias para firma y cámara
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const isDrawing = useRef(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const uploadToFirebase = async (file: File, pathKey: string, setUrl: (url: string) => void) => {
    setLoadingFile(prev => ({ ...prev, [pathKey]: true }));
    try {
      const storageRef = ref(storage, `rentals/${Date.now()}_${pathKey}_${file.name}`);
      const metadata = {
        contentType: file.type,
        customMetadata: {
          uploadedBy: user?.uid || 'anonymous'
        }
      };

      const snapshot = await uploadBytes(storageRef, file, metadata);
      const url = await getDownloadURL(snapshot.ref);
      setUrl(url);
    } catch (err: any) {
      console.warn("Storage upload warning, fallback to base64 data URL:", err);
      // Fallback transparente a DataURL
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setLoadingFile(prev => ({ ...prev, [pathKey]: false }));
    }
  };

  const startCamera = async () => {
    setCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } } 
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.error(err);
      alert("No se pudo acceder a la cámara frontal. Por favor, asegúrese de otorgar los permisos en su navegador.");
      setCameraActive(false);
    }
  };

  const captureSelfie = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setSelfieImg(dataUrl);
      
      const stream = videoRef.current.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
      setCameraActive(false);
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    draw(e);
  };

  const stopDrawing = () => { 
    isDrawing.current = false; 
    canvasRef.current?.getContext('2d')?.beginPath(); 
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#003853';

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const clearSignature = () => {
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.clearRect(0, 0, canvasRef.current?.width || 0, canvasRef.current?.height || 0);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!termsAccepted) { 
      alert("Debe aceptar los Términos y Condiciones de renta de vehículos para continuar."); 
      return; 
    }
    
    if (!licenseImg || !idImg || !selfieImg) {
      alert("Por favor asegúrese de cargar todos los documentos requeridos (Licencia, Identidad y Selfie) antes de enviar.");
      return;
    }

    setIsSending(true);
    setSubmitStatus('idle');

    let signatureImgUrl = '';
    if (canvasRef.current) {  
      signatureImgUrl = canvasRef.current.toDataURL('image/png');
    }

    const timestamp = new Date().toISOString();
    const requestBody = {
      ...formData,
      licenseImgUrl: licenseImg,
      idImgUrl: idImg,
      selfieImgUrl: selfieImg,
      signatureImgUrl,
      createdAt: timestamp,
      status: 'Pendiente',
      ...(user && { userId: user.uid, userEmail: user.email })
    };

    try {
      // Guardamos la solicitud en Firestore
      await addDoc(collection(db, 'rentals'), requestBody);

      // Enviamos el correo de notificación mediante Resend
      const response = await fetch('/api/send-rent-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData(initialFormData);
        clearSignature();
        setLicenseImg(''); 
        setIdImg(''); 
        setSelfieImg('');
        setTermsAccepted(false);
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error('Error al procesar solicitud de renta:', err);
      setSubmitStatus('error');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        
        {/* Cabecera de Página */}
        <div className="space-y-3 text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#003853]/10 text-[#003853] text-xs font-bold tracking-wide uppercase">
            <ShieldCheck className="w-4 h-4 text-[#db5576]" />
            Renta Segura y Confiable
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#003853] sm:text-4xl">
            Rentar Auto en San Pedro Sula
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-normal">
            Completa el formulario y uno de nuestros asesores de Tekdrive se pondrá en contacto contigo a la brevedad para coordinar la entrega.
          </p>
        </div>

        {/* Formulario Principal */}
        <form onSubmit={handleFormSubmit} className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xl space-y-10">
          
          {/* BLOQUE 1: INFORMACIÓN PERSONAL */}
          <div className="space-y-5">
            <h2 className="text-base font-bold text-[#003853] border-b border-slate-100 pb-3 flex items-center gap-2.5">
              <span className="p-1.5 bg-[#003853]/10 text-[#003853] rounded-lg">
                <User className="w-4 h-4" />
              </span>
              1. Información Personal
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nombres *</label>
                <input 
                  type="text" 
                  name="firstName" 
                  required 
                  value={formData.firstName} 
                  onChange={handleInputChange} 
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                  placeholder="Ej. Juan Carlos" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Apellidos *</label>
                <input 
                  type="text" 
                  name="lastName" 
                  required 
                  value={formData.lastName} 
                  onChange={handleInputChange} 
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                  placeholder="Ej. Pérez Gómez" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Número de Identificación o Pasaporte *</label>
                <input 
                  type="text" 
                  name="idNumber" 
                  required 
                  value={formData.idNumber} 
                  onChange={handleInputChange} 
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                  placeholder="Ej. 0501-1990-12345" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Fecha de Nacimiento *</label>
                <input 
                  type="date" 
                  name="birthDate" 
                  required 
                  value={formData.birthDate} 
                  onChange={handleInputChange} 
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Número de Licencia *</label>
                <input 
                  type="text" 
                  name="licenseNumber" 
                  required 
                  value={formData.licenseNumber} 
                  onChange={handleInputChange} 
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                  placeholder="Ej. HN-0501199012345" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Fecha de Expiración de Licencia *</label>
                <input 
                  type="date" 
                  name="licenseExpiry" 
                  required 
                  value={formData.licenseExpiry} 
                  onChange={handleInputChange} 
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email *</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                  placeholder="nombre@correo.com" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono / WhatsApp *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  required 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                  placeholder="Ej. +504 9999-9999" 
                />
              </div>

              <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Dirección de Residencia *</label>
                  <input 
                    type="text" 
                    name="address" 
                    required 
                    value={formData.address} 
                    onChange={handleInputChange} 
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                    placeholder="Colonia, calle, número de casa" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Punto de Referencia</label>
                  <input 
                    type="text" 
                    name="referencePoint" 
                    value={formData.referencePoint} 
                    onChange={handleInputChange} 
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                    placeholder="Cerca de..." 
                  />
                </div>
              </div>

              <div className="sm:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ciudad *</label>
                  <input 
                    type="text" 
                    name="city" 
                    required 
                    value={formData.city} 
                    onChange={handleInputChange} 
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                    placeholder="San Pedro Sula" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Estado/Provincia *</label>
                  <input 
                    type="text" 
                    name="state" 
                    required 
                    value={formData.state} 
                    onChange={handleInputChange} 
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                    placeholder="Cortés" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Código Postal</label>
                  <input 
                    type="text" 
                    name="zipCode" 
                    value={formData.zipCode} 
                    onChange={handleInputChange} 
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                    placeholder="21101" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">País de Residencia *</label>
                  <select 
                    name="country" 
                    value={formData.country} 
                    onChange={handleInputChange} 
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] font-semibold text-slate-700 transition"
                  >
                    <option value="Honduras">Honduras</option>
                    <option value="Estados Unidos">Estados Unidos</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>

            </div>
          </div>

          {/* BLOQUE 2: INFORMACIÓN DE TRABAJO */}
          <div className="space-y-5">
            <h2 className="text-base font-bold text-[#003853] border-b border-slate-100 pb-3 flex items-center gap-2.5">
              <span className="p-1.5 bg-[#003853]/10 text-[#003853] rounded-lg">
                <Briefcase className="w-4 h-4" />
              </span>
              2. Información de Trabajo
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nombre de Empresa *</label>
                <input 
                  type="text" 
                  name="workCompany" 
                  required 
                  value={formData.workCompany} 
                  onChange={handleInputChange} 
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                  placeholder="Empresa donde labora" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Cargo *</label>
                <input 
                  type="text" 
                  name="workPosition" 
                  required 
                  value={formData.workPosition} 
                  onChange={handleInputChange} 
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                  placeholder="Puesto o profesión" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Trabajo *</label>
                <input 
                  type="email" 
                  name="workEmail" 
                  required 
                  value={formData.workEmail} 
                  onChange={handleInputChange} 
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                  placeholder="correo@empresa.com" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono Trabajo *</label>
                <input 
                  type="tel" 
                  name="workPhone" 
                  required 
                  value={formData.workPhone} 
                  onChange={handleInputChange} 
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                  placeholder="Teléfono fijo o móvil laboral" 
                />
              </div>

              <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Dirección de Trabajo *</label>
                  <input 
                    type="text" 
                    name="workAddress1" 
                    required 
                    value={formData.workAddress1} 
                    onChange={handleInputChange} 
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                    placeholder="Dirección laboral principal" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Dirección de Trabajo (Línea 2)</label>
                  <input 
                    type="text" 
                    name="workAddress2" 
                    value={formData.workAddress2} 
                    onChange={handleInputChange} 
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                    placeholder="Edificio, suite o piso" 
                  />
                </div>
              </div>

              <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ciudad Laboral *</label>
                  <input 
                    type="text" 
                    name="workCity" 
                    required 
                    value={formData.workCity} 
                    onChange={handleInputChange} 
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Estado/Provincia Laboral *</label>
                  <input 
                    type="text" 
                    name="workState" 
                    required 
                    value={formData.workState} 
                    onChange={handleInputChange} 
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Código Postal</label>
                  <input 
                    type="text" 
                    name="workZipCode" 
                    value={formData.workZipCode} 
                    onChange={handleInputChange} 
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                  />
                </div>
              </div>

            </div>
          </div>

          {/* BLOQUE 3: INFORMACIÓN DE ALOJAMIENTO */}
          <div className="space-y-5">
            <h2 className="text-base font-bold text-[#003853] border-b border-slate-100 pb-3 flex items-center gap-2.5">
              <span className="p-1.5 bg-[#003853]/10 text-[#003853] rounded-lg">
                <Home className="w-4 h-4" />
              </span>
              3. Información de Alojamiento (Opcional)
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dirección de Alojamiento</label>
                <input 
                  type="text" 
                  name="stayAddress1" 
                  value={formData.stayAddress1} 
                  onChange={handleInputChange} 
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                  placeholder="Hotel, Airbnb o residencia temporal" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dirección de Alojamiento (Línea 2)</label>
                <input 
                  type="text" 
                  name="stayAddress2" 
                  value={formData.stayAddress2} 
                  onChange={handleInputChange} 
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                  placeholder="Habitación, apartamento o torre" 
                />
              </div>

              <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ciudad de Estadía</label>
                  <input 
                    type="text" 
                    name="stayCity" 
                    value={formData.stayCity} 
                    onChange={handleInputChange} 
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Departamento</label>
                  <input 
                    type="text" 
                    name="stayState" 
                    value={formData.stayState} 
                    onChange={handleInputChange} 
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Código Postal</label>
                  <input 
                    type="text" 
                    name="stayZipCode" 
                    value={formData.stayZipCode} 
                    onChange={handleInputChange} 
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                  />
                </div>
              </div>

            </div>
          </div>

          {/* BLOQUE 4: DETALLES DE RENTA */}
          <div className="space-y-5">
            <h2 className="text-base font-bold text-[#003853] border-b border-slate-100 pb-3 flex items-center gap-2.5">
              <span className="p-1.5 bg-[#003853]/10 text-[#003853] rounded-lg">
                <CalendarDays className="w-4 h-4" />
              </span>
              4. Detalles de Renta
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Fecha de Recogida *</label>
                <input 
                  type="date" 
                  name="pickupDate" 
                  required 
                  value={formData.pickupDate} 
                  onChange={handleInputChange} 
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Hora de Recogida *</label>
                <input 
                  type="time" 
                  name="pickupTime" 
                  required 
                  value={formData.pickupTime} 
                  onChange={handleInputChange} 
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Fecha de Devolución *</label>
                <input 
                  type="date" 
                  name="returnDate" 
                  required 
                  value={formData.returnDate} 
                  onChange={handleInputChange} 
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Hora de Devolución *</label>
                <input 
                  type="time" 
                  name="returnTime" 
                  required 
                  value={formData.returnTime} 
                  onChange={handleInputChange} 
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] transition" 
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Tipo de Vehículo *</label>
                <select 
                  name="vehicleType" 
                  required 
                  value={formData.vehicleType} 
                  onChange={handleInputChange} 
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#003853] font-semibold text-slate-700 transition"
                >
                  <option value="">Seleccione el tipo de vehículo</option>
                  <option value="CityRide">CityRide (solo San Pedro Sula)</option>
                  <option value="Turismo">Turismo (Sedán)</option>
                  <option value="Camioneta 5 pasajeros">Camioneta 5 pasajeros (SUV)</option>
                  <option value="Camioneta 7 pasajeros">Camioneta 7 pasajeros (Familiar)</option>
                  <option value="Pick Up doble cabina">Pick Up doble cabina 4x4</option>
                </select>
              </div>
            </div>
          </div>

          {/* BLOQUE 5: SUBIDA DE DOCUMENTACIÓN */}
          <div className="space-y-5">
            <h2 className="text-base font-bold text-[#003853] border-b border-slate-100 pb-3 flex items-center gap-2.5">
              <span className="p-1.5 bg-[#003853]/10 text-[#003853] rounded-lg">
                <FileText className="w-4 h-4" />
              </span>
              5. Documentación Requerida
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              
              {/* Cargar Licencia */}
              <div className="border border-slate-200 p-5 rounded-2xl bg-slate-50/50 text-center flex flex-col justify-center min-h-[130px] transition hover:bg-slate-50">
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Imagen de Licencia de Conducir *
                </label>
                {licenseImg ? (
                  <div className="space-y-2">
                    <p className="text-xs text-emerald-600 font-bold flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Licencia cargada correctamente
                    </p>
                    <button 
                      type="button" 
                      onClick={() => setLicenseImg('')}
                      className="text-[11px] text-rose-600 font-bold hover:underline cursor-pointer"
                    >
                      Cambiar archivo
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 hover:border-[#003853] rounded-xl p-4 transition">
                    <UploadCloud className="w-6 h-6 text-slate-400" />
                    <span className="text-xs text-slate-600 font-medium">Seleccionar imagen de licencia</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      required 
                      onChange={(e) => { 
                        if (e.target.files?.[0]) uploadToFirebase(e.target.files[0], 'licencia', setLicenseImg); 
                      }} 
                      className="hidden" 
                    />
                  </label>
                )}
                {loadingFile['licencia'] && (
                  <p className="text-xs text-[#003853] mt-2 animate-pulse flex items-center justify-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Subiendo archivo...
                  </p>
                )}
              </div>

              {/* Cargar Identidad */}
              <div className="border border-slate-200 p-5 rounded-2xl bg-slate-50/50 text-center flex flex-col justify-center min-h-[130px] transition hover:bg-slate-50">
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Documento de Identidad / Pasaporte *
                </label>
                {idImg ? (
                  <div className="space-y-2">
                    <p className="text-xs text-emerald-600 font-bold flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Documento cargado correctamente
                    </p>
                    <button 
                      type="button" 
                      onClick={() => setIdImg('')}
                      className="text-[11px] text-rose-600 font-bold hover:underline cursor-pointer"
                    >
                      Cambiar archivo
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 hover:border-[#003853] rounded-xl p-4 transition">
                    <UploadCloud className="w-6 h-6 text-slate-400" />
                    <span className="text-xs text-slate-600 font-medium">Seleccionar imagen de identidad</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      required 
                      onChange={(e) => { 
                        if (e.target.files?.[0]) uploadToFirebase(e.target.files[0], 'identidad', setIdImg); 
                      }} 
                      className="hidden" 
                    />
                  </label>
                )}
                {loadingFile['identidad'] && (
                  <p className="text-xs text-[#003853] mt-2 animate-pulse flex items-center justify-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Subiendo archivo...
                  </p>
                )}
              </div>
            </div>

            {/* MÓDULO SELFIE */}
            <div className="border border-slate-200 p-6 rounded-2xl bg-slate-50/50 flex flex-col items-center justify-center min-h-[160px]">
              <span className="text-xs font-bold text-slate-700 mb-3">Tomar Fotografía Selfie *</span>
              
              {selfieImg ? (
                <div className="text-center flex flex-col items-center animate-in fade-in duration-200">
                  <img src={selfieImg} alt="Selfie del solicitante" className="w-36 h-36 object-cover rounded-2xl border-2 border-[#003853] shadow-md" />
                  <button 
                    type="button" 
                    onClick={() => setSelfieImg('')} 
                    className="text-xs bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl px-3 py-1.5 mt-3 cursor-pointer transition flex items-center gap-1.5 shadow-sm"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Re-tomar Foto
                  </button>
                </div>
              ) : cameraActive ? (
                <div className="flex flex-col items-center gap-3 animate-in fade-in duration-200">
                  <video ref={videoRef} autoPlay playsInline className="w-56 h-42 object-cover bg-black rounded-2xl shadow-md border-2 border-[#003853]" />
                  <button 
                    type="button" 
                    onClick={captureSelfie} 
                    className="bg-[#db5576] hover:bg-[#c24a68] text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer transition flex items-center gap-2 shadow-md"
                  >
                    <Camera className="w-4 h-4" /> Capturar Foto
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <button 
                    type="button" 
                    onClick={startCamera} 
                    className="border-2 border-[#003853] text-[#003853] bg-white hover:bg-[#003853] hover:text-white text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer transition flex items-center gap-2 shadow-sm"
                  >
                    <Camera className="w-4 h-4" /> Abrir Cámara Frontal
                  </button>
                  <p className="text-[11px] text-slate-500 text-center max-w-sm">
                    Requerimos una selfie clara del rostro del solicitante para validar la identidad con la documentación presentada.
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* BLOQUE 6: CANVAS DE FIRMA DIGITAL */}
          <div className="space-y-4 flex flex-col items-center">
            <div className="text-center">
              <label className="block text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5">
                <PenTool className="w-4 h-4 text-[#db5576]" />
                6. Firma Digital (Dibuje su firma en el cuadro inferior) *
              </label>
              <p className="text-[11px] text-slate-500 mt-0.5">Use el ratón en computadora o su dedo en pantalla táctil.</p>
            </div>

            <div className="relative w-full max-w-lg">
              <canvas
                ref={canvasRef}
                width={500}
                height={150}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onMouseMove={draw}
                onTouchStart={startDrawing}
                onTouchEnd={stopDrawing}
                onTouchMove={draw}
                className="border-2 border-dashed border-slate-300 bg-white rounded-2xl w-full h-36 cursor-crosshair touch-none shadow-inner"
              />
              <button 
                type="button" 
                onClick={clearSignature} 
                className="absolute top-3 right-3 border border-slate-200 bg-white text-slate-600 text-xs font-bold px-2.5 py-1 rounded-lg hover:bg-slate-100 cursor-pointer transition shadow-xs"
              >
                Borrar Firma
              </button>
            </div>
          </div>

          {/* TÉRMINOS Y ENVÍO */}
          <div className="pt-2 space-y-5">
            <label className="flex items-start space-x-3 text-xs text-slate-600 cursor-pointer bg-slate-50/80 p-4 rounded-2xl border border-slate-200">
              <input 
                type="checkbox" 
                checked={termsAccepted} 
                onChange={(e) => setTermsAccepted(e.target.checked)} 
                className="mt-0.5 rounded text-[#003853] h-4 w-4 focus:ring-[#003853]" 
              />
              <span>
                He leído y acepto los{' '}
                <button 
                  type="button" 
                  onClick={() => setIsTermsModalOpen(true)} 
                  className="text-[#db5576] font-bold underline hover:text-[#c24a68] transition"
                >
                  Términos y Condiciones
                </button>
                {' '}de renta de vehículos de Tekdrive Rent a Car.
              </span>
            </label>

            <button
              type="submit"
              disabled={isSending}
              className={`w-full rounded-2xl py-4 text-sm font-bold text-white shadow-lg transition flex items-center justify-center gap-2 cursor-pointer ${
                isSending 
                  ? 'bg-slate-400 cursor-not-allowed' 
                  : 'bg-[#003853] hover:bg-[#db5576]'
              }`}
            >
              {isSending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Transmitiendo Solicitud...
                </>
              ) : (
                <>
                  Enviar Solicitud de Renta
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* BLOQUES DE NOTIFICACIONES */}
          <div>
            {submitStatus === 'success' && (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col items-center text-center animate-in fade-in duration-300">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                <h3 className="text-base font-bold text-emerald-800 mt-2">
                  ¡Solicitud de renta transmitida con éxito!
                </h3>
                <p className="text-xs text-emerald-700 mt-1 max-w-md">
                  Hemos recibido tu solicitud y documentos. Uno de nuestros asesores en San Pedro Sula revisará tu expediente y se comunicará contigo a la brevedad.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-5 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-800 flex items-center justify-center gap-2.5 animate-in fade-in duration-300">
                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>Hubo un error al procesar el envío. Por favor, verifica tu conexión o intenta más tarde.</span>
              </div>
            )}
          </div>

        </form>

        {/* Modal de Términos */}
        <TermsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />
      </div>
    </div>
  );
}
