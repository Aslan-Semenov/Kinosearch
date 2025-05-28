const key = "7d939fc5";

console.log("Скрипт загружен ✅");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM загружен ✅");

  const form = document.querySelector("form");
  const input = document.querySelector("input[type='search']");
  const main = document.querySelector("main");

  if (!form || !input || !main) {
    console.error("❌ Не найдены элементы формы, поля ввода или main");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Форма отправлена ✅");

    const title = input.value.trim();
    console.log("Введено:", title);

    if (!title) {
      main.innerHTML = `<p class="text-center text-warning mt-4">Введите название фильма</p>`;
      return;
    }

    main.innerHTML = `<p class="text-center text-info mt-4">Поиск...</p>`;

    const data = await getMovieData(title);

    if (!data) {
      main.innerHTML = `<p class="text-center text-danger mt-4">Фильм не найден</p>`;
      return;
    }

    console.log("Данные получены ✅", data);

    main.innerHTML = `
      <div class="container my-5">
        <div class="card text-dark">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${data.Poster}" class="img-fluid rounded-start" alt="${data.Title}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${data.Title} (${data.Year})</h5>
                <p class="card-text">${data.Plot}</p>
                <p class="card-text"><small class="text-muted">Режиссёр: ${data.Director}</small></p>
                <p class="card-text"><small class="text-muted">IMDB: ${data.imdbRating}</small></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  async function getMovieData(title) {
    const url = `https://www.omdbapi.com/?apikey=${key}&t=${encodeURIComponent(title)}&plot=short`;
    console.log("Отправляется запрос на:", url);

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log("Ответ от API:", data);
      return data.Response === "True" ? data : null;
    } catch (err) {
      console.error("Ошибка при запросе:", err);
      return null;
    }
  }
});