// Declared variables
let URL = "https://pokeapi.co/api/v2/pokemon/";
const pokemonContainer = document.querySelector("#contenedor-pokemones");
const filterType = document.querySelector("#filter-type");
let loadedPokemons = [];
let offset = 0;
const limit = 12;

// Function to paint pokemons in the DOM
function showPokemons(pokemon, number) {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="card card flex flex-col items-center">
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="w-45 h-auto">
        <p class="self-start pb-2 pl-6 whitespace-nowrap">N.°${number.toString().padStart(4, '0')}</p>
        <p class="self-start pb-2 pl-6 whitespace-nowrap text-xl font-bold">${pokemon.name}</p>
        <div class="flex space-x-4">
          ${pokemon.types.map(t => `<p class="text-center ${t.type.name} pl-3 pr-3">${t.type.name}</p>`).join("")}
        </div>
      </div>
    `;
    pokemonContainer.append(div);
}

// Function to fetch pokemons from the API
function getPokemonsFromApi(offset, limit) {
    const promesas = [];
    for (let i = offset + 1; i <= offset + limit; i++) {
        promesas.push(fetch(URL + i).then(res => res.json()).then(data => ({ ...data, number: i })));
    }
    return Promise.all(promesas);
}

// Function to sort and show pokemons
function loadPokemons() {
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("hidden");

    getPokemonsFromApi(offset, limit).then(pokemones => {
        pokemones.sort((a, b) => a.number - b.number);
        loadedPokemons.push(...pokemones);

        showAllPokemons(); 

        spinner.classList.add("hidden");
    });

    offset += limit;
}

// Function to show all pokemons based on the selected type
function showAllPokemons() {
    const selectedType = filterType.value;
    pokemonContainer.innerHTML = "";

    const toShow = selectedType
        ? loadedPokemons.filter(pokemon =>
            pokemon.types.some(t => t.type.name === selectedType))
        : loadedPokemons;

    toShow.forEach(pokemon => showPokemons(pokemon, pokemon.number));
}

// First load of pokemons
loadPokemons();

// Event listener for the load more button
filterType.addEventListener("change", () => {
    showAllPokemons();
});

  
  
