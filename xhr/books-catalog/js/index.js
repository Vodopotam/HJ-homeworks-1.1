'use strict';
let xhr = new XMLHttpRequest();
xhr.addEventListener("load", onLoad);
xhr.open("GET", "https://neto-api.herokuapp.com/book/");
xhr.send();

let content = document.querySelector('#content');
content.innerHTML = '';

function onLoad() {
let books = JSON.parse(xhr.responseText);
for (let book of books) {
	content.appendChild(document.createElement('li'));
	let bookList = document.querySelectorAll('#content > li');
	let index = books.indexOf(book);
	bookList[index].dataset.title = book.title;
	bookList[index].dataset.author = book.author.name;
	bookList[index].dataset.info = book.info;
	bookList[index].dataset.price = book.price;
	bookList[index].innerHTML = `<img src = '${book.cover.small}'>`;
	}
}

