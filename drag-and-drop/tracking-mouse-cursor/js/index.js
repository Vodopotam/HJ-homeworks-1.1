'use strict';

const eyes = document.querySelectorAll('.cat_eye');

document.addEventListener('mousemove', event => {
	let eyePosition;
	const mouseX = event.pageX,
    	mouseY = event.pageY;
	Array.from(eyes).forEach( eye => {
		if(eye.classList.contains('cat_eye_left')){
			eyePosition  = document.querySelector('.cat_position_for_left_eye');			
		} else {
			eyePosition = document.querySelector('.cat_position_for_right_eye');
		}

		const eyePositionBounds = eyePosition.getBoundingClientRect();

		if (mouseX > eyePositionBounds.right){
			eye.style.left = 50 + '%';
		} else if (mouseX < eyePositionBounds.left){
			eye.style.left = 0 + '%';
		} else {
			eye.style.left = 25 + '%';
		}

		if (mouseY < eyePositionBounds.top){
			eye.style.top = 0 + '%';
		} else if (mouseY > eyePositionBounds.bottom){
			eye.style.top = 50 + '%';
		} else {
			eye.style.top = 25 + '%';
		}
	})
})
