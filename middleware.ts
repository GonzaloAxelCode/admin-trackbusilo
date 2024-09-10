import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  
  // Si no hay token, redirige a la página de login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Verifica el token con tu API de autenticación
    const response = await fetch('https://apiexample.gonzaloaxelcode.workers.dev/verify/admin', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`,
      },
    });

    // Si la respuesta no es exitosa, redirige a la página de login
    if (!response.ok) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Continuar con la solicitud si el token es válido
    return NextResponse.next();
  } catch (error) {
    // Manejo de errores: Redirige a la página de login si hay un error en la solicitud
    console.error('Error during token verification:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Configura las rutas que quieres proteger con el middleware
export const config = {
  matcher: ['/'], // Cambia esto para ajustar las rutas protegidas
};
