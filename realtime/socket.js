const express = require("express");
const http = require("http");
const app = express();
const {PylosGame} = require("../pylos-js/pylosGame.js");
//const server = http.createServer(app)
const server =app.listen(3200,()=>{
    console.log("lsitening")
})
const io = require('socket.io')(server,{
    cors:{
        origin:"*"
    }
});

let id=0;
function generateID(){
    id+=1;
    return id;
}
let connectedUsers = {};
let usersSearchingGame=[];
let inGame=[];

io.sockets.on('connection', socket=>{
    connectedUsers[socket.id] = socket;
    console.log("hey there its "+ socket.id)
    socket.emit("hello-world", {
        msg:"hello world"
    
    });
    socket.on("search-game", message=>{
        if(usersSearchingGame.length===0){
            usersSearchingGame.push(socket);
            return;
        }
        if(usersSearchingGame.indexOf(socket)>-1){
            return;
        }
        let user=usersSearchingGame.pop();
        let gameID=generateID();
        let newGame = new PylosGame(gameID,user.id,socket.id); 
        inGame.push(newGame); 
        user.emit("search-response", {
            found:true,
            gameID:gameID
        })
        socket.emit("search-response", {
            found:true,
            gameID:gameID
        })
        console.log("found")
    })

    socket.on("play-movement", payload =>{
        const {gameID} = payload;
        let userGame=inGame.find(game => game.id===gameID);
        if(!userGame.cmpCurrentPlayer(socket.id)){
            socket.emit("play-movement-res",{isValid:false})
            return; 
        }
        let res=userGame.playMovement(payload);
        if(!res.success){
            socket.emit("play-movement-res",res)
            return
        }
        connectedUsers[userGame.player1].emit("play-movement-res",res);
        connectedUsers[userGame.player2].emit("play-movement-res",res);
    })

    socket.on('disconnect', function() {
        console.log('Got disconnect!');
        let userSocket= connectedUsers[socket.id];
        console.log(userSocket.id);
        delete connectedUsers[socket.id]; 
        //        connectedUsers.splice(i, 1)
//        user= usersSearchingGame.indexOf(socket);
//        usersSearchingGame.splice(i, 1)
    })
})



