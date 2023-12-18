const MAX_POKEMON = 151;
let currentPokemon;
let pokemonId = 1;

async function loadPokemon() {
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  let response = await fetch(url);
  currentPokemon = await response.json();
  console.log("Informations:", currentPokemon);
}