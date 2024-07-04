const tilesContainer = document.querySelector(".tiles");
const colors = ["#001219", "#0a9396", "#94D2BD", "#EE9B00", "#CA6702", "#BB3E03", "#AE2012", "#9B2226"];
const colorsPicklist = [...colors, ...colors];
const tileCount = colorsPicklist.length;

let revealedCount = 0
let activeTile = null;
let awaitingEndOfMove = false;


function buildTile(color) {
    const element = document.createElement("div");
    element.classList.add("tile");
    element.setAttribute("data-color", color);
    element.setAttribute("data-revealed", "false");
    element.addEventListener ("click", () =>{
    const revealed = element.getAttribute("data-revealed")
        if (awaitingEndOfMove
            || revealed === "true"
            || element === activeTile
        ){
            return;
        }
    element.style.backgroundColor = color;
        if (!activeTile){
            activeTile = element;
            return;
        }
    const colorToMatch = activeTile.getAttribute("data-color");
        if (colorToMatch === color) {
            activeTile.setAttribute("data-revealed", "true")
            element.setAttribute("data-revealed", "true")
            awaitingEndOfMove = false;
            activeTile= null;
            revealedCount += 2;

        if (revealedCount === tileCount) {
            document.getElementById("you-win")
            }
            return;
        }

        awaitingEndOfMove = true;
        setTimeout(() => {
            element.style.backgroundColor = null;
            activeTile.style.backgroundColor = null;
            awaitingEndOfMove = false;
            activeTile = null;
        }, 1000);
    });

    return element;
}

//Tiles//
for (let i = 0; i < tileCount; i++) {
    const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
    const color = colorsPicklist[randomIndex];
    const tile = buildTile(color)

    colorsPicklist.splice(randomIndex, 1); //Max two colors//
    tilesContainer.appendChild(tile);
}