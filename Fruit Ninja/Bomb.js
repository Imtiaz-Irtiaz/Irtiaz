var Bomb = function(source,radius,v){
	this.r = radius;
	this.x = random(this.r,width-this.r);
	this.y = source;
	this.velocity = v;
	this.cut = false;
	this.isFruit = false;
}

Bomb.prototype.display = function(){
	if(!this.cut){
		stroke(0);
		fill(255,0,0);
	}
	else{
		noStroke();
		fill(255,0,0,25);
	}
	ellipse(this.x,this.y,2*this.r,2*this.r);
}

Bomb.prototype.move = function(gravity){
	this.y += this.velocity;
	this.velocity += gravity;
}

Bomb.prototype.update = function(grav){
	this.display();
	this.move(grav);
}

Bomb.prototype.hasFallen = function(){
	if(this.velocity > 0 && this.y-this.r>height) return true;
	return false;
}

Bomb.prototype.checkCut = function(){
	if(!this.cut){
		let d = dist(mouseX,mouseY,this.x,this.y);
		if(d<this.r) this.cut = true;
	}
}