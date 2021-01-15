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
    if(payload===false){
      logThis("Entrer doit pas etre vide!")
    }else {
      emitMovmement(payload);
    }
});

document.getElementById("emit-search").addEventListener("click",()=>{
    console.log("emiting search");
    emitSearch();
});

//document.getElementById("ton-truc")

const buildPayload=()=>{
    let popsBall=document.getElementById("popBallBoolean").checked;
    let movesBall=document.getElementById("isMoveBall").checked;
    let layer=document.getElementById("z").value;
    let x=document.getElementById("x").value;
    let y=document.getElementById("y").value;
    if(layer===""|| x==="" ||layer===""){
      return false;
    }

let payload = {
        movement:{
            layer:parseInt(layer) ,
            x:parseInt(x),
            y:parseInt(y)
        },
        popsBall:popsBall,
        gameID:gameID,
        movesBall:movesBall,
        
      }
    console.log("payload built:")
    console.log(payload);
    clearMovePopBall();
    return payload;
}

// emit search for a game
const emitSearch = ()=>{
    logThis("Searching for game...");
    socket.emit("search-game", null);
}

// if the socket receives a search response
socket.on("search-response", (res)=>{
    gameID = res.gameID;
    logThis("Game found!");
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
  
  // emit movement
const emitMovmement = (payload)=>{
    socket.emit("play-movement", payload);
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

  // first function for moveBall (the one that shows)
  function showMoveBall(){
    let el=document.getElementById("moveBall");
    if(el.classList.contains("hidden")){
      el.classList.remove("hidden");
    }
  }
  // second function for moveBall and the other BOTH CLEANS (the one that clears)
  function clearMovePopBall(){
    let movesBall=document.getElementById("moveBall");
    if(!movesBall.classList.contains("hidden")){
      movesBall.classList.add("hidden");
    }
    let popsBall=document.getElementById("popBall");
    if(!popsBall.classList.contains("hidden")){
      popsBall.classList.add("hidden");
    }
    if(popsBall.checked){
      popsBall.checked=false;
    }if(movesBall.checked){
      movesBall.checked=false;
    }
  
  }

// third function (popBall == true)
function showPopBall(){
  let el=document.getElementById("popBall");
  if(el.classList.contains("hidden")){
    el.classList.remove("hidden");
  }    
}

socket.on("play-movement-res", res=>{
    console.log("res:")
    console.log(res);
    let notifElem = document.getElementById('notif');
    console.log(notifElem);
    
    logThis(res.msg);
    if(!res.isValid){
      return;
    }
    console.log(res.msg); 

    //update affichage

    pylos = res.board;
    if(time != null){
      clearInterval(time);
      showBoard(pylos);
      time = setInterval(draw,100);
    }
    
    

    if (res.popBall===true) { 
        showPopBall();
        console.log("you need to take a ball off");
        notifElem.innerHTML = "you need to take a ball off";
    }
    // notif
    if (res.moveBall===true) {
        showMoveBall();
        console.log("it is possible to place a ball on top but also on the floor");
        notifElem.innerHTML = "it is possible to place a ball on top but also on the floor";
        logThis(res.moveableBalls)
    }

    let balls1 = document.getElementById('number1');
    console.log("balls1");
    balls1.innerHTML = res.player1Balls;

    let balls2 = document.getElementById('number2');
    console.log("balls2");
    balls2.innerHTML = res.player2Balls;

    // notif
    //if (!res.success) { // error
    //    console.log("error");
    //    notifElem.innerHTML = "error";
    //}

    //tests for firstFunction secondFunction and thirdFunction
    //showMoveBall();
    //showPopBall();
  })

