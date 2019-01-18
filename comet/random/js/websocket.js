'use strict';
const websocket = document.querySelector('.websocket'),
	websocketCards = websocket.querySelectorAll('div');

const connection = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');
connection.addEventListener('message', event => {
	showChosenCard(websocketCards, event.data);
});

window.addEventListener('beforeunload', () => {
	connection.close(1000, 'Соединение закрыто');
})