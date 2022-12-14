$(".movie-search").on("click", function () {
  $.ajax({
    url: "https://www.omdbapi.com/?apikey=df8865f1&s=" + $(".input-movie").val(),
    success: (result) => {
      const movies = result.Search;
      let cards = "";
      movies.forEach((m) => {
        cards += showMovie(m);

        $(".movies-container").html(cards);
      });

      $(".modal-toggle-button").on("click", function () {
        $.ajax({
          url: "https://www.omdbapi.com/?apikey=df8865f1&i=" + $(this).data("imdbid"),
          success: (m) => {
            const movieDetail = showMovieDetail(m);
            $(".modal-body").html(movieDetail);
          },
        });
      });
    },
    error: (e) => {
      console.log(e.responseText);
    },
  });
});

function showMovie(m) {
  return `
  <div class="col-md-3 my-3">
      <div class="card"">
        <img src="${m.Poster}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${m.Title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
          <button class="btn btn-primary modal-toggle-button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-imdbid="${m.imdbID}">Show Detail</button>
        </div>
      </div>
  </div>
`;
}

function showMovieDetail(m) {
  return `
<div class="row">
  <div class="col-md-4">
    <img src="${m.Poster}" class="img-fluid"/>
  </div>
  <div class="col-md">
    <ul class="list-group">
      <li class="list-group-item"><h4>${m.Title} ${m.Year}</h4></li>
      <li class="list-group-item"><strong>Director  : </strong>${m.Director}</li>
      <li class="list-group-item"><strong>Actors  : </strong>${m.Actors}</li>
      <li class="list-group-item"><strong>Writer  : </strong>${m.Writer}</li>
      <li class="list-group-item"><strong>Plot  : </strong><br>${m.Plot}</li>
    </ul>
  </div>
</div>

`;
}
