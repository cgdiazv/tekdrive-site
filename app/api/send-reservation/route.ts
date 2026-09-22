import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      autoId,
      nombreAuto,
      nombre,
      apellido,
      email,
      telefono,
      fechaInicio,
      fechaFin,
      dias,
      total,
      metodoRegistro
    } = body;

    if (process.env.RESEND_API_KEY) {
      const response = await resend.emails.send({
        from: 'Tekdrive Web <notifications@indevasa.com>',
        to: ['miranda.roger@gmail.com'],
        replyTo: email,
        subject: `Nueva Reservación: ${nombreAuto || 'Vehículo'} - ${nombre || ''} ${apellido || ''}`.trim(),
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
            <div style="text-align: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 16px; margin-bottom: 20px;">
              <h2 style="color: #003853; margin: 0 0 6px 0;">Nueva Reservación de Vehículo</h2>
              <p style="color: #db5576; margin: 0; font-weight: bold; font-size: 13px;">Tekdrive Rent a Car</p>
            </div>

            <div style="margin-bottom: 16px; padding: 14px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
              <h3 style="color: #003853; font-size: 13px; text-transform: uppercase; margin: 0 0 10px 0; border-bottom: 1px solid #cbd5e1; padding-bottom: 6px;">Datos del Vehículo</h3>
              <p style="margin: 4px 0; font-size: 14px;"><strong>Auto:</strong> ${nombreAuto || 'N/A'}</p>
              <p style="margin: 4px 0; font-size: 14px;"><strong>ID de Auto:</strong> ${autoId || 'N/A'}</p>
            </div>

            <div style="margin-bottom: 16px; padding: 14px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
              <h3 style="color: #003853; font-size: 13px; text-transform: uppercase; margin: 0 0 10px 0; border-bottom: 1px solid #cbd5e1; padding-bottom: 6px;">Datos del Cliente</h3>
              <p style="margin: 4px 0; font-size: 14px;"><strong>Nombre:</strong> ${nombre || ''} ${apellido || ''}</p>
              <p style="margin: 4px 0; font-size: 14px;"><strong>Email:</strong> ${email || 'N/A'}</p>
              <p style="margin: 4px 0; font-size: 14px;"><strong>Teléfono:</strong> ${telefono || 'N/A'}</p>
              <p style="margin: 4px 0; font-size: 14px;"><strong>Tipo de Registro:</strong> ${metodoRegistro || 'N/A'}</p>
            </div>

            <div style="margin-bottom: 16px; padding: 14px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
              <h3 style="color: #003853; font-size: 13px; text-transform: uppercase; margin: 0 0 10px 0; border-bottom: 1px solid #cbd5e1; padding-bottom: 6px;">Detalles de la Reserva</h3>
              <p style="margin: 4px 0; font-size: 14px;"><strong>Fecha de Recogida:</strong> ${fechaInicio || 'N/A'}</p>
              <p style="margin: 4px 0; font-size: 14px;"><strong>Fecha de Entrega:</strong> ${fechaFin || 'N/A'}</p>
              <p style="margin: 4px 0; font-size: 14px;"><strong>Días Totales:</strong> ${dias || 0}</p>
              <p style="margin: 8px 0 4px 0; font-size: 16px; color: #003853;"><strong>Total Estimado:</strong> <span style="color: #db5576; font-weight: bold;">L. ${(total || 0).toLocaleString()}</span></p>
            </div>

            <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 12px;">
              Notificación automática del sitio web Tekdrive Rent a Car.
            </div>
          </div>
        `,
      });

      if (response.error) {
        console.error('Error al enviar email en /api/send-reservation:', response.error);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error al procesar email de reservación:', error);
    return NextResponse.json(
      { error: 'Error al enviar email de reservación' },
      { status: 500 }
    );
  }
}
