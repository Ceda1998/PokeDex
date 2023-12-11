let currentPokemon;


async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/ditto';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('Informations:', currentPokemon);

    renderPokemonInfo();
}

function renderPokemonInfo() {
    let currentType = currentPokemon['types'];
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokemonImg').src = currentPokemon['sprites']['front_default'];
    document.getElementById('weight').innerHTML = `${currentPokemon['weight']} kg`;
    document.getElementById('type').innerHTML = currentType['0']['type']['name'];

}