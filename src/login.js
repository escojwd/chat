const writingBox = document.querySelector('.writing-box');
const alertText = document.querySelector('.alert-hidden');
const messagesList = document.querySelector('.messages');
const sendBtn = document.querySelector(".send-button");

let conversation = [];

let generateId = function (){ return "_" + Math.random().toString(36).substr(2,9)};

let sendingTime = new Date();

sendBtn.addEventListener("click", sendMessage);

// if (localStorage.getItem("conversation")) {
//     let conversation = JSON.parse(localStorage.getItem("conversation"));
//     // console.log(conversation);
//     render(conversation);
// }

function ConversetionMessage (id, text, time) {
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

function toggleClasses(el,cla,time) {
    el.classList.toggle(cla);
    setTimeout(() => {
        el.classList.toggle(cla);
    }, time);
}

function render() {
    let singleMessage = document.createElement('li');
    singleMessage.classList.add('single-message');
    singleMessage.dataset.id = generateId();  

    let messageSend  = document.createElement('div');
    messageSend.classList.add('message-send');
    
    let messageContent = document.createElement('p');
    messageContent.textContent = writingBox.value;
    messageContent.classList.add('message-content');
    
    
    let messageTime = document.createElement('span');
    messageTime.classList.add('message-timestamp-left');
    messageTime.textContent = 'SMS ' + sendingTime.getHours() + ":" + sendingTime.getMinutes();

    const message = new ConversetionMessage(singleMessage.dataset.id, messageContent.textContent, messageTime.textContent);

    addChild(messagesList,singleMessage);
    addChild(singleMessage,messageSend);
    addChild(messageSend,messageContent);
    addChild(messageSend, messageTime);
 
    writingBox.value = '';
    writingBox.focus();

    conversation.push(message);
    // saveToLocal(conversation);
}

function addChild(el1,el2) {
    el1.appendChild(el2);
}

// function saveToLocal(el) {
//     localStorage.setItem('conversation', JSON.stringify(el));
// }