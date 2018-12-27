'use strict';
const chat = document.querySelector('.chat'),
	messageBox = chat.querySelector('.message-box'),
	messages = chat.querySelector('.messages'),
	message = chat.querySelectorAll('.message')[1],
	messagePersonal = chat.querySelector('.message-personal'),
	loadingMessage = chat.querySelector('.loading'),
	messageInput = chat.querySelector('.message-input'),
	messageSubmit = chat.querySelector('.message-submit'),
	messageContent = chat.querySelector('.messages-content'),
	messageStatusText = chat.querySelector('.message-status'),
	chatStatus = chat.querySelector('.chat-status');

const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');

connection.addEventListener('open', () => {
	chatStatus.textContent = chatStatus.dataset.online;
	messageSubmit.disabled = false;
	messageSubmit.addEventListener('click', sendMessage);
	messageInput.addEventListener('keydown', pressEnter);
	messageInput.focus();
	messageStatusText.firstElementChild.innerText = 'Пользователь появился в сети';
	connection.send('Пользователь появился в сети');
	messageContent.appendChild(messageStatusText);

});

connection.addEventListener('message', (event) => {
	if (event.data === '...') {
		loadingMessage.children[1].textContent = 'Пишет сообщение...';
		messageContent.appendChild(loadingMessage);
	} else {
		if (messageContent.contains(loadingMessage)) {
			messageContent.removeChild(loadingMessage);
		}

		message.children[1].textContent = event.data;
		message.children[2].textContent = setDate();
		let clone = message.cloneNode(true);
		messageContent.appendChild(clone);
	}
	scrollToBottom();
	//messages.scrollTop = 9999;

});

connection.addEventListener('close', event => {
	chatStatus.textContent = chatStatus.dataset.offline;
	messageSubmit.disabled = true;
	messageStatusText.firstElementChild.innerText = 'Пользователь не в сети';
	connection.send('Пользователь не в сети');
	messageContent.appendChild(messageStatusText);
})

function setDate() {
	let date = new Date(),
		hours = date.getHours(),
		minutes = date.getMinutes();
	(hours < 10) ? hours = `0${hours}` : hours;
	(minutes < 10) ? minutes = `0${minutes}` : minutes;
	return `${hours}:${minutes}`;
}

function sendMessage(event) {
	event.preventDefault();
	messagePersonal.firstElementChild.textContent = messageInput.value;
	messagePersonal.children[1].textContent = setDate();

	let clone = messagePersonal.cloneNode(true);
	messageContent.appendChild(clone);
	connection.send(messageInput.value);

	loadingMessage.lastElementChild.scrollTop = 9999;

	messageInput.value = '';
	messageInput.focus();

	scrollToBottom();
	//messages.scrollTop = 9999;

	if (messageInput.value === 'close') {
		connection.close(1000);
	}
}

function pressEnter(event) {
	if (event.code !== 'Enter') {
		return;
	}
	sendMessage(event);
}

function scrollToBottom() {
	let shouldScroll = messages.scrollTop + messages.clientHeight === messages.scrollHeight;
	if (!shouldScroll) {
		messages.scrollTop = messages.scrollHeight;
	}
}






