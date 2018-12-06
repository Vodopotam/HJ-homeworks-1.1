'use strict';
const buttons = document.querySelectorAll('.add');
const cartCount = document.querySelector('#cart-count');
const cartTotalPrice = document.querySelector('#cart-total-price');
let counter = 0;
let totalPrice = 0;

function addProduct() {
	cartCount.innerHTML = ++counter;
	totalPrice += Number(this.dataset.price);
	cartTotalPrice.innerHTML = getPriceFormatted(totalPrice);	
}

for (const button of buttons) { 
	button.addEventListener('click', addProduct); 
}