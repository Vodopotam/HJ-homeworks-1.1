'use strict';
const todoList = document.querySelector('.list-block')
const checkbox = document.querySelectorAll('input[type = "checkbox"]');
const output = document.querySelector('output');
let counter = 1;

function addList () {
	this.checked ?  ++counter : --counter;
	if (counter === checkbox.length) {
		todoList.classList.add('complete');
	} else {
		todoList.classList.remove('complete');
	}
	showOutput();
}

function showOutput() {
	output.value = `${counter} из ${checkbox.length}`;
}

for (let box of checkbox) {
	box.addEventListener('click', addList);
	showOutput();
}

