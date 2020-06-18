const socket = io('http://localhost:9000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageimp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('message.mp3')

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);



const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}`, "right");
    socket.emit('send', message);
    messageInput.value = '';
});






socket.on('user-joined', name => {
    if (name != null) {
        append(`${name}: joined the chat`, 'left');
        audio.play();
    }
});

socket.on('receive', data => {
    append(`${data.name} : ${data.message}`, 'left');
    audio.play();
});

socket.on('left', name => {
    if (name != null)
        append(`${name}: left the chat`, 'left');
    audio.play();
});