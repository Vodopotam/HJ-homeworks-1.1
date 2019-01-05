'use strict';
const acSelect = document.querySelector('#acSelect'),
	btnSeatMap = document.querySelector('#btnSeatMap'),
	btnSetFull = document.querySelector('#btnSetFull'),
	btnSetEmpty = document.querySelector('#btnSetEmpty'),
	seatMapTitle = document.querySelector('#seatMapTitle'),
	seatMapDiv = document.querySelector('#seatMapDiv'),
	totalPax = document.querySelector('#totalPax'),
	totalAdult = document.querySelector('#totalAdult'),
	totalHalf = document.querySelector('#totalHalf');
let plane;

btnSetFull.disabled = true;
btnSetEmpty.disabled = true;

acSelect.addEventListener('change', choosePlane);
btnSeatMap.addEventListener('click', showPlaneScheme);

function showPlaneScheme(event) {
	event.preventDefault();

	btnSetFull.disabled = false;
	btnSetEmpty.disabled = false;

	totalHalf.textContent = 0;
	totalAdult.textContent = 0;
	totalPax.textContent = 0;

	while(seatMapDiv.firstChild) {
		seatMapDiv.removeChild(seatMapDiv.firstChild);
	}

	plane.scheme.forEach(function(item, index) {
		if (item === 6) {
			seatMapDiv.appendChild(createPlaneSixNode(index));
		} else if (item === 4) {
			seatMapDiv.appendChild(createPlaneFourNode(index));
		} else {
			seatMapDiv.appendChild(createPlaneZeroNode(index));
		}
	})

	btnSetFull.addEventListener('click', occupiedPlaces);
	btnSetEmpty.addEventListener('click', clearData);

	const seats = document.querySelectorAll('.seat');
	Array.from(seats).forEach(seat => {
		seat.addEventListener('click', choosePlace);
	})
}

function getData(value) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', `https://neto-api.herokuapp.com/plane/${value}`, false);
	xhr.send();
	let data = JSON.parse(xhr.responseText);
	return data;
}

function choosePlane(event) {
	switch (event.target.value) {
		case 'a319':
			plane = getData('a319');
			break;
		case 'a320':
			plane = getData('a320');
			break;
		case 'a320x':
			plane = getData('a320x');
			break;
		default:
			plane = getData('a321');
	}

	seatMapTitle.textContent = `${plane.title} ${plane.passengers} пассажиров`;
}

function el(tagName, attributes, children) {
	const element = document.createElement(tagName);
	if (typeof attributes === 'object') {
		Object.keys(attributes).forEach(i => element.setAttribute(i, attributes[i]));
	}
	if (typeof children === 'string') {
		element.textContent = children;
	} else if (children instanceof Array) {
		children.forEach(child => element.appendChild(child));
	}
	return element;
}

function createPlaneSixNode(index) {
	return el('div', {class: 'row seating-row text-center'}, [
		el('div', {class: 'col-xs-1 row-number'}, [
			el('h2', {class: ''}, ++index + '')
		]),
		el('div', {class: 'col-xs-5'}, [
			el('div', {class: 'col-xs-4 seat'}, [
				el('span', {class: 'seat-label'}, plane.letters6[0])
			]),
			el('div', {class: 'col-xs-4 seat'}, [
				el('span', {class: 'seat-label'}, plane.letters6[1])
			]),
			el('div', {class: 'col-xs-4 seat'}, [
				el('span', {class: 'seat-label'}, plane.letters6[2])
			])
		]),
		el('div', {class: 'col-xs-5'}, [
			el('div', {class: 'col-xs-4 seat'}, [
				el('span', {class: 'seat-label'}, plane.letters6[3])
			]),
			el('div', {class: 'col-xs-4 seat'}, [
				el('span', {class: 'seat-label'}, plane.letters6[4])
			]),
			el('div', {class: 'col-xs-4 seat'}, [
				el('span', {class: 'seat-label'}, plane.letters6[5])
			])
		])
	])
}

function createPlaneFourNode(index) {
	return el('div', {class: 'row seating-row text-center'}, [
		el('div', {class: 'col-xs-1 row-number'}, [
			el('h2', {class: ''}, ++index + '')
		]),
		el('div', {class: 'col-xs-5'}, [
			el('div', {class: 'col-xs-4 no-seat'}, [
				el('span', {class: 'seat-label'}, plane.letters6[0])
			]),
			el('div', {class: 'col-xs-4 seat'}, [
				el('span', {class: 'seat-label'}, plane.letters6[1])
			]),
			el('div', {class: 'col-xs-4 no-seat'}
			),
		]),
		el('div', {class: 'col-xs-5'}, [
			el('div', {class: 'col-xs-4 no-seat'}
			),
			el('div', {class: 'col-xs-4 seat'}, [
				el('span', {class: 'seat-label'}, plane.letters6[2])
			]),
			el('div', {class: 'col-xs-4 no-seat'}, [
				el('span', {class: 'seat-label'}, plane.letters6[3])
			])
		])
	]);
}

function createPlaneZeroNode(index) {
	return el('div', {class: 'row seating-row text-center'}, [
		el('div', {class: 'col-xs-1 row-number'}, [
			el('h2', {class: ''}, ++index + '')
		]),
		el('div', {class: 'col-xs-5'}),
		el('div', {class: 'col-xs-5'})
	]);
}

function occupiedPlaces(event) {
	event.preventDefault();

	const seats = document.querySelectorAll('.seat');
	Array.from(seats).forEach(seat => {
		seat.classList.add('adult');
	})

	totalAdult.textContent = plane.passengers - +totalHalf.textContent;
	totalPax.textContent = plane.passengers;
}

function clearData(event) {
	event.preventDefault();

	const seats = document.querySelectorAll('.seat');
	Array.from(seats).forEach(seat => {
		if (seat.classList.contains('adult')) {
			seat.classList.remove('adult');
		}
		if (seat.classList.contains('half')) {
			seat.classList.remove('half');
		}
	})

	totalHalf.textContent = 0;
	totalAdult.textContent = 0;
	totalPax.textContent = 0;
}

function choosePlace(event) {
	if (this.classList.contains('adult')) {
		this.classList.remove('adult');
		totalAdult.textContent--;
		totalPax.textContent--;
	} else if (this.classList.contains('half')) {
		this.classList.remove('half');
		totalHalf.textContent--;
		totalPax.textContent--;
	} 

	if(event.altKey) {
		this.classList.add('half');
		totalHalf.textContent++;
		totalPax.textContent++;
	} else {
		this.classList.add('adult');
		totalAdult.textContent++;
		totalPax.textContent++;
	}
}
