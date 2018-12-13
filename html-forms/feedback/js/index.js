'use strict';
const content = document.querySelector('.contentform');
const message = document.querySelector('#output');
const submitButton = content.querySelector('.button-contact');
const changeButton = message.querySelector('.button-contact');
const zip = document.querySelector('input[name = "zip"');
const inputs = document.querySelectorAll('input, textarea');
const outputs = document.querySelectorAll('output');

function checkForm() {
	zip.setAttribute('type', 'number');
	if (Array.from(inputs).every(input => input.value)) {
		submitButton.disabled = false;
	} else {
		submitButton.disabled = true;
	}
	submitForm();
}

function submitForm() {
	for (const output of outputs) {
		for (const input of inputs) {
			if (output.id === input.name) {
				output.value = input.value;
			}
		}
	}
}

function showMessage(event) {
	event.preventDefault();
	content.classList.toggle('hidden');
	message.classList.toggle('hidden');
}

for (const input of inputs) {
	input.addEventListener('input', checkForm);
}
submitButton.addEventListener('click', showMessage);
changeButton.addEventListener('click', showMessage);


