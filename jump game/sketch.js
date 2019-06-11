var obstacles = [];
var waiting = [];
var circle;
var velocity = 30;
var g = -2;
var fly = false;
var hit = false;
var score = 0;
function setup() {
  createCanvas(1300,600);
  rectMode(CENTER);
  circle = new Circle;
  textAlign(CENTER,CENTER);
  textSize(32);
}

function draw() {
  background(100);
  circle.show();
  createobst();
  reveal();
  moveobst();
  delwait();
  del();
  checkhit();
  scorer();
  if(fly === true) jump();
  if(hit===true){
    fill(255,0,0);
    textSize(60);
    text("Game Over",width/2,height/2);
  }
}

var Circle = function(){
  this.x = width/3;
  this.radius = 15;
  this.y = height - this.radius;
  this.show = function(){
    fill(25,100,255);
    ellipse(this.x,this.y,this.radius*2,this.radius*2);
  }
}


var Obstacle = function(){
  this.x = random(width*3/2,width*7/4);
  this.h = random(100,200);
  this.y = height - this.h/2;
  this.b = random(5,10);
  this.show = function(){
    fill(255,0,0);
    rect(this.x,this.y,this.b,this.h);
  }
}


function reveal(){
  for (var i = 0; i < obstacles.length; i++) {
    obstacles[i].show();
  }
}

function moveobst(){
  if(hit===false){
    for (var i = 0; i < obstacles.length; i++) {
      obstacles[i].x -=10;
    }
  }
}

function createobst(){
  if(obstacles.length===0){
    var obst = new Obstacle;
    obstacles.push(obst);
    waiting.push(obst);
  }
  else{
    if(obstacles[obstacles.length-1].x<=width*1.25){
      var obst = new Obstacle;
      obstacles.push(obst);
      waiting.push(obst);
    }
  }
}


function keyPressed(){
  if(keyCode===32){
    fly = true;
  }
}

function mousePressed(){
  fly = true;
}

function jump(){
  if(hit===false){
    circle.y -= velocity;
    velocity +=g;
  }
  if(velocity===-30){
    velocity = 30;
    fly = false;
    circle.y = height - circle.radius;
  }
}


function del(){
  for (var i = 0; i < obstacles.length; i++) {
    if(obstacles[i].x<=-obstacles[i].b){
      obstacles.splice(i,1);
    }
  }
}

function delwait(){
  for (var i = 0; i < waiting.length; i++) {
    if(waiting[i].x<circle.x-circle.radius){
      waiting.splice(i,1);
      score++;
    }
  }
}

function checkhit(){
  for (var i = 0; i < waiting.length; i++) {
    if(waiting[i].x - circle.x <= circle.radius + waiting[i].b/2){
      if(circle.y+circle.radius>=height - waiting[i].h){
        hit = true;
      }
    }
  }
}


function scorer(){
  fill(0,255,0);
  textSize(32);
  text("SCORE : "+score,width-200,16);
}
