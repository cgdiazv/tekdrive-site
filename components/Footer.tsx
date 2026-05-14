import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="flex flex-col w-full text-white"
      style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
    >
      <div className="bg-[#4882a1] px-6 py-12 md:px-12 lg:px-24">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: Enlaces */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold mb-6">Enlaces</h3>
            <ul className="space-y-4">
              <li><Link href="/autos" className="hover:text-gray-200 transition-colors">Autos</Link></li>
              <li><Link href="/politicas" className="hover:text-gray-200 transition-colors">Políticas</Link></li>
              <li><Link href="/preguntas-frecuentes" className="hover:text-gray-200 transition-colors">Preguntas Frecuentes</Link></li>
              <li><Link href="/contacto" className="hover:text-gray-200 transition-colors">Contáctenos</Link></li>
            </ul>
          </div>

          {/* Column 2: Cuenta */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold mb-6">Cuenta</h3>
            <ul className="space-y-4">
              <li><Link href="/mi-cuenta" className="hover:text-gray-200 transition-colors">Mi Cuenta</Link></li>
              <li><Link href="/configurar-cuenta" className="hover:text-gray-200 transition-colors">Configurar Cuenta</Link></li>
              <li><Link href="/reservaciones" className="hover:text-gray-200 transition-colors">Reservaciones</Link></li>
              <li><Link href="/direcciones" className="hover:text-gray-200 transition-colors">Direcciones</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold mb-6">Tekdrive Renta a Car</h3>
            <ul className="space-y-4">
              
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <span className="pt-0.5">2 calle 8 y 9 ave N.O.<br/>Guamilito</span>
              </li>
              
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                <span>+504 9673-2842</span>
              </li>
              
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5M8.25 12l3 3 6-6" />
                </svg>
                <span>Reservaciones</span>
              </li>
              
            </ul>
          </div>

          {/* Column 4: Newsletter & Social */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold mb-6">Síguenos</h3>
            
            <div className="flex gap-4">
              <a href="https://www.facebook.com/tecnoauto21" target="_blank" className="hover:text-gray-200 transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg></a>
              <a href="https://www.instagram.com/tekdrivehn_/" target="_blank" className="hover:text-gray-200 transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg></a>
              <a href="https://www.linkedin.com/company/su-auto-rent-a-car/" target="_blank" className="hover:text-gray-200 transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg></a>
            </div>
          </div>
          
        </div>
      </div>

      <div className="bg-[#2a4555] px-6 py-5 md:px-12 lg:px-24">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm gap-4">
          <p>Copyright © Tekdrive Rent a Car 2022-{currentYear}</p>
          <a 
            href="https://indevasa.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium hover:text-gray-300 transition-colors"
          >
            Indeva Websites
          </a>
        </div>
      </div>
    </footer>
  );
}