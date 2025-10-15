// acerca.js

function cargarAcerca() {
  const root = document.getElementById('root');
  root.innerHTML = '';
  root.classList.remove('inicio');

  // Contenedor principal
  const contenedor = document.createElement('div');
  contenedor.classList.add('acerca-container');

  // Logo (puedes cambiar la imagen o usar un ícono)
  const logo = document.createElement('img');
  logo.src = 'Imagenes/Logo.png'; // Logo de ejemplo
  logo.alt = 'Logo AniTop';
  logo.classList.add('acerca-logo');
  contenedor.appendChild(logo);

  // Título
  const titulo = document.createElement('h2');
  titulo.textContent = 'AniTop';
  contenedor.appendChild(titulo);

  // Descripción
  const descripcion = document.createElement('p');
  descripcion.textContent = 'Un portal para explorar, descubrir y seguir los mejores animes del momento. Inspirado en el poder de las historias bonitas y hermosas como Japón. •w•';
  contenedor.appendChild(descripcion);

  // Autor
  const autor = document.createElement('p');
  autor.innerHTML = '<strong>Desarrollado por Andres Felipe Soler (GatoMeowMiau) •w•</strong>';
  contenedor.appendChild(autor);

  root.appendChild(contenedor);
}
