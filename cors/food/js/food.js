'use strict';
const pic = document.querySelector('[data-pic]'),
	title = document.querySelector('[data-title]'),
	ingredients = document.querySelector('[data-ingredients]'),
	rating = document.querySelector('[data-rating]'),
	star = document.querySelector('[data-star]'),
	votes = document.querySelector('[data-votes]'),
	consumers = document.querySelector('[data-consumers]');

function loadData(url) {
	const functionName = 'callback';
	return new Promise((done, fail) => {
		window[functionName] = done;
		const script = document.createElement('script');
		script.src = `${url}?jsonp=${functionName}`;
		document.body.appendChild(script);
	});
}

function setRecipe(recipeData) {
	title.textContent = recipeData.title;
	ingredients.textContent = recipeData.ingredients.join(', ');
	pic.style.background = `url(${recipeData.pic}) no-repeat`;

	loadData(`https://neto-api.herokuapp.com/food/42/rating`)
		.then(showRating);
}

function showRating(ratingData) {
	rating.textContent = ratingData.rating;
	star.style.width = `${ratingData * 10}%`;
	votes.textContent = `${ratingData.votes} оценок`;

	loadData(`https://neto-api.herokuapp.com/food/42/consumers`)
		.then(showConsumers);
}

function showConsumers(consumersData) {
	consumersData.consumers.forEach(consumer => {
		consumers.innerHTML += `<img src='${consumer.pic}' title='${consumer.name}'>`
	})
	consumers.innerHTML += `<span>+${consumersData.total}</span>`;
}

loadData(`https://neto-api.herokuapp.com/food/42`)
	.then(setRecipe);
