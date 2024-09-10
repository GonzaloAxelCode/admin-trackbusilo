import Cookies from 'js-cookie';

async function handleLogin({ username, password }) {

  const response = await fetch('https://apiexample.gonzaloaxelcode.workers.dev/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (response.ok) {
    // Guarda el token en una cookie
    Cookies.set('token', data.token, { expires: 7, secure: true, sameSite: 'strict' });

    // Redirige al usuario a la página de perfil o dashboard
    window.location.href = '/';
    return true
  } else {
    return false

  }
}
export default handleLogin