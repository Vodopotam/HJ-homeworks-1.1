'use strict';
const canvas = document.querySelector('canvas'),
	colors = ['#ffffff', '#ffe9c4', '#d4fbff'],
	ctx = canvas.getContext('2d');
canvas.addEventListener('click', showStars);
showStars();

function showStars() {
	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	for (let i = 1; i <= (Math.floor(Math.random() * (400 - 200 + 1)) + 200); i++) {
		const x = Math.random() * canvas.width,
			y = Math.random() * canvas.height,
			r = Math.random() * 1.1;

		ctx.beginPath();
		ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
		ctx.globalAlpha = Math.random() * (1 - 0.8) + 0.8;
		ctx.arc(x, y, r, 0, 2 * Math.PI);
		ctx.fill();
	}
}
