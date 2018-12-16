'use strict';
const articles = document.querySelector('.tabs-content').children;
const tabs = document.querySelector('.tabs-nav');
const tabList = tabs.children

Array.from(articles).forEach((article, index) => {
	const clone = tabs.firstElementChild.cloneNode(true);
	const tab = tabs.appendChild(clone);
	tab.firstElementChild.textContent = article.dataset.tabTitle;
	tab.firstElementChild.classList.add(article.dataset.tabIcon);
	if (index > 0) {
		article.classList.add('hidden');
	}
});

tabs.removeChild(tabs.firstElementChild);
tabs.firstElementChild.classList.add('ui-tabs-active');

function switchTabs() {
	const currentTab = document.querySelector('.ui-tabs-active');
	currentTab.classList.remove('ui-tabs-active');
	this.classList.add('ui-tabs-active');

	Array.from(articles).forEach(article => {
		article.classList.add('hidden');
		if (this.children[0].textContent === article.dataset.tabTitle) {
			article.classList.remove('hidden');
		}
	});
}

Array.from(tabList).forEach(list => list.addEventListener('click', switchTabs));