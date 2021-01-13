const {Board} = require("../board.js");

let plateau = new Board();
l
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
