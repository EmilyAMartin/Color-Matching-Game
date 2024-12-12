//Game Variables//
const tilesContainer = document.querySelector('.tiles');
const colors = [
	'#001219',
	'#0a9396',
	'#94D2BD',
	'#EE9B00',
	'#CA6702',
	'#BB3E03',
	'#AE2012',
	'#9B2226',
];
const colorsList = [...colors, ...colors];
const tileCount = colorsList.length;
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;

// Game Timer//
var outOfTime = false;
var countdownStarted = false;
var time = 30;

function countdown() {
	countdownStarted = true;
	var timeStart = +new Date();
	var timer = setInterval(function () {
		var timeNow = +new Date();
		var difference = (timeNow - timeStart) / 1000;
		if (time > 0) {
			time = 30;
			time = Math.floor(time - difference);
			var ele = document.getElementById('timer');
			ele.innerHTML = time;
		} else {
			outOfTime = true;
			alert('you have run out of time');
			clearInterval(timer);
			window.location.reload();
		}
		if (revealedCount === tileCount) {
			clearInterval(timer);
		}
	}, 250);
}

//Game Restart Button//
function restart() {
	window.location.reload();
}

//Game//
function buildTile(color) {
	const tile = document.createElement('div');
	tile.classList.add('tile');
	tile.innerHTML = `
      <div class="tile-front" onclick="flip()"></div>
      <div class="tile-back"></div>`;
	tile.setAttribute('data-color', color);
	tile.setAttribute('data-revealed', 'false');

	//On Click//
	tile.addEventListener('click', () => {
		if (!countdownStarted) {
			countdown();
		}

		if (awaitingEndOfMove || tile === activeTile) {
			return;
		}
		const revealed = tile.getAttribute('data-revealed');
		if (revealed === 'true') {
			return;
		}
		tile.style.transform = 'rotateY(180deg)';
		tile.style.backgroundColor = color;

		if (!activeTile) {
			activeTile = tile;
			return;
		}
		const colorToMatch = activeTile.getAttribute('data-color');
		if (colorToMatch === color) {
			activeTile.setAttribute('data-revealed', 'true');
			tile.setAttribute('data-revealed', 'true');
			awaitingEndOfMove = false;
			activeTile = null;
			revealedCount += 2;

			if (revealedCount === tileCount) {
				document.getElementById('win-msg').style.display = 'block';
				clearInterval();
			}
			return;
		}
		awaitingEndOfMove = true;
		setTimeout(() => {
			tile.style.backgroundColor = null;
			activeTile.style.backgroundColor = null;
			tile.style.transform = 'rotateY(0deg)';
			activeTile.style.transform = 'rotateY(0deg)';
			awaitingEndOfMove = false;
			activeTile = null;
		}, 1000);
	});

	return tile;
}

//Tile Color//
for (let i = 0; i < tileCount; i++) {
	const randomIndex = Math.floor(Math.random() * colorsList.length);
	const color = colorsList[randomIndex];
	const tile = buildTile(color);
	colorsList.splice(randomIndex, 1); //Creates a max of two colors//
	tilesContainer.appendChild(tile);
}
