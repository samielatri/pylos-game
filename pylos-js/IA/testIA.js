const {generatePossiblePositions, minmax} = require("./PylosIA.js");
const {PylosGame} = require("../pylosGame.js");


let game = new PylosGame(1,"Player","IA");

//let moves=generatePossiblePositions({lastResponse:null, pylosGame:game});
//minmax(pos,3,-inf,+inf,true)
let eval = minmax({lastResponse:null,pylosGame:game},6,-1000000,1000000,true);
console.log(JSON.stringify(moves));