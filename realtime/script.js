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

//document.getElementById("ton-truc")

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
        movesBall:false,
    }
    console.log("payload built:")
    console.log(payload);
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
  function firstFunction(){

    // question
    let elt = document.getElementById("moveBallQuestion");
    console.log(elt);
    elt.className = "shown moveBallQuestion";

    // yes
    let elt1 = document.getElementById("checkYesMoveBall");
    console.log(elt1);
    elt1.className = "shown moveBall  btn-success";

    // no
    let elt2 = document.getElementById("checkNoMoveBall");
    console.log(elt2);
    elt2.className = "shown moveBall  btn-danger";
    
    elt2.onclick = (elt, elt1, elt2) => {
        elt = document.getElementById("moveBallQuestion");
        elt1 = document.getElementById("checkYesMoveBall");
        elt2 = document.getElementById("checkNoMoveBall");
        elt.className = "hidden moveBallQuestion";
        elt1.className = "hidden moveBall  btn-success";
        elt2.className = "hidden moveBall  btn-danger";
        console.log("no");
    }

    // yes
    elt1.onclick = () => {
        let eltN = document.getElementById("moveBallYes");
        console.log(eltN);
        eltN.className = "shown moveBall";
        console.log("3 inputs show up !!");
        // do your thing with the 3 inputs here ...
        console.log("yes");
    }

  }

  // second function for moveBall and the other BOTH CLEANS (the one that clears)
  function secondFunction(){
    // question
    let elt = document.getElementById("moveBallQuestion");
    console.log(elt);
    elt.className = "hidden moveBallQuestion";

    // yes
    let elt1 = document.getElementById("checkYesMoveBall");
    console.log(elt1);
    elt1.className = "hidden moveBall  btn-success";

    // no
    let elt2 = document.getElementById("checkNoMoveBall");
    console.log(elt2);
    elt2.className = "hidden moveBall  btn-danger";
    
    // if it was a yes
    let eltN = document.getElementById("moveBallYes");
    console.log(eltN);
    eltN.className = "hidden moveBall";

    let eltNNN = document.getElementById("popBallYes");
    console.log(eltNNN);
    eltNNN.className = "hidden popBallYes";
  
      // question
      let eltx = document.getElementById("popBallMaybe");
      console.log(eltx);
      eltx.className = "hidden popBall";
  
      // yes
      let eltxx = document.getElementById("checkYesPopBall");
      console.log(eltxx);
      eltxx.className = "hidden btn-success popBall";
  
      // no
      let eltyy = document.getElementById("checkNoPopBall");
      console.log(eltyy);
      eltyy.className = "hidden btn-danger popBall";

  }

// third function (popBall == true)
  function thirdFunction(){
    // question
    let elt = document.getElementById("popBallMaybe");
    console.log(elt);
    elt.className = "shown popBall";

    // yes
    let elt1 = document.getElementById("checkYesPopBall");
    console.log(elt1);
    elt1.className = "shown btn-success popBall";

    // no
    let elt2 = document.getElementById("checkNoPopBall");
    console.log(elt2);
    elt2.className = "shown btn-danger popBall";

    elt2.onclick = (elt, elt1, elt2) => {
        elt = document.getElementById("popBallMaybe");
        elt1 = document.getElementById("checkYesPopBall");
        elt2 = document.getElementById("checkNoPopBall");
        elt.className = "hidden popBall";
        elt1.className = "hidden btn-success popBall";
        elt2.className = "hidden btn-danger popBall";
        console.log("no");
    }

    // yes
    elt1.onclick = () => {
        let eltN = document.getElementById("popBallYes");
        console.log(eltN);
        eltN.className = "shown popBallYes";
        console.log("a button shows up !!");
        console.log("yes");
    }
    
  }




socket.on("play-movement-res", res=>{
    console.log("res:")
    console.log(res);
    // logthis
    console.log(res.msg); 
    logThis(res.msg);

    // get notif
    let notifElem = document.getElementById('notif');
    console.log(notifElem);

    if(!res.isValid){
        logThis("Entry not valid: try again")
        return;
    }
    // notif
    pylos=res.board;
    if (res.popsBall) { 
        console.log("you need to take a ball off");
        notifElem.innerHTML = "you need to take a ball off";
    }

    // notif
    if (res.moveBall) {
        console.log("it is possible to place a ball on top but also on the floor");
        notifElem.innerHTML = "it is possible to place a ball on top but also on the floor";

    }
    
    // notif
    if (!res.success) { // error
        console.log("error");
        notifElem.innerHTML = "error";
    }
    logThis(res.msg);

    // tests for firstFunction secondFunction and thirdFunction
    //firstFunction();
    //secondFunction();
    //thirdFunction();
})

