import Cookies from 'js-cookie';

async function toggleUserActiveStatus(userId, activeUser) {
  try {
    const response = await fetch(`https://apiexample.gonzaloaxelcode.workers.dev/users/${userId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`, // Asegúrate de tener el token de administrador en la cookie
      },
      body: JSON.stringify({ active_user: activeUser }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Estado del usuario actualizado:', data.message);
      // Muestra un mensaje de éxito o actualiza la interfaz de usuario
    } else {
      console.error('Error al actualizar el estado del usuario:', data.message);
      // Maneja el error de actualización aquí
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    // Maneja errores de la solicitud aquí
  }
}

export default toggleUserActiveStatus;
