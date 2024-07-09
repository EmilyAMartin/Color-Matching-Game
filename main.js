const tilesContainer = document.querySelector(".tiles");
const colors = [
  "#001219",
  "#0a9396",
  "#94D2BD",
  "#EE9B00",
  "#CA6702",
  "#BB3E03",
  "#AE2012",
  "#9B2226",
];
const colorsPicklist = [...colors, ...colors];
const tileCount = colorsPicklist.length;
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;

function buildTile(color) {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.innerHTML = `
      <div class="tile-front"></div>
      <div class="tile-back"></div>`;
  tile.setAttribute("data-color", color);
  tile.setAttribute("data-revealed", "false");

  tile.addEventListener("click", () => {
    const revealed = tile.getAttribute("data-revealed");
    if (awaitingEndOfMove || revealed === "true" || tile === activeTile) {
      return;
    }
    tile.style.backgroundColor = color;
    tile.style.transform = "rotateY(180deg"; //Kind of working//
    if (!activeTile) {
      activeTile = tile;
      return;
    }
    const colorToMatch = activeTile.getAttribute("data-color");
    if (colorToMatch === color) {
      activeTile.setAttribute("data-revealed", "true");
      tile.setAttribute("data-revealed", "true");
      awaitingEndOfMove = false;
      activeTile = null;
      revealedCount += 2;

      if (revealedCount === tileCount) {
        document.getElementById("win-msg").style.display = "block";
      }
      return;
    }

    awaitingEndOfMove = true;
    setTimeout(() => {
      tile.style.backgroundColor = null;
      activeTile.style.backgroundColor = null;
      awaitingEndOfMove = false;
      activeTile = null;
    }, 1000);
  });

  return tile;
}

//Tiles//
for (let i = 0; i < tileCount; i++) {
  const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
  const color = colorsPicklist[randomIndex];
  const tile = buildTile(color);

  colorsPicklist.splice(randomIndex, 1); //Max two colors//
  tilesContainer.appendChild(tile);
}
function restart() {
  window.location.reload();
}
