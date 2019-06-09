let w = 400;
let h = w * 3/5;
let r = w/5;
let cx = w * 9/20;
let cy = h/2;

let vx = w/200;
let vy = h/200;
let rv = r/100;
let x = 0,y = 0,rCurrent = 0;
var button;
function setup() {
  createElement("h1","Bangladesh Flag");
  canvas = createCanvas(w,h);
  createP("");
  button = createButton("Reset");
  createP("");
  createA("https://en.wikipedia.org/wiki/Flag_of_Bangladesh","Flag Detail");
  button.mousePressed(reset);
}

function draw() {
  background(255);
  fill(0,106,78);
  rect(0,0,x,y);
  if(x<w){
    x += vx;
    y += vy;
  }
  else{
    fill(244,42,65);
    noStroke();
    ellipse(cx,cy,2*rCurrent,2*rCurrent);
    if(rCurrent<r) rCurrent += rv;
  }
}


function reset(){
  x = 0;
  y = 0;
  rCurrent = 0;
}

function keyPressed(){
	if(keyCode == ENTER) reset();
}
