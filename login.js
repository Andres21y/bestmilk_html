document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.msg || 'Error en el login');
      return;
    }

    const data = await response.json();
    alert(`Bienvenido ${data.user.name}`);

    // Guardar token en localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    // Redirigir
    setTimeout(() => {
      window.location.href = '/home';
    }, 2000);

  } catch (error) {
    console.error('Error de conexión:', error);
    alert('El servidor no responde. Revisa si está encendido y el CORS configurado.');
  }
});