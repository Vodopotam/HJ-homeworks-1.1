'use strict';
const content = document.getElementById('content');
const email = document.querySelector("a[href='components/email-tab.html']");
const sms = document.querySelector("a[href='components/sms-tab.html']");
const xhrEmail = new XMLHttpRequest();
const xhrSms = new XMLHttpRequest();

xhrEmail.open('GET', 'components/email-tab.html');
xhrEmail.send();

function showEmail(event) {
  event.preventDefault();
	if(!this.classList.contains('active')){
      xhrEmail.open('GET', 'components/email-tab.html');
			xhrEmail.send();
			onLoadEmail();
    }
	this.classList.add('active');
	sms.classList.remove('active');
}

function onLoadEmail() {
	content.innerHTML = xhrEmail.responseText;
}

email.addEventListener('click', showEmail);
xhrEmail.addEventListener('loadstart', onLoadStart);
xhrEmail.addEventListener('load', onLoadEmail);
xhrEmail.addEventListener('loadend', onLoadEnd);

function showSms(event) {
  event.preventDefault();
	if(!this.classList.contains('active')){
      xhrSms.open('GET', 'components/sms-tab.html');
			xhrSms.send();
			onLoadSms();
    }
  this.classList.add('active');
	email.classList.remove('active');
}

function onLoadSms() {
	content.innerHTML = xhrSms.responseText;
}

sms.addEventListener('click', showSms);
xhrSms.addEventListener('loadstart', onLoadStart);
xhrSms.addEventListener('load', onLoadSms);
xhrSms.addEventListener('loadend', onLoadEnd);

const preloader = document.getElementById('preloader');

function onLoadStart() {
	preloader.classList.remove('hidden');
}

function onLoadEnd() {
	preloader.classList.add('hidden');
}