import React from 'react';

export interface RentalFormData {
  firstName: string;
  lastName: string;
  idNumber: string;
  birthDate: string;
  licenseNumber: string;
  licenseExpiry: string;
  email: string;
  phone: string;
  address: string;
  referencePoint?: string;
  city: string;
  state: string;
  zipCode?: string;
  country: string;
  workCompany: string;
  workPosition: string;
  workEmail: string;
  workPhone: string;
  workAddress1?: string;
  workAddress2?: string;
  workCity?: string;
  workState?: string;
  workZipCode?: string;
  stayAddress1?: string;
  stayAddress2?: string;
  stayCity?: string;
  stayState?: string;
  stayZipCode?: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  vehicleType: string;
  licenseImgUrl: string;
  idImgUrl: string;
  selfieImgUrl: string;
  signatureImgUrl: string;
  createdAt?: string;
  userId?: string;
  userEmail?: string;
}

interface RentalRequestEmailProps {
  formData: RentalFormData;
}

const sectionStyle: React.CSSProperties = {
  marginBottom: '20px',
  padding: '16px',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  backgroundColor: '#f8fafc',
};

const headingStyle: React.CSSProperties = {
  borderBottom: '2px solid #cbd5e1',
  paddingBottom: '8px',
  marginBottom: '12px',
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#003853',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const fieldStyle: React.CSSProperties = {
  margin: '6px 0',
  fontSize: '13px',
  color: '#334155',
  lineHeight: '1.5',
};

const labelStyle: React.CSSProperties = {
  fontWeight: 'bold',
  color: '#003853',
};

const imageStyle: React.CSSProperties = {
  maxWidth: '100%',
  maxHeight: '260px',
  border: '1px solid #cbd5e1',
  borderRadius: '8px',
  marginTop: '8px',
  display: 'block',
  objectFit: 'contain',
  backgroundColor: '#ffffff',
};

export const RentalRequestEmail: React.FC<RentalRequestEmailProps> = ({ formData }) => {
  const {
    firstName,
    lastName,
    idNumber,
    birthDate,
    licenseNumber,
    licenseExpiry,
    email,
    phone,
    address,
    referencePoint,
    city,
    state,
    zipCode,
    country,
    workCompany,
    workPosition,
    workEmail,
    workPhone,
    workAddress1,
    workAddress2,
    workCity,
    workState,
    workZipCode,
    stayAddress1,
    stayAddress2,
    stayCity,
    stayState,
    stayZipCode,
    pickupDate,
    pickupTime,
    returnDate,
    returnTime,
    vehicleType,
    licenseImgUrl,
    idImgUrl,
    selfieImgUrl,
    signatureImgUrl,
    userId,
    userEmail
  } = formData;

  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <title>Nueva Solicitud de Renta - Tekdrive</title>
      </head>
      <body style={{ fontFamily: 'Arial, sans-serif', color: '#1e293b', backgroundColor: '#f1f5f9', padding: '20px', margin: 0 }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '24px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '24px', borderBottom: '2px solid #f1f5f9', paddingBottom: '16px' }}>
            <h1 style={{ color: '#003853', margin: '0 0 6px 0', fontSize: '22px' }}>Nueva Solicitud de Renta de Vehículo</h1>
            <p style={{ color: '#db5576', margin: 0, fontWeight: 'bold', fontSize: '13px' }}>Tekdrive Rent a Car — San Pedro Sula</p>
            {userId && (
              <p style={{ color: '#64748b', fontSize: '11px', marginTop: '6px' }}>
                Usuario autenticado: {userEmail || userId}
              </p>
            )}
          </div>

          {/* Sección 1: Información Personal */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>1. Información Personal</h2>
            <p style={fieldStyle}><span style={labelStyle}>Nombre Completo:</span> {firstName} {lastName}</p>
            <p style={fieldStyle}><span style={labelStyle}>Documento Identidad/Pasaporte:</span> {idNumber}</p>
            <p style={fieldStyle}><span style={labelStyle}>Fecha de Nacimiento:</span> {birthDate}</p>
            <p style={fieldStyle}><span style={labelStyle}>Email:</span> {email}</p>
            <p style={fieldStyle}><span style={labelStyle}>Teléfono:</span> {phone}</p>
            <p style={fieldStyle}><span style={labelStyle}>Dirección de Residencia:</span> {address}</p>
            {referencePoint && <p style={fieldStyle}><span style={labelStyle}>Punto de Referencia:</span> {referencePoint}</p>}
            <p style={fieldStyle}><span style={labelStyle}>Ubicación:</span> {city}, {state} {zipCode ? `(CP: ${zipCode})` : ''}, {country}</p>
          </div>

          {/* Sección 2: Detalles de la Licencia */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>2. Detalles de Licencia</h2>
            <p style={fieldStyle}><span style={labelStyle}>Número de Licencia:</span> {licenseNumber}</p>
            <p style={fieldStyle}><span style={labelStyle}>Fecha de Expiración:</span> {licenseExpiry}</p>
          </div>

          {/* Sección 3: Información de Trabajo */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>3. Información de Trabajo</h2>
            <p style={fieldStyle}><span style={labelStyle}>Empresa:</span> {workCompany}</p>
            <p style={fieldStyle}><span style={labelStyle}>Cargo:</span> {workPosition}</p>
            <p style={fieldStyle}><span style={labelStyle}>Email Laboral:</span> {workEmail}</p>
            <p style={fieldStyle}><span style={labelStyle}>Teléfono Laboral:</span> {workPhone}</p>
            {workAddress1 && <p style={fieldStyle}><span style={labelStyle}>Dirección Laboral:</span> {workAddress1} {workAddress2 || ''}</p>}
            {(workCity || workState) && (
              <p style={fieldStyle}><span style={labelStyle}>Ciudad/Estado Laboral:</span> {workCity || ''}, {workState || ''} {workZipCode ? `(CP: ${workZipCode})` : ''}</p>
            )}
          </div>

          {/* Sección 4: Información de Alojamiento */}
          {(stayAddress1 || stayCity || stayState) && (
            <div style={sectionStyle}>
              <h2 style={headingStyle}>4. Información de Alojamiento</h2>
              {stayAddress1 && <p style={fieldStyle}><span style={labelStyle}>Dirección Hospedaje:</span> {stayAddress1} {stayAddress2 || ''}</p>}
              <p style={fieldStyle}><span style={labelStyle}>Ubicación Hospedaje:</span> {stayCity || 'N/A'}, {stayState || 'N/A'} {stayZipCode ? `(CP: ${stayZipCode})` : ''}</p>
            </div>
          )}

          {/* Sección 5: Detalles de la Renta */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>5. Detalles de la Renta</h2>
            <p style={fieldStyle}><span style={labelStyle}>Tipo de Vehículo Seleccionado:</span> <strong>{vehicleType}</strong></p>
            <p style={fieldStyle}><span style={labelStyle}>Fecha y Hora de Recogida:</span> {pickupDate} a las {pickupTime}</p>
            <p style={fieldStyle}><span style={labelStyle}>Fecha y Hora de Devolución:</span> {returnDate} a las {returnTime}</p>
          </div>

          {/* Sección 6: Documentación Adjunta */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>6. Documentación y Firma</h2>
            
            {licenseImgUrl && (
              <div style={{ marginBottom: '14px' }}>
                <p style={fieldStyle}><span style={labelStyle}>Licencia de Conducir:</span></p>
                <a href={licenseImgUrl} target="_blank" rel="noopener noreferrer">
                  <img src={licenseImgUrl} alt="Licencia de Conducir" style={imageStyle} />
                </a>
              </div>
            )}

            {idImgUrl && (
              <div style={{ marginBottom: '14px' }}>
                <p style={fieldStyle}><span style={labelStyle}>Documento de Identidad / Pasaporte:</span></p>
                <a href={idImgUrl} target="_blank" rel="noopener noreferrer">
                  <img src={idImgUrl} alt="Documento de Identidad" style={imageStyle} />
                </a>
              </div>
            )}

            {selfieImgUrl && (
              <div style={{ marginBottom: '14px' }}>
                <p style={fieldStyle}><span style={labelStyle}>Fotografía Selfie del Solicitante:</span></p>
                <img src={selfieImgUrl} alt="Selfie del Solicitante" style={imageStyle} />
              </div>
            )}

            {signatureImgUrl && (
              <div style={{ marginBottom: '10px' }}>
                <p style={fieldStyle}><span style={labelStyle}>Firma Digital Trazada:</span></p>
                <img src={signatureImgUrl} alt="Firma Digital" style={{ ...imageStyle, maxHeight: '140px', backgroundColor: '#ffffff' }} />
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{ textAlign: 'center', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0', color: '#94a3b8', fontSize: '12px' }}>
            <p style={{ margin: '4px 0' }}>Notificación automática del sitio web Tekdrive Rent a Car.</p>
            <p style={{ margin: '4px 0' }}>San Pedro Sula, Honduras.</p>
          </div>

        </div>
      </body>
    </html>
  );
};

export default RentalRequestEmail;
