var Slot = function(startX,startY,wid){
  this.x = startX;
  this.y = startY;
  this.segments = [];
  this.width = wid;

  let sLen = wid * 15/16;
  let sWid = sLen/3;
  let c = sLen/15;
  var s0 = new Segment(this.x,this.y,sLen,sWid,0);
  var s1 = new Segment(this.x+sLen+c,this.y+c,sLen,sWid,1);
  var s2 = new Segment(this.x+sLen+c,this.y+sLen+c*2,sLen,sWid,2);
  var s3 = new Segment(this.x,this.y+sLen*2+c*3,sLen,sWid,3);
  var s4 = new Segment(this.x-c,this.y+sLen+c*2,sLen,sWid,4);
  var s5 = new Segment(this.x-c,this.y+c,sLen,sWid,5);
  var s6 = new Segment(this.x,this.y+sLen+c*3/2,sLen,sWid,6);

  this.segments.push(s0,s1,s2,s3,s4,s5,s6);
  this.height = 19*wid/8;
}

Slot.prototype.enlighten = function(num){
  for(let i = 0;i<this.segments.length;i++){
    this.segments[i].enlighten(num);
  }
}

Slot.prototype.display = function(){
  for(let i = 0;i<this.segments.length;i++){
    this.segments[i].display();
  }
}
