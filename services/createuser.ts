import Cookies from 'js-cookie';

async function handleRegister({ username, password }) {
  try {
    const response = await fetch('https://apiexample.gonzaloaxelcode.workers.dev/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`, // Asegúrate de tener el token de administrador en la cookie
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Registro exitoso:', data.message);
      // Redirige al usuario a la página de perfil o dashboard, o muestra un mensaje de éxito
    
    } else {
      console.error('Registro fallido:', data.error);
      // Maneja el error de registro aquí
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    // Maneja errores de la solicitud aquí
  }
}

export default handleRegister;
