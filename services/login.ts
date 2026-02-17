import { URL_BASE_BACKEND } from '@/constants/globalconstants';
import Cookies from 'js-cookie';

async function handleLogin({ username, password }) {
  try {
    const response = await fetch(URL_BASE_BACKEND + '/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {

      Cookies.set('token', data.token, {
        expires: 7,
        secure: true,
        sameSite: 'strict',
      });

      window.location.href = '/dashboard';
      return { success: true, data };
    } else {
      console.log(data.error)
      return { success: false, error: data.error || 'Credenciales inválidas' };
    }
  } catch (err) {
    // error de red, backend caído, etc.
    return { success: false, error: 'Error de conexión al servidor' };
  }
}

export default handleLogin;
