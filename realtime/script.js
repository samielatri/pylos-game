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
        gameID:gameID
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

const logThis = function logThis(message) {
    // if we pass an Error object, message.stack will have all the details, otherwise give us a string
    if (typeof message === 'object') {
      message = message.stack || objToString(message);
    }
  
    console.log(message);
  
    // create the message line with current time
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var dateTime = date + ' ' + time + ' ';
  
    //insert line
    document.getElementById('logger').insertAdjacentHTML('afterbegin', dateTime + message + '<br>');
  }
  
  function objToString(obj) {
    var str = 'Object: ';
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        str += p + '::' + obj[p] + ',\n';
      }
    }
    return str;
  }

socket.on("play-movement-res", res=>{
    pylos=res.board;
    logThis(res.message);
    console.log(pylos);
    console.log(res);
})

