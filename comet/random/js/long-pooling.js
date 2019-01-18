'use strict';
const longPooling = document.querySelector('.long-pooling'),
	longPoolingCards = longPooling.querySelectorAll('div');

sendLongPolls();

function sendLongPolls() {
	const xhr = new XMLHttpRequest();
	xhr.addEventListener('load', event => {
		if (200 <= event.target.status && event.target.status < 300) {
			showChosenCard(longPoolingCards, xhr.responseText.trim());
			sendLongPolls();
		}
	});
	xhr.open('GET', 'https://neto-api.herokuapp.com/comet/long-pooling');
	xhr.send();
}
