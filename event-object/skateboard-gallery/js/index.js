'use strict';
const fullPhoto = document.getElementById('view');
const gallery = document.getElementById('nav');
const photos = document.getElementsByTagName('a');

function showFullsizePhoto(event) {
	event.preventDefault();
	if (this.classList.contains('gallery-current')) {
		return;
	}
	fullPhoto.src = this.href;
	for (const item of photos) {
		item.classList.remove('gallery-current');
	}
	this.classList.add('gallery-current');
}

for (const item of photos) {
	item.addEventListener('click', showFullsizePhoto);
}