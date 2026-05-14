'use client';
import { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "¿Qué debo hacer si tengo un accidente en un auto de alquiler?",
      answer: "Deberá llamar a nuestro número de contacto +504 9673-2842 para que coordinemos la asistencia del seguro, luego una persona de call center le llamará para pedirle su ubicación y asistirle en su impase."
    },
    {
      question: "¿Cuánto cuesta alquilar un auto?",
      answer: "Tenemos variedad de precios de acuerdo con el tipo de vehículo y dependiendo si es temporada alta/baja. Pero lo más barato puede ser $46 el día ya con impuestos y seguros."
    },
    {
      question: "¿Se requiere un depósito para los alquiler de autos?",
      answer: "Sí."
    },
    {
      question: "¿De qué monto es el depósito por el alquiler de un auto?",
      answer: "Dependiendo del modelo del auto, entre $250 a $700."
    },
    {
      question: "¿Debo reabastecer el vehículo antes de devolverlo? ¿Puedo pagar el combustible por adelantado?",
      answer: "Sí puedes prepagar el combustible. Y sí, deberá llenar el vehículo para que no se le cobre adicional."
    },
    {
      question: "¿Habrá un recargo si me retraso en la devolución del auto de alquiler?",
      answer: "Sí ofrecemos máximo 2 horas de gracia, después de eso hay un cargo adicional por hora de retraso."
    },
    {
      question: "¿Quiero devolver el auto antes de tiempo. ¿Existe una penalización por ello?",
      answer: "No."
    },
    {
      question: "¿Qué formas de pago se aceptan para rentar un auto?",
      answer: "Tarjeta de crédito, transferencia bancaria, enlace o botón de pago."
    },
    {
      question: "¿Aceptan pagos en efectivo?",
      answer: "Sí, el depósito puede hacerse en efectivo o por transferencia bancaria a BAC Honduras o Banco Ficohsa."
    },
    {
      question: "¿Puedo pagar el alquiler de un auto para otra persona?",
      answer: "No, la misma persona que alquila el auto debe ser la persona que pague el total del alquiler del vehículo."
    },
    {
      question: "¿Es posible mantener mi vehículo de alquiler durante unos días más si lo deseara?",
      answer: "Sí, solo tienes que notificar a uno de nuestros agentes de servicio."
    },
    {
      question: "¿Si soy una persona discapacitada y no poseo una licencia de conducir, ¿puedo alquilar un auto?",
      answer: "No."
    },
    {
      question: "¿Puedo agregar un conductor adicional a mi alquiler?",
      answer: "Sí, y no tiene un costo adicional. Solo debe darnos una copia de su licencia vigente."
    },
    {
      question: "¿Cuáles son los requisitos respecto de la edad para rentar un auto en Honduras?",
      answer: "Deberá ser mayor de 23 años."
    },
    {
      question: "¿Cuáles son los requisitos respecto de las licencias de conducir para rentar un auto en Honduras?",
      answer: "Licencia de conducir vigente con al menos 2 meses de vigencia."
    },
    {
      question: "¿Cuáles son los requisitos de arrendatario para rentar un auto en Honduras?",
      answer: "1. Debes ser mayor de 23 años. 2. Deberás contar con una disponibilidad en efectivo de L. 5,000.00 a 9,000.00 dependiendo del vehículo que rentes para utilizarlo como depósito de protección. 3. Debes tener licencia de conducir con al menos 2 meses de vigencia. 4. Debes presentar fotocopia de tu pasaporte, si eres extranjero y cédula de identidad, fotocopia de tu carnet de trabajo y fotocopia de recibo público."
    },
    {
      question: "¿Tekdrive pasará a recogerme?",
      answer: "No, llegas a nuestras oficinas en el centro de la ciudad en el barrio Guamilito, 2 calle, entre 8 y 9 avenida, media cuadra abajo de fontanería Mario Diaz."
    }
  ];

  return (
    <main className="min-h-screen bg-white pb-20" style={{ fontFamily: 'var(--font-roboto), sans-serif' }}>
      {/* Header (Estilo image_cdb43a.png) */}
      <div className="relative w-full h-[300px] bg-[#003853] flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 uppercase tracking-tight">Preguntas Frecuentes</h1>
          <div className="w-20 h-1 bg-[#db5576] mx-auto mb-4"></div>
          <p className="text-white text-sm md:text-base uppercase tracking-[0.2em] font-light">Renta Seguridad y Confianza</p>
        </div>
      </div>

      {/* Lista de Preguntas */}
      <div className="max-w-4xl mx-auto mt-16 px-6">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-100 last:border-0 pb-4">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center gap-4 text-left group pt-4"
              >
                {openIndex === index ? (
                  <MinusCircle className="w-5 h-5 text-[#4882a1] shrink-0" />
                ) : (
                  <PlusCircle className="w-5 h-5 text-[#003853] shrink-0 group-hover:text-[#4882a1] transition-colors" />
                )}
                <span className={`font-bold text-sm md:text-base transition-colors ${openIndex === index ? 'text-[#4882a1]' : 'text-[#003853]'}`}>
                  {faq.question}
                </span>
              </button>
              
              {openIndex === index && (
                <div className="mt-4 ml-9 text-gray-500 text-sm leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}