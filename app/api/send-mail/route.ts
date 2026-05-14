import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inicializamos la instancia fuera de la función
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // 1. Validamos que el cuerpo de la petición sea JSON
    const body = await request.json();
    const { nombre, email, mensaje } = body;

    // 2. Verificación de campos obligatorios
    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    // 3. Envío del correo
    const response = await resend.emails.send({
      from: 'Tekdrive Web <web@indevasa.com>',
      to: 'reservaciones@tekdrivehn.com',
      subject: `Nueva consulta: ${nombre}`,
      replyTo: email, 
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #003853;">Nueva Consulta desde el Sitio Web</h2>
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Email de contacto:</strong> ${email}</p>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <p><strong>Mensaje:</strong></p>
          <p style="white-space: pre-wrap;">${mensaje}</p>
        </div>
      `,
    });

    if (response.error) {
      return NextResponse.json(
        { error: response.error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (err: any) {
    return NextResponse.json(
      { error: 'Error interno al procesar el envío' },
      { status: 500 }
    );
  }
}