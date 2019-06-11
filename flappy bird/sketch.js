var bird;
var uobsts = [];
var dobsts = [];
var waiting = [];
var obst;
var score = 0;
var fly = false;
var hit = false;

function setup() {
  createCanvas(1300,600);
  bird = new Bird;
  rectMode(CENTER);
  textAlign(CENTER,CENTER);
}

function draw() {
  background(100);
  bird.show();
  createdobst();
  createuobst();
  reveal();
  moveobst();
  del();
  delwait();
  checkhit();
  scorer();
  if(fly===true) bird.y-=60;
  if(fly===false&&hit===false) bird.y+=2;
  fly = false;
  if(hit===true){
    fill(255,0,0);
    textSize(60);
    text("Game Over",width/2,height/2);
  }

  if(bird.y-bird.radius<0) bird.y = bird.radius;
  if(bird.y+bird.radius>height) bird.y = height - bird.radius;
}


var Bird = function(){
  this.x = width/4;
  this.y = height/2;
  this.radius = 15;
  this.show = function(){
    fill(25,100,255);
    ellipse(this.x,this.y,this.radius*2,this.radius*2);
  }
}


var Obstacle = function(){
  this.x = random(width,width*3/2);
  this.h = random(240,280);
  this.b = random(5,10);
  this.show = function(){
    fill(255,0,0);
    rect(this.x,this.y,this.b,this.h);
  }
}


function createdobst(){
  if(dobsts.length===0){
    obst = new Obstacle;
    obst.y = height - obst.h/2;
    dobsts.push(obst);
    waiting.push(obst);
  }
  else{
    if(dobsts[dobsts.length-1].x<3*width/4){
      obst = new Obstacle;
      obst.y = height - obst.h/2;
      dobsts.push(obst);
      waiting.push(obst);
    }
  }
}

function createuobst(){
  if(uobsts.length===0){
    obst = new Obstacle;
    obst.y = obst.h/2;
    uobsts.push(obst);
    waiting.push(obst);
  }
  else{
    if(uobsts[uobsts.length-1].x<3*width/4){
      obst = new Obstacle;
      obst.y = obst.h/2;
      uobsts.push(obst);
      waiting.push(obst);
    }
  }
}


function reveal(){
  for (var i = 0; i < dobsts.length; i++) {
    dobsts[i].show();
  }
  for (var i = 0; i < uobsts.length; i++) {
    uobsts[i].show();
  }
}


function moveobst(){
  if(hit===false){
    for (var i = 0; i < dobsts.length; i++) {
      dobsts[i].x-=10;
    }
    for (var i = 0; i < uobsts.length; i++) {
      uobsts[i].x-=10;
    }
  }
}


function del(){
  for (var i = 0; i < uobsts.length; i++) {
    if(uobsts[i].x<-uobsts[i].b/2){
      uobsts.splice(i,1);
    }
  }
  for (var i = 0; i < dobsts.length; i++) {
    if(dobsts[i].x<-dobsts[i].b/2){
      dobsts.splice(i,1);
    }
  }
}

function delwait(){
  for(var i =0;i< waiting.length; i++){
    if(waiting[i].x<bird.x - bird.radius){
      waiting.splice(i,1);
      score++;
    }
  }
}

function checkhit(){
  for (var i = 0; i < waiting.length; i++) {
    if(waiting[i].y>height/2){
      if(bird.y+bird.radius>=height - waiting[i].h){
        if(waiting[i].x - bird.x <= bird.radius + waiting[i].b/2){
          hit = true;
        }
      }
    }
    else{
      if(bird.y-bird.radius<=waiting[i].h){
        if(waiting[i].x - bird.x <= bird.radius + waiting[i].b/2){
          hit = true;
        }
      }
    }
  }

  if(bird.y+bird.radius>=height||bird.y-bird.radius<=0){
    hit = true;
  }
}

function scorer(){
  fill(0,255,0);
  textSize(32);
  text("SCORE : "+score,width-200,16);
}


function keyPressed(){
  if(keyCode===32&&hit===false){
    fly = true;
  }
}

function mousePressed(){
  if(hit===false){
    fly = true;
  }
}
