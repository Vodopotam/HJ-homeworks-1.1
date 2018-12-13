'use strict';
const content = document.querySelector('#content');
const selectFrom = document.querySelector('#from');
const selectTo = document.querySelector('#to');
const preloader = document.querySelector('#loader');
const source = document.querySelector('#source');
const result = document.querySelector('#result');

let xhr = new XMLHttpRequest();
xhr.addEventListener("load", onLoad);
xhr.addEventListener('loadstart', onLoadStart);
xhr.addEventListener('loadend', onLoadEnd);
xhr.open("GET", "https://neto-api.herokuapp.com/currency");
xhr.send();

source.addEventListener('input', countResult);
selectFrom.addEventListener('input',countResult);
selectTo.addEventListener('input',countResult);

function onLoad() {
	let currencyList = JSON.parse(xhr.responseText);
	for (const currency of currencyList) {
		selectFrom.innerHTML += `<option value = "${currency.value}">${currency.code}</option>`;
		selectTo.innerHTML += `<option value = "${currency.value}">${currency.code}</option>`;
	}
	countResult();
}

function countResult() {
	result.value = (Math.round(source.value * selectFrom.value / selectTo.value * 100) / 100).toFixed(2);
	result.innerText = `${result.value}`;
}

function onLoadStart() {
	preloader.classList.remove('hidden');
}

function onLoadEnd() {
	preloader.classList.add('hidden');
	content.classList.remove('hidden')
}
