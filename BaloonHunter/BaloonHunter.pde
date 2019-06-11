Arrow arrow;
Baloon baloon;
PVector beginning;
PVector gravity;
boolean throwing = false;
float vel = 0;
PVector floating,wind;
float time;
void setup(){
  size(800,500);
  beginning = new PVector(700,400);
  gravity = new PVector(0,0.1);
  arrow = new Arrow(beginning,75);
  floating = new PVector(0,-1);
  baloon = new Baloon(new PVector(width/2,height - 20),floating,3,20);
  wind = new PVector(0.1,0);
}

void draw(){
  background(255);
  if(arrow.thrown) {
    arrow.applyForce(gravity);
  }
  arrow.update();
  arrow.display();
  
  if(arrow.outsideScreen()) arrow.reset(beginning);
  
  if(throwing){
    throwingMechanism(0.5,0,20);
  }
  
  drawBar(0,0,width,30,0,20);
  
  float wnd = noise(time);
  wnd = map(wnd,0,1,-0.05,0.05);
  wind = new PVector(wnd,0);
  time += 0.01;
  
  baloon.manage(arrow,wind);
  if(baloon.gotHit||baloon.outsideScreen()){
    baloon = new Baloon(new PVector(width/2,height - 20),floating,3,20);
    arrow.reset(beginning);
  }
}

void mousePressed(){
  if(!throwing && !arrow.thrown) throwing = true;
}

void mouseReleased(){
  if(throwing){
    arrow.throwing();
  }
}

void throwingMechanism(float increment,float min,float max){
  vel += increment;
  vel = constrain(vel,min,max);
}

void drawBar(float x,float y,float maxl,float w,float min,float max){
  float l = map(vel,min,max,0,maxl);
  fill(0,0,255,100);
  rect(x,y,l,w);
}
