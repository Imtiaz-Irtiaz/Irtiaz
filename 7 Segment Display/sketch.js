var clock;
function setup() {
  createCanvas(600,400);
  let w = 420;
  let h = w*38/168;
  clock = new SegmentedDisplayClock(width/2-w/2,height/2-h/2,w);
}

function draw() {
  background(200);
  fill(0,0,255,128);
  clock.showTime();
}
