const params = window.location.pathname.split("/");
const pokemonId = params[2].toLowerCase(); 

fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then(res => {
        if (!res.ok) throw new Error("No se encontró el Pokémon");
        return res.json();
    })
    .then(pokemon => {
        const contenedor = document.getElementById("pokemon-detail");
        contenedor.innerHTML = `
        <div class="card flex flex-col items-center w-full p-4">
            <h1 class="text-2xl font-bold mb-4">${pokemon.name.toUpperCase()}</h1>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="w-45 h-auto mb-4">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-6">
                <div>
                    <p class="pb-2 whitespace-nowrap"><strong>N.°</strong> ${pokemon.id.toString().padStart(4, '0')}</p>
                    <p class="pb-2 whitespace-nowrap"><strong>Altura:</strong> ${pokemon.height} decímetros</p>
                    <p class="pb-2 whitespace-nowrap"><strong>Peso:</strong> ${pokemon.weight} hectogramos</p>
                </div>
                <div>
                    <p class="font-bold mb-1">Tipos:</p>
                    <div class="flex flex-wrap gap-2">
                        ${pokemon.types.map(t => `<p class="text-center ${t.type.name} px-3 py-1 rounded">${t.type.name}</p>`).join("")}
                    </div>
                </div>
            </div>
        </div>
    `;
    })
    .catch(err => {
        console.error(err);
        const contenedor = document.getElementById("pokemon-detail");
        contenedor.innerHTML = `<p style="color: white; font-size: 1.5rem;">Error al cargar el Pokémon. ¿Existe?</p>`;
    });
