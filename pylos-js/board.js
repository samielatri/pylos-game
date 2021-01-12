import {initLayer,hasBallOnTop} from './boardHelper.js';

export class Board{
    constructor(){
        let layer1=initLayer(4,0);
        let layer2=initLayer(3,0);
        let layer3=initLayer(2,0);
        let layer4=initLayer(1,0);
        this.layers= [layer1,layer2,layer3,layer4];
    }
    isMovementValid= (movement)=>{
        const {layer,x,y} = movement;
        //si la case n'est pas vide
        if (this.layers[layer][x][y]!==0){
            return false;
        }
        // si il y a des billes en dessous
        if(layer>0){
            if( this.layers[layer-1][x][y]!==0   &&  this.layers[layer-1][x][y+1]!==0 && 
                this.layers[layer-1][x+1][y]!==0 && this.layers[layer-1][x+1][y+1]!==0 ){
                return true;
            }
            console.log("empty")
            return false;
        }
        //check si il y a bille au dessus
        if(hasBallOnTop(this.layers,layer,x,y)){
            return false;
        }
        return true;
    }
    isPopValid=(movement,player)=>{
        const {layer,x,y} = movement;
        if(layer === this.layers.length-1){
            return false;
        }
        if (this.layers[layer][x][y]!==player){
            return false;
        }
        // si il y a des billes en dessous
        if(layer>0){
            if( this.layers[layer-1][x][y]!==0   &&  this.layers[layer-1][x][y+1]!==0 && 
                this.layers[layer-1][x+1][y]!==0 && this.layers[layer-1][x+1][y+1]!==0 ){
                return true;
            }
            console.log("empty")
            return false;
        }
        //check si il y a bille au dessus
        if(hasBallOnTop(this.layers,layer,x,y)){
            return false;
        }
        return true;
        
    }

    isInSameColorSquare=(movement,player)=>{
        const {layer,x,y} = movement;
        //si le layer le plus haut
        if(layer === this.layers.length-1){
            return false;
        }
        if(x===0 && y===0){
            return  this._isSquareBotLeft(movement,player);
        }
        else if(x===0 && y===this.layers[layer].length-1){
            return this._isSquareTopLeft(movement,player);
        }
        else if(x===this.layers[layer].length-1 && y===0){
            return this._isSquareTopLeft(movement,player);
        }
        else if(x===this.layers[layer].length-1 && y===this.layers[layer].length-1){
            return this._isSquareTopRight(movement,player);
        }
        else if(x===0){
            return (this._isSquareTopLeft(movement,player) || this._isSquareBotLeft(movement,player))
        }
        else if(y===0){
            return (this._isSquareBotLeft(movement,player) |(this._isSquareBotRight(movement,player)))
        }    
        else if(x===this.layers[layer].length-1){
            return (this._isSquareTopRight(movement,player) || this._isSquareBotRight(movement,player))
        }    
        else if(y===this.layers[layer].length-1){
            return (this._isSquareTopLeft(movement,player) |(this._isSquareTopRight(movement,player)))
        }else{
            return this._isSquareBotLeft(movement,player) || this._isSquareBotRight(movement,player) || this._isSquareTopLeft(movement,player) || this._isSquareTopRight(movement,player); 
        }    
    }
    _isSquareTopLeft=(movement,player)=>{
        const {layer,x,y} = movement;
        return this.layers[layer][x+1][y] === this.layers[layer][x][y-1] === this.layers[layer][x+1][y-1] ===player;        
    }

    _isSquareTopRight=(movement,player)=>{
        const {layer,x,y} = movement;
        return (this.layers[layer][x-1][y] === this.layers[layer][x][y-1] === this.layers[layer][x-1][y-1] ===player );        
    }
    _isSquareBotLeft=(movement,player)=>{
        const {layer,x,y} = movement;
        return this.layers[layer][x+1][y] === this.layers[layer][x][y+1] === this.layers[layer][x+1][y+1] ===player;
    }
    _isSquareBotRight=(movement,player)=>{
        const {layer,x,y} = movement;
        return  (this.layers[layer][x-1][y] === this.layers[layer][x][y+1] === this.layers[layer][x-1][y+1] ===player );
    }

    isVictory=()=>{
        return this.layers[3][0][0]!==0;
    }

    print=()=>{
       console.log(this.layers);
    }

    setMovement=(movement,player)=>{
        if(!this.isMovementValid(movement)){
            return false;
        }
        try{
            const {layer,x,y} = movement;
            this.layers[layer][x][y]=player;
            return true;
        }catch(e){
            return false;
        }
    }
    popBall=(movement,player)=>{
        const {layer,x,y} = movement;
        if(!this.isPopValid(movement,player)){
            return false;
        }
        this.layers[layer][x][y]=0;
        return true;
    }

    isEntryValid =(x,y,layer)=>{
        if(layer<0 || layer>this.layers.length){
            return false;
        }
        if(x<0 || y<0){
            return false;
        }
        if(x>this.layers[layer].length|| y>this.layers[layer].length ){
            return false
        }
        return true;
    }
    
}
