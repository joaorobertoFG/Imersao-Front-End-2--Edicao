const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');
const artistContainer = document.querySelector('.grid-container'); // Onde os artistas serão exibidos

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${encodeURIComponent(searchTerm)}`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result, searchTerm));
}

function displayResults(result, searchTerm) {
    
    if (result.length === 0) {
        resultPlaylist.classList.remove("hidden");
        resultArtist.classList.add("hidden");
        return;
    }

    artistContainer.innerHTML = "";

    const filteredArtists = result.filter(artist => artist.name.toLowerCase().includes(searchTerm.toLowerCase()));

    if (filteredArtists.length === 0) {
        resultPlaylist.classList.remove("hidden");
        resultArtist.classList.add("hidden");
        return;
    }

    filteredArtists.forEach(artist => {
        const artistCard = document.createElement("div");
        artistCard.classList.add("artist-card");

        artistCard.innerHTML = `
            <div class="card-img">
                <img src="${artist.urlImg}" class="artist-img" alt="${artist.name}" />
                <div class="play">
                    <span class="fa fa-solid fa-play"></span>
                </div>
            </div>
            <div class="card-text">
                <span class="artist-name">${artist.name}</span>
                <span class="artist-categorie">${artist.genre}</span>
            </div>
        `;

        artistContainer.appendChild(artistCard);
    });

    resultPlaylist.classList.add("hidden");
    resultArtist.classList.remove("hidden");
}

searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.trim();

    // Quando o campo de pesquisa está vazio, exibe a tela inicial
    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        return;
    }

    requestApi(searchTerm);
});
