let pokeData = [];
function getData() {
  const pokeUrl = "https://pokeapi.co/api/v2/pokemon?limit=5000";
  fetch(pokeUrl)
    .then((res) => res.json())
    .then((poke) => pokeData.push(...poke.results));
}
getData();
console.log(pokeData);

//Load first Data

fetchPokemon("https://pokeapi.co/api/v2/pokemon/1/");

// User input key events==============================

let url = "https://pokeapi.co/api/v2/pokemon/1/";
let pokeId = 1;
const leftDpad = document.querySelector(".directional-pad .left");
//Left
leftDpad.addEventListener("click", () => {
  if (pokeId > 1) {
    pokeId--;
  }

  console.log(pokeId);
  url = `https://pokeapi.co/api/v2/pokemon/${pokeId}/`;
  fetchPokemon(url);
});
//Right
const rightDpad = document.querySelector(".directional-pad .right");

rightDpad.addEventListener("click", () => {
  pokeId++;

  console.log(pokeId);
  url = `https://pokeapi.co/api/v2/pokemon/${pokeId}/`;
  fetchPokemon(url);
});

//Up
const upDpad = document.querySelector(".directional-pad .up");

upDpad.addEventListener("click", () => {
  pokeId = pokeId + 10;

  console.log(pokeId);
  url = `https://pokeapi.co/api/v2/pokemon/${pokeId}/`;
  fetchPokemon(url);
});

//Down
const downDpad = document.querySelector(".directional-pad .down");

downDpad.addEventListener("click", () => {
  if (pokeId > 10) {
    pokeId = pokeId - 10;
  } else {
    pokeId = 1;
  }

  console.log(pokeId);
  url = `https://pokeapi.co/api/v2/pokemon/${pokeId}/`;
  fetchPokemon(url);
});

//Play Cry
const cryBtn = document.querySelector("#play-sound-btn");

cryBtn.addEventListener("click", () => {
  fetchPokemon(url);
});
// ====================================================

const pokeSearch = document.getElementById("pokemon-search");

pokeSearch.addEventListener("input" || "focus", () => {
  searchPoke();
  deskShow();
});

let pokeresult = [];
let pokeHTML = "";
function searchPoke() {
  //search
  pokeresult = pokeData.filter((arr) => {
    const reg = new RegExp(pokeSearch.value, "gi");
    return arr.name.match(reg);
  });

  document.querySelector(".results-list").innerHTML = pokeresult
    .map((pokemon) => {
      return `<li class="result-item" data-url="${pokemon.url}">
                            <span class="pokemon-name">${pokemon.name}</span>
                        </li>`;
    })
    .join(" ");
}

// Record all clicks of the search list
function deskShow() {
  let allList = document.querySelectorAll(".result-item");
  allList.forEach((item) => {
    item.addEventListener("click", () => {
      url = item.dataset.url;
      fetchPokemon(url);
    });
  });
}

// Fetch and display function
function fetchPokemon(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // front and back Img
      const frontImg = document.querySelector(".front");
      frontImg.setAttribute("src", data.sprites.front_default);
      // data.sprites.front_default;
      const backImg = document.querySelector(".back");
      backImg.setAttribute("src", data.sprites.back_default);
      // name and ID
      const nameDisplay = document.querySelector(".name-display");
      nameDisplay.innerHTML = `${data.species.name}  <span class="id-display">#025</span>`;

      const idDisplay = document.querySelector(".id-display");
      idDisplay.innerHTML = `#${data.id}`;
      pokeId = data.id;
      // HT & WT
      const pokeHeight = document.querySelector(
        ".physical-stats .stat-block .Height",
      );
      pokeHeight.innerHTML = data.height / 10 + "m";

      const pokeWeight = document.querySelector(
        ".physical-stats .stat-block .Weight",
      );
      pokeWeight.innerHTML = data.weight / 10 + "kg";

      //Type
      const typeBadge = document.querySelector(".type-badge");
      const type = data.types[0].type.name;
      switch (type) {
        case "normal":
          typeBadge.style.backgroundColor = "#A8A878";
          break;
        case "fire":
          typeBadge.style.backgroundColor = "#F08030";
          break;
        case "water":
          typeBadge.style.backgroundColor = "#6890F0";
          break;
        case "electric":
          typeBadge.style.backgroundColor = "#F8D030";
          break;
        case "grass":
          typeBadge.style.backgroundColor = "#78C850";
          break;
        case "ice":
          typeBadge.style.backgroundColor = "#98D8D8";
          break;
        case "fighting":
          typeBadge.style.backgroundColor = "#C03028";
          break;
        case "poison":
          typeBadge.style.backgroundColor = "#A040A0";
          break;
        case "ground":
          typeBadge.style.backgroundColor = "#E0C068";
          break;
        case "flying":
          typeBadge.style.backgroundColor = "#A890F0";
          break;
        case "psychic":
          typeBadge.style.backgroundColor = "#F85888";
          break;
        case "bug":
          typeBadge.style.backgroundColor = "#A8B820";
          break;
        case "rock":
          typeBadge.style.backgroundColor = "#B8A038";
          break;
        case "ghost":
          typeBadge.style.backgroundColor = "#705898";
          break;
        case "dragon":
          typeBadge.style.backgroundColor = "#7038F8";
          break;
        case "dark":
          typeBadge.style.backgroundColor = "#705848";
          break;
        case "steel":
          typeBadge.style.backgroundColor = "#B8B8D0";
          break;
        case "fairy":
          typeBadge.style.backgroundColor = "#EE99AC";
          break;

        default:
          // Unknown / missing type
          typeBadge.style.backgroundColor = "#68A090"; // grayish teal fallback
          console.warn(`Unknown Pokémon type: ${type}`);
          break;
      }

      typeBadge.innerHTML = type;

      //Play cry
      const cryUrl = data.cries.latest;
      const audio = new Audio(cryUrl);
      audio.pause();
      audio.currentTime = 0;

      try {
        audio.play();
      } catch (error) {
        console.log(`error`);
      }
    });
}

//Notes: Type , buttons , Auto sound play when click
//
