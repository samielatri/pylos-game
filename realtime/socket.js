const {PylosGame} = require("../pylos-js/pylosGame.js");

module.exports=(server)=>{
    const io = require('socket.io')(server,{
        cors:{
            origin:"*"
        }
    }); 
    
    // id
    let id = 0;
    
    // generation id - returns generated id
    function generateID() {
        console.log("call : socket.js -> generateID")
        id += 1; // increment the id
        return id;
    }
    
    let connectedUsers = {};
    let usersSearchingGame=[];
    let inGame={};
    let usersInGame=[];

    io.sockets.on('connection', socket=>{
        console.log("call : socket.js -> connection");

        // every connected user has an id
        connectedUsers[socket.id] = socket;

        console.log("hey there i'm connected :" + socket.id);
        
        // socket sends - hello-world
        socket.emit("hello-world", {
            msg:"hello world"
        });

        // search game
        socket.on("search-game", message => {  
            console.log("call : socket.js -> (socket) search-game");

            // if the person is looking for a game
            if(usersSearchingGame.length === 0) { // empty
                console.log("the person is looking for a game.");
                usersSearchingGame.push(socket);

                return;
            }

            // the person is not looking for a game

            // if the person is already searching for a game
            if(usersSearchingGame.indexOf(socket) !== -1) { // int max
                console.log("the person is already searching for a game");

                return;
            }

            // the person is not searching for a game

            // if the person is already in the game
            if( usersInGame.find(user=>user === socket.id) !== undefined) { // not undefined
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
        
        // areUsersConnected
        const areUsersConnected = (gameID) => {
            console.log("call : socket.js -> areUsersConnected");
            return (connectedUsers[inGame[gameID].player1] === undefined || (connectedUsers[inGame[gameID].player2] === undefined) );
        }
    
        // play movement
        socket.on("play-movement", payload => {
            console.log("call : socket.js -> (socket.on) play-movement");

            const {gameID} = payload;
            
            console.log("play-movement : payload = " + payload);

            // userGame
            let userGame = inGame[gameID];

            // undefined check
            if( userGame === undefined || gameID === undefined ) {
                console.log("Not ingame. Please emit search");
            
                socket.emit("play-movement-res",{success:false,isValid:false, msg:"Not ingame.Please emit search."});
                
                return;
            }
            // users are in game
            // check if connected
            if( areUsersConnected(gameID) ) {
                console.log("On of the users disconnected. Please refresh game");
                socket.emit("play-movement-res",{success:false,isValid:false, msg:"On of the users disconnected. Please refresh game"});
                return;
            }
            // users are connected
            // check if the user is the current player (the one to play)
            if( !userGame.cmpCurrentPlayer(socket.id) ) {
                console.log("it's the bad player playing...So it's other players turn!");

                socket.emit("play-movement-res",{success:false,isValid:false, msg:"other players turn!"});

                return; 
            }

            // is the player who plays

            // user play his movement and we have it in res
            let res = userGame.playMovement(payload);
            
            // check if res is undefined
            if(res === undefined){
                console.log("player movement is undefined !!!");
            }
            console.log("res = " + JSON.stringify(res));
            console.log(JSON.stringify(res));
            // check if res was successful 
            if(!res.success){
                console.log("res was not successful");
                socket.emit("play-movement-res",{...res, isValid:true});
                return;
            }
            console.log("res was successful");
            //res was successful 
            console.log("sending res to the two users...");
            // send response (res) to the two players 
            connectedUsers[userGame.player1].emit("play-movement-res", {...res, isValid:true});
            console.log("1/2 - first response is sent");
            connectedUsers[userGame.player2].emit("play-movement-res", {...res, isValid:true});
            console.log("2/2 - second response is sent - All went OK !");
            return ;
        });
    
        // disconnect user from the game
        socket.on('disconnect', function() {
            let userSocket = connectedUsers[socket.id];
            usersInGame.splice(usersInGame.indexOf(socket.id), 1);
            delete connectedUsers[socket.id];

            console.log(userSocket.id + ' disconnected.');

            return ;
        });

    })
}

// end of socket.js
