var Grid = function(rows,cols){
	this.rows = rows;
	this.cols = cols;
	this.cells = make2DArray(this.rows,this.cols);
	for(var i = 0;i<this.cells.length;i++){
		for(var j = 0;j<this.cells[i].length;j++){
			this.cells[i][j] = new Cell(this,i,j);
		}
	}

	var middle = (cols - 1)/2;

	for(var i = 0;i<this.cells.length;i++){
		if(this.cells[i][middle-i] != undefined) this.cells[i][middle-i].value = 1;
		if(this.cells[i][middle+i] != undefined) this.cells[i][middle+i].value = 1;
	}

	for(var i = 0;i<this.cells.length;i++){
		for(var j = 0;j<this.cells[i].length;j++){
			if(i > 0 && j>0 && j<cols-1){
				if(this.cells[i-1][j-1].value != null && this.cells[i-1][j+1].value != null){
					this.cells[i][j].value = this.cells[i-1][j-1].value + this.cells[i-1][j+1].value;
				}
			}
		}
	}
}

Grid.prototype.display = function(){
	for(var i = 0;i<this.cells.length;i++){
		for(var j = 0;j<this.cells[i].length;j++){
			this.cells[i][j].display();
		}
	}
}




function make2DArray(rows,cols){
	var array = new Array(rows);
	for(var i = 0;i<array.length;i++){
		array[i] = new Array(cols);
	}
	return array;
}