export interface Car {
  id: number;
  name: string;
  price: string;
  type: string;
  passengers: number;
  transmission: string;
  bags: number;
  year: number;
  color: string;
  image: string;
  hasAC: boolean;
}

export const carsData: Car[] = [
  {
    id: 1,
    name: "FORD ESCAPE",
    price: "1725.00",
    type: "SUV",
    passengers: 5,
    transmission: "Automático",
    bags: 4,
    year: 2017,
    color: "Blanco",
    image: "/ford-escape-blanco.webp",
    hasAC: true
  },
  {
    id: 2,
    name: "FORD ESCAPE",
    price: "1495.00",
    type: "SUV",
    passengers: 5,
    transmission: "Automático",
    bags: 4,
    year: 2013,
    color: "Verde",
    image: "/ford-escape-verde.webp",
    hasAC: true
  },
  {
    id: 3,
    name: "FORD ESCAPE",
    price: "1725.00",
    type: "SUV",
    passengers: 5,
    transmission: "Automático",
    bags: 4,
    year: 2017,
    color: "Negro",
    image: "/ford-escape-cromado.webp",
    hasAC: true
  },
  {
    id: 4,
    name: "FORD ESCAPE",
    price: "1725.00",
    type: "SUV",
    passengers: 5,
    transmission: "Automático",
    bags: 4,
    year: 2017,
    color: "Plateado",
    image: "/ford-escape-plata.webp",
    hasAC: true
  },
  {
    id: 5,
    name: "FORD ESCAPE",
    price: "1495.00",
    type: "SUV",
    passengers: 5,
    transmission: "Automático",
    bags: 4,
    year: 2013,
    color: "Gris",
    image: "/ford-escape-verde.webp",
    hasAC: true
  },
  {
    id: 6,
    name: "FORD ESCAPE",
    price: "1840.00",
    type: "SUV",
    passengers: 5,
    transmission: "Automático",
    bags: 4,
    year: 2018,
    color: "Negro",
    image: "/ford-escape-negro.webp",
    hasAC: true
  },
  {
    id: 7,
    name: "JEEP PATRIOT",
    price: "1495.00",
    type: "SUV",
    passengers: 5,
    transmission: "Automático",
    bags: 4,
    year: 2014,
    color: "Negro",
    image: "/jeep-patriot-negro.webp",
    hasAC: true
  },
  {
    id: 8,
    name: "MAZDA BT50",
    price: "2070.00",
    type: "Pickup",
    passengers: 5,
    transmission: "Manual",
    bags: 6,
    year: 2018,
    color: "Navy",
    image: "/mazda-bt50-azul.webp",
    hasAC: true
  },
  {
    id: 9,
    name: "TOYOTA COROLLA",
    price: "1380.00",
    type: "Sedán",
    passengers: 4,
    transmission: "Automático",
    bags: 2,
    year: 2013,
    color: "Plateado",
    image: "/toyota-corolla-gris.webp",
    hasAC: true
  }
];