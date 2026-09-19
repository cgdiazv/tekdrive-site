'use client';

import { X, FileText, ShieldCheck, Scale, Ban, Info, CheckCircle2 } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-3xl rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#003853]/10 rounded-xl text-[#003853]">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-base font-bold text-slate-900">Términos y Condiciones de Renta</p>
              <p className="text-xs text-slate-500">Tekdrive Rent a Car — San Pedro Sula, Honduras</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="rounded-full p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto p-6 space-y-6 text-sm text-slate-700 leading-7">
          
          {/* Introducción */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#003853] font-bold">
              <Info className="w-4 h-4 text-[#db5576]" />
              <span>Introducción y Objeto del Servicio</span>
            </div>
            <p>
              El presente documento establece los términos y condiciones de uso que regulan el acceso, 
              solicitud y utilización del servicio de renta de vehículos de <strong>Tekdrive Rent a Car</strong>. 
              Al enviar una solicitud de renta a través de nuestro sitio web, el usuario acepta de manera expresa 
              y sin reservas estos términos en su totalidad.
            </p>
          </div>

          {/* Secciones */}
          <div className="space-y-4">
            
            {/* Responsabilidad de Datos y Documentación */}
            <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="flex items-center gap-2 text-[#003853] font-bold">
                <ShieldCheck className="w-4 h-4 text-[#db5576]" />
                <span>1. Responsabilidad de Datos y Documentación</span>
              </div>
              <p>
                El usuario garantiza que toda la información provista en este formulario (nombres, documentos de identificación, 
                datos de contacto, empleo y estadía) es verídica, exacta y actualizada.
              </p>
              <p>
                Para la solicitud de renta de vehículos, el usuario garantiza la total autenticidad e integridad de las imágenes de 
                la licencia de conducir, documento nacional de identificación o pasaporte, y fotografía selfie adjuntada, 
                eximiendo por completo a <strong>Tekdrive Rent a Car</strong> de cualquier responsabilidad derivada de la presentación de 
                documentación falsa, adulterada o perteneciente a terceros.
              </p>
            </div>

            {/* Validez de la Firma Digital */}
            <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="flex items-center gap-2 text-[#003853] font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>2. Validez de la Firma Digital</span>
              </div>
              <p>
                Al trazar su firma manual sobre el lienzo digital dispuesto en este formulario, el usuario reconoce y acepta 
                que este acto constituye una firma electrónica con plena validez probatoria para manifestar su consentimiento y 
                conformidad con la solicitud de pre-reserva, conforme a las leyes y normativas de comercio electrónico aplicables 
                en la República de Honduras.
              </p>
            </div>

            {/* Alcance de las Reservaciones y Tarifas */}
            <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="flex items-center gap-2 text-[#003853] font-bold">
                <Scale className="w-4 h-4 text-[#db5576]" />
                <span>3. Alcance de las Reservaciones y Tarifas</span>
              </div>
              <p>
                El envío del formulario web constituye una solicitud de pre-reserva de vehículo sujeta a disponibilidad de flota 
                y verificación documental satisfactoria por parte de nuestros asesores en San Pedro Sula. Ninguna renta se considerará 
                finalizada hasta la firma presencial del contrato de arrendamiento vehicular y el depósito de garantía correspondiente 
                en el momento de entrega de la unidad.
              </p>
            </div>

            {/* Restricciones de Uso */}
            <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="flex items-center gap-2 text-[#003853] font-bold">
                <Ban className="w-4 h-4 text-rose-600" />
                <span>4. Requisitos del Conductor y Restricciones</span>
              </div>
              <p>
                El arrendatario y cualquier conductor adicional autorizado deben tener al menos 21 años de edad y contar con licencia 
                de conducir vigente (nacional o internacional). El vehículo no podrá ser utilizado para fines ilícitos, competencias 
                o subarrendamiento.
              </p>
            </div>

            {/* Legislación Aplicable */}
            <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="flex items-center gap-2 text-[#003853] font-bold">
                <Scale className="w-4 h-4 text-[#003853]" />
                <span>5. Legislación y Jurisdicción Aplicable</span>
              </div>
              <p>
                Estos términos se rigen e interpretan bajo las leyes de la República de Honduras. Cualquier disputa o controversia 
                será sometida a la jurisdicción de los tribunales competentes de la ciudad de San Pedro Sula, Cortés.
              </p>
            </div>

          </div>

          {/* Footer de preguntas */}
          <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50 text-center">
            <p className="text-sm font-bold text-[#003853]">¿Tienes dudas sobre los términos y requisitos?</p>
            <p className="mt-1 text-slate-600 text-xs">
              Contáctanos al WhatsApp o correo oficial <strong>reservaciones@tekdrivehn.com</strong> para asistencia personalizada.
            </p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            type="button"
            className="px-6 py-2.5 rounded-xl bg-[#003853] hover:bg-[#db5576] text-white font-bold text-xs transition duration-200 cursor-pointer shadow-sm"
          >
            Entendido y Aceptar
          </button>
        </div>

      </div>
    </div>
  );
}
