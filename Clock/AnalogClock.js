var Clock = function(posX,posY,radius){
	this.x = posX;
	this.y = posY;
	this.r = radius;

	var r = this.r - this.r/5;

	this.minLen = r;
	this.secLen = r;
	this.hLen = 3*r/4;

	// this.startingTime = second();
	this.offset = 6*second() - 90; //90 in degree mode (90 degrees)
}

Clock.prototype.display = function(){
	var sec = second();
	var min = minute();
	var h = hour();

	if(h>12) h -= 12;  //converting hour to am-pm system
	if(h == 0) h = 12;

	//Now let's calculate the angles...
	angleMode(DEGREES);

	var hAngle = (h - 3) * 30 + min/2;
	var mAngle = (min/5 - 3) * 30 + sec/12;
	// var sAngle = (sec/5 - 15) * 30;
	var t = millis()/1000;
	var sAngle = 6*t + this.offset;

	stroke(0);
	fill(255);
	ellipse(this.x,this.y,this.r*2 + 20,this.r*2 + 20);
	stroke(0);
	fill(51);
	ellipse(this.x,this.y,this.r*2,this.r*2); //Clock body
	stroke(0);
	

	//Now let's show clock writings...
	for(var i = 1;i<=12;i++){
		var angle = (i-3) * 30;
		var r = this.r - this.r/5;
		var x = this.x + r * cos(angle);
		var y = this.y + r * sin(angle);
		stroke(255,0,0);
		fill(255);
		textAlign(CENTER,CENTER);
		textSize(this.r/5);
		text(i,x,y);
	}

	for(var i = 0;i<=360;i+=6){
		push();
		translate(this.x,this.y);
		rotate(i);
		stroke(255);
		if(i%30 == 0) strokeWeight(3);
		else strokeWeight(1);
		line(this.r,0,this.r- this.r/20,0);
		pop();
	}


	//Let's also show the digital time how the digital time
	// var dh = hour(); //It's digital.. which means not am-pm systemed
	// var tm = "" + dh + " : " + min + " : " + sec;
	// stroke(0);
	// textSize(this.r/10); 
	// text(tm,this.x,this.y-this.r/3);


	//Hour hand
	push();
	translate(this.x,this.y);
	rotate(hAngle);
	stroke(255);
	strokeWeight(3);
	line(0,0,this.hLen,0);
	pop();

	//Minute Hand
	push();
	translate(this.x,this.y);
	rotate(mAngle);
	stroke(255);
	strokeWeight(2.5);
	line(0,0,this.minLen,0);
	pop();

	//Second Hand
	push();
	translate(this.x,this.y);
	rotate(sAngle);
	stroke(255);
	strokeWeight(1);
	line(0,0,this.secLen,0);
	pop();
}