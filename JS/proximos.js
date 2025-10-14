// proximos.js
const root = document.getElementById('root');

function cargarProximos() {
  // Limpiar contenido
  root.innerHTML = '';
  root.classList.remove('inicio'); // quitar la clase flex de inicio

  // Título
  const titulo = document.createElement('h2');
  titulo.textContent = 'Próximos Estrenos';
  root.appendChild(titulo);

  // Mensaje mientras carga
  const mensaje = document.createElement('p');
  mensaje.textContent = 'Cargando próximos animes...';
  root.appendChild(mensaje);

  // Grid
  const grid = document.createElement('div');
  grid.classList.add('grid');
  root.appendChild(grid);

  // Fetch a la API
  fetch('https://api.jikan.moe/v4/seasons/upcoming')
    .then(res => res.json())
    .then(data => {
      grid.innerHTML = ''; // limpiar mensaje y preparar grid
      if (!data.data || data.data.length === 0) {
        mensaje.textContent = 'No se encontraron próximos animes';
        return;
      }

      data.data.forEach(anime => {
        const card = document.createElement('div');
        card.classList.add('card');

        // Imagen
        const img = document.createElement('img');
        img.src = anime.images?.jpg?.image_url || '';
        img.alt = anime.title;

        // Título
        const h3 = document.createElement('h3');
        h3.textContent = anime.title;

        // Fecha de estreno
        const fecha = document.createElement('p');
        fecha.textContent = anime.aired?.from
          ? `Estreno: ${new Date(anime.aired.from).toLocaleDateString()}`
          : 'Fecha de estreno: Por confirmar';

        // Estudio
        const estudio = document.createElement('p');
        estudio.textContent = anime.studios?.length > 0
          ? `Estudio: ${anime.studios.map(s => s.name).join(', ')}`
          : 'Estudio: Desconocido';

        card.appendChild(img);
        card.appendChild(h3);
        card.appendChild(fecha);
        card.appendChild(estudio);

        grid.appendChild(card);
      });
    })
    .catch(err => {
      console.error(err);
      mensaje.textContent = 'Ocurrió un error al cargar los próximos animes.';
    });
}