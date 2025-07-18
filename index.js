let key = "bc1d472";

function search() {
    const inputTag = document.getElementById("movieTag");
    const movieName = inputTag.value.trim();

    if (!movieName) {
        alert("Please enter a movie title.");
        return;
    }

    const url = "https://www.omdbapi.com/?apikey=" + key + "&t=" + encodeURIComponent(movieName);

    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", url);
    httpRequest.responseType = "json";
    httpRequest.send();

    httpRequest.onload = function () {
        const movie = httpRequest.response;

        if (movie.Response === "False") {
            alert("Movie not found. Please try another title.");
            document.getElementById("movieInfo").style.display = "none";
            return;
        }

        document.getElementById("title").innerHTML = movie.Title || "N/A";
        document.getElementById("year").innerHTML = movie.Year || "N/A";
        document.getElementById("poster").src = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/180x260?text=No+Image";
        document.getElementById("poster").alt = movie.Title || "Movie Poster";
        document.getElementById("plot").innerHTML = movie.Plot || "No plot available.";

        // Show the movie card
        document.getElementById("movieInfo").style.display = "flex";
    };

    httpRequest.onerror = function () {
        alert("An error occurred while fetching movie data.");
        console.error("Network error");
    };

    console.log("Searching for:", movieName);
}
