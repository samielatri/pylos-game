// TODO in front <script src="/socket.io/socket.io.js"></script> to add
const socket = io();

socket.on('message', message=>{
    console.log(message);
});
