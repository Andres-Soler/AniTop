async function cargarTopAnime() {
  const root = document.getElementById("root");
  root.className = ""; // quitamos la clase 'inicio' si está
  root.innerHTML = "<h2>Cargando los mejores animes...</h2>";

  try {
    const res = await fetch("https://api.jikan.moe/v4/top/anime");
    const data = await res.json();

    root.innerHTML = "<h2>Top Animes</h2>";
    const contenedor = document.createElement("div");
    contenedor.classList.add("grid");

    data.data.forEach(anime => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
        <h3>${anime.title}</h3>
        <p>${anime.score ?? 'N/A'}</p>
      `;

      contenedor.appendChild(card);
    });

    root.appendChild(contenedor);
  } catch (err) {
    root.innerHTML = "<p>Error al cargar los animes. Intenta nuevamente</p>";
    console.error(err);
  }
}