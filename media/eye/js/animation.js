'use strict';
const eye = document.querySelector('.big-book__eye'),
	pupil = document.querySelector('.big-book__pupil');

let mouseX = 0;
let mouseY = 0;
const eyeCenterX = (eye.getBoundingClientRect().left + eye.getBoundingClientRect().right) / 2 + pageXOffset;
const eyeCenterY = (eye.getBoundingClientRect().top + eye.getBoundingClientRect().bottom) / 2 + pageYOffset;
const leftFromEye = eyeCenterX;
const upFromEye = eyeCenterY;
const rightFromEye = document.body.scrollWidth - eyeCenterX;
const downFromEye = document.body.scrollHeight - eyeCenterY;

document.addEventListener('mousemove', event => {
    mouseX = event.pageX;
    mouseY = event.pageY;
}); 

function tick() {
    const pupilX = mouseX < eyeCenterX ? 30 * (mouseX - eyeCenterX) / leftFromEye : 30 * (mouseX - eyeCenterX) / rightFromEye;
    const pupilY = mouseY < eyeCenterY ? 30 * (mouseY - eyeCenterY) / upFromEye : 30 * (mouseY - eyeCenterY) / downFromEye;
    const maxDelta = Math.max(Math.abs(pupilX), Math.abs(pupilY));
    const pupilSize = 3 - (maxDelta / 15);
    
    pupil.style.setProperty('--pupil-x', `${pupilX}px`);
    pupil.style.setProperty('--pupil-y', `${pupilY}px`);
    pupil.style.setProperty('--pupil-size', pupilSize);
    window.requestAnimationFrame(tick);
}

tick();

