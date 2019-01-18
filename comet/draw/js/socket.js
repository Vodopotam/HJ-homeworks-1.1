'use strict';
const connection = new WebSocket('wss://neto-api.herokuapp.com/draw');

connection.addEventListener('open', () => {
	editor.addEventListener('update', sendImage);
});

connection.addEventListener('close', event => {
	editor.removeEventListener('update', sendImage);
});

connection.addEventListener('error', error => {
	console.error(error.data);
});

function sendImage(event) {
	event.canvas.toBlob(blob => connection.send(blob));
}

window.addEventListener('beforeunload', () => {
	connection.close(1000, 'Соединение закрыто');
})