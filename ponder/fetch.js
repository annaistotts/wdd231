const url = "https://pokeapi.co/api/v2/pokemon/ditto";
const urlList = "https://pokeapi.co/api/v2/pokemon";
let results = null;

// Reusable fetch function with callback
async function getPokemon(url, doThis) {
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    doThis(data); // Callback
  } else {
    console.error("Fetch error:", response.status);
  }
}

// Show single Pokémon (Ditto)
function doStuff(data) {
  results = data;
  const outputElement = document.querySelector("#output");
  const html = `
    <h2>${data.name}</h2>
    <img src="${data.sprites.front_default}" alt="Image of ${data.name}">
  `;
  outputElement.innerHTML = html;
  console.log("first: ", results);
}

// Sort function
function compare(a, b) {
  if (a.name > b.name) return 1;
  else if (a.name < b.name) return -1;
  else return 0;
}

function sortPokemon(list) {
  return list.sort(compare);
}

// Show list of Pokémon
function doStuffList(data) {
  console.log(data);
  const pokeListElement = document.querySelector("#outputList");
  pokeListElement.innerHTML = ""; // clear old list
  let pokeList = sortPokemon(data.results);
  pokeList.forEach((currentItem) => {
    const html = `<li>${currentItem.name}</li>`;
    pokeListElement.innerHTML += html;
  });
}

// Run both fetches
getPokemon(url, doStuff);
getPokemon(urlList, doStuffList);
