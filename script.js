const MAX_POKEMON = 151;
let currentPokemon;
let pokemonId = 1;

async function loadPokemon() {
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  let response = await fetch(url);
  currentPokemon = await response.json();
  console.log("Informations:", currentPokemon['types']['0']['type']['name']);
}


async function loadPokeCards() {
await loadPokemon();
let renderContainer = document.getElementById('render_container');
renderContainer.innerHTML += renderPokeInfoCard(currentPokemon);
}



// renderfunctions

function renderPokeInfoCard(currentPokemon) {
return `
<div class="pokeInfoCard">
        <h1 id="PokeName">${currentPokemon['name']}</h1>
        <div class="containerForPokeImg">
          <div class="pokeCardShortInfo">
            <div class="infoCardGrey"><p id="PokeType">${currentPokemon['types']['0']['type']['name']}</p></div>
            <div class="infoCardGrey"><p id="PokeWeight">${currentPokemon['weight']} kg</p></div>
          </div>
          <img src="${currentPokemon['sprites']['front_shiny']}" alt="pokemonIMG" id="pokemonImg">
        </div>
      </div>
    </div>
`;
}