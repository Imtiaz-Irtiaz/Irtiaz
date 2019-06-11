var snake;
var scl = 15;
var f;
var done = false;
historyx = [];
historyy = [];
var ov = false;
function setup() {
	createCanvas(600,600);
	snake = new Snake();
	f = new Food();
	textAlign(CENTER,CENTER);
	textSize(32);
	frameRate(10);
}

function draw() {
  background(51);
  if(!ov) snake.update();
  snake.show();
  del();
  ov = checkover();
  f.show();
  if(f.x === snake.x && f.y === snake.y) {
  	f = new Food();
  	snake.len++;
  }
  fill(0,255,0);
  text(snake.len-1,width - 20,20);
  if(ov){
  	fill(255,0,0);
  	text("Game Over",width/2,height/2);
  }
}


function keyPressed(){
	if(!ov){
		if(keyCode === LEFT_ARROW && snake.xspeed != scl){
			snake.speed(-1,0);
			snake.x += snake.xspeed;
			snake.y += snake.yspeed;
			done = true;
		}
		if(keyCode === RIGHT_ARROW && snake.xspeed != -scl){
			snake.speed(1,0);
			snake.x += snake.xspeed;
			snake.y += snake.yspeed;
			done = true;
		}
		if(keyCode === UP_ARROW && snake.yspeed != scl){
			snake.speed(0,-1);
			snake.x += snake.xspeed;
			snake.y += snake.yspeed;
			done = true;
		}
		if(keyCode === DOWN_ARROW && snake.yspeed != -scl){
			snake.speed(0,1);
			snake.x += snake.xspeed;
			snake.y += snake.yspeed;
			done = true;
		}
	}
}

var Snake = function(){
	this.len = 1;
	this.x = 0;
	this.y = 0;
	this.xspeed = scl;
	this.yspeed = 0;

	this.speed = function(a,b){
		this.xspeed = a*scl;
		this.yspeed = b*scl;
	}

	this.update = function(){
		if(!done){
			this.x += this.xspeed;
			this.y += this.yspeed;
		}

		this.x = constrain(this.x,0,width - scl);
		this.y = constrain(this.y,0,height - scl);

		if(historyx.length === 0||(historyx[historyx.length - 1]!=this.x || historyy[historyy.length - 1]!=this.y)){
			historyx.push(this.x);
			historyy.push(this.y);
		}
		done = false;
	}

	this.show = function(){
		fill(255);
		for(var i = historyx.length - 1; i>=historyx.length - snake.len; i --){
			rect(historyx[i],historyy[i],scl,scl);
		}
	}
}


var Food = function(){
	this.x = floor(random(width/scl))*scl;
	this.y = floor(random(width/scl))*scl;

	this.show = function(){
		fill(255,0,0);
		rect(this.x,this.y,scl,scl);
	}
}


var del = function(){
	dellength = historyx.length - snake.len;
	historyx.splice(0,dellength);
	historyy.splice(0,dellength);
}

var checkover = function(){
	var over = false;
	if((snake.x<=0&&snake.xspeed===-scl)||(snake.x + scl>=width&&snake.xspeed===scl)){
		over = true;
		return over;
	}
	if((snake.y<=0&&snake.yspeed===-scl)||(snake.y + scl>=width&&snake.yspeed===scl)){
		over = true;
		return over;
	}
	for(var i = 0;i<historyx.length;i++){
		for (var j = 0; j < historyx.length; j++) {
			if(i==j) continue;
			if(historyx[i]===historyx[j]&&historyy[i]===historyy[j]){
				over = true;
				return over;
			}
		}
	}
	return over;
}