import Image from 'next/image';
import Link from 'next/link';

const carsData = [
  {
    id: 1,
    name: 'FORD ESCAPE',
    type: 'Camioneta',
    price: '1725.00',
    image: '/ford-escape-plata.webp', 
  },
  {
    id: 2,
    name: 'FORD ESCAPE',
    type: 'Camioneta',
    price: '1725.00',
    image: '/ford-escape-negro.webp',
  },
  {
    id: 3,
    name: 'FORD ESCAPE',
    type: 'Camioneta',
    price: '1495.00',
    image: '/ford-escape-verde.webp',
  },
  {
    id: 4,
    name: 'FORD ESCAPE',
    type: 'Camioneta',
    price: '1725.00',
    image: '/ford-escape-blanco.webp',
  }
];

export default function FeaturedCars() {
  return (
    <section 
      className="w-full bg-[#f8f9fb] py-16 px-6 md:px-12"
      style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
    >
      <div className="max-w-screen-xl mx-auto">
        
        {/* Encabezado de la sección */}
        <div className="mb-10 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003853] mb-1">
            Nuestros Autos
          </h2>
          <p className="text-sm md:text-base text-[#003853] uppercase tracking-wide">
            Renta Seguridad Y Confianza
          </p>
        </div>

        {/* Cuadrícula de Autos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {carsData.map((car) => (
            <div 
              key={car.id} 
              className="bg-white p-6 flex flex-col items-center text-center shadow-sm border border-gray-100 rounded-2xl overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative w-full h-32 md:h-40 mb-4">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-contain"
                />
              </div>
              
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                {car.name}
              </h3>
              <p className="text-[#db5576] text-sm mb-4 font-medium">
                {car.type}
              </p>
              <p className="text-gray-600 text-sm mb-6">
                Desde L.{car.price} / Día
              </p>
              
              {/* Botón Reservar: Rojo Tekdrive + Full Round */}
              <Link
                href={`/reservar/${car.id}`}
                className="bg-[#db5576] hover:bg-[#c24a68] text-white px-8 py-2.5 rounded-full font-semibold text-sm transition-colors w-full sm:w-auto"
              >
                RESERVAR
              </Link>
            </div>
          ))}
        </div>

        {/* Botón Ver Todos: Rojo Tekdrive + Full Round */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/autos"
            className="bg-[#db5576] hover:bg-[#c24a68] text-white px-10 py-3 rounded-full font-semibold text-base transition-colors shadow-sm"
          >
            VER TODOS LOS AUTOS
          </Link>
        </div>

      </div>
    </section>
  );
}