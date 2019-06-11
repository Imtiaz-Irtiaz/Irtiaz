var car;
var lanex = [100,300,500];
var enemies = [];
var waiting = [];
var hit = false;
var score = 0;

function setup() {
  createCanvas(600,600);
  rectMode(CENTER);
  textAlign(CENTER,CENTER);
  car = new Car;
}

function draw() {
  background(75);
  stroke(255);
  line(width/3,0,width/3,height);
  line(width*2/3,0,width*2/3,height);
  stroke(0);
  car.show();

  createen();
  reveal();

  if(car.x<0) car.x = width/6;
  if(car.x>width) car.x = width*5/6;
  if(car.y - car.h/2<0) car.y = car.h/2;
  if(car.y + car.h/2>height) car.y = height - car.h/2;

  del();
  delwait();
  checkhit();
  moveen();
  scorer();

  if(hit===true){
    fill(255,0,0);
    textSize(60);
    text("GAME OVER",width/2,height/2);
  }
}


var Car = function(){
  this.x = width/2;
  this.y = height*2/3;
  this.b = 75;
  this.h = 120;
  this.show = function(){
    fill(25,100,255);
    rect(this.x,this.y,this.b,this.h);
  }
}


var Enemy = function(){
  this.x = random(lanex);
  this.h = random(100,150);
  this.y = random(-height,-this.h);
  this.b = random(70,80);
  this.show = function(){
    fill(255,0,0);
    rect(this.x,this.y,this.b,this.h);
  }
}


function createen(){
  if(enemies.length===0){
    var enemy = new Enemy;
    enemies.push(enemy);
    waiting.push(enemy);
  }
  else{
    if(enemies[enemies.length-1].y>=height/3){
      var enemy = new Enemy;
      enemies.push(enemy);
      waiting.push(enemy);
    }
  }
}


function reveal(){
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].show();
  }
}


function moveen(){
  if(hit===false){
    for (var i = 0; i < enemies.length; i++) {
      enemies[i].y+=15;
    }
  }
}


  function del(){
    for (var i = 0; i < enemies.length; i++) {
      if(enemies[i].y - enemies[i].h/2 >= height){
        enemies.splice(i,1);
      }
    }
  }

  function delwait(){
    for(var i =0;i<waiting.length;i++){
      if(waiting[i].y - waiting[i].h/2>car.y+car.h/2){
        waiting.splice(i,1);
        score++;
      }
    }
  }

function checkhit(){
    for (var i = 0; i < waiting.length; i++) {
      if(waiting[i].x===car.x){
        if(car.y - waiting[i].y<=car.h/2){
          hit = true;
        }
      }
    }
  }

function scorer(){
  fill(0,255,0);
  textSize(32);
  text("SCORE : "+score,width-150,16);
}

function keyPressed(){
  if(hit===false){
    if(keyCode===UP_ARROW) car.y-=30;
    if(keyCode===DOWN_ARROW) car.y+=30;
    if(keyCode===LEFT_ARROW) car.x-=width/3;
    if(keyCode===RIGHT_ARROW) car.x+=width/3;
  }
}
