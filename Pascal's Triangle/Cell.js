var Cell = function(grid,i,j){
	this.grid = grid.cells;
	this.w = width/grid.cols;
	this.h = height/grid.rows;
	this.x = j*this.w;
	this.y = i*this.h;
	this.value = null;
}


Cell.prototype.display = function(){
	// noFill();
	// rect(this.x,this.y,this.w,this.h);
	if(this.value != null){
		fill(0);
		text(this.value,this.x + this.w/2,this.y + this.h/2);
	}
}