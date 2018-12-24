'use strict';
fetch('https://neto-api.herokuapp.com/cart/colors', {
	method: 'get'
	})
	.then(function(result) {
		return result.json();
	})
	.then(function(data) {
		const colorSwatch = document.querySelector('#colorSwatch');
		data.forEach(function(item) {
			let available;
			let checked;
			if (item.isAvailable) {
				available = 'available';
				checked = 'checked';
			} else {
				available = 'soldout';
				checked = 'disabled';
			}

			colorSwatch.innerHTML += `<div data-value="${item.type}" class="swatch-element color ${item.type} ${available}">
				<div class="tooltip">${item.title}</div>
				<input quickbeam="color" id="swatch-1-${item.type}" type="radio" name="color" value="${item.type}" ${checked}>
				<label for="swatch-1-${item.type}" style="border-color: ${item.type};">
				<span style="background-color: ${item.type};"></span>
				<img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
				</label>
				</div>`;
		})
	});

fetch('https://neto-api.herokuapp.com/cart/sizes', {
	method: 'get'
})
	.then(function(result) {
		return result.json();
	})
	.then(function(data) {
		const sizeSwatch = document.querySelector('#sizeSwatch');
		data.forEach(function(item) {
			let available;
			let checked;
			if (item.isAvailable) {
				available = 'available';
				checked = 'checked';
			} else {
				available = 'soldout';
				checked = 'disabled';
			}
			sizeSwatch.innerHTML += `<div data-value="${item.type}" class="swatch-element plain ${item.type} ${available}">
				<input id="swatch-0-${item.type}" type="radio" name="size" value="${item.type}" ${checked}>
				<label for="swatch-0-${item.type}">
				${item.title}
				<img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
				</label>
				</div>`
		})
		if (localStorage.index) {
			const indexArr = JSON.parse(localStorage.index);
			const swatchesInput = document.querySelectorAll('.swatches input');
			indexArr.forEach(function(item) {
				swatchesInput[item].checked = true;
			})
		}
	});

function setBasket(data) {
	const cart = document.querySelector('#quick-cart');
	let price = 0;
	data.forEach(function(item) {
		cart.innerHTML = `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${item.id}" style="opacity: 1;">
			<div class="quick-cart-product-wrap">
			<img src="${item.pic}" title="${item.title}">
			<span class="s1" style="background-color: #000; opacity: .5">$${item.price}</span>
			<span class="s2"></span>
			</div>
			<span class="count hide fadeUp" id="quick-cart-product-count-${item.id}">${item.quantity}</span>
			<span class="quick-cart-product-remove remove" data-id="${item.id}"></span>
			</div>`;
			price = item.price * item.quantity;
	})

	cart.innerHTML += `<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico open">
						<span>
							<strong class="quick-cart-text">Оформить заказ<br></strong>
							<span id="quick-cart-price">$${price}</span>
						</span>
					</a>`;

	const cartPay = document.querySelector('#quick-cart-pay');
	if (data.length === 0) {
		cartPay.classList.remove('open');
	} else {
		cartPay.classList.add('open');
	}

	const remove = document.querySelector('.remove');
	remove.addEventListener('click', emptyCart);
}

fetch('https://neto-api.herokuapp.com/cart', {
	method: 'get'
})
	.then(function(result) {
		return result.json();
	})
	.then(function(data) {
		setBasket(data);
	});

function emptyCart() {
	const remove = document.querySelector('.remove');
	const cart = document.querySelector('#quick-cart');
	const formData = new FormData();
	formData.append('productId', remove.dataset.id);

	fetch('https://neto-api.herokuapp.com/cart/remove', {
		method: 'post',
		body: formData
	})
		.then(function(result) {
		return result.json();
	})
	.then(function(data) {
		(data.length > 0) ? setBasket(data) : cart.innerHTML = '';
	});
}


const swatches = document.querySelector('.swatches');
swatches.addEventListener('click', selectSwatch);

function selectSwatch(event) {
	const swatchesInput = document.querySelectorAll('.swatches input');
	const swatchesInputArr = Array.from(swatchesInput);
	const indexArr = [];

	swatchesInputArr.forEach(function(item, i) {
		if (item.checked) {
			indexArr.push(i);
		}
	})

	localStorage.index = JSON.stringify(indexArr);
}

const addToCart = document.querySelector('#AddToCart');
addToCart.addEventListener('click', setRequest);

function setRequest(event) {
	const addToCartForm = document.querySelector('#AddToCartForm');
	const formData = new FormData(addToCartForm);
	formData.append('productId', addToCartForm.dataset.productId);

	fetch('https://neto-api.herokuapp.com/cart', {
		method: 'post',
		body: formData
	})
		.then(function(result) {
			return result.json();
		})
		.then(function(data) {
			setBasket(data);
		});
	event.preventDefault();
}


