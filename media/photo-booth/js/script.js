'use strict';
const app = document.querySelector('.app'),
	photoList = document.querySelector('.list'),
	errorMessage = document.querySelector('#error-message'),
	photoButton = document.querySelector('#take-photo'),
	controls = document.querySelector('.controls');

const video = document.createElement('video'),
	constraints = {video: true, audio: false};
let stream = null;
app.appendChild(video);

const audio = document.createElement('audio');
app.appendChild(audio);
audio.src = 'https://raw.githubusercontent.com/netology-code/hj-homeworks/master/media/photo-booth/audio/click.mp3';
	
	photoButton.addEventListener('click', () => {
		audio.play();
		audio.currentTime = 0;
	});

function requestAccess() {
	return navigator.mediaDevices.getUserMedia(constraints);
}

function record() {
	requestAccess()
		.then((stream) => {
			video.srcObject = stream;
			video.onloadedmetadata = function() {
				controls.style.display = 'flex';
				video.play();
			}
		photoButton.addEventListener('click', takePicture);
		})
		.catch(error => {
		errorMessage.textContent = error;
	});
}

function takePicture() {
	const canvas = document.createElement('canvas'),
		ctx = canvas.getContext('2d');
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	ctx.drawImage(video, 0, 0);
	let img = canvas.toDataURL();

	const newPhoto = createPhoto(makePicture(img));
	
	newPhoto.addEventListener('click', function(event) {
		if (event.target.innerHTML === 'delete') {
			this.parentNode.removeChild(this);
		} else if (event.target.innerHTML === 'file_upload'){
			let xhr = new XMLHttpRequest();
			xhr.open('POST', 'https://neto-api.herokuapp.com/photo-booth');
			canvas.toBlob(blob => {
				let formData = new formData();
				formData.append('img', blob);
				xhr.send(formData);
			}, 'img/png');
		}
  });
	console.log(photoList);
	photoList.insertBefore(newPhoto, photoList.firstChild);
}

function createPhoto(node) {
	if ((node === undefined) || (node === null) || (node === false)) {
		return document.createTextNode('');
	}
	if ((typeof node === 'string') || (typeof node === 'number') || (node === true)) {
		return document.createTextNode(node.toString());
	}
	if (Array.isArray(node)) {
		return node.reduce((fragment, element) => {
			fragment.appendChild(createPhoto(element));
			return fragment;
		}, document.createDocumentFragment());
	}

	const element = document.createElement(node.tag);

	if (node.attrs && typeof node.attrs === 'object') {
		Object.keys(node.attrs).forEach(key => element.setAttribute(key, node.attrs[key]));
	}

	if (node.content) {
		element.appendChild(createPhoto(node.content));
	}

	return element;
}

function makePicture(img) {
	return {
		tag: 'figure',
			content: [{ tag: 'img', attrs: {src: img}},
				{tag: 'figcaption', content: [
          			{tag: 'a', attrs: {href: img, download: 'snapshot.png'},
						content: {tag: 'i', attrs: {class: 'material-icons'},
							content: 'file_download'}
					},
					{tag: 'a', attrs: {class: 'material-icons'},
						content: {tag: 'i', attrs: {class: 'material-icons'},
							content: 'file_upload'}
					},
					{tag: 'a', attrs: {class: 'material-icons'},
						content: {tag: 'i', attrs: {class: 'material-icons'},
							content: 'delete'}
					}
				]}
			]
	}
}

record();


