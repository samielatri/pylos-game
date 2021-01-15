let socket = io("http://localhost:3200"); // socket -> 3200

let gameID = -1;
let myPlayer; 
let yourBalls;
let yourOponentsballs;

// send button
document.getElementById("send-button").addEventListener("click", () => {

    console.log("send button");

    if(gameID === -1) {
        console.log("gameID negative") ;
        return;
    }

    // gameID not negative

    const payload = buildPayload();
    
    if(payload === false) {
      console.log("Entrer need to not be empty !");
      logThis("Entrer need to not be empty !");
    }else {
      console.log("will emit a movement");
      emitMovmement(payload);
    }
});

// emit search
document.getElementById("emit-search").addEventListener("click",()=>{
    console.log("emiting search");
    setTimeout(emitSearch(), 3000);
    document.getElementById("emit-search").style.display = "none"; 
});

//document.getElementById("ton-truc")

// setPlayerTurn
const setPlayerTurn=(player)=>{
  console.log("setPlayerTurn");
	document.getElementById("turn").innerHTML="It's " +convertPlayer(player)+"'s turn"; 
}

// buildPayLoad
const buildPayload = () => {
    console.log("build pay load");
    let popsBall = document.getElementById("popBallBoolean").checked;
    console.log("popsBall = " + popsBall); 
    let movesBall = document.getElementById("isMoveBall").checked;
    console.log("movesBall = " + movesBall);
    let layer = document.getElementById("z").value;
    console.log("layer = " + layer);
    let x = document.getElementById("x").value;
    console.log("x = " + x);
    let y = document.getElementById("y").value;
    console.log("y = " + y);

    // check if empty entries
    if( layer === "" || x === "" || layer === "" ) {
      console.log("emptry entries")
      return false;
    }

    // entires are not empty
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

    console.log("payload built: (look down)");
    console.log(payload);
    console.log("clearing move pop ball");
    clearMovePopBall();
    console.log("cleared, return payload");
    return payload;
}

// emit search for a game
const emitSearch = ()=>{
    console.log("searching for game...");
    logThis("Searching for game...");
    socket.emit("search-game", null);
}

// hello-world
socket.on('hello-world', function(data) {
    console.log(data.msg);
})

// convertPlayer
const convertPlayer=(player)=>{
  console.log("converPlayer");
  if(player === 1){
    console.log("player 1 : red");
    return "red ";
  } else {
    console.log("player 2 : gray");
    return "gray ";
  }
}

// if the socket receives a search response
socket.on("search-response", (res)=>{
    console.log("client : search response");
    gameID = res.gameID; 
    myPlayer = res.player;
    
    document.getElementById("mePlayer").innerHTML="You are playing as " +convertPlayer(res.player) ;
    console.log("selector of mePlayer =  " + document.getElementById("mePlayer"));

    // it s player 1 who begins
    console.log("setting player 1 begins");
    setPlayerTurn(1);
    console.log("Game found !");
    logThis("Game found!");
    console.log("res :" + res);
})

// prints out to the logger the messages passed in
const logThis = function logThis(message) {
    console.log("logThis");
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
    console.log("emitMovement");
    let notifElem = document.getElementById('notif');
    console.log("selector notifElem = " + notifElem);
    notifElem.innerHTML="";
    console.log("notifElem = " + notifElem);
    socket.emit("play-movement", payload);
}

  // converts an object to a String
  function objToString(obj) {
    console.log("objToString");
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
    console.log("showMoveBall");
    let el = document.getElementById("moveBall");
    console.log("selector el = " + el);

    if(el.classList.contains("hidden")){
      console.log("is hidden so remove hidden to show");
      el.classList.remove("hidden");
    }
  }
  // second function for moveBall and the other BOTH CLEANS (the one that clears)
  function clearMovePopBall(){
    console.log("clearMovePopBall");
    let movesBall=document.getElementById("moveBall");
    console.log('movesBall selector =' + movesBall);

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

function setBalls(res){
  console.log("setBalls");
	if(myPlayer === 1){
		yourBalls=res.player1Balls;
		yourOponentsballs=res.player2Balls		
	}else{
		yourBalls=res.player2Balls;
		yourOponentsballs=res.player1Balls		
	}
}


socket.on("play-movement-res", res=>{
    
    console.log("call : client.js -> play-movement-res");

    console.log(res);
    
    let notifElem = document.getElementById('notif');
    
    console.log(notifElem);
    
    if(!res.isValid){
      return;
    }
    
    if(res.currentPlayer!==undefined){
      setPlayerTurn(res.currentPlayer);
    }
    
	  logThis(res.msg);
    
    console.log(res.msg); 
    
    //update bord on the view 
    pylos = res.board;
    showBoard(pylos);
    clear();
    redraw();

    if ( res.popBall === true && myPlayer === res.currentPlayer ) { 
        showPopBall();
        console.log("you can take ball off");
        notifElem.innerHTML = "you need to take a ball off";
    }

    // notif
    if ( res.moveBall === true && myPlayer === res.currentPlayer ) {
        showMoveBall();
        console.log("it is possible to place a ball on top but also on the floor");
        notifElem.innerHTML = "it is possible to place a ball on top but also on the floor";
	}


  let balls1 = document.getElementById('number1');
  balls1.innerHTML = res.player1Balls;

  let balls2 = document.getElementById('number2');
  balls2.innerHTML = res.player2Balls;

  // victory
  if(res.victory == 1){
    console.log("player 1 RED wins");
    notifElem.innerHTML = "player 1 RED wins";
    logThis("player 1 RED wins");
  }

  if(res.victory == 2){
    console.log("player 2 GRAY wins");
    notifElem.innerHTML = "player 2 GRAT wins";
    logThis("player 2 GRAY wins");
  }

})

