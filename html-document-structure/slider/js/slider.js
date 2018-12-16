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
	first.addEventListener('click', (event) => showLast(false));
	last.addEventListener('click', (event) => showLast(true));

	function moveSlider(isForward) {
		const currentSlide = container.querySelector('.slide-current');
		const activatedSlide = isForward ? 
		currentSlide.nextElementSibling :
		currentSlide.previousElementSibling;
		
		if (activatedSlide === currentSlide.nextElementSibling) {
			if (activatedSlide === slides.lastElementChild) {
				last.classList.add('disabled');
				next.classList.add('disabled');
			}
			if (activatedSlide !== null) {
				currentSlide.classList.remove('slide-current');
				activatedSlide.classList.add('slide-current');
				prev.classList.remove('disabled');
				first.classList.remove('disabled');
			}
		} else {
			if (activatedSlide === slides.firstElementChild) {
				first.classList.add('disabled');
				prev.classList.add('disabled');
			}
			if (activatedSlide !== null) {
				currentSlide.classList.remove('slide-current');
				activatedSlide.classList.add('slide-current');
				next.classList.remove('disabled');
				last.classList.remove('disabled');
			}
		}
	}

	function showLast(isForward) {
		const currentSlide = container.querySelector('.slide-current');
		const activatedSlide = isForward ?
		slides.lastElementChild :
		slides.firstElementChild;

		currentSlide.classList.remove('slide-current');
		activatedSlide.classList.add('slide-current'); 

		if (activatedSlide === slides.lastElementChild) {
			last.classList.add('disabled');
			next.classList.add('disabled');
			prev.classList.remove('disabled');
			first.classList.remove('disabled');
		} else {
			prev.classList.add('disabled');
			first.classList.add('disabled');
			last.classList.remove('disabled');
			next.classList.remove('disabled');
		}
	}
}

const slider = document.querySelectorAll('.slider');
Array.from(slider).forEach(item => Slider(item));

