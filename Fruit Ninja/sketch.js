var fruitNinja;
var heart;

function preload(){
	heart = loadImage("Heart.png");
}

function setup() {
	createCanvas(600,400);
	fruitNinja = new Game(7*height/4,0.05,5);
}

function draw() {
	background(51);
  	let frequency = 0.01;
  	fruitNinja.play(frequency);
}


function mouseDragged(){
	fruitNinja.checkCut();
}
