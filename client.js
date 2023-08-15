const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageIn');
const messageBox = document.querySelector(".container");

const uppend = (message,position)=>{
    const msgElement = document.createElement('div');
    msgElement.innerText = message;
    msgElement.classList.add('message');
    msgElement.classList.add(position);
    messageBox.append(msgElement);
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const msg = messageInput.value;
    uppend(`You: ${msg}`,`right`);
    socket.emit('send',msg);
    messageInput.value =''
})

const nam = prompt("Your Name!!");
socket.emit('new-user-joined',nam);

socket.on('user-joined', nam =>{
    uppend(`${nam}: Hi`,'left')
})

socket.on('receive', data =>{
    uppend(`${data.name}: ${data.message}`,'left')
})

socket.on('gone', name =>{
    uppend(`${name} left the chat`,'left')
})
        