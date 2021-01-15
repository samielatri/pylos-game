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
}


const generatePossiblePop=()=>{
}

/*

                for(let i=0;i<payloads.length;i++){
                    let response=pylosPosition.playMovement(payloads[i])
                    if(response.success===true){
                        if(response)
                        positions.push({pylosGame:pylosPosition, lastResponse:response});
                    }
                }

*/


const  _generatePossibleGames=({lastResponse, pylosGame},{movesBall,popsBall})=>{
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

const  generatePossiblePositionsPop=({lastResponse, pylosGame})=>{
    
} 

const generatePossiblePositionsMove=({lastResponse, pylosGame})



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

//minmax(pos,3,-inf,+inf,true)
const minmax=(position,depth,alpha,beta,maximizingPlayer)=>{
    if(depth===0){
        return eval(position)
    }
    let childPositions =generatePossiblePositions(position);
    if(maximizingPlayer){
        let maxEval= -10000;
        for(childPosition in childPositions){
            let eval=minmax(childPosition, depth-1,alpha,beta,false)
            maxEval = Math.max(eval,maxEval);
            alpha=Math.max(alpha,eval);
            if(beta<=alpha){
                break;
            } 
        }
        return maxEval;
    }else{
        minEval = 10000;
        for(childPosition in childPositions){
            let eval=-minmax(childPosition, depth-1, alpha,beta,true)
            minEval = Math.min(eval,minEval); 
            beta = Math.min(beta,eval);
            if (beta<=alpha){
                break;
            }
        }
    }
}

module.exports={
    generatePossiblePositions
}