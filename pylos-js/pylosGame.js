
const {Board} = require('./board.js')

class PylosGame{
    constructor(ID,player1,player2){
        this.board = new Board();
        this.ID=ID;
        this.player1=player1;
        this.player2=player2;
        this.currentPlayer=1;
        this.popBallCpt=0;
        this.lastPayload=null;
        this.canMove=false;
        this.moveableBalls=[];
        this.moveDestination=null;
    }
    playMovement(payload){
        const {movement, popsBall, movesBall}= payload;
        //check if coordinates valid
        if(!this.board.isEntryValid(movement.x,movement.y,movement.layer)){
            return {success:false, board:this.board, popBall:false, currentPlayer:this.currentPlayer,moveBall:this.canMove, msg:"Error: entry is not valid.", player1Balls:this.board.player1Balls, player2Balls:this.board.player2Balls}; 
        }
        if (this.board.isVictory()!==0){
            return {victory:true, currentPlayer:this.currentPlayer, msg:"Victory!"}; 
        }
        if(movesBall===true && this.canMove===true){
            console.log("moveable");
            let found=this.moveableBalls.find(ball => ball.x===movement.x&&ball.y===movement.y&&ball.layer===movement.layer);
            console.log(this.moveableBalls);
            if(found ===undefined){
                return {success:false,board:this.board.layers,popBall:false, moveBall:this.canMove, currentPlayer:this.currentPlayer, msg:"Ball cannot be moved", player1Balls:this.board.player1Balls, player2Balls:this.board.player2Balls};
            }else {
                this.board.moveBall(movement,this.moveDestination);
                this.moveableBalls=null;
                this.canMove=false;
                return {success:true,board:this.board.layers,popBall:false, moveBall:this.canMove, currentPlayer:this.currentPlayer, msg:"Ball has been moved", player1Balls:this.board.player1Balls, player2Balls:this.board.player2Balls};
            }
        }        
        //si on est en train de pop ball
        if(this.popBallCpt>0){
            //si aucune boulle n'as pas ete pop
            if(this.popBallCpt>1 &&!popsBall){
                return {success:false, board:this.board.layers, popBall:false,moveBall:this.canMove, currentPlayer:this.currentPlayer, msg:"Error: entry is not valid, cannot pop.",player1Balls:this.board.player1Balls, player2Balls:this.board.player2Balls};             
            }
            else if(this.popBallCpt===1 && !popsBall){
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
            if(this.popBallCpt===0){
                popball=false;
                this._switchTurn();
            }
            this.lastPayload=payload;
            return {success:true, board:this.board.layers,popBall:popBall,moveBall:this.canMove,currentPlayer:this.currentPlayer, msg:"Ball popped.", player1Balls:this.board.player1Balls, player2Balls:this.board.player2Balls};                         
        }
        //si forme un carre de meme couleur
        if(this.board.isInSameColorSquare(movement,this.currentPlayer)){
            console.log("is same color")
            this.popBallCpt=2;
            if(!this.board.setMovement(movement,this.currentPlayer)){
                return {success:false, board:this.board.layers,popBall:true,moveBall:this.canMove,currentPlayer:this.currentPlayer, msg:"Movement not valid.", player1Balls:this.board.player1Balls, player2Balls:this.board.player2Balls};             
            }
            this.lastPayload=payload;
            console.log("is return");
            return {success:true, board:this.board.layers,popBall:true,moveBall:this.canMove,currentPlayer:this.currentPlayer, msg:"You may pop a ball or two.", player1Balls:this.board.player1Balls, player2Balls:this.board.player2Balls};             
        }
        let moveableBalls = this.board.getMovableBallsIfFormedSquare(movement);
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
    clone=()=>{
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
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