import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Resend } from 'resend';
import { createElement } from 'react';
import RentalRequestEmail from './RentalRequestEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Guardar en Firestore si el cliente aún no guardó un ID de documento
    let rentalDocId = body.id || null;
    if (!rentalDocId) {
      try {
        const docRef = await addDoc(collection(db, 'rentals'), {
          ...body,
          status: body.status || 'Pendiente',
          createdAt: body.createdAt || new Date().toISOString()
        });
        rentalDocId = docRef.id;
      } catch (firestoreErr) {
        console.warn('Advertencia al guardar en Firestore desde API:', firestoreErr);
      }
    }

    // 2. Enviar la notificación por correo electrónico con Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'Tekdrive Web <notifications@indevasa.com>',
          to: ['miranda.roger@gmail.com'],
          replyTo: body.email,
          subject: `Nueva Solicitud de Renta - ${body.firstName} ${body.lastName} (${body.vehicleType || 'Vehículo'})`,
          react: createElement(RentalRequestEmail, { formData: body }),
        });
      } catch (emailErr) {
        console.error('Error al enviar email en /api/send-rent-request:', emailErr);
      }
    }

    return NextResponse.json(
      { 
        message: 'Solicitud de renta recibida y procesada correctamente', 
        rentalId: rentalDocId 
      }, 
      { status: 200 }
    );

  } catch (error) {
    console.error('Error crítico en /api/send-rent-request:', error);
    return NextResponse.json(
      { message: 'Error al procesar la solicitud', error: (error as Error).message }, 
      { status: 500 }
    );
  }
}
