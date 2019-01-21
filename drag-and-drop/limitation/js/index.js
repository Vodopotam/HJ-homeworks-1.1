'use strict';
const textarea = document.querySelector('.textarea'),
	block = document.querySelector('.block'),
	message = document.querySelector('.message');

textarea.addEventListener('focus', () => {
	block.classList.add('active');
});

textarea.addEventListener('blur', () => {
	block.classList.remove('active');
});

textarea.addEventListener('keydown', throttle(() => {
	block.classList.add('active');
	message.classList.remove('view');
}));

textarea.addEventListener('keydown', debounce(() => {
	block.classList.remove('active');
	message.classList.add('view');
}, 2000));

function debounce(callback, delay) {
	let timeout;
	return () => {
		clearTimeout(timeout);
		timeout = setTimeout(function() {
		timeout = null;
		callback();
		}, delay);
	};
}

function throttle(callback, delay) {
	let isWaiting = false;
	return function () {
		if (!isWaiting) {
			callback.apply(this, arguments);
			isWaiting = true;
			setTimeout(() => {
				isWaiting = false;
			}, delay);
		}
	}
}
