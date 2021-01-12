// TODO in front <script src="/socket.io/socket.io.js"></script> to add
const socket = io();

socket.on('message', message=>{
    console.log(message);
});


// User played his turn
//something.addEventListner('submit', e=>{
//    e.preventDefault();

//    // get gameStatus
//    const gameStatus = e.smthg.value;

//    console.log(gameStatus);
//    //Emit the game status to server
//});