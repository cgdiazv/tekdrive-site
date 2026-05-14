import type { Metadata } from "next";
// 1. Importamos Roboto en lugar de Geist
import { Roboto } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// 2. Configuramos Roboto con los grosores que necesitamos
const roboto = Roboto({
  weight: ['300', '400', '500', '700'], // Ligera, Normal, Medio, Negrita
  subsets: ["latin"],
  variable: "--font-roboto",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Tekdrive Rent a Car",
  description: "Renta de autos seguros y confiables",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      // 3. Inyectamos la variable de Roboto
      className={`${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        
        <main className="flex-1">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}