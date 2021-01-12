

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
        if (this.layers[layer][x][y]!=0){
            return false;
        }
        if(layer>0){
            if( this.layers[layer-1][x][y]!==0   &&  this.layers[layer-1][x][y+1]!==0 && 
                this.layers[layer-1][x+1][y]!==0 && this.layers[layer-1][x+1][y+1]!==0 ){
                return true;
            }
            console.log("empty")
            return false;
        }
    }
    formedSameColorSquare=(movement)=>{
        const {layer,x,y,player} = movement;
        switch ({x:x,y:y}){
            case {x:3,y:3}:
                console.log(3);
        }
        if(layers[layer][x][y] === layers[layer][x+1][y] === layers[layer][x][y+1] === layers[layer][x+1][y+1] ===player ){
            
        }
    }
    
    isVictory=()=>{
        return layers[3][0][0]!==0;
    }

    print=()=>{
       console.log(this.layers);
    }

    setMovement=(movement)=>{
        try{
            const {layer,x,y,player} = movement;
            this.layers[layer][x][y]=player;
            return true;
        }catch(e){
            return false;
        }
    }
}

let plateau = new Board();
plateau.setMovement({
    layer:0,
    x:0,
    y:0,
    player:1
});

plateau.setMovement({
    layer:0,
    x:0,
    y:1,
    player:2
});
plateau.setMovement({
    layer:0,
    x:1,
    y:0,
    player:2
});
plateau.setMovement({
    layer:0,
    x:1,
    y:1,
    player:1
});

plateau.print();

console.log(
    plateau.isMovementValid({
        layer:1,
        x:1,
        y:0
    })
)

/*
console.log(plateau.layers[0][0][0]=0);
console.log(plateau.layers[0][1][0]);
console.log(plateau.layers[0][1][1]);
console.log(plateau.layers[0][0][1]);

console.log(plateau.layers[0][0][0]!== 0)
console.log(plateau.layers[0][1][0]!==0)
console.log( plateau.layers[0][1][1]!==0)
console.log(plateau.layers[0][0][1]!== 0)
*/


/*        for(let z=0;z<this.layers.length-1;z++){
            for(let x=0;x<this.layers[z].length-1;x++){
                for(let y=0;y<this.layers[z][x].length-1;y++){
                    
                }
            }
        }
*/
