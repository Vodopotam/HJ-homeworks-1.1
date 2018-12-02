'use strict';
const songs = ['first.mp3', 'second.mp3', 'third.mp3', 'fourth.mp3', 'fifth.mp3'];
const piano = document.getElementsByClassName('set')[0];
const pianoKeys = document.getElementsByTagName('li');
const sounds = document.getElementsByTagName('audio');
const pianoKeysArr = Array.from(pianoKeys);

function playSong(event) {
	if (event.shiftKey) {
		piano.classList.remove('middle');
		piano.classList.remove('higher');
		piano.classList.add('lower');
		sounds[pianoKeysArr.indexOf(this)].src = `sounds/lower/${songs[pianoKeysArr.indexOf(this)]}`;
		sounds[pianoKeysArr.indexOf(this)].play();
	}
	else if (event.altKey) {
		piano.classList.remove('middle');
		piano.classList.remove('lower');
		piano.classList.add('higher');
		sounds[pianoKeysArr.indexOf(this)].src = `sounds/higher/${songs[pianoKeysArr.indexOf(this)]}`;
		sounds[pianoKeysArr.indexOf(this)].play();
	} else {
		piano.classList.remove('higher');
		piano.classList.remove('lower');
		piano.classList.add('middle');
		sounds[pianoKeysArr.indexOf(this)].src = `sounds/middle/${songs[pianoKeysArr.indexOf(this)]}`;
		sounds[pianoKeysArr.indexOf(this)].play();
	}
}

for (const key of pianoKeysArr) {
	key.addEventListener('click', playSong);
}


