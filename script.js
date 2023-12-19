const MAX_POKEMON = 151;
let currentPokemon;
let pokemonId = 1;

let colors = {
  grass: '#46D1B1',
  fire: '#FA6555',
  water: '#76BDFD',
  electric: '#FFD970',
  poison:'#ae63b2',
  ground:'#baa76d',
  rock:'545454',
  ghost:'5a0096',
  ice:'#38eeff',
  normal: '#929292',
  default: '#3d3d3d'
};

async function loadPokemon() {
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  let response = await fetch(url);
  currentPokemon = await response.json();
  console.log("Informations:", currentPokemon["types"]["0"]["type"]["name"]);
}

async function loadPokeCards() {
  for (let i = 1; i <= MAX_POKEMON; i++) {
    pokemonId = i;
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    await loadPokemon(url);
    let renderContainer = document.getElementById("render_container");
    renderContainer.innerHTML += renderPokeInfoCard(currentPokemon);
    colorOfInfoCard(i); // Übergabe des Index für die Klasse
  }
}

function colorOfInfoCard(index) {
  let smallPokeCard = document.getElementsByClassName('smallPokeCard')[index - 1];
  let pokemonType = currentPokemon["types"]["0"]["type"]["name"];
  let backgroundColor = colors[pokemonType] || colors['default'];
  if (pokemonType == 'grass') {
    smallPokeCard.style.backgroundColor = backgroundColor;
  } else {
    smallPokeCard.style.backgroundColor = colors['default'];
  }
  if (pokemonType == 'fire') {
    smallPokeCard.style.backgroundColor = backgroundColor;
  }
  if (pokemonType == 'water') {
    smallPokeCard.style.backgroundColor = backgroundColor;
  }
  if (pokemonType == 'electric') {
    smallPokeCard.style.backgroundColor = backgroundColor;
  }
  if (pokemonType == 'normal') {
    smallPokeCard.style.backgroundColor = backgroundColor;
  }
  if (pokemonType == 'poison') {
    smallPokeCard.style.backgroundColor = backgroundColor;
  }
  if (pokemonType == 'ground') {
    smallPokeCard.style.backgroundColor = backgroundColor;
  }
  if (pokemonType == 'rock') {
    smallPokeCard.style.backgroundColor = backgroundColor;
  }
  if (pokemonType == 'ice') {
    smallPokeCard.style.backgroundColor = backgroundColor;
  }
  if (pokemonType == 'ghost') {
    smallPokeCard.style.backgroundColor = backgroundColor;
  }
}

// renderfunctions

function renderPokeInfoCard(currentPokemon) {
  return `
<div class="pokeInfoCard smallPokeCard">
  <h1 id="PokeName">${currentPokemon["name"]}</h1>
  <div class="containerForPokeImg">
    <div class="pokeCardShortInfo">
      <div class="infoCardGrey"><p id="PokeType">${currentPokemon["types"]["0"]["type"]["name"]}</p></div>
      <div class="infoCardGrey"><p id="PokeWeight">${currentPokemon["weight"]} kg</p></div>
    </div>
    <img src="${currentPokemon["sprites"]["front_shiny"]}" alt="pokemonIMG" id="pokemonImg">
  </div>
</div>`;
}
