'use strict';
let songs = [
	{
		title: 'LA Chill Tour',
		src: 'LA Chill Tour.mp3'
	},
	{
		title: 'LA Fusion Jam',
		src: 'LA Fusion Jam.mp3'
	},
	{
		title: 'This is it band',
		src: 'This is it band.mp3'
	}]

const player = document.getElementsByTagName('audio')[0];
const mediaplayer = document.getElementsByClassName('mediaplayer')[0];
const playButton = document.getElementsByClassName('playstate')[0];
let songTitle = document.getElementsByClassName('title')[0];
let step = 0;

playButton.onclick = function() {
	if (player.paused) {
		//playButton.style.display = 'none';
		//playButton.style.display = 'inline-block';
		mediaplayer.classList.add('play');
		player.play();
	} else {
		//playButton.style.display = 'none';
		//playButton.style.display = 'inline-block';
		mediaplayer.classList.remove('play');
		player.pause();
	}
}

const stopButton = document.getElementsByClassName('stop')[0];

stopButton.onclick = function() {
	mediaplayer.classList.remove('play');
	player.pause();
	player.currentTime = 0;
}

function moveLeft() {
	step -= 1;
	if (step < 0) {
		step = songs.length - 1;
	}
	player.src = `mp3/${songs[step].src}`;
	songTitle.title = songs[step].title;
	if (!mediaplayer.classList.contains('play')) {
		player.pause();
	} else {
		player.play();
	}
}

function moveRight() {
	step += 1;
	if (step === songs.length) {
		step = 0;
	}
	player.src = `mp3/${songs[step].src}`;
	songTitle.title = songs[step].title;
	if (!mediaplayer.classList.contains('play')) {
		player.pause();
	} else {
		player.play();
	}
} 

const backward = document.getElementsByClassName('back')[0];
backward.onclick = moveLeft;
const forward = document.getElementsByClassName('next')[0];
forward.onclick = moveRight;

