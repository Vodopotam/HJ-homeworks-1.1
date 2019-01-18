'use strict';
const pooling = document.querySelector('.pooling'),
	poolingCards = pooling.querySelectorAll('div');

sendFrequentPolls();
setInterval(sendFrequentPolls, 5000);

function sendFrequentPolls() {
	const xhr = new XMLHttpRequest();
	xhr.addEventListener('load', event => {
		if (event.target.status == 200) {
			showChosenCard(poolingCards, xhr.responseText);
		} else {
			console.log(xhr.status + ':' + xhr.statusText);
		}
	});
	xhr.open('GET', 'https://neto-api.herokuapp.com/comet/pooling');
	xhr.send();
}

function showChosenCard(cards, index) {
	Array.from(cards).forEach(card => {
		card.classList.remove('flip-it');
		if (card.innerHTML === index) {
			card.classList.add('flip-it');
		}
	})
}