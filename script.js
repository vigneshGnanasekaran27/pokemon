
const pokemonList = [
  "Pikachu", "Charizard","Charmander", "Bulbasaur", "Squirtle", "Jigglypuff", "Meowth", "Eevee", "Snorlax",
  "Gengar", "Mewtwo", "Mew", "Lapras", "Alakazam", "Machamp", "Gyarados", "Rhydon", "Dragonite",
  "Arcanine", "Tyranitar", "Salamence", "Blaziken", "Lucario", "Greninja", "Gardevoir", "Jolteon",
  "Flareon", "Vaporeon", "Espeon", "Umbreon", "Sylveon", "Scyther", "Kabutops", "Omastar", "Tyranitar",
  "Gengar", "Gyarados", "Charizard", "Blastoise", "Venusaur", "Pidgeot", "Rattata", "Ekans", "Arbok",
  "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Poliwhirl", "Poliwrath", "Machop", "Machoke",
  "Machamp", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash",
  "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetch'd", "Doduo", "Dodrio", "Seel", "Dewgong",
  "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee",
  "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Deoxys", "Registeel"
];

 
function populateDatalist() {
  const datalist = document.getElementById("pokemonNames");
  
  pokemonList.forEach(pokemon => {
    const option = document.createElement("option");
    option.value = pokemon;
    datalist.appendChild(option);
  });
}
 
populateDatalist();

async function fetchdata() {
  try {
    const pokemonName = document.getElementById("pokemonname").value.toLowerCase();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    
    if (!response.ok) {
      throw new Error("Could not fetch the response");
    }
    
    const data = await response.json();
    console.log(data);

   
    const pokemonSprite = data.sprites.front_default;
    const imageElement = document.getElementById("pokemonSprite");
    imageElement.src = pokemonSprite;
    imageElement.style.display = "block";

    const pokemonSpriteBack = data.sprites.back_default;
    const imageElementBack = document.getElementById("pokemonSpriteBack");
    imageElementBack.src = pokemonSpriteBack;
    imageElementBack.style.display = "block";

  
     const pokemonType = data.types.map(typeInfo => typeInfo.type.name).join(', ');
     document.getElementById("pokemonType").innerHTML = `<span class="label">Type:</span> <span class="value">${pokemonType}</span>`;
  
     const pokemonSpecies = data.species.name;
     document.getElementById("pokemonSpecies").innerHTML = `<span class="label">Species:</span> <span class="value">${pokemonSpecies}</span>`;
  
     const pokemonAbilities = data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');
     document.getElementById("pokemonAbilities").innerHTML = `<span class="label">Abilities:</span> <span class="value">${pokemonAbilities}</span>`;
 
    
     const pokemonWeight = data.weight;
     document.getElementById("pokemonWeight").innerHTML = `<span class="label">Weight:</span> <span class="value">${pokemonWeight} kg</span>`;
     const pokemonHeight = data.height;
     document.getElementById("pokemonHeight").innerHTML = `<span class="label">Height:</span> <span class="value">${pokemonHeight} Inches</span>`;
 
    const pokemonStatsCombined = data.stats.map(statInfo => {
    return `${statInfo.stat.name}: ${statInfo.base_stat}`;
          }).join(', ');
      document.getElementById("pokemonStats").innerHTML = `<span class="label">Stats:</span> <span class="value">${pokemonStatsCombined}</span>`;
      
  } catch (error) {
    console.log(error);
  }
}

// https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_name