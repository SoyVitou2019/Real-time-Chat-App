const socket = io()
let names;
let room;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')

// let inputTag = document.getElementById("code_input");
// let inputValue = inputTag.value;

// let nameTag = document.getElementById("name_input");
// let nameValue = nameTag.value;
do{
    names = prompt("Name : ");
}while(!names)
do{
    room = prompt("Room : ");
}while(!room)

// names = nameValue;
// room = inputValue;

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendtoserver(){
    let text = document.querySelector('.text');
    sendMessage(text.value)
}

function sendMessage(message) {
    let msg = {
        user: names,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', {
        lobby:room,
        messag: msg
    })

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}


// Recieve messages 
socket.on('message', (msg) => {
    if(msg.lobby == room){
        appendMessage(msg.messag, 'incoming')
        scrollToBottom()
    }
})





function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}

// exports.default = room;
