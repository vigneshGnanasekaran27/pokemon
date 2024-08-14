async function fetchData() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000');
        if (!response.ok) {
            throw new Error('Failed to fetch Pokémon list');
        }

        const data = await response.json();
        const tableBody = document.getElementById('pokemonTable');

        // Clear any existing rows
        tableBody.innerHTML = '';

        // Fetch details for each Pokémon in parallel
        const pokemonDetails = await Promise.all(data.results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            if (!pokemonResponse.ok) {
                throw new Error('Failed to fetch Pokémon details');
            }
            return pokemonResponse.json();
        }));

        // Store the details in a global variable for filtering
        window.pokemonDetails = pokemonDetails;

        // Populate the table
        populateTable(pokemonDetails);

    } catch (error) {
        console.error('Error:', error.message);
        alert('An error occurred while fetching Pokémon data.');
    }
}

function populateTable(pokemonDetails) {
    const tableBody = document.getElementById('pokemonTable');
    tableBody.innerHTML = ''; // Clear existing rows

    pokemonDetails.forEach((pokemon) => {
        const row = document.createElement('tr');

        // Name
        const nameCell = document.createElement('td');
        nameCell.textContent = pokemon.name;
        row.appendChild(nameCell);

        // Type
        const typeCell = document.createElement('td');
        typeCell.textContent = pokemon.types.map((typeInfo) => typeInfo.type.name).join(', ');
        row.appendChild(typeCell);

        // Ability
        const abilityCell = document.createElement('td');
        abilityCell.textContent = pokemon.abilities.map((abilityInfo) => abilityInfo.ability.name).join(', ');
        row.appendChild(abilityCell);

        // Weight
        const weightCell = document.createElement('td');
        weightCell.textContent = pokemon.weight;
        row.appendChild(weightCell);

        // Stats Combination
        const statsCell = document.createElement('td');
        const pokemonStatsCombined = pokemon.stats.map(statInfo => {
            return `${statInfo.stat.name}: ${statInfo.base_stat}`;
        }).join(', ');
        statsCell.textContent = pokemonStatsCombined;
        row.appendChild(statsCell);

        // Default Front Image
        const defaultFrontCell = document.createElement('td');
        const defaultFrontImg = document.createElement('img');
        defaultFrontImg.src = pokemon.sprites.front_default;
        defaultFrontImg.alt = `${pokemon.name} Front`;
        defaultFrontImg.width = 150;
        defaultFrontImg.height = 150;
        defaultFrontCell.appendChild(defaultFrontImg);
        row.appendChild(defaultFrontCell);

        // Default Back Image
        const defaultBackCell = document.createElement('td');
        const defaultBackImg = document.createElement('img');
        defaultBackImg.src = pokemon.sprites.back_default;
        defaultBackImg.alt = `${pokemon.name} Back`;
        defaultBackImg.width = 150;
        defaultBackImg.height = 150;
        defaultBackCell.appendChild(defaultBackImg);
        row.appendChild(defaultBackCell);

        // Shiny Front Image
        const shinyFrontCell = document.createElement('td');
        const shinyFrontImg = document.createElement('img');
        shinyFrontImg.src = pokemon.sprites.front_shiny;
        shinyFrontImg.alt = `${pokemon.name} Shiny Front`;
        shinyFrontImg.width = 150;
        shinyFrontImg.height = 150;
        shinyFrontCell.appendChild(shinyFrontImg);
        row.appendChild(shinyFrontCell);

     
        const shinyBackCell = document.createElement('td');
        const shinyBackImg = document.createElement('img');
        shinyBackImg.src = pokemon.sprites.back_shiny;
        shinyBackImg.alt = `${pokemon.name} Shiny Back`;
        shinyBackImg.width = 150;
        shinyBackImg.height = 150;
        shinyBackCell.appendChild(shinyBackImg);
        row.appendChild(shinyBackCell);

        // Append the row to the table
        tableBody.appendChild(row);
    });
}

function filterTable() {
    const nameFilter = document.getElementById('filterInput').value.toLowerCase();
    const typeFilter = document.getElementById('typeFilter').value.toLowerCase();

    const filteredPokemon = window.pokemonDetails.filter((pokemon) => {
        const matchesName = pokemon.name.toLowerCase().includes(nameFilter);
        const matchesType = typeFilter ? pokemon.types.some((typeInfo) => typeInfo.type.name.toLowerCase() === typeFilter) : true;
        return matchesName && matchesType;
    });

    populateTable(filteredPokemon);
}

// Call fetchData when the page loads
window.onload = fetchData;
