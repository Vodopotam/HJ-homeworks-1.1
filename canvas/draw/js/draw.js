'use strict';
const canvas = document.querySelector('#draw'),
	ctx = canvas.getContext('2d');
let curves = [],
	drawing = false,
	needsRepaint = false,
	hueUp = true,
	lineUp = true,
	colorsHue = Math.round(Math.random() * 359),
	brushRadius = 100;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);
canvas.addEventListener('dblclick', clearCanvas);
canvas.addEventListener('mousedown', startNewCurve);
canvas.addEventListener('mousemove', drawCurve);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);

class makePoint {
	constructor (x, y, hue, brushRadius) {
		this.x = x;
		this.y = y;
		this.hue = hue;
		this.brushRadius = brushRadius;
	}
}

function setCanvasSize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	clearCanvas();
}

function clearCanvas() {
	curves = [];
	needsRepaint = true;
}

function startNewCurve(event) {
	const curve = [];
	drawing = true;

	curve.push( new makePoint(event.offsetX, event.offsetY, colorsHue, brushRadius));
	curves.push(curve);
	needsRepaint = true;
}

function drawCurve(event) {
	if (drawing) {
		const point = new makePoint(event.offsetX, event.offsetY, colorsHue, brushRadius);
		curves[curves.length - 1].push(point);
		needsRepaint = true;
	}
}

function circle(point, colorsHue, brushRadius) {
	const coords = [point.x, point.y];
	ctx.beginPath();
	ctx.fillStyle = `hsl(${colorsHue}, 100%, 50%)`;
	ctx.arc(...coords, brushRadius / 2, 0 , 2 * Math.PI);
	ctx.fill();
}

function smoothCurve(points) {
	for(let i = 0; i < points.length - 1; i++) {
		let pointFrom = points[i];
		let pointTo = points[i + 1];

		ctx.beginPath();
		ctx.lineJoin = 'round';
		ctx.lineCap = 'round';

		ctx.lineWidth = pointFrom.brushRadius;
		ctx.strokeStyle = `hsl(${pointFrom.hue}, 100%, 50%)`;
		ctx.lineTo(pointFrom.x, pointFrom.y);
		ctx.stroke();

		ctx.lineWidth = pointTo.brushRadius;
		ctx.strokeStyle = `hsl(${pointTo.hue}, 100%, 50%)`;
		ctx.lineTo(pointTo.x, pointTo.y);
		ctx.stroke();

		ctx.closePath();
	}
}

function repaint() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	curves.forEach((curve) => {
		circle(curve[0]);
		smoothCurve(curve);
	});
}

function tick(event) {
	if (needsRepaint) {
		repaint();
		needsRepaint = false;

		hueUp = !event.shiftKey;

		hueUp ? colorsHue++ : colorsHue--;
		lineUp ? brushRadius++ : brushRadius--;

		if (colorsHue > 359) {
			colorsHue = 0;
		} else if (colorsHue < 0) {
			colorsHue = 359;
		}

		if (brushRadius >= 100) {
			lineUp = false;
		} else if (brushRadius <= 5) {
			lineUp = true;
		}
	}
	window.requestAnimationFrame(tick);
}

function stopDrawing() {
	drawing = false;
}

tick(); 
