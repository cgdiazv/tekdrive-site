'use client';
import { Bell, Info, CheckCircle } from 'lucide-react';

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: 'reserva',
      title: 'Reserva Confirmada',
      msg: 'Tu Toyota Hilux está listo para ser recogido en nuestra oficina de Guamilito.',
      date: 'Hace 2 horas'
    },
    {
      id: 2,
      type: 'info',
      title: 'Recordatorio de Documentos',
      msg: 'Por favor, asegúrate de traer tu licencia vigente al momento de retirar el vehículo.',
      date: 'Ayer'
    }
  ];

  return (
    <div className="p-6">
      <h2 className="text-[#003853] text-2xl font-bold mb-6 flex items-center gap-2">
        <Bell className="w-6 h-6" /> Notificaciones
      </h2>
      
      <div className="space-y-4">
        {notifications.map((n) => (
          <div key={n.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex gap-4 items-start">
            {n.type === 'reserva' ? <CheckCircle className="text-green-500 mt-1" /> : <Info className="text-blue-500 mt-1" />}
            <div className="flex-1">
              <h4 className="font-bold text-[#003853] text-sm uppercase tracking-tight">{n.title}</h4>
              <p className="text-gray-500 text-sm mt-1">{n.msg}</p>
              <span className="text-[10px] text-gray-400 mt-2 block">{n.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}