/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/login.js ***!
  \**********************/
var writingBox = document.querySelector(".writing-box");
var alertText = document.querySelector(".alert-hidden");
var messagesList = document.querySelector(".messages");
var sendBtn = document.querySelector(".send-button");
var chatOwner = document.querySelector(".chat-owner");
var conversation = [];

var generateId = function generateId() {
  return "_" + Math.random().toString(36).substr(2, 9);
};

var sendingTime = new Date();
sendBtn.addEventListener("click", sendMessage);

if (localStorage.getItem("conversation")) {
  conversation = JSON.parse(localStorage.getItem("conversation"));
  conversation.forEach(function (message) {
    creatVisual(message);
  });
}

function ConversetionMessage(id, text, time) {
  this.id = id;
  this.text = text;
  this.time = time;
}

function sendMessage() {
  if (!writingBox.value) {
    toggleClasses(alertText, "alert-show", 1500);
    return;
  }

  toggleClasses(sendBtn, "is-active", 1200);
  render();
  saveToLocal(conversation);
}

function toggleClasses(el, cla, time) {
  el.classList.toggle(cla);
  setTimeout(function () {
    el.classList.toggle(cla);
  }, time);
}

function render() {
  var message = new ConversetionMessage(generateId(), writingBox.value, "SMS " + sendingTime.getHours() + ":" + sendingTime.getMinutes()); // conversation.push(message);
  // console.log(conversation);

  var singleMessage = document.createElement("li");
  singleMessage.classList.add("single-message");
  singleMessage.dataset.id = message.id;
  var messageSend = document.createElement("div");
  messageSend.classList.add("message-send");
  var messageContent = document.createElement("p");
  messageContent.textContent = message.text;
  messageContent.classList.add("message-content");
  var messageTime = document.createElement("span");
  messageTime.classList.add("message-timestamp-left");
  messageTime.textContent = message.time;
  addChild(messagesList, singleMessage);
  addChild(singleMessage, messageSend);
  addChild(messageSend, messageContent);
  addChild(messageSend, messageTime);
  writingBox.value = "";
  writingBox.focus(); //   //   saveToLocal(conversation);
}

function addChild(el1, el2) {
  el1.appendChild(el2);
}

function saveToLocal(el) {
  localStorage.setItem("conversation", JSON.stringify(el));
} // saveToLocal(conversation);


function creatVisual(el) {
  var singleMessage = document.createElement("li");
  singleMessage.classList.add("single-message");
  singleMessage.dataset.id = el.id;
  var messageSend = document.createElement("div");
  messageSend.classList.add("message-send");
  var messageContent = document.createElement("p");
  messageContent.textContent = el.text;
  messageContent.classList.add("message-content");
  var messageTime = document.createElement("span");
  messageTime.classList.add("message-timestamp-left");
  messageTime.textContent = el.time;
  addChild(messagesList, singleMessage);
  addChild(singleMessage, messageSend);
  addChild(messageSend, messageContent);
  addChild(messageSend, messageTime);
}
/******/ })()
;