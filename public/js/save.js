var save = document.getElementById('save');

var nickname = document.getElementById('nickname').textContent;
let turndb = p.turn;
let movesdb = p.moves;
let boarddb = p.board;


save.addEventListener("click",  async function(p){
  changeTurnDB();
  changeMovesDB();
  var turn = turndb;
  var board = boarddb;
  var moves = movesdb;
  ajax.post('/createP4',
  {cols,rows,turn,moves,board,nickname},
  function(response){
    alert('game saved !!')
  },
  function(){
    alert('error');
  }
)
});
