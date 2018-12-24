'use strict';
const counter = document.querySelector('#counter');
const increment = document.querySelector('#increment');
const decrement = document.querySelector('#decrement');
const reset = document.querySelector('#reset');

localStorage.getItem('count') ? counter.textContent = localStorage.getItem('count') :	counter.textContent = 0;

counter.textContent === '0' ? decrement.disabled = true : decrement.disabled = false;

function addCounter(event) {
  let number = localStorage.getItem('count');
  if (event.target.id === 'increment') {
    number++;
  }
  if (event.target.id === 'decrement') {
    number--;
  }
  counter.textContent = number;
  number === 0 ? decrement.disabled = true : decrement.disabled = false;
  localStorage.setItem('count', number);
}

function resetCounter() {
  localStorage.removeItem('count');
  counter.textContent = 0;
  decrement.disabled = true;
}

increment.addEventListener('click', addCounter);
decrement.addEventListener('click', addCounter);
reset.addEventListener('click', resetCounter);