'use strict';
const signIn = document.querySelector('.sign-in-htm');
const signInButton = signIn.querySelector('.button');
const signInOutput = signIn.querySelector('.error-message');
const signUp = document.querySelector('.sign-up-htm');
const signUpButton = signUp.querySelector('.button');
const signUpOutput = signUp.querySelector('.error-message');

function setSignInForm(event) {
	let object = {};
	const formData = new FormData(signIn);
	for (const [key, value] of formData) {
		object[key] = value;
	}
	event.preventDefault();

	const xhr = new XMLHttpRequest();
	xhr.addEventListener('load', onLoad);
	xhr.open('POST', 'https://neto-api.herokuapp.com/signin');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(object));
  
	function onLoad() {
		const response = JSON.parse(xhr.responseText);
		if (response.error) {
			signInOutput.textContent = response.message;
		} else {
			signInOutput.textContent = `Пользователь ${response.name} успешно авторизован`;
		}
	}
}

function setSignUpForm(event) {
	const object = {};
	const formData = new FormData(signUp);
	for (const [key, value] of formData) {
		object[key] = value;
	}
	event.preventDefault();

	const xhr = new XMLHttpRequest();
	xhr.open('POST', 'https://neto-api.herokuapp.com/signup');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(object));
	xhr.addEventListener('load', onLoad);
  
	function onLoad() {
		const response = JSON.parse(xhr.responseText);
		if (response.error) {
			signUpOutput.textContent = response.message;
		} else {
			signUpOutput.textContent = `Пользователь ${response.name} успешно зарегистрирован`;
		}
	}
}

signInButton.addEventListener('click', setSignInForm);
signUpButton.addEventListener('click', setSignUpForm);

