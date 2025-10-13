// buscar.js
const root = document.getElementById('root');

function cargarBuscar() {
  // Limpiar contenido
  root.innerHTML = '';
  root.classList.remove('inicio'); // <--- importante

  // Crear título
  const titulo = document.createElement('h2');
  titulo.textContent = 'Buscar Anime';
  root.appendChild(titulo);

  // Crear input
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Escribe el nombre del anime...';
  input.classList.add('search-input');
  root.appendChild(input);

  // Crear mensaje inicial
  const mensaje = document.createElement('p');
  mensaje.textContent = 'Empieza a escribir para buscar';
  root.appendChild(mensaje);

  // Crear grid
  const grid = document.createElement('div');
  grid.classList.add('grid');
  root.appendChild(grid);

  // Escuchar input
  let timeout;
  input.addEventListener('input', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const query = input.value.trim();
      grid.innerHTML = '';
      if (!query) {
        mensaje.textContent = 'Empieza a escribir para buscar';
        return;
      }

      mensaje.textContent = '';

      fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
          if (!data.data || data.data.length === 0) {
            mensaje.textContent = 'No se encontraron resultados';
            return;
          }

          data.data.forEach(anime => {
            const card = document.createElement('div');
            card.classList.add('card');

            const img = document.createElement('img');
            img.src = anime.images?.jpg?.image_url || '';
            img.alt = anime.title;

            const h3 = document.createElement('h3');
            h3.textContent = anime.title;

            const p = document.createElement('p');
            p.textContent = anime.synopsis ? anime.synopsis.slice(0, 100) + '...' : 'Sin descripción';

            card.appendChild(img);
            card.appendChild(h3);
            card.appendChild(p);

            grid.appendChild(card);
          });
        })
        .catch(err => {
          console.error(err);
          mensaje.textContent = 'Ocurrió un error al buscar.';
        });
    }, 500);
  });
}