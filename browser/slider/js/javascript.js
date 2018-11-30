'use strict';
var photos = ['airmax-jump.png', 'airmax-on-foot.png', 'airmax-playground.png', 'airmax-top-view.png', 'airmax.png'];
const slider = document.getElementById('slider');
let step = 0;
function showSlider() {
	if (step === photos.length) {
		step = 0;
	}
	slider.src = `i/${photos[step]}`;
	step += 1;
}

window.onload = function() {
	showSlider();
	setInterval(showSlider, 5000);
}


