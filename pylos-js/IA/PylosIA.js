const {PylosGame} = require("../pylosGame.js");
var _= require("lodash");
//1) place bille on lvl 3
//- when first and all bille layer 1 2 is done
// - when there n%2 billes= 0 billes on the layer  
//2)place last bille
//3/place derniere bille lvl 1
//3)if after place billes qte%2=0 is good else pop 1 when possible
//can form ball if qte%2=1 after palce +++
//attention forme carré
//forme un carre en montant une bille

function eval(position){
    return 0;
}

const  _generatePossibleGames=({pylosGame},{movesBall,popsBall})=>{
    //on parcours toutes les cases
    let positions=[];
    for(let layer=0;layer<pylosGame.board.layers.length;layer++){
        for(let x=0;x<pylosGame.board.layers[layer].length;x++){
            for(let y=0;y<pylosGame.board.layers[layer][x].length;y++){  
                //if pops ball else      
                let pylosPosition =pylosGame.clone();
                let payloads=[];
                //lastResponse null lorsque premier pas de jeu
                payloads.push({
                    movement:{
                            x:x,
                            y:y,
                            layer:layer,
                    },
                    popsBall:popsBall, 
                    movesBall:movesBall
                });
                executeAndAddPosition(pylosPosition,payloads,positions);
            }
        }
    }    
    return positions;        
}


const executeAndAddPosition=(pylosPosition, payloads, positions)=>{
    for(let i=0;i<payloads.length;i++){
        let response=pylosPosition.playMovement(payloads[i])
        if(response.success===true){
            if(response)
            positions.push({pylosGame:pylosPosition, lastResponse:response});
        }
    }
}


//considere qu'on enelee une seul bille
const  generatePossiblePositions=({lastResponse, pylosGame})=>{
    let basicPositions=_generatePossibleGames({pylosGame},{movesBall:false,popsBall:false});
    //cas aucun tour auparavant
    if(lastResponse===null){
        return basicPositions;
    }
    if(lastResponse.popBall){
        // on considere qu'on enleve seuelemtn une bille
        let positions =[];
        positions=_generatePossibleGames({pylosGame},{movesBall:false,popsBall:true});
        for(let i=0;i<positions.length;i++){
            let payload={
                movement:{
                    x:0,
                    y:0,
                    layer:0,
            },
            popsBall:false, 
            movesBall:false,
            }   
            positions[i].PylosGame.playMovement(payload);
        }
        //on retourne le set de position possible
        return positions.concat(basicPositions);
    }else if(lastResponse.moveBall){
        positions=_generatePossibleGames({pylosGame},{movesBall:true,popsBall:false});
        return positions.concat(basicPositions);
    }else{
        return basicPositions;
    }        
} 

var calcBestMove = function(depth, game, playerColor,
    alpha=Number.NEGATIVE_INFINITY,
    beta=Number.POSITIVE_INFINITY,
    isMaximizingPlayer=true) {
// Base case: evaluate board
    if (depth === 0) {
        value = eval(game.board(), playerColor);
        return [value, null]
    }

var minmax= function(depth,{pylosGame, lastResponse}, playerColor,
                            alpha=Number.NEGATIVE_INFINITY,
                            beta=Number.POSITIVE_INFINITY,
                            isMaximizingPlayer=true) {
  // Base case: evaluate board
  if (depth === 0) {
    value = evaluateBoard(game.board(), playerColor);
    return [value, null]
  }

  // Recursive case: search possible moves
  var bestMove = null; // best move not set yet
  var possibleMoves = game.moves();
  // Set a default best move value
  var bestMoveValue = isMaximizingPlayer ? Number.NEGATIVE_INFINITY
                                         : Number.POSITIVE_INFINITY;
  
    let childPositions =generatePossiblePositions({lastResponse,pylosGame});
                                         for (var i = 0; i < possibleMoves.length; i++) {
    var move = possibleMoves[i];
    // Make the move, but undo before exiting loop
    game.move(move);
    // Recursively get the value from this move
    value = calcBestMove(depth-1, game, playerColor, alpha, beta, !isMaximizingPlayer)[0];
    // Log the value of this move
    console.log(isMaximizingPlayer ? 'Max: ' : 'Min: ', depth, move, value,
                bestMove, bestMoveValue);

    if (isMaximizingPlayer) {
      // Look for moves that maximize position
      if (value > bestMoveValue) {
        bestMoveValue = value;
        bestMove = move;
      }
      alpha = Math.max(alpha, value);
    } else {
      // Look for moves that minimize position
      if (value < bestMoveValue) {
        bestMoveValue = value;
        bestMove = move;
      }
      beta = Math.min(beta, value);
    }
    // Undo previous move
    game.undo();
    // Check for alpha beta pruning
    if (beta <= alpha) {
      console.log('Prune', alpha, beta);
      break;
    }
  }
/*
const minmax=({lastResponse,pylosGame},depth,alpha,beta,maximizingPlayer)=>{
    if(depth===0){
        return eval({lastResponse,pylosGame});
    }
    let childPositions =generatePossiblePositions({lastResponse,pylosGame});
    if(maximizingPlayer){
        let maxEval= -100000;
        for(let i=0;i<childPositions.length;i++){
            let eval=minmax(childPositions[i], depth-1,alpha,beta,false)
            maxEval = Math.max(eval,maxEval);
            alpha=Math.max(alpha,eval);
            if(beta<=alpha){
                break;
            } 
        }
        return maxEval;
    }else{
        minEval = 100000;
        for(let i=0;i<childPositions.length;i++){
            let eval=-minmax(childPositions[i], depth-1, alpha,beta,true)
            minEval = Math.min(eval,minEval); 
            beta = Math.min(beta,eval);
            if (beta<=alpha){
                break;
            }
        }
    }
}

/*

const generatePossiblePositions=({lastResponse, pylosGame},player)=>{
    //on parcours toutes les cases
    let positions=[];
    let playAgain = false;
    for(let layer=0;layer<pylosGame.board.layers.length;layer++){
        for(let x=0;x<pylosGame.board.layers[layer].length;x++){
            for(let y=0;y<pylosGame.board.layers[layer][x].length;y++){  
                //if pops ball else      
                let pylosPosition =pylosGame.clone();
                let payloads=[];
                //lastResponse null lorsque premier pas de jeu
                if(lastResponse!==null){
                    if(lastResponse.popBall===true){
                        payloads.push({
                            movement:{
                                x:x,
                                y:y,
                                layer:layer,
                            },
                            popsBall:true, 
                            movesBall:false
                        });
                    }else if(lastResponse.moveBall===true){
                        payloads.push({
                            movement:{
                                x:x,
                                y:y,
                                layer:layer,
                            },
                            popsBall:false, 
                            movesBall:true
                        });
                    }
                }
                payloads.push({
                    movement:{
                        x:x,
                        y:y,
                        layer:layer
                    },
                    popsBall:false, 
                    movesBall:false
                })
                for(let i=0;i<payloads.length;i++){
                    let response=pylosPosition.playMovement(payloads[i])
                    if(response.success===true){
                        if(response)
                        positions.push({pylosGame:pylosPosition, lastResponse:response});
                    }
                }
            }
        }
    }    
    return positions;        
}
*/
//minmax(pos,3,-inf,+inf,true)


module.exports={
    generatePossiblePositions,
    minmax
}