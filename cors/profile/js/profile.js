'use strict';
const name = document. querySelector('[data-name]'),
	description = document.querySelector('[data-description]'),
	pic = document.querySelector('[data-pic]'),
	position = document.querySelector('[data-position]'),
	technologies = document.querySelector('[data-technologies]'),
	following = document.querySelector('[data-following]');

function loadData(url) {
	const functionName = 'callback';
	return new Promise((done, fail) => {
		window[functionName] = done;
		const script = document.createElement('script');
		script.src = `${url}?jsonp=${functionName}`;
		document.body.appendChild(script);
	});
}

function showProfile(userData) {
	name.textContent = userData.name;
	description.textContent = userData.description;
	pic.src = userData.pic;
	position.textContent = userData.position;

	loadData(`https://neto-api.herokuapp.com/profile/${userData.id}/technologies`)
		.then(setTechnology);
	const content = document.querySelector('.content');
	content.style.display = 'initial';
}

function setTechnology(data) {
	data.forEach(element => {
		technologies.innerHTML += `<span class = 'devicons devicons-${element}'></span>`;
	});
}

loadData('https://neto-api.herokuapp.com/profile/me')
	.then(showProfile);



