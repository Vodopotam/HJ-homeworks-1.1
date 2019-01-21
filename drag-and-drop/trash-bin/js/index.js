'use strict';
const trashBin = document.querySelector('#trash_bin');
let moving = null;
let shiftX = 0;
let shiftY = 0;

document.addEventListener('mousedown', event => {
	if (event.target.classList.contains('logo')) {
		moving = event.target;
		const bounds = event.target.getBoundingClientRect();
		shiftX = bounds.width / 2 - window.pageXOffset;
		shiftY = bounds.height / 2 - window.pageYOffset;
		moving.classList.add('moving');
	}
});

document.addEventListener('mousemove', event => {
	if (moving) {
		event.preventDefault();
		moving.style.left = event.pageX - shiftX + 'px';
		moving.style.top = event.pageY - shiftY + 'px';
	}
});


document.addEventListener('mouseup', event => {
	if (moving) {
		const check = document.elementFromPoint(event.clientX, event.clientY);
	if (check) {
		check.appendChild(moving);
		moving.classList.remove('moving');
		moving = null;
		}
	}
});



