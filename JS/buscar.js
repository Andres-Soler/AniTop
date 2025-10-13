// buscar.js

const root = document.getElementById('root');

function cargarBuscar() {
  // Limpiar contenido
  root.innerHTML = '';

  // Crear título y input
  const titulo = document.createElement('h2');
  titulo.textContent = 'Buscar Anime';
  root.appendChild(titulo);

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Escribe el nombre del anime...';
  input.style.padding = '0.5rem';
  input.style.width = '300px';
  input.style.marginBottom = '1rem';
  root.appendChild(input);

  const mensaje = document.createElement('p');
  mensaje.textContent = 'Empieza a escribir para buscar';
  mensaje.style.color = '#005580'; // color estilo principal
  root.appendChild(mensaje);

  const grid = document.createElement('div');
  grid.classList.add('grid');
  root.appendChild(grid);

  // Escuchar cambios en el input
  let timeout;
  input.addEventListener('input', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const query = input.value.trim();
      if (!query) {
        mensaje.textContent = 'Empieza a escribir para buscar';
        grid.innerHTML = '';
        return;
      }

      mensaje.textContent = ''; // limpiar mensaje

      // Fetch a la API
      fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
          grid.innerHTML = ''; // limpiar grid

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
    }, 500); // delay para no spamear la API
  });
}