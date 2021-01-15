
const {Board} = require('./board.js')
const _ = require("lodash");
class PylosGame{
    constructor(ID,player1,player2){
        this.board = new Board();
        this.ID=ID;/*l'ID du jeu */
        this.player1=player1;/*Les ID de sockets */
        this.player2=player2;/*Les ID de sockets */
        this.currentPlayer=1;/*joueur courant */
        this.popBallCpt=0;/* les boules qu'on peut pop*/ 
        this.lastPayload=null;/* le dernier mouvement, pour l'IA */
        this.canMove=false;/*peux deplacer des billes */
        this.moveableBalls=[];/*boules qu'il peux deplacer temporaires */
        this.moveDestination=null;/* la destination de deplacement temporaire(une seule...) */
    }
    _playMovement=(payload)=>{
        const {movement, popsBall, movesBall}= payload;
        //check if coordinates valid
        if(!this.board.isEntryValid(movement.x,movement.y,movement.layer)){
            return {success:false, board:this.board, popBall:false, currentPlayer:this.currentPlayer,moveBall:this.canMove, msg:"Error: entry is not valid.", player1Balls:this.board.player1Balls, player2Balls:this.board.player2Balls}; 
        }
        if(movesBall===true && this.canMove===true){
            console.log("moveable");
            if(this.moveableBalls===null){
                return {success:false,board:this.board.layers,popBall:false, moveBall:this.canMove, currentPlayer:this.currentPlayer, msg:"Ball cannot be moved", player1Balls:this.board.player1Balls, player2Balls:this.board.player2Balls};
            }
            let found=this.moveableBalls.find(ball => ball.x===movement.x&&ball.y===movement.y&&ball.layer===movement.layer);
            console.log(this.moveableBalls);
            // si on ne peux pas deplacer cette boulle
            if(found ===undefined){
                return {success:false,board:this.board.layers,popBall:false, moveBall:this.canMove, currentPlayer:this.currentPlayer, msg:"Ball cannot be moved", player1Balls:this.board.player1Balls, player2Balls:this.board.player2Balls};
            //sinon
            }else {
                this.board.moveBall(movement,this.moveDestination);
                this.moveableBalls=null;
                this.canMove=false;
                return {success:true,board:this.board.layers,popBall:false, moveBall:this.canMove, currentPlayer:this.currentPlayer, msg:"Ball has been moved", player1Balls:this.board.player1Balls, player2Balls:this.board.player2Balls};
            }
        }        
        //si on est en train de pop ball
        if(this.popBallCpt>0){
            if(!popsBall){
                this.popBallCpt=0;
                this._switchTurn();
                return {success:true, board:this.board.layers, popBall:false,moveBall:this.canMove, currentPlayer:this.currentPlayer, msg:"Must pop a ball", player1Balls:this.board.player1Balls, player2Balls:this.board.player2Balls};             
            }
            //si erreur pop ball
            if(!this.board.popBall(movement,this.currentPlayer)){
                return {success:false, board:this.board.layers, popBall:true, moveBall:this.canMove,currentPlayer:this.currentPlayer, msg:"Error: entry is not valid, cannot pop.", player1Balls:this.board.player1Balls, player2Balls:this.board.player2Balls}; 
            }
            --this.popBallCpt;
            let popBall=true;
            //si on a repris toutes boulles
            if(this.popBallCpt===0){
                //on met popball à false
                popball=false;
                this._switchTurn();
            }
            this.lastPayload=payload;
            return {success:true, board:this.board.layers,popBall:popBall,moveBall:this.canMove,currentPlayer:this.currentPlayer, msg:"Ball popped.", player1Balls:this.board.player1Balls, player2Balls:this.board.player2Balls};                         
        }
        //si forme un carre de meme couleur
        if(this.board.isInSameColorSquare(movement,this.currentPlayer)){
            console.log("is same color")
            //alors on peut pop ball
            this.popBallCpt=2;
            if(!this.board.setMovement(movement,this.currentPlayer)){
                return {success:false, board:this.board.layers,popBall:true,moveBall:this.canMove,currentPlayer:this.currentPlayer, msg:"Movement not valid.", player1Balls:this.board.player1Balls, player2Balls:this.board.player2Balls};             
            }
            this.lastPayload=payload;
            return {success:true, board:this.board.layers,popBall:true,moveBall:this.canMove,currentPlayer:this.currentPlayer, msg:"You may pop a ball or two.", player1Balls:this.board.player1Balls, player2Balls:this.board.player2Balls};             
        }

        //renvoie null si on ne peut pas bouger de billes( check les carres formees)
        let moveableBalls = this.board.getMovableBallsIfFormedSquare(movement);
        //si mouvement marche pas
        if(!this.board.setMovement(movement,this.currentPlayer)){
            return {success:false, board:this.board.layers,popBall:false,moveBall:this.canMove,currentPlayer:this.currentPlayer,  msg:"Movement not valid.", player1Balls:this.board.player1Balls, player2Balls:this.board.player2Balls};                         
                         
        }
        //check si form un carre
        if(moveableBalls!==null){
            this.canMove=true;
            this.moveableBalls=moveableBalls.moveableBalls;
            this.moveDestination=moveableBalls.destination;
        }
        console.log("moveable balls");
        console.log(moveableBalls);
        this._switchTurn();
        this.lastPayload=payload;
        if(this.canMove){
            return {success:true,board:this.board.layers,popBall:false, moveBall:this.canMove, currentPlayer:this.currentPlayer, msg:"Ball added. You may move ball.", player1Balls:this.board.player1Balls, player2Balls:this.board.player2Balls};
        }
        return {success:true,board:this.board.layers,popBall:false, moveBall:this.canMove, currentPlayer:this.currentPlayer, msg:"Ball added.", player1Balls:this.board.player1Balls, player2Balls:this.board.player2Balls};
    }
    //^pour voir si victory
    playMovement=(payload)=>{
        let res =this._playMovement(payload);
        return {...res,victory:this.board.isVictory()}; 
    }

    _switchTurn=()=>{
        if (this.currentPlayer===1 && this.board.player2Balls>0){
            this.currentPlayer=2;
        }else if(this.currentPlayer===2 && this.board.player1Balls>0){
            this.currentPlayer=1;
        }
    }
    print=()=>{
        console.log(JSON.stringify(this));
    }

    
    clone=()=> {
        let res = new PylosGame(this.ID,this.player1,this.player2);
        res.board = this.board.clone();
        res.currentPlayer=_.cloneDeep(this.currentPlayer);
        res.popBallCpt=_.cloneDeep(this.popBallCpt);
        res.lastPayload=_.cloneDeep(this.lastPayload);
        res.canMove=_.cloneDeep(this.canMove);
        res.moveableBalls=_.cloneDeep(this.moveableBalls);
        res.moveDestination=_.cloneDeep(this.moveDestination);

        return res;
    } 

    /*
    clone=()=>{
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
    */
    cmpCurrentPlayer=(player)=>{
        if(this.currentPlayer===1){
            return this.player1===player;
        }else if(this.currentPlayer===2){
            return this.player2===player;
        }
    }
}

module.exports={
    PylosGame
}