const MAX_POKEMON = 151;
let pokemonId = 1;
let allPokemon = [];
let allPokemonNames = [];
let currentSearchResults = [];

let colors = {
  grass: "#46D1B1",
  fire: "#FA6555",
  water: "#76BDFD",
  electric: "#FFD970",
  poison: "#ae63b2",
  ground: "#baa76d",
  rock: "#545454",
  ghost: "5a0096",
  ice: "#38eeff",
  normal: "#929292",
  default: "#3d3d3d",
};

// fetch Data

async function loadPokemon() {
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  let response = await fetch(url);
  return await response.json();
}

async function loadPokeCards() {
  pokemonId = 1;
  for (let i = 0; i <= MAX_POKEMON; i++) {
    let pkm = await loadPokemon();
    pokemonId++;
    allPokemon[i] = pkm;
    allPokemonNames[i] = pkm.name;
    let renderContainer = document.getElementById("render_container");
    renderContainer.innerHTML += renderPokeInfoCard(i);
    colorOfInfoCard(i);
  }
}

// set Color

function colorOfInfoCard(index) {
  let smallPokeCard = document.getElementsByClassName("smallPokeCard")[index];
  let pokemonType = allPokemon[index].types[0].type.name;
  let backgroundColor = colors[pokemonType] || colors["default"];
  smallPokeCard.style.backgroundColor = backgroundColor;
}

// searchfunction

let searchInput = document.getElementById("searchField");
searchInput.addEventListener("input", (searchWhileTyping) => {
  search_term = searchWhileTyping.target.value.toLowerCase();
  let searchResults = allPokemonNames.filter((pokemonName) =>
    pokemonName.toLowerCase().includes(search_term)
  );

  console.log(searchResults);
  showSearchResults();
});

function showSearchResults() {
  let searchField = document.getElementById("searchField").value;
  let renderContainer = document.getElementById("render_container");
  renderContainer.innerHTML = "";

  if (searchField == 0) {
    loadPokeCards();
  } else {
    const filteredPokemon = allPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchField)
    );

    filteredPokemon.forEach((pokemon, index) => {
      const pokemonIndex = allPokemon.findIndex((currentPokemonIndex) => currentPokemonIndex.name === pokemon.name);
      renderContainer.innerHTML += renderPokeInfoCard(pokemonIndex);
      colorOfInfoCard(index);
    });
  }
}

// open and close Cards

async function openBigInfoCard(i) {
  let renderContainer = document.getElementById("render_container");
  renderContainer.innerHTML = renderbigInfoCard(i);
  aboutInformation(i);
}

function closeBigInfoCard(event) {
  if (event) event.stopPropagation();

  let element = document.getElementById("closingContainer");
  element.style.display = "none";
  loadPokeCards();
}

// pokemonInformation functions

function aboutInformation(i) {
  let infoContainer = document.getElementById("renderInformations");
  let pokemon = allPokemon[i];
  infoContainer.innerHTML = renderAboutInformation(pokemon);
}

function baseStatsInformation(i) {
  let infoContainer = document.getElementById("renderInformations");
  let pokemon = allPokemon[i];
  infoContainer.innerHTML = renderBaseStats(pokemon);
}

// renderfunctions

function renderPokeInfoCard(i) {
  let pokemon = allPokemon[i];

  return `
    <div class="pokeInfoCard smallPokeCard" onclick="openBigInfoCard(${i})">
      <h1 id="PokeName">${pokemon.name}</h1>
  <div class="containerForPokeImg">
    <div class="pokeCardShortInfo">
      <div class="infoCardGrey"><p id="PokeType">${pokemon.types[0].type.name}</p></div>
      <div class="infoCardGrey"><p id="PokeWeight">${pokemon.weight} kg</p></div>
    </div>
    <img src="${pokemon.sprites.front_shiny}" alt="pokemonIMG" id="pokemonImg">
  </div>
</div>`;
}

function renderbigInfoCard(i) {
  let pokemon = allPokemon[i];

  return `
  <div class="renderBigInfo_container" id="closingContainer" onclick="closeBigInfoCard(event)">
        <div class="bigInfo_Container" onclick="event.stopPropagation()">
          <img src="${pokemon.sprites.front_shiny}" alt="pokemon" class="pokeImgBigInfo">
        <div class="pokemonInfoContainer">
          <div class="pokeStatsHeader">
            <div id="about" onclick="aboutInformation(${i})"> 
              <h2>About</h2>
            </div>
            <div id="BaseStats" onclick="baseStatsInformation(${i})"> 
              <h2>BaseStats</h2>
            </div>
          </div>
          <div id="renderInformations">
          </div>
        </div>
        </div>
      </div>
  `;
}

function renderAboutInformation(pokemon) {
  console.log(pokemon);
  return `
  <div class="aboutInformation">
   <div class="infosContainer"><p class="infoHeadline">Name:</p> <p class="infos">${pokemon.name}</p></div>
   <div class="infosContainer"><p class="infoHeadline">Type:</p> <p class="infos">${pokemon.types[0].type.name}</p></div>
   <div class="infosContainer"><p class="infoHeadline">Weight:</p><p class="infos">${pokemon.weight} kg </p></div>
  </div>
  `;
}

function renderBaseStats(pokemon) {
  console.log(pokemon);
  return `
  <div class="baseStatsInfo_Container">
  <div class="infoBar">
  <p class="infoText">HP</p>
  <div id="baseStatsInfo">
  <div id="percentBar" style="width: ${pokemon.stats[0].base_stat}%"></div>
  </div>
  </div>
  <div class="infoBar">
  <p class="infoText">attack</p>
  <div id="baseStatsInfo">
  <div id="percentBar" style="width: ${pokemon.stats[1].base_stat}%"></div>
  </div>
  </div>
  <div class="infoBar">
  <p class="infoText">defense</p>
  <div id="baseStatsInfo">
  <div id="percentBar" style="width: ${pokemon.stats[2].base_stat}%"></div>
  </div>
  </div>
  <div class="infoBar">
  <p class="infoText">special-attack</p>
  <div id="baseStatsInfo">
  <div id="percentBar" style="width: ${pokemon.stats[3].base_stat}%"></div>
  </div>
  </div>
  <div class="infoBar">
  <p class="infoText">special-defense</p>
  <div id="baseStatsInfo">
  <div id="percentBar" style="width: ${pokemon.stats[4].base_stat}%"></div>
  </div>
  </div>
  <div class="infoBar">
  <p class="infoText">speed</p>
  <div id="baseStatsInfo">
  <div id="percentBar" style="width: ${pokemon.stats[5].base_stat}%"></div>
  </div>
  </div>
  </div>
  `;
}
