import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Leemos la cookie 'session'
  const session = request.cookies.get('session');
  const { pathname } = request.nextUrl;

  // LOG DE DEPURACIÓN: Verás esto en tu terminal de VS Code
  console.log(`Ruta: ${pathname} | Sesión detectada: ${!!session}`);

  // 1. Proteger rutas privadas: Si no hay sesión y va a /cuenta, al login
  if (pathname.startsWith('/cuenta') && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. Evitar login doble: Si YA hay sesión y va a /login o /register, a /cuenta
  if ((pathname === '/login' || pathname === '/register') && session) {
    return NextResponse.redirect(new URL('/cuenta', request.url));
  }

  return NextResponse.next();
}

// El matcher debe incluir las rutas que quieres controlar
export const config = {
  matcher: ['/cuenta/:path*', '/login', '/register'],
};