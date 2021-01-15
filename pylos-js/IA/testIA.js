const {generatePossiblePositions} = require("./PylosIA.js");
const {PylosGame} = require("../pylosGame.js");


let game = new PylosGame(1,"Player","IA");

let moves=generatePossiblePositions({lastResponse:null, pylosGame:game});

console.log(JSON.stringify(moves));