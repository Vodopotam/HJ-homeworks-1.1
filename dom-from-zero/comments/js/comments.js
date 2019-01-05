'use strict';
function showComments(list) {
  const commentsContainer = document.querySelector('.comments');
  const comments = list.map(createCommentNode);
  
  comments.forEach(comment => {
    commentsContainer.appendChild(comment);
  })
}

function el(tagName, attributes, children) {
  const element = document.createElement(tagName);
  if (typeof attributes === 'object') {
    Object.keys(attributes).forEach(i => element.setAttribute(i, attributes[i]));
  }
  if (children instanceof Array) {
    children.forEach(function(child) {
      if (typeof child === 'string') {
        let arr = child.split('\n');
        arr.forEach(function(text, index) {
          if (index === arr.length - 1) {
            element.appendChild(document.createTextNode(text));
          } else {
            element.appendChild(document.createTextNode(text));
            element.appendChild(document.createElement('br'));
          }
        });
      } else {
      element.appendChild(child)
      }
    });
  }
  return element;
}

function createCommentNode(comment) {
  return el('div', {class: 'comment-wrap'}, [
    el('div', {class: 'photo', title: `${comment.author.name}`}, [
      el('div', {class: 'avatar', style: `background-image: url('${comment.author.pic}')`}
        )]),
    el('div', {class: 'comment-block'}, [
      el('p', {class: 'comment-text'}, [
        `${comment.text}`
        ]),
      el('div', {class: 'bottom-comment'}, [
        el('div', {class: 'comment-date'}, [
          `${new Date(comment.date).toLocaleString('ru-Ru')}`
        ]),
        el('ul', {class: 'comment-actions'}, [
          el('li', {class: 'complain'}, [
            `Пожаловаться`
          ]),
          el('li', {class: 'reply'}, [
            `Ответить`
          ])
        ])
      ])
    ])
  ]);
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
