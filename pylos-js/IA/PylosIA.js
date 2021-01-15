const {PylosBoard} = require("../pylosGame.js");

//1) place bille on lvl 3
//- when first and all bille layer 1 2 is done
// - when there n%2 billes= 0 billes on the layer  
//2)place last bille
//3/place derniere bille lvl 1
//3)if after place billes qte%2=0 is good else pop 1 when possible
//can form ball if qte%2=1 after palce +++
//attention forme carré

function eval(position){
    
}



const generatePossiblePositions = ()=>{
}

const generatePossiblePop=()=>{

}

const generatePossibleMovement=(pylosGame)=>{
    //on parcours toutes les cases
    let positions = [];
    for(let layer=0;layer<pylosGame.layers.length;layer++){
        for(let x=0;x<pylosGame.layers[layer].length;x++){
            for(let y=0;y<pylosGame.layers[layer][x].length;y++){  
                //if pops ball else      
                let pylosPosition = pylosGame.clone();
                let payload={
                    movement:{
                        x:x,
                        y:y,
                        z:z,
                    },
                    popsBall:false, 
                }
                if(pylosPosition.playMovement(payload).success){
                    positions.push(pylosPosition);
                }
            };
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
            let eval=minmax(childPosition, depth-1, alpha,beta,true)
            maxEval = Math.min(eval,minEval); 
            beta = Math.min(beta,eval);
            if (beta<=alpha){
                break;
            }
        }
    }
}

/**
 * 
 * 
 * si win +1+
 * 
 * 
 */