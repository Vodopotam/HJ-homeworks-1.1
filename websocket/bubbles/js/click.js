'use strict';
const body = document.querySelector('body');

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');

connection.addEventListener('open', () => {
	showBubbles(connection);
	body.addEventListener('click', setBubble);
});

function setBubble() {
	connection.send(JSON.stringify({
		x: event.x,
		y: event.y
	}));
}







