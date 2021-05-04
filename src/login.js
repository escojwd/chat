const writingBox = document.querySelector(".writing-box");
const alertText = document.querySelector(".alert-hidden");
const messagesList = document.querySelector(".messages");
const sendBtn = document.querySelector(".send-button");

let conversation = [];

let generateId = function () {
  return "_" + Math.random().toString(36).substr(2, 9);
};

let sendingTime = new Date();

sendBtn.addEventListener("click", sendMessage);

if (localStorage.getItem("conversation")) {
  conversation = JSON.parse(localStorage.getItem("conversation"));
  // console.log(conversation);
  conversation.forEach((message) => {
    //   render(conversation);
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
  setTimeout(() => {
    el.classList.toggle(cla);
  }, time);
}

function render() {
  const message = new ConversetionMessage(
    generateId(),
    writingBox.value,
    "SMS " + sendingTime.getHours() + ":" + sendingTime.getMinutes()
  );

  conversation.push(message);
  console.log(conversation);

  let singleMessage = document.createElement("li");
  singleMessage.classList.add("single-message");
  singleMessage.dataset.id = message.id;

  let messageSend = document.createElement("div");
  messageSend.classList.add("message-send");

  let messageContent = document.createElement("p");
  messageContent.textContent = message.text;
  messageContent.classList.add("message-content");

  let messageTime = document.createElement("span");
  messageTime.classList.add("message-timestamp-left");
  messageTime.textContent = message.time;

  addChild(messagesList, singleMessage);
  addChild(singleMessage, messageSend);
  addChild(messageSend, messageContent);
  addChild(messageSend, messageTime);

  writingBox.value = "";
  writingBox.focus();

  //   //   saveToLocal(conversation);
}

function addChild(el1, el2) {
  el1.appendChild(el2);
}

function saveToLocal(el) {
  localStorage.setItem("conversation", JSON.stringify(el));
}

// saveToLocal(conversation);

function creatVisual(el) {
  let singleMessage = document.createElement("li");
  singleMessage.classList.add("single-message");
  singleMessage.dataset.id = el.id;

  let messageSend = document.createElement("div");
  messageSend.classList.add("message-send");

  let messageContent = document.createElement("p");
  messageContent.textContent = el.text;
  messageContent.classList.add("message-content");

  let messageTime = document.createElement("span");
  messageTime.classList.add("message-timestamp-left");
  messageTime.textContent = el.time;

  addChild(messagesList, singleMessage);
  addChild(singleMessage, messageSend);
  addChild(messageSend, messageContent);
  addChild(messageSend, messageTime);
}
