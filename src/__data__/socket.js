import openSocket from 'socket.io-client';

let socket;
if (process.env.NODE_ENV === 'production'){
   socket = openSocket('https://api-my-chat1.herokuapp.com:5000');
}
else {
    socket = openSocket('http://localhost:5000');
}

export function subscribeToMessage(cb) {
    socket.on('message', message => cb(null, message));
}

export function sendToMessage(name, text, datetime) {
    socket.emit('message', { name, text, datetime });
}