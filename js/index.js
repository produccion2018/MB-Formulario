const user = JSON.parse(localStorage.getItem('login_success')) || false
if(!user){
    window.location.href = 'login.html'
}

const logout = document.querySelector('#logout')

logout.addEventListener('click', () => {
  Swal.fire({
      icon: 'info',
      title: 'Hasta pronto!',
      text: 'Has cerrado sesión correctamente.',
      confirmButtonText: 'OK'
  }).then(() => {
      localStorage.removeItem('login_success')
      window.location.href = 'login.html'
  })
})


//buscar peliculas

// API de OMDB o TMDB. Sustituye `YOUR_API_KEY` con tu clave de API.
const API_URL = 'https://www.omdbapi.com/?apikey=YOUR_API_KEY&type=movie&s=';

function buscarPeliculas(query) {
  // Verifica si hay texto de búsqueda
  if (!query) {
    Swal.fire('Error', 'Por favor ingresa un término de búsqueda.', 'error');
    return;
  }
  
  // Llama a la API
  fetch(`${API_URL}${query}`)
    .then(response => response.json())
    .then(data => {
      if (data.Response === 'False') {
        Swal.fire('Sin resultados', 'No se encontraron películas.', 'info');
      } else {
        mostrarResultados(data.Search);
      }
    })
    .catch(error => Swal.fire('Error', 'Hubo un problema con la búsqueda.', 'error'));
}

// Muestra los resultados en SweetAlert2
function mostrarResultados(peliculas) {
  // Construye el contenido HTML con los resultados
  const contenido = peliculas.map(pelicula => `
    <div style="display: flex; align-items: center; margin-bottom: 10px;">
      <img src="${pelicula.Poster !== 'N/A' ? pelicula.Poster : './img/icons8-movie-50.png'}" alt="${pelicula.Title}" style="width: 50px; height: 75px; margin-right: 10px;">
      <div>
        <strong>${pelicula.Title}</strong> (${pelicula.Year})
      </div>
    </div>
  `).join('');

  Swal.fire({
    title: 'Resultados de búsqueda',
    html: contenido,
    width: 600,
    showCloseButton: true,
    focusConfirm: false,
  });
}

// Escucha el formulario de búsqueda
document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();
  const query = document.querySelector('input[type="search"]').value;
  buscarPeliculas(query);
});
