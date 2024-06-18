

// STEP 1: Grab this DATA from the form
async function handleSubmit(event){
    event.preventDefault();
    
    // grab our seaarch terms from the form
    // console.log(event)
    const search = event.target.search.value;
    console.log(search);
    
    const pokemonData = await fetchPokemonData(search);
    console.log(pokemonData)
    
    displayPokemon(pokemonData);
}


// STEP 2: Making a GET Request to our API

async function fetchPokemonData(pokemon){
    
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    return await response.json()
}

// create  a globaal id value that we increment (Option 1 for unique)
// let id = 1

// STEP 3: Make Cards for our Display
function displayPokemon(pokemonData) {
    
    const id = Math.floor(Math.random() * 100000) //fake id creation
    const html = `<div class="card bg-dark border rounded shadow text-white p-4 mx-auto">
                        <div class="d-md-flex">
                        <div class="border rounded" id="image">
                            <img src=${pokemonData.sprites.other['dream_world']['front_default']} class="img-fluid" alt=${pokemonData.name}>
                        </div>
                        <div class="mt-3 mt-md-0 ms-md-3" id="text">
                            <h1>${pokemonData.species.name}</h1>
                            <p>Type(s): ${pokemonData.types.map(typeObj => typeObj.type.name).join(', ')}</p>
                            <p>Abilities: ${pokemonData.abilities.map(abilityObj => abilityObj.ability.name).join(', ')}</p>
                            <p>Stats: ${pokemonData.stats.map(statObj => `${statObj.stat.name} - ${statObj.base_stat}`).join(', ')} </p>
                            <button onclick=deletePokemonData(${id}) class="btn btn-outline-info">Delete</button>
                        </div>
                        </div>
                    </div>
    `
    // create a new object we can append to our document
    const card = document.createElement('div');
    card.setAttribute('id', id)
    card.innerHTML = html;
    
    // find the parent to append to
    const display = document.getElementById("pokemon-display");
    display.appendChild(card);
}

function deletePokemonData(id) {
    const card = document.getElementById(id);
    if (card) {
        card.parentNode.removeChild(card)
    }
}