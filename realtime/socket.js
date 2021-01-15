const {PylosGame} = require("../pylos-js/pylosGame.js");
module.exports=(server)=>{
    const io = require('socket.io')(server,{
        cors:{
            origin:"*"
        }
    }); 
    let id = 0;
    // generation id
    function generateID(){
        id += 1;
        return id;
    }
    
    let connectedUsers = {};
    let usersSearchingGame=[];
    let inGame={};
    let usersInGame=[];
    io.sockets.on('connection', socket=>{
    
        // every connected user has an id
        connectedUsers[socket.id] = socket;
    
        console.log("hey there its " + socket.id);
    
        // socket sends
        socket.emit("hello-world", {
            msg:"hello world"
       
        });
    
        // search game
        socket.on("search-game", message=>{  
            //si personne cherche partie
            if(usersSearchingGame.length === 0) { // empty
                usersSearchingGame.push(socket);
                return;
            }
            //si personne cherche déjà 
            if(usersSearchingGame.indexOf(socket) !== -1) { // int max
                return;
            }
            //si deja en jeu
            if(usersInGame.find(user=>user===socket.id)!==undefined){
                socket.emit("play-movement-res", {isValid:false, msg:"Vous êtes déjà en jeu!"});
                return;
            }
            // first in first out
            let user = usersSearchingGame.pop();
            // generation of id
            let gameID = generateID();
            inGame[gameID] = new PylosGame(gameID,user.id,socket.id); 
            user.emit("search-response", {
                found:true,
                gameID:gameID,
                player:1
            });    
            socket.emit("search-response", {
                found:true,
                gameID:gameID,
                player:2
            });
            usersInGame.push(socket.id);
            usersInGame.push(user.id);
            console.log("found");
        })
        
        const areUsersConnected=(gameID)=>{
            return (connectedUsers[inGame[gameID].player1]===undefined || (connectedUsers[inGame[gameID].player2]===undefined) )
        }
    
        socket.on("play-movement", payload =>{
            const {gameID} = payload;
            console.log("play-movement");
            console.log(payload);
            let userGame = inGame[gameID];
            if(userGame===undefined ||gameID===undefined){
                socket.emit("play-movement-res",{success:false,isValid:false, msg:"Not ingame.Please emit search."})
                return;
            }
            if(areUsersConnected(gameID)){
                socket.emit("play-movement-res",{success:false,isValid:false, msg:"On of the users disconnected. Please refresh game"})
                return;
            }
            if(!userGame.cmpCurrentPlayer(socket.id)){
                console.log("bad player")
                socket.emit("play-movement-res",{success:false,isValid:false, msg:"other players turn!"})
                return; 
            }
            let res=userGame.playMovement(payload);
            if(res===undefined){
                console.log("undefind!!!!!")
            }
            console.log(res);
            if(!res.success){
                socket.emit("play-movement-res",{...res, isValid:true});
                return;
            }
            //envoie la réponse au 2 joueur si succes
            connectedUsers[userGame.player1].emit("play-movement-res", {...res, isValid:true});
            connectedUsers[userGame.player2].emit("play-movement-res", {...res, isValid:true});
        })
    
        socket.on('disconnect', function() {
            console.log('Got disconnect!');
            let userSocket = connectedUsers[socket.id];
            console.log(userSocket.id);
            usersInGame.splice(usersInGame.indexOf(socket.id),1);
            delete connectedUsers[socket.id]; 
            //usersInGame.dele
    //        connectedUsers.splice(i, 1)
    //        user= usersSearchingGame.indexOf(socket);
    //        usersSearchingGame.splice(i, 1)
        })
    })
}
