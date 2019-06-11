class Arrow{
  PVector location;
  PVector bottom;
  PVector velocity;
  PVector accelaration;
  boolean thrown;
  float len;
  
  Arrow(PVector start,float l){
    thrown = false;
    len = l;
    bottom = start.get();
    PVector mouse = new PVector(mouseX,mouseY);
    PVector arrow = PVector.sub(mouse,bottom);
    arrow.setMag(len);
    location = PVector.add(arrow,bottom);
    velocity = new PVector(0,0);
    accelaration = new PVector(0,0);
  }
  
  void update(){
    if(thrown){
      velocity.add(accelaration);
      location.add(velocity);
      bottom.add(velocity);
      accelaration.mult(0);
    }
    else{
      PVector mouse = new PVector(mouseX,mouseY);
      PVector arrow = PVector.sub(mouse,bottom);
      arrow.setMag(len);
      location = PVector.add(arrow,bottom);
    }
  }
  
  void applyForce(PVector force){
    accelaration.add(force);
  }
  
  void display(){
    PVector arrow = PVector.sub(location,bottom);
    float angle;
    if(!thrown) angle = arrow.heading2D();
    else angle = velocity.heading2D();
    pushMatrix();
    translate(bottom.x,bottom.y);
    rotate(angle);
    line(0,0,len,0);
    fill(200,100);
    //ellipse(len,0,5,5);
    triangle(len,0,len-10,5,len-10,-5);
    popMatrix();
  }
  
  void throwing(){
    PVector veloc = PVector.sub(location,bottom);
    veloc.setMag(vel);
    velocity = veloc.get();
    thrown = true;
    throwing = false;
    vel = 0;
  }
  
  void reset(PVector start){
    bottom = start.get();
    PVector mouse = new PVector(mouseX,mouseY);
    PVector arrow = PVector.sub(mouse,bottom);
    arrow.setMag(len);
    location = PVector.add(arrow,bottom);
    velocity = new PVector(0,0);
    accelaration = new PVector(0,0);
    thrown = false;
  }
  
  boolean outsideScreen(){
    if(bottom.x<0 || bottom.x>width ||  bottom.y>height) return true;
    else return false;
  }
}
