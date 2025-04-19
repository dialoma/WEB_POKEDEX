const contenedorPokemones = document.querySelector("#contenedor-pokemones");
let URL = "https://pokeapi.co/api/v2/pokemon/";
let offset = 0;
const limit = 12;

function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  }

function cargarPokemones() {
    const promesas = [];
  
    for (let i = offset + 1; i <= offset + limit; i++) {
      promesas.push(
        fetch(URL + i).then(res => res.json()).then(data => ({ ...data, numero: i }))
      );
    }
  
    Promise.all(promesas).then(pokemones => {
      pokemones
        .sort((a, b) => a.numero - b.numero) // ordenar por número
        .forEach(pokemon => mostrarPokemon(pokemon, pokemon.numero));
    });
  
    offset += limit;
  }
  
  cargarPokemones();

  function mostrarPokemon(data, numero) {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="tarjeta card flex flex-col items-center">
        <img src="${data.sprites.front_default}" alt="${data.name}" class="w-45 h-auto">
        <p class="self-start pb-2 pl-6 whitespace-nowrap">N.°${numero.toString().padStart(4, '0')}</p>
        <p class="self-start pb-2 pl-6 whitespace-nowrap text-xl font-bold">${data.name}</p>
        <div class="flex space-x-4">
          ${data.types.map(t => `<p class="text-center ${t.type.name} pl-3 pr-3">${t.type.name}</p>`).join("")}
        </div>
      </div>
    `;
    contenedorPokemones.append(div);
  }

  setTimeout(() => {
    contenedorPokemones.appendChild(div);
  }, index * 100);

  
  
