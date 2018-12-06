'use strict';
let contacts = JSON.parse(loadContacts());
let contactsBook = document.querySelector('.contacts-list');
contactsBook.innerHTML = '';

for (let person of contacts) {
	contactsBook.appendChild(document.createElement('li'));
	let contactsList = document.querySelectorAll('.contacts-list > li');
	let index = contacts.indexOf(person);
	contactsList[index].innerHTML = `<span>${person.name}</span>`;
	contactsList[index].dataset.phone = person.phone;
	contactsList[index].dataset.email = person.email;
}
