const contenedorPokemones = document.querySelector("#contenedor-pokemones");
let URL = "https://pokeapi.co/api/v2/pokemon/";
let offset = 0;
const limit = 12;
const filtroTipo = document.querySelector("#filter-type");
let pokemonesCargados = [];

function cargarPokemones() {
    const promesas = [];
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("hidden"); // mostrar el spinner

    const inicio = offset + 1;
    const fin = offset + limit;

    for (let i = inicio; i <= fin; i++) {
        promesas.push(
            fetch(URL + i)
                .then(res => res.json())
                .then(data => ({ ...data, numero: i }))
        );
    }

    Promise.all(promesas).then(pokemones => {
        pokemones.sort((a, b) => a.numero - b.numero);
        pokemonesCargados.push(...pokemones);

        const tipoSeleccionado = filtroTipo.value;
        const aMostrar = tipoSeleccionado
            ? pokemones.filter(pokemon =>
                pokemon.types.some(t => t.type.name === tipoSeleccionado)
            )
            : pokemones;

        aMostrar.forEach(pokemon => mostrarPokemon(pokemon, pokemon.numero));
        spinner.classList.add("hidden"); // ocultar el spinner después de cargar
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

filtroTipo.addEventListener("change", () => {
    const tipoSeleccionado = filtroTipo.value;

    // Limpiar el contenedor
    contenedorPokemones.innerHTML = "";

    // Filtrar y volver a mostrar
    const filtrados = tipoSeleccionado
        ? pokemonesCargados.filter(pokemon =>
            pokemon.types.some(t => t.type.name === tipoSeleccionado))
        : pokemonesCargados;

    filtrados.forEach(pokemon => mostrarPokemon(pokemon, pokemon.numero));
});

  
  
