var Segment = function(startX,startY,len,wid,index){
  this.x = startX;
  this.y = startY;
  this.len = len;
  this.wid = wid;
  this.index = index;
  this.numbers = [];
  this.lit = false;

  switch (this.index) {
    case 0:
      this.numbers.push(0,2,3,5,6,7,8,9);
      break;
    case 1:
      this.numbers.push(0,1,2,3,4,7,8,9);
      break;
    case 2:
      this.numbers.push(0,1,3,4,5,6,7,8,9);
      break;
    case 3:
      this.numbers.push(0,2,3,5,6,8,9);
      break;
    case 4:
      this.numbers.push(0,2,6,8);
      break;
    case 5:
      this.numbers.push(0,4,5,6,8,9);
      break;
    case 6:
      this.numbers.push(2,3,4,5,6,8,9);
      break;
    default:
      console.log(this.index);
  }
}


Segment.prototype.enlighten = function(number){
  if(this.numbers.includes(number)) this.lit = true;
  else this.lit = false;
}


Segment.prototype.display = function(){
  if(this.lit) {
    // fill(0,0,255);
    stroke(0);

    push();
    translate(this.x,this.y);
    if(this.index==1||this.index==2||this.index==4||this.index==5) rotate(PI/2);

    let offx = this.len/8;
    let offy = this.wid/2;
    beginShape();
    vertex(0,0);
    vertex(offx,-offy);
    vertex(this.len-offx,-offy);
    vertex(this.len,0);
    vertex(this.len-offx,offy);
    vertex(offx,offy);
    endShape(CLOSE);

    pop();
  }
}
