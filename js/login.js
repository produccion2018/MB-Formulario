// Selecciona el formulario de inicio de sesión
const loginForm = document.querySelector('#loginForm');

// Agrega un evento al enviar el formulario
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtiene los valores de email y contraseña
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Obtiene los usuarios almacenados en localStorage o crea un array vacío
    const Users = JSON.parse(localStorage.getItem('users')) || [];

    // Verifica si existe un usuario válido con los datos ingresados
    const validUser = Users.find(user => user.email === email && user.password === password);

    // Si no se encuentra el usuario, muestra un mensaje de error
    if (!validUser) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Usuario y/o contraseña incorrectos!',
        });
        return;
    }

    // Si el usuario es válido, muestra un mensaje de bienvenida
    Swal.fire({
        icon: 'success',
        title: `Bienvenido ${validUser.name}`,
        showConfirmButton: false,
        timer: 1500
    }).then(() => {
        // Guarda el usuario logueado en localStorage y redirige a la página principal
        localStorage.setItem('login_success', JSON.stringify(validUser));
        window.location.href = 'index.html';
    });
});
