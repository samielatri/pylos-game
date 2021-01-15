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
	this.vide = true;
	this.revealed = true;
}

Cell.prototype.show = function(){
	stroke(0);
	noFill();
	rect(this.x,this.y,this.w,this.w);
	if(this.revealed){
		if(this.player1){
			fill('red');
			ellipse(this.x+this.w*0.5,this.y+this.w*0.5,this.w);
		}else if(this.player2){
			fill('grey');
			ellipse(this.x+this.w*0.5,this.y+this.w*0.5,this.w);
		}else {

		}
	}
}

Cell.prototype.delete = function(){
	stroke(0);
	noFill();
	rect(this.x,this.y,this.w,this.w);
}


Cell.prototype.contains= function(x,y){
	return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w)	;
}

Cell.prototype.reveal= function(){
	this.revealed = true;
}

Cell.prototype.player1Tour= function(){
	this.player1 = true;
	this.player2 = false;
	this.vide = false;
}
Cell.prototype.player2Tour= function(){
	this.player2 = true;
	this.player1 = false;
	this.vide = false;

}

Cell.prototype.videCell=function(){
	this.vide = true;
	this.player1 = false;
	this.player2 = false;
}
