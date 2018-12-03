'use strict';
const secret = document.getElementsByClassName('secret')[0];
const navigation = document.getElementsByTagName('nav')[0];
let keyArr = [];
let secretKey = 'KeyY,KeyT,KeyN,KeyJ,KeyK,KeyJ,KeyU,KeyB,KeyZ';

function handleKey() {
	keyArr.push(event.code);
	if (keyArr.join().search(secretKey) !== 1) {
		secret.classList.add('visible');
	} else {
		secret.classList.remove('visible');
	}
}
function showNavigtion() {
	if (event.ctrlKey && event.altKey && event.code === 'KeyT') {
		navigation.classList.add('visible');
	} else {
		navigation.classList.remove('visible');
	}
}

document.addEventListener('keydown', handleKey);
document.addEventListener('keydown', showNavigtion);

