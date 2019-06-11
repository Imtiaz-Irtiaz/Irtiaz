var Fruit = function(source,r,vel){
	this.r = r;
	this.x = random(this.r,width-this.r);
	this.y = source;
	this.velocity = vel;
	this.cut = false;
	this.isFruit = true;
}


Fruit.prototype.display = function(){
	if(!this.cut){
		stroke(0);
		fill(0,255,0);
	}
	else{
		noStroke();
		fill(220,70);
	}
	ellipse(this.x,this.y,2*this.r,2*this.r);
}

Fruit.prototype.move = function(grav){
	this.y += this.velocity;
	this.velocity += grav;
}

Fruit.prototype.update = function(grav){
	this.display();
	this.move(grav);
}

Fruit.prototype.hasFallen = function(){
	if(this.velocity > 0 && this.y-this.r>height) return true;
	return false;
}

Fruit.prototype.checkCut = function(){
	if(!this.cut){
		let d = dist(mouseX,mouseY,this.x,this.y);
		if(d<this.r) this.cut = true;
	}
}

