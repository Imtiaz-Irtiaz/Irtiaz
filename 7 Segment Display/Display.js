var SegmentedDisplayClock = function(startX,startY,wid){
  this.x = startX;
  this.y = startY;
  this.width = wid;
  this.slots = [];

  var slLen = 2*wid/21;

  let c = slLen/2;
  for(let i = 0;i<6;i++){
    let x = this.x + (slLen+c)*i;
    if(i>1) x += 2*c;
    if(i>3) x += 2*c;
    let y = this.y;
    var slot = new Slot(x,y,slLen);
    this.slots.push(slot);
  }

  this.c = c;
  this.height = this.slots[0].height;
}

SegmentedDisplayClock.prototype.enlighten = function(array){
  for(let i = 0;i<array.length;i++){
    this.slots[i].enlighten(array[i]);
  }
}

SegmentedDisplayClock.prototype.display = function(){
  for(let i = 0;i<this.slots.length;i++){
    this.slots[i].display();
  }
}


SegmentedDisplayClock.prototype.updateTime = function(){
  var h = hour();
  var m = minute();
  var s = second();

  var timeSlots = [];

  let hString = str(h);
  if(hString.length == 1) hString = "0" + hString;
  timeSlots.push(hString[0],hString[1]);

  let mString = str(m);
  if(mString.length == 1) mString = "0" + mString;
  timeSlots.push(mString[0],mString[1]);

  let sString = str(s);
  if(sString.length == 1) sString = "0" + sString;
  timeSlots.push(sString[0],sString[1]);


  for(let i = 0;i<timeSlots.length;i++){
    timeSlots[i] = int(timeSlots[i]);
  }

  this.enlighten(timeSlots);
}


SegmentedDisplayClock.prototype.showTime = function(){
  this.updateTime();
  this.display();
}
