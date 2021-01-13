let socket = io("http://localhost:3200");

socket.on('hello-world', function(data) {
    console.log(data.msg)
})

let emitSearch= ()=>{
    socket.emit("search","hello");
}