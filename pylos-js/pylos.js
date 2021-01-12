import {Board} from './board';

class PylosGame{
    constructor(player1,player2){
        this.board = new Board();
        this.player1=player1;
        this.player2=player2;
        this.current=1;
    }
    
    playMovement(payload){
        if(!this.board.isMovementValid(payload.movement)){
            return {success:false}; 
        }
        this.board.setMovement(payload.movement);
        this._switchTurn();
        return {success:true};
    }
    _switchTurn(){
        if (this.current===1){
            this.current=2;
        }else{
            this.current=1;
        }
    }
    clone=()=>{
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }

}