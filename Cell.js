function Cell(x,y,w){
	this.i = x/w;
	this.j = y/w;
	this.x = x;
	this.y = y;
	this.w = w;
	this.neighbourCount1=0;
	this.neighbourCount2=0;
	this.player1 = false;
	this.player2 = false;
	this.revealed = true;
}

Cell.prototype.show = function(){
	stroke(0);
	noFill();
	//rect(this.x,this.y,this.w,this.w);
	if(this.revealed){
		if(this.player1){
			fill('red');
			ellipse(this.x+this.w*0.5,this.y+this.w*0.5,this.w);
		}if(this.player2){
			fill('grey');
			ellipse(this.x+this.w*0.5,this.y+this.w*0.5,this.w);
		}
	}
}


Cell.prototype.contains= function(x,y){
	return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w)	;
}

Cell.prototype.reveal= function(){
	this.revealed = true;
}

Cell.prototype.player1Tour= function(){
	this.player1 = true;
}
Cell.prototype.player2Tour= function(){
	this.player2 = true;
}

/*Cell.prototype.countNeighbours = function(){
	//if(this.bee){
		//return -1;
	//}
	var totalJouer1 = 0;
	var totalJouer2 = 0;
	for(var xoff = -1; xoff <= 1; xoff++){
		for(var yoff = -1; yoff <= 1; yoff++){
			var i = this.i + xoff;
			var j = this.j + yoff;
			if(i>-1 &&i<cols &&j>-1 &&j<rows){
				var neighbour = grid[i][j];
				if(neighbour.joueur1){
					totalJouer1++;
				}if(neighbour.joueur2){
					totalJouer2++;
				}
			}
		}
	}
	this.neighbourCout1 = totalJouer1;
	this.neighbourCout2 = totalJouer2;
}
*/
