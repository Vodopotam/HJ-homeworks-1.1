'use strict';
const wallpaper = document.querySelector('[data-wallpaper]'),
	username = document.querySelector('[data-username]'),
	description = document.querySelector('[data-description]'),
	pic = document.querySelector('[data-pic]'),
	tweets = document.querySelector('[data-tweets]'),
	followers = document.querySelector('[data-followers]'),
	following = document.querySelector('[data-following]');

function callback(userData) {
	wallpaper.src = userData.wallpaper;
	username.textContent = userData.username;
	description.textContent = userData.description;
	pic.src = userData.pic;
	tweets.value = userData.tweets;
	followers.value = userData.followers;
	following.value = userData.following;
}

const script = document.createElement('script');
script.setAttribute('src', `https://neto-api.herokuapp.com/twitter/jsonp`);
document.body.appendChild(script);

