'use strict';
function moveLeft() {
	step -= 1;
	if (step < 0) {
		step = photos.length - 1;
	}
	slider.src = `i/${photos[step]}`;
}

function moveRight() {
	step += 1;
	if (step === photos.length) {
		step = 0;
	}
	slider.src = `i/${photos[step]}`;
}

let photos = ['breuer-building.jpg', 'guggenheim-museum.jpg', 'headquarters.jpg', 'IAC.jpg', 'new-museum.jpg'];
const slider = document.getElementById('currentPhoto');
let step = -1;

let leftButton = document.getElementById('prevPhoto');
leftButton.onclick = moveLeft;

let rightButton = document.getElementById('nextPhoto');
rightButton.onclick = moveRight;

moveRight();

