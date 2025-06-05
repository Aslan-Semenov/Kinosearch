const key = "7d939fc5";

console.log("Скрипт загружен");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM загружен");

  const form = document.querySelector("form");
  const input = document.querySelector("input[type='search']");
  const main = document.querySelector("main");

  if (!form || !input || !main) {
    console.error("Не найдены элементы формы, поля ввода или main");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Форма отправлена");

    const query = input.value.trim();
    console.log("Введено:", query);

    if (!query) {
      main.innerHTML = `<p class="text-center text-warning mt-4">Введите название фильма</p>`;
      return;
    }

    main.innerHTML = `<p class="text-center text-info mt-4">Поиск...</p>`;

    const data = await searchMovies(query);

    if (!data || !data.length) {
      main.innerHTML = `<p class="text-center text-danger mt-4">Фильмы не найдены</p>`;
      return;
    }

    console.log("Найдено фильмов:", data.length);

    main.innerHTML = `
      <div class="container my-4">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          ${data
            .map(
              (movie) => `
            <div class="col">
              <div class="card h-100">
                <img src="${
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }" class="card-img-top" alt="${movie.Title}">
                <div class="card-body">
                  <h5 class="card-title">${movie.Title}</h5>
                  <p class="card-text"><small class="text-muted">${movie.Year}</small></p>
                </div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  });

  async function searchMovies(query) {
    const url = `https://www.omdbapi.com/?apikey=${key}&s=${encodeURIComponent(
      query
    )}&type=movie&page=1`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log("Ответ от API:", data);
      return data.Response === "True" ? data.Search : null;
    } catch (err) {
      console.error("Ошибка при запросе:", err);
      return null;
    }
  }
});