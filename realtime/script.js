let socket = io("http://localhost:3200");

socket.on('hello-world', function(data) {
    console.log(data.msg)
})

let gameID=-1;

document.getElementById("send-button").addEventListener("click",()=>{
    if(gameID===-1){
        return;
    }
    const payload=buildPayload();
    emitMovmement(payload);
});

document.getElementById("emit-search").addEventListener("click",()=>{
    console.log("emiting search");
    emitSearch();
});




const buildPayload=()=>{
    //var element = document.getElementById(id);
    let payload = {
        movement:{
            layer:parseInt(document.getElementById("z").value) ,
            x:parseInt(document.getElementById("x").value),
            y:parseInt(document.getElementById("y").value)
        },
        popsBall:false,
        gameID:gameID,
        movesBall:null,
        moveableBall:null
    }
    console.log("payload built:")
    console.log(payload);
    return payload;
}

const emitSearch= ()=>{
    socket.emit("search-game",null);
}

const emitMovmement=(payload)=>{
    socket.emit("play-movement",payload);
}

socket.on("search-response",(res)=>{
    gameID=res.gameID;
    console.log(res);
})

socket.on("play-movement-res", res=>{
    pylos=res.board;
    
    console.log(pylos);   
    console.log(res);
})

