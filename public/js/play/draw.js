

var firstBoard1 = [[2,1,1,2],[2,1,1,2],[2,2,1,1],[2,2,1,2]];
var secondBoard1 = [[1,1,2],[2,1,2],[1,1,2]];
var thirdBoard1 = [[2,3],[2,1]];
var fourthBoard1 = [[1]];

var firstBoard = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var secondBoard = [[0,0,0],[0,0,0],[0,0,0]];
var thirdBoard = [[0,0],[0,0]];
var fourthBoard = [[0]];

let pylos = [firstBoard,secondBoard,thirdBoard,fourthBoard];
//let pylos2 = [firstBoard1,secondBoard1,thirdBoard1,fourthBoard1];

//var time = setInterval(draw, 100);

function make2DArray(cols, rows){
	var arr = new Array(cols);
	for(var i =0;i<arr.length;i++){
		arr[i] = new Array(rows);
	}
	return arr;
}

var cols = 4;
var rows = 4;
var canvasW = 300;
var canvasH = 300;
var w= canvasW/4;


function reset(){
	cols = floor(canvasW/w);
	rows = floor(canvasH/w);
	grid = make2DArray(cols,rows);
	grid1 = make2DArray(cols-1,rows-1);
	grid2 = make2DArray(cols-2,rows-2);
	grid3 = make2DArray(cols-3,rows-3);

	for(var i =0; i<cols;i++){
		for(var j=0;j<rows;j++){
			grid[i][j] = new Cell(i*w,j*w,w);
		}
	}
	for(var i =0; i<cols-1;i++){
		for(var j=0;j<rows-1;j++){
			grid1[i][j] = new Cell(i*w+w/2,j*w+w/2,w);
		}
	}
	for(var i =0; i<cols-2;i++){
		for(var j=0;j<rows-2;j++){
			grid2[i][j] = new Cell(i*w+w,j*w+w,w);
		}
	}
	for(var i =0; i<cols-3;i++){
		for(var j=0;j<rows-3;j++){
			grid3[i][j] = new Cell(i*w+(3*w)/2,j*w+(3*w)/2,w);
		}
	}

}


function setup(){
	createCanvas(canvasW,canvasH);
	reset();
	noLoop();
}



function draw(){

	for(var i = 0; i < cols; i++){
		for(var j = 0; j< rows; j++){
			grid[i][j].show();			
		}
	}
	for(var i = 0; i < cols-1; i++){
		for(var j = 0; j< rows-1; j++){
			grid1[i][j].show();				
		}
	}
	for(var i = 0; i < cols-2; i++){
		for(var j = 0; j< rows-2; j++){
			grid2[i][j].show();				
		}
	}
	for(var i = 0; i < cols-3; i++){
		for(var j = 0; j< rows-3; j++){
			grid3[i][j].show();				
		}
	}
	pylosBoard();
}

function pylosBoard(){
	for(var u =0;u<4;u++){
		var layer = pylos[u];
		for(var i=0; i<layer.length;i++){
			for(var j=0;j<layer.length;j++){
				if(layer.length == 4){
					if(layer[i][j] == 1){
						//instruction si joueur 1
						grid[i][j].player1Tour();
					}else{
						if(layer[i][j] == 2){					
							//instruction si joueur 2
							grid[i][j].player2Tour();
						}else{
							grid[i][j].videCell();
						}
					}
				}
				if(layer.length == 3){
					if(layer[i][j] == 1){
						//instruction si joueur 1
						grid1[i][j].player1Tour();
					}else{
						if(layer[i][j] == 2){					
							//instruction si joueur 2
							grid1[i][j].player2Tour();
						}else{
							grid1[i][j].videCell();
						}
					}
				}
				if(layer.length == 2){
					if(layer[i][j] == 1){
						//instruction si joueur 1
						grid2[i][j].player1Tour();
					}else{
						if(layer[i][j] == 2){					
							//instruction si joueur 2
							grid2[i][j].player2Tour();
						}else{
							grid2[i][j].videCell();
						}
					}
				}if(layer.length == 1){

					if(layer[i][j] == 1){
						//instruction si joueur 1
						grid3[i][j].player1Tour();
					}else{
						if(layer[i][j] == 2){					
							//instruction si joueur 2
							grid3[i][j].player2Tour();
						}else{
							grid3[i][j].videCell();
						}
					}
				}

			}
		}
	}
}

/*function mousePressed() {
	if(mouseX<canvasW&&mouseX>0&&mouseY<canvasH&&mouseY>0){
		console.log("redraw");
		redraw();
	}
}*/

function showBoard(){
	clear();
	redraw();	
}


