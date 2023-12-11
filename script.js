let currentPokemon;
let pokemonId = 1;


async function loadPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('Informations:', currentPokemon);
   
    renderPokemonInfo();
}

function renderPokemonInfo() {
    let renderContainer = document.getElementById('render_Container');
    renderContainer.innerHTML += renderPokeCard();
    let currentType = currentPokemon['types'];
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokemonImg').src = currentPokemon['sprites']['front_default'];
    document.getElementById('weight').innerHTML = `${currentPokemon['weight']} kg`;
    document.getElementById('type').innerHTML = currentType['0']['type']['name'];
    
}

function renderPokeCard() {
    return `
    <div class="card m-2" style="width: 18rem">
      <img src="" id="pokemonImg" />
      <div class="card-body bg-secondary-subtle">
        <div class="cardheader_container">
          <p id="cardheaderLinkAbout">About</p>
          <p id="cardheaderLinkStats">Stats</p>
        </div>
        <h5 class="card-title" id="pokemonName"></h5>
        <div class="info_container">
          <p id="weight">Weight:</p>
          <p id="type">Type:</p>
        </div>
      </div>
    </div>
    `;
}