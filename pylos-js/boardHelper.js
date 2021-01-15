/*
    initialise la un tableau a 2 dimensions, de largeur width avec la valeur value
*/
const initLayer =(width,value)=>{
    let layer=[];
    for(let i=0;i<width;i++){
        let layer_x=[]
        for(let i=0;i<width;i++){
            layer_x.push(value);
        }
        layer.push(layer_x);
    }
    return layer;
}

const getValidMovements=()=>{

}

const getMovableBalls = ()=>{
    
}


const hasBallOnTop=(layers,layer,x,y)=>{
    if(layer>=layers.length-1){
        return false;
    }
    if(x===0 && y===0){
        return layers[layer+1][x][y]!==0;
    }
    else if(x===0 && y===layers[layer].length-1){
        return layers[layer+1][x][y-1]!==0;
    }
    else if(x===layers[layer].length-1 && y===0){
        return layers[layer+1][x-1][y]!==0;
    }
    else if(x===layers[layer].length-1 && y===layers[layer].length-1){
        return layers[layer+1][x-1][y-1]!==0;
    }
    else if(x===0){
        return layers[layer+1][x][y-1]!==0 || layers[layer+1][x][y]!==0;
    }
    else if(y===0){
        return layers[layer+1][x-1][y]!==0 || layers[layer+1][x][y]!==0;
    }    
    else if(x===layers[layer].length-1){
        return layers[layer+1][x-1][y]!==0 || layers[layer+1][x-1][y-1]!==0;
    }    
    else if(y===layers[layer].length-1){
        return layers[layer+1][x-1][y-1]!==0 || layers[layer+1][x][y-1]!==0;
    }else{
        return layers[layer+1][x-1][y-1]!==0 || layers[layer+1][x-1][y]!==0 || layers[layer+1][x][y-1]!==0 || layers[layer+1][x][y]!==0;
    } 
}

const getPopableMovements=(board,player)=>{
    let movements = [];

}


/*
    initialise la un tableau a 2 dimensions
*/

const printLayer =(layer)=>{
    for(let i=0;i<layer.length;i++){
        for(let j=0;j<layer.length;j++){
            process.stdout.write(layer[i][j]); 
        }
        process.stdout.write("\n"); 
    }
    return layer 
}

module.exports={
    initLayer,
    hasBallOnTop,
    printLayer,
    getPopableMovements,
    getValidMovements
}