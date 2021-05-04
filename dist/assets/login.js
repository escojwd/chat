/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/login.js ***!
  \**********************/
var writingBox = document.querySelector('.writing-box');
var alertText = document.querySelector('.alert-hidden');
var messagesList = document.querySelector('.messages');
var sendBtn = document.querySelector(".send-button");
var conversation = [];

var generateId = function generateId() {
  return "_" + Math.random().toString(36).substr(2, 9);
};

var sendingTime = new Date();
sendBtn.addEventListener("click", sendMessage); // if (localStorage.getItem("conversation")) {
//     let conversation = JSON.parse(localStorage.getItem("conversation"));
//     // console.log(conversation);
//     render(conversation);
// }

function ConversetionMessage(id, text, time) {
  this.id = id;
  this.text = text;
  this.time = time;
}

function sendMessage() {
  if (!writingBox.value) {
    toggleClasses(alertText, 'alert-show', 1500);
    return;
  }

  toggleClasses(sendBtn, 'is-active', 1200);
  render();
}

function toggleClasses(el, cla, time) {
  el.classList.toggle(cla);
  setTimeout(function () {
    el.classList.toggle(cla);
  }, time);
}

function render() {
  var singleMessage = document.createElement('li');
  singleMessage.classList.add('single-message');
  singleMessage.dataset.id = generateId();
  var messageSend = document.createElement('div');
  messageSend.classList.add('message-send');
  var messageContent = document.createElement('p');
  messageContent.textContent = writingBox.value;
  messageContent.classList.add('message-content');
  var messageTime = document.createElement('span');
  messageTime.classList.add('message-timestamp-left');
  messageTime.textContent = 'SMS ' + sendingTime.getHours() + ":" + sendingTime.getMinutes();
  var message = new ConversetionMessage(singleMessage.dataset.id, messageContent.textContent, messageTime.textContent);
  addChild(messagesList, singleMessage);
  addChild(singleMessage, messageSend);
  addChild(messageSend, messageContent);
  addChild(messageSend, messageTime);
  writingBox.value = '';
  writingBox.focus();
  conversation.push(message); // saveToLocal(conversation);
}

function addChild(el1, el2) {
  el1.appendChild(el2);
} // function saveToLocal(el) {
//     localStorage.setItem('conversation', JSON.stringify(el));
// }
/******/ })()
;