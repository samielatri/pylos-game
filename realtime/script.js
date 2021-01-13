let socket = io("http://localhost:3200");

socket.on('hello-world', function(data) {
    console.log(data.msg)
})

socket.on()
let gameID;
const emitSearch= ()=>{
    socket.emit("search-game",null);
}

const emitMovmement=()=>{
    socket.emit("play-movement",null);
}

socket.on("search-response",(res)=>{
    gameID=res.gameID;
})


socket.on("play-movement-res", res=>{
    
})