let socket = io("http://localhost:3200");

socket.on('hello-world', function(data) {
    console.log(data.msg)
})

let gameID = -1;

document.getElementById("send-button").addEventListener("click",()=>{
    if(gameID === -1){
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

// emit search for a game
const emitSearch = ()=>{
    socket.emit("search-game", null);
}

// emit movement
const emitMovmement = (payload)=>{
    socket.emit("play-movement", payload);
}

// if the socket receives a search response
socket.on("search-response", (res)=>{
    gameID = res.gameID;
    console.log(res);
})

// prints out to the logger the messages passed in
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
    let logElm = document.getElementById('logger');
    console.log(logElm);
    logElm.insertAdjacentHTML('afterbegin', dateTime + message + '<br>');
  }
  
  // converts an object to a String
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

    console.log(pylos);
    console.log(res);

    // logthis
    console.log(res.message); 
    logThis(res.message);

    let notifElem = document.getElementById('notif');
    console.log(notifElem);

    // logthis
    if (res.popsBall) { 
        console.log("you need to take a ball off");
        notifElem.innerHTML = "you need to take a ball off";
    }

    if (res.moveBall) {
        console.log("it is possible to place a ball on top but also on the floor");
        notifElem.innerHTML = "it is possible to place a ball on top but also on the floor";
    }

    if (!res.succes) { // error
        console.log("error");
        notifElem.innerHTML = "error";
    }

})

