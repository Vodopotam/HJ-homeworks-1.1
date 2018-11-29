'use strict';
const dropdownButton = document.getElementsByClassName('wrapper-dropdown')[0];
dropdownButton.onclick = function() {
	dropdownButton.classList.toggle('active');
}

