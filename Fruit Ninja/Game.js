var Game = function(source,grav,life){
	this.source = source;
	this.bombs = [];
	this.fruits = [];
	this.gravity = grav;
	this.life = life;
	this.score = 0;
}

Game.prototype.run = function(freqOfBomb){
	this.addFruit();
	this.forgetFallenStuffs(this.fruits);
	this.update(this.fruits);


	this.addBomb(freqOfBomb);
	this.update(this.bombs);
	this.forgetFallenStuffs(this.bombs);
	this.splash();
	this.showLives();
	this.showScore();
}

Game.prototype.isOver = function(){
	if(this.life<=0) return true;
	else return false; 
}

Game.prototype.play = function(freqOfBomb){
	if(!this.isOver()) this.run(freqOfBomb);
	else{
		fill(255,0,0);
		textAlign(CENTER,CENTER);
		textSize(32);
		text("Game Over, Score : "+this.score,width/2,height/2);
	}
}


Game.prototype.checkCut = function(){
	for(let i = 0;i<this.fruits.length;i++){
		let before = this.fruits[i].cut;
		this.fruits[i].checkCut();
		let after = this.fruits[i].cut;
		if(!before && after) this.score ++;
	}
	for(let i = 0;i<this.bombs.length;i++){
		let before = this.bombs[i].cut;
		this.bombs[i].checkCut();
		let after = this.bombs[i].cut;
		if(!before && after) this.life--;
	}
}


Game.prototype.forgetFallenStuffs = function(array){
	for(let i = array.length-1;i>=0;i--){
		let el = array[i];
		if(el.hasFallen()){
			array.splice(i,1);
			if(el.isFruit && !el.cut) this.life--;
		}
	}
}


Game.prototype.update = function(array){
	for(let i = 0;i<array.length;i++){
		array[i].update(this.gravity);
	}
}

Game.prototype.addFruit = function(){
	let offset = random(height/2,3*height/4);
	if(this.fruits.length==0 || this.fruits[this.fruits.length-1].y<offset){
		let r = random(20,30);
		let vel = random(-7,-8);
		var fruit = new Fruit(this.source,r,vel);
		this.fruits.push(fruit);
	}
}

Game.prototype.addBomb = function(f){
	let state = random(1);
	if(state<f){
		let r = random(20,30);
		let vel = random(-7,-8);
		var bomb = new Bomb(this.source,r,vel);
		this.bombs.push(bomb);
	}
}


Game.prototype.splash = function(){
	var spl = false;
	for(let i = 0;i<this.bombs.length;i++){
		if(this.bombs[i].cut){
			spl = true;
			break;
		}
	}

	if(spl){
		fill(255,0,0,30);
		rect(0,0,width,height);
	}
}


Game.prototype.showLives = function(){
	for(let i = 0;i<this.life;i++){
		image(heart,i*heart.width,0);
	}
}

Game.prototype.showScore = function(){
	fill(0,255,0,200);
	textAlign(CENTER,CENTER);
	textSize(20);
	text(this.score,width-30,30);
}