//import {initLayer,hasBallOnTop} from './boardHelper.js';
const {initLayer,hasBallOnTop} = require('./boardHelper.js');
const _ = require("lodash");
class Board{
    constructor(){
        let layer1=initLayer(4,0);
        let layer2=initLayer(3,0);
        let layer3=initLayer(2,0);
        let layer4=initLayer(1,0);
        this.layers= [layer1,layer2,layer3,layer4];
        this.player1Balls=15;
        this.player2Balls=15;
        this.totalBoardBalls=0;
    }

    clone=()=>{
        let res = new Board();
        res.layers = _.cloneDeep(this.layers);
        res.player1Balls=_.cloneDeep(this.player1Balls);
        res.player2Balls=_.cloneDeep(this.player2Balls);
        res.totalBoardBalls=_._.cloneDeep(this.totalBoardBalls);
        return res;
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
    
    moveBall=(ball,dest)=>{
        this.layers[dest.layer][dest.x][dest.y]=this.layers[ball.layer][ball.x][ball.y];
        this.layers[ball.layer][ball.x][ball.y]=0;
    }

    isInSameColorSquare=(movement,player)=>{
        const {layer,x,y} = movement;
        //si le layer le plus haut
        if(layer === this.layers.length-1){
            return false;
        }
        if(x===0 && y===0){
            return  this._isColorSquareBotLeft(movement,player);
        }
        else if(x===0 && y===this.layers[layer].length-1){
            return this._isColorSquareTopLeft(movement,player);
        }
        else if(x===this.layers[layer].length-1 && y===0){
            return this._isColorSquareBotRight(movement,player);
        }
        else if(x===this.layers[layer].length-1 && y===this.layers[layer].length-1){
            return this._isColorSquareTopRight(movement,player);
        }
        else if(x===0){
            return (this._isColorSquareTopLeft(movement,player) || this._isColorSquareBotLeft(movement,player))
        }
        else if(y===0){
            return (this._isColorSquareBotLeft(movement,player) |(this._isColorSquareBotRight(movement,player)))
        }    
        else if(x===this.layers[layer].length-1){
            return (this._isColorSquareTopRight(movement,player) || this._isColorSquareBotRight(movement,player))
        }    
        else if(y===this.layers[layer].length-1){
            return (this._isColorSquareTopLeft(movement,player) |(this._isColorSquareTopRight(movement,player)))
        }else{
            return this._isColorSquareBotLeft(movement,player) || this._isColorSquareBotRight(movement,player) || this._isColorSquareTopLeft(movement,player) || this._isColorSquareTopRight(movement,player); 
        }    
    }

    getMovableBallsIfFormedSquare=(movement)=>{
        let balls = [];
        let ballsFormedSquare = this.hasFormedSquare(movement);
        if(ballsFormedSquare===null){
            return null;
        }
        let ballDestination=this.hasBallOnTopOfBalls(ballsFormedSquare);
        console.log("getMovableBallsIfFormedSquare");
        console.log(ballDestination);
        if(ballDestination===null){
            return null;
        }
        for(let layer=0;layer<2;layer++){
            for(let x=0;x<this.layers[layer].length;x++){
                for(let y=0;y<this.layers[layer][x].length;y++){
                    if(this.layers[layer][x][y]!==0 &&!hasBallOnTop(this.layers,layer,x,y)&&!this.containsBallInBalls(ballsFormedSquare,{x:x,y:y,layer:layer})){
                        balls.push(this.buildJsonSquare(x,y,layer));
                    }
                }
            }
        }
        if(balls.length===0){
            return null
        }
        return {moveableBalls:balls, destination:ballDestination}
    }
    //regarde si il y a une boulle au dessus de 4 boules
    hasBallOnTopOfBalls=(balls)=>{
        if(balls===null || balls.length===0){
            return null;
        }
        console.log("hasBallOnTopOfBalls");
        console.log(balls);
        let minX=balls[0].x;
        let minY=balls[0].y;
        console.log("minX,minY");
        for(let i=0;i<balls.length;i++){
            console.log(balls[i].x)
            console.log(balls[i].y)
            if(balls[i].x<minX){
                minX=balls[i].x
            }
            if(balls[i].y<minY){
                minY=balls[i].y
            }
        }
        console.log({minX,minY});
        if(this.layers[balls[0].layer+1][minX][minY]===0){
            console.log("dest:")
            console.log({layer:balls[0].layer+1,x:minX,y:minY})
            return  {layer:balls[0].layer+1,x:minX,y:minY};
        }
        return null;

    }
    
    containsBallInBalls=(balls,ball)=>{
        for(let i=0;i<balls.length;i++){
            if(balls[i].x === ball.x && balls[i].y === ball.y && balls[i].z === ball.z){
                return true;
            }  
        }
        return false;
    }

    //retourne null si forme pas carre,sinon les 4 carres
    hasFormedSquare=(movement)=>{
        const {layer,x,y} = movement;
        //si le layer le plus haut

        if(layer === this.layers.length-1){
            return null;
        }
        if(x===0 && y===0){
            return this._isSquareBotLeft(movement);
        }
        else if(x===0 && y===this.layers[layer].length-1){
            return  this._isSquareTopLeft(movement);
        }
        else if(x===this.layers[layer].length-1 && y===0){
            return this._isSquareBotRight(movement);
        }
        else if(x===this.layers[layer].length-1 && y===this.layers[layer].length-1){
            return this._isSquareTopRight(movement);
        }
        else if(x===0){
            let res = this._isSquareTopLeft(movement) 
            if(res!==null){
                return res;
            }
            res=this._isSquareBotLeft(movement);
            if(res!==null){
                return res;
            }
            return null;
        }
        else if(y===0){
            let res = this._isSquareBotLeft(movement) 
            if(res!==null){
                return res;
            }
            res=this._isSquareBotRight(movement);
            if(res!==null){
                return res;
            }
            return null;
        }    
        else if(x===this.layers[layer].length-1){
            let res = this._isSquareTopRight(movement) 
            if(res!==null){
                return res;
            }
            res=this._isSquareBotRight(movement);
            if(res!==null){
                return res;
            }
            return null;
        }                
        else if(y===this.layers[layer].length-1){
            let res = this._isSquareTopLeft(movement) 
            if(res!==null){
                return res;
            }
            res=this._isSquareTopRight(movement);
            if(res!==null){
                return res;
            }
            return null;
        }else{
            let res = this._isSquareBotLeft(movement) 
            if(res!==null){
                return res;
            }
            res=this._isSquareBotRight(movement);
            if(res!==null){
                return res;
            }
            res = this._isSquareTopLeft(movement) 
            if(res!==null){
                return res;
            }
            res=this._isSquareTopRight(movement);
            if(res!==null){
                return res;
            }
            return null;
        }    
    }
    _isColorSquareTopLeft=(movement,player)=>{
        const {layer,x,y} = movement;
        var bool1 =this.layers[layer][x+1][y] === this.layers[layer][x][y-1];
        var bool2 =this.layers[layer][x][y-1] === this.layers[layer][x+1][y-1];
        var bool3= player === this.layers[layer][x+1][y-1];
        return  (bool1 && bool2 && bool3);
    }
    _isColorSquareTopRight=(movement,player)=>{
        const {layer,x,y} = movement;
        var bool1 =this.layers[layer][x-1][y] === this.layers[layer][x][y-1];
        var bool2 =this.layers[layer][x][y-1] === this.layers[layer][x-1][y-1];
        var bool3= player === this.layers[layer][x-1][y-1];
        return  (bool1 && bool2 && bool3);
    }
    _isColorSquareBotLeft=(movement,player)=>{
        const {layer,x,y} = movement;
        var bool1 =this.layers[layer][x+1][y] === this.layers[layer][x][y+1];
        var bool2 =this.layers[layer][x][y+1] === this.layers[layer][x+1][y+1];
        var bool3= player === this.layers[layer][x+1][y+1];
        return  (bool1 && bool2 && bool3);
    }
    _isColorSquareBotRight=(movement,player)=>{
        const {layer,x,y} = movement;
        var bool1 =this.layers[layer][x-1][y] === this.layers[layer][x][y+1];
        var bool2 =this.layers[layer][x][y+1] === this.layers[layer][x-1][y+1];
        var bool3= player === this.layers[layer][x-1][y+1];
        //return  (this.layers[layer][x-1][y] === this.layers[layer][x][y+1] === this.layers[layer][x-1][y+1] ===player );
        return  (bool1 && bool2 && bool3);
    }

    buildJsonSquare=(x,y,layer)=>{
        return {
            x:x,
            y:y,
            layer:layer
        }
    }

    // ces fonction ci dessous retourne null si forme pas carre sinon retourne les 4 carres
    _isSquareTopLeft=(movement)=>{
        const {layer,x,y} = movement;
        var bool1 =this.layers[layer][x+1][y] !== 0;
        var bool2 =this.layers[layer][x+1][y-1]!==0;
        var bool3= this.layers[layer][x][y-1] !==0;
        if((bool1 && bool2 && bool3)){
            const squares = [
                this.buildJsonSquare(x+1,y,layer),
                this.buildJsonSquare(x+1,y-1,layer),
                this.buildJsonSquare(x,y-1,layer),
                this.buildJsonSquare(x,y,layer)       
            ]    
            return squares; 
        }else{
            return null;
        }
    }

    _isSquareTopRight=(movement)=>{
        const {layer,x,y} = movement;
        var bool1 =this.layers[layer][x-1][y]!==0;
        var bool2 =this.layers[layer][x][y-1] !==0;
        var bool3= this.layers[layer][x-1][y-1] !== 0;
        if((bool1 && bool2 && bool3)){
            const squares = [
                this.buildJsonSquare(x-1,y,layer),
                this.buildJsonSquare(x,y-1,layer),
                this.buildJsonSquare(x-1,y-1,layer),
                this.buildJsonSquare(x,y,layer)       
            ]
            return squares; 
        }else{
            return null;
        }

    }
    _isSquareBotLeft=(movement)=>{
        const {layer,x,y} = movement;        
        var bool1 =this.layers[layer][x+1][y] !==0;
        var bool2 =this.layers[layer][x][y+1] !==0;
        var bool3= this.layers[layer][x+1][y+1]!==0;
        if((bool1 && bool2 && bool3)){
            const squares = [
                this.buildJsonSquare(x+1,y,layer),
                this.buildJsonSquare(x,y+1,layer),
                this.buildJsonSquare(x+1,y+1,layer),
                this.buildJsonSquare(x,y,layer)       
            ]
            return squares; 
        }else{
            return null;
        }
    }
    _isSquareBotRight=(movement)=>{
        const {layer,x,y} = movement;
        var bool1 =this.layers[layer][x-1][y] !== 0;
        var bool2 =this.layers[layer][x][y+1] !== 0;
        var bool3=  this.layers[layer][x-1][y+1]!==0;
        if((bool1 && bool2 && bool3)){
            const squares = [
                this.buildJsonSquare(x-1,y,layer),
                this.buildJsonSquare(x,y+1,layer),
                this.buildJsonSquare(x-1,y+1,layer),
                this.buildJsonSquare(x,y,layer)       
            ]
            return squares; 
        }else{
            return null;
        }
    }

    isVictory=()=>{
        return this.layers[3][0][0];
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
            this.decrementPlayerBalls(player);
            return true;
        }catch(e){
            return false;
        }
    }
    incrementPlayerBalls=(player)=>{
        this.totalBoardBalls--;
        if(player===1){
            this.player1Balls++;
        }else if (player===2){
            this.player2Balls++;
        }
    }
    decrementPlayerBalls=(player)=>{
        this.totalBoardBalls++;
        if(player===1){
            this.player1Balls--;
        }else if (player===2){
            this.player2Balls--;
        }
    }
    popBall=(movement,player)=>{
        const {layer,x,y} = movement;
        if(!this.isPopValid(movement,player)){
            return false;
        }
        this.layers[layer][x][y]=0;
        this.incrementPlayerBalls(player);
        return true;
    }

    isEntryValid =(x,y,layer)=>{
        if(x === NaN || y ===NaN || layer === NaN){
            return false;
        }
        if(layer<0 || layer>this.layers.length){
            return false;
        }
        if(x<0 || y<0){
            return false;
        }
        if(x>this.layers[layer].length-1|| y>this.layers[layer].length-1 ){
            return false
        }
        return true;
    }
    
}
module.exports={
    Board
}