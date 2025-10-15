// temporadas.js

function cargarTemporadas() {
  const root = document.getElementById('root');
  root.innerHTML = '';
  root.classList.remove('inicio');

  // Título
  const titulo = document.createElement('h2');
  titulo.textContent = 'Temporadas de Anime 2025';
  root.appendChild(titulo);

  // Contenedor del selector
  const selectContainer = document.createElement('div');
  selectContainer.style.marginBottom = '1rem';
  root.appendChild(selectContainer);

  // Selector de temporadas
  const select = document.createElement('select');
  select.innerHTML = `
    <option value="">Selecciona una temporada</option>
    <option value="winter">Invierno</option>
    <option value="spring">Primavera</option>
    <option value="summer">Verano</option>
    <option value="fall">Otoño</option>
  `;
  select.classList.add('season-select');
  selectContainer.appendChild(select);

  // Mensaje
  const mensaje = document.createElement('p');
  mensaje.textContent = 'Elige una temporada para ver los animes';
  root.appendChild(mensaje);

  // Grid
  const grid = document.createElement('div');
  grid.classList.add('grid');
  root.appendChild(grid);

  // Escuchar cambios en el select
  select.addEventListener('change', () => {
    const season = select.value;
    grid.innerHTML = '';
    mensaje.textContent = '';

    if (!season) {
      mensaje.textContent = 'Elige una temporada para ver los animes';
      return;
    }

    mensaje.textContent = 'Cargando...';

    fetch(`https://api.jikan.moe/v4/seasons/2025/${season}`)
      .then(res => res.json())
      .then(data => {
        grid.innerHTML = '';

        if (!data.data || data.data.length === 0) {
          mensaje.textContent = 'No se encontraron animes para esta temporada.';
          return;
        }

        mensaje.textContent = `Mostrando animes de ${season.charAt(0).toUpperCase() + season.slice(1)} 2025`;

        data.data.forEach(anime => {
          const card = document.createElement('div');
          card.classList.add('card');

          const img = document.createElement('img');
          img.src = anime.images?.jpg?.image_url || '';
          img.alt = anime.title;

          const h3 = document.createElement('h3');
          h3.textContent = anime.title;

          const p = document.createElement('p');
          p.textContent = anime.aired?.from
            ? `Estreno: ${new Date(anime.aired.from).toLocaleDateString('es-ES')}`
            : 'Sin fecha confirmada';

          card.appendChild(img);
          card.appendChild(h3);
          card.appendChild(p);

          grid.appendChild(card);
        });
      })
      .catch(err => {
        console.error(err);
        mensaje.textContent = 'Ocurrió un error al cargar los animes.';
      });
  });
}
