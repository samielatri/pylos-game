import {Board} from './board.js';

export class PylosGame{
    constructor(player1,player2){
        this.board = new Board();
        this.player1=player1;
        this.player2=player2;
        this.currentPlayer=1;
        this.popBallCpt=0;
    }
    playMovement(payload){
        const {movement,popBall}= payload;

        //check if coordinates valid
        if(!this.board.isEntryValid(movement.x,movement.y,movement.layer)){
            return {success:false, board:this.board, popBall:false, currentPlayer:this.currentPlayer, msg:"Error: entry is not valid."}; 
        }
        //si on est en train de pop ball
        if(this.popBallCpt>0){
            if(!popBall){
                this.popBallCpt=0;
                this._switchTurn();
                return {success:false, board:this.board.layers, popBall:false, currentPlayer:this.currentPlayer, msg:"Error: entry is not valid, cannot pop."};             
            }
            //si erreur pop ball
            if(!this.board.popBall(movement,this.currentPlayer)){
                return {success:false, board:this.board.layers, popBall:true, currentPlayer:this.currentPlayer, msg:"Error: entry is not valid, cannot pop."}; 
            }
            --this.popBallCpt;
            let popBall=true;
            if(this.popBallCpt===0){
                popball=false;
                this._switchTurn();
            }
            return {success:true, board:this.board.layers,popBall:popBall,currentPlayer:this.currentPlayer, msg:"Ball popped."};                         
        }
        //si forme un carre
        if(this.board.isInSameColorSquare(movement,this.currentPlayer)){
            this.popBallCpt=2;
            if(!this.board.setMovement(movement,this.currentPlayer)){
                return {success:false, board:this.board.layers,popBall:true,currentPlayer:this.currentPlayer, msg:"Movement not valid."};             
            }
            return {success:true, board:this.board.layers,popBall:true,currentPlayer:this.currentPlayer, msg:"You may pop a ball or two."};             
        }
        if(!this.board.setMovement(movement,this.currentPlayer)){
            return {success:false, board:this.board.layers,popBall:false,currentPlayer:this.currentPlayer,  msg:"Movement not valid."};             
        }
        if(this.board.isVictory()){
            return {success:true,board:this.board.layers,popBall:false,currentPlayer:this.currentPlayer, msg:"Victory"};
        }
        this._switchTurn();
        return {success:true,board:this.board.layers,popBall:false,currentPlayer:this.currentPlayer, msg:"Ball added."};
    }
    _switchTurn=()=>{
        if (this.currentPlayer===1){
            this.currentPlayer=2;
        }else{
            this.currentPlayer=1;
        }
    }
    print=()=>{
        console.log(JSON.stringify(this));
    }
    clone=()=>{
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }

}