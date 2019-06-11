class Baloon{
  PVector location;
  PVector velocity;
  PVector beginning;
  PVector accelaration;
  float maxWindVel;
  color col;
  float r;
  boolean gotHit;
  
  Baloon(PVector begin, PVector upVel,float maxXVel,float r){
    beginning = begin.get();
    location = begin.get();
    velocity = upVel.get();
    accelaration = new PVector(0,0);
    maxWindVel = maxXVel;
    col = color(random(0,255),random(0,255),random(0,255));
    this.r = r;
    gotHit = false;
  }
  
  void applyForce(PVector force){
    accelaration.add(force);
  }
  
  void update(){
    velocity.add(accelaration);
    velocity.x = constrain(velocity.x,-maxWindVel,maxWindVel);
    location.add(velocity);
    accelaration.mult(0);
  }
  
  void display(){
    fill(col);
    ellipse(location.x,location.y,r*2,r*2);
  }
  
  void checkHit(Arrow arrow){
    if(dist(arrow.location.x,arrow.location.y,location.x,location.y)<r) gotHit = true;
    else{
      PVector ploc = PVector.sub(arrow.location,arrow.velocity);
      PVector pointer = PVector.sub(location,ploc);
      float angle = PVector.angleBetween(arrow.velocity,pointer);
      float normal = pointer.mag() * sin(angle);
      if(normal<r){
        float x1 = arrow.location.x , y1 = arrow.location.y;
        float x2 = ploc.x , y2 = ploc.y;
        float x3 = location.x, y3 = location.y;
        
        float a = x1 - x2;
        float b = y1 - y2;
        float c1 = x1*y2-x2*y1;
        float c2 = -a*x3 - b*y3;
        
        float x = (-b*c1 - c2*a)/(a*a + b*b);
        float y = (-b*c2 + c1*a)/(a*a + b*b);
        
        
        float dx1 = x - x1;
        float dx2 = x - x2;
        float dy1 = y - y1;
        float dy2 = y - y2;
        
        if(dx1 * dx2 <0 && dy1 * dy2 <0) {gotHit = true;println("This worked");}
        //else if(dy1 * dy2 <0) {gotHit = true;println("This worked");}
      }
    }
  }
  
  void manage(Arrow arrow,PVector wind){
    if(!gotHit) checkHit(arrow);
    if(!gotHit && !outsideScreen()){
      applyForce(wind);
      update();
      display();
    }
  }
  boolean outsideScreen(){
    if(location.x+r<0||location.x-r>width||location.y+r<0||location.y-r>height) return true;
    else return false;
  }
}


float[] getNormalPoint(float x1, float y1, float x2, float y2,float x3, float y3){
  float a = x1 - x2;
  float b = y1 - y2;
  float c1 = x1*y2-x2*y1;
  float c2 = -a*x3 - b*y3;
  
  float x = (-b*c1 - c2*a)/(a*a + b*b);
  float y = (-b*c2 + c1*a)/(a*a + b*b);
  
  float[] array = {x,y};
  return array;
}
