'use srtrict';
const instruments = document.getElementsByClassName('drum-kit__drum');
const instrumentsArr = Array.from(instruments);

instrumentsArr.forEach((item) => {
	const audio = item.getElementsByTagName('audio')[0];
		item.onclick = () => audio.play();
})

