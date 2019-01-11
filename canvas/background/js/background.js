'use strict';
const canvas = document.querySelector('#wall'),
	ctx = canvas.getContext('2d');

const timeFunction = [
	function nextPoint(x, y, time) {
		return {
			x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
			y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
		};
	},
	function nextPoint(x, y, time) {
		return {
		x: x + Math.sin((x + (time / 10)) / 100) * 5,
		y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
		}
	}
];

function setTimeFunction() {
	return timeFunction[Math.floor(Math.random() * timeFunction.length)];
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const objectArr = [];

class Figure {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.size = getRandom(0.1, 0.6);
		this.outline = 5 * this.size;
		this.nextPoint = setTimeFunction();
	}
}

class Circle extends Figure {
	constructor(x, y) {
		super(x, y);
		this.radius = 12 * this.size;
	}
	draw() {
		ctx.beginPath();
		let {x, y} = this.nextPoint(this.x, this.y, Date.now());
		ctx.arc(x, y, this.radius, 0, 2 * Math.PI, false);
		ctx.lineWidth = this.outline;
		ctx.strokeStyle = '#ffffff';
		ctx.stroke();
		ctx.closePath();
	}
}

class Cross extends Figure {
	constructor(x, y) {
		super(x, y);
		this.side = 20 * this.size;
		this.angle = getRandom(0, 360);
		this.radius = this.angle * Math.PI / 180;
		this.rotation = getRandom(-0.2, 0.2);
	}
	draw() {
		ctx.beginPath();
		const {x, y} = this.nextPoint(this.x, this.y, Date.now());
		ctx.lineWidth = this.outline;
		ctx.strokeStyle = '#ffffff';
		ctx.translate(x, y);
		ctx.rotate(this.radius);

		ctx.moveTo(0 - this.side / 2, 0);
		ctx.lineTo(0 + this.side / 2, 0);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(0, 0 - this.side / 2);
		ctx.lineTo(0, 0 + this.side / 2);
		ctx.stroke();

		ctx.rotate(-this.radius);
		ctx.translate(-x, -y);

		this.angle += this.rotate;

	}
}

function createObjects(from, to) {
	for (let i = 0; i < getRandomInteger(from, to); i++) {
		objectArr.push(new Circle(getRandomInteger(0, canvas.width), getRandomInteger(0, canvas.height)));
		objectArr.push(new Cross(getRandomInteger(0, canvas.width), getRandomInteger(0, canvas.height)));
	}
}

function tick() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	objectArr.forEach(item => item.draw());
}

function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}

function getRandomInteger(min, max) {
	return Math.round(getRandom(min, max));
}

createObjects(50, 200);
setInterval(tick, 1000 / 20);

