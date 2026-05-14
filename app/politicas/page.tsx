import { ShieldCheck, FileText, Clock, UserCheck, HelpCircle } from 'lucide-react';

export default function PoliticasPage() {
  return (
    <main 
      className="min-h-screen bg-white pb-20"
      style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
    >
      {/* Header Corporativo (Basado en image_cdc382.png) */}
      <div className="relative w-full h-[300px] bg-[#003853] flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 uppercase">
            Políticas de Renta
          </h1>
          <div className="w-20 h-1 bg-[#db5576] mx-auto mb-4"></div>
          <p className="text-white text-sm md:text-base uppercase tracking-[0.2em] font-light">
            Renta Seguridad y Confianza
          </p>
        </div>
      </div>

      {/* Contenido Estructurado */}
      <div className="max-w-4xl mx-auto mt-16 px-6 md:px-12 text-gray-700 leading-relaxed">
        
        <div className="space-y-12">
          
          {/* SECCIÓN 1: Requisitos */}
          <section>
            <div className="flex items-center gap-3 mb-4 text-[#003853]">
              <UserCheck className="w-6 h-6" />
              <h2 className="text-2xl font-bold uppercase tracking-tight">Requisitos del Conductor</h2>
            </div>
            <div className="pl-9 space-y-3 text-sm md:text-base">
              <p>Para garantizar su seguridad y cumplir con las normativas locales en Honduras, todo arrendatario debe cumplir con:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Edad mínima de 21 años (pueden aplicar cargos para conductores menores de 25).</li>
                <li>Licencia de conducir vigente y original.</li>
                <li>Identificación oficial (DNI para hondureños o Pasaporte para extranjeros).</li>
                <li>Tarjeta de crédito física para el bloqueo de garantía de seguridad.</li>
              </ul>
            </div>
          </section>

          {/* SECCIÓN 2: Reservaciones y Cancelaciones */}
          <section>
            <div className="flex items-center gap-3 mb-4 text-[#003853]">
              <Clock className="w-6 h-6" />
              <h2 className="text-2xl font-bold uppercase tracking-tight">Reservaciones y Cancelaciones</h2>
            </div>
            <div className="pl-9 space-y-3 text-sm md:text-base">
              <p>Las reservaciones se confirman según la categoría del vehículo. Aunque nos esforzamos por entregar el modelo exacto, Tekdrive se reserva el derecho de entregar un vehículo similar o de categoría superior.</p>
              <p><strong>Cancelaciones:</strong> Deben realizarse con al menos 24 horas de anticipación para evitar cargos por "No Show".</p>
            </div>
          </section>

          {/* SECCIÓN 3: Uso del Vehículo */}
          <section>
            <div className="flex items-center gap-3 mb-4 text-[#003853]">
              <ShieldCheck className="w-6 h-6" />
              <h2 className="text-2xl font-bold uppercase tracking-tight">Uso del Vehículo y Coberturas</h2>
            </div>
            <div className="pl-9 space-y-3 text-sm md:text-base">
              <p>El vehículo rentado solo puede ser conducido por las personas autorizadas en el contrato de arrendamiento. El uso fuera de carreteras pavimentadas o para fines ilícitos anulará automáticamente cualquier cobertura de seguro.</p>
              <p>Contamos con asistencia vial básica en San Pedro Sula y alrededores dentro de nuestro horario de atención.</p>
            </div>
          </section>

          {/* SECCIÓN 4: Privacidad de Datos */}
          <section className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-3 mb-4 text-[#003853]">
              <FileText className="w-6 h-6" />
              <h2 className="text-xl font-bold uppercase tracking-tight">Privacidad y Datos Personales</h2>
            </div>
            <div className="pl-9 text-sm space-y-4">
              <p>En <strong>Tekdrivehn.com</strong>, protegemos su información. Los datos recolectados (Nombre, Teléfono, Documentos) se utilizan exclusivamente para la gestión de su contrato de renta y comunicación directa a través de nuestro soporte.</p>
              <p>No compartimos sus datos con terceros, excepto cuando sea requerido por autoridades legales de Honduras o para el procesamiento de pagos bancarios seguros.</p>
            </div>
          </section>

          {/* SECCIÓN 5: Soporte */}
          <section className="text-center pt-8 border-t border-gray-100">
            <HelpCircle className="w-10 h-10 mx-auto mb-4 text-[#db5576]" />
            <h2 className="text-xl font-bold text-[#003853] mb-2 uppercase">¿Tiene dudas sobre nuestras políticas?</h2>
            <p className="text-sm mb-6">Contáctenos directamente para brindarle una asesoría personalizada.</p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <a 
                href="tel:+50496732842" 
                className="bg-[#003853] text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-[#4882a1] transition-colors"
              >
                Llamar 
              </a>
              <a 
                href="https://wa.me/50496732842" 
                target="_blank"
                className="bg-green-500 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-green-600 transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}