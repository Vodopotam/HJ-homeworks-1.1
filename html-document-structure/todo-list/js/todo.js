'use strict';
const done = document.querySelector('.done');
const undone = document.querySelector('.undone');
const inputs = document.querySelectorAll('input');

function changePosition() {
	if (this.checked) {
		done.appendChild(this.parentNode);
	} else {
		undone.appendChild(this.parentNode);
	}
}

Array.from(inputs).forEach(input => input.addEventListener('click', changePosition));
