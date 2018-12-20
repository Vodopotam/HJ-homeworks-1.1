'use strict';
const next = document.querySelector('a[data-action="next"]');
const prev = document.querySelector('a[data-action="prev"]');
const first = document.querySelector('a[data-action="first"]');
const last = document.querySelector('a[data-action="last"]');
const slides = document.querySelector('.slides');

slides.firstElementChild.classList.add('slide-current');

first.classList.add('disabled');
prev.classList.add('disabled');

function Slider(container) {
	next.addEventListener('click', (event) => moveSlider(true));
	prev.addEventListener('click', (event) => moveSlider(false));
	first.addEventListener('click', (event) => moveSlider(false));
	last.addEventListener('click', (event) => moveSlider(true));


	function moveSlider() {
		let currentSlide = container.querySelector('.slide-current');
		let activatedSlide;

		if (event.target.dataset.action === 'next') {
			activatedSlide = currentSlide.nextElementSibling;
		} else if (event.target.dataset.action === 'prev') {
			activatedSlide = currentSlide.previousElementSibling;
		}

		if (event.target.dataset.action === 'first') {
			activatedSlide = slides.firstElementChild;
		} else if (event.target.dataset.action === 'last'){
			activatedSlide = slides.lastElementChild;
		}

		setButtons(activatedSlide, currentSlide);
	}

	function setButtons(activatedSlide, currentSlide) {
		if (activatedSlide !== null) {
			currentSlide.classList.remove('slide-current');
			activatedSlide.classList.add('slide-current');
			prev.classList.remove('disabled');
			first.classList.remove('disabled');
			next.classList.remove('disabled');
			last.classList.remove('disabled');
		} 
		if (activatedSlide === slides.lastElementChild) {
			prev.classList.remove('disabled');
			first.classList.remove('disabled');
			last.classList.add('disabled');
			next.classList.add('disabled');
		}
		if (activatedSlide === slides.firstElementChild) {
			first.classList.add('disabled');
			prev.classList.add('disabled');
			last.classList.remove('disabled');
			next.classList.remove('disabled');
		}
	}
}

const slider = document.querySelectorAll('.slider');
Array.from(slider).forEach(item => Slider(item));

