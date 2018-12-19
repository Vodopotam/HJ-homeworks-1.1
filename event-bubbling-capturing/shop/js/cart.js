'use strict';
function checkCartButton(event) {
	if ((event.target.tagName === 'A') && (event.target.classList.contains('add-to-cart'))){
		event.preventDefault();
		let item = {
			title: event.target.dataset.title,
			price: event.target.dataset.price
		};
		addToCart(item);
	}
}

list.addEventListener('click', checkCartButton);
