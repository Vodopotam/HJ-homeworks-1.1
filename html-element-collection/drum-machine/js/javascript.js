'use srtrict';
const instruments = document.getElementsByTagName('li');

for (const item of instruments) {
	const audio = item.getElementsByTagName('audio')[0];
	item.onclick = function() {
		audio.currentTime = 0;
		audio.play();
		}
}
