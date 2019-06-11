var clock;
function setup() {
	createCanvas(650,650);
	clock = new Clock(width/2,height/2,300);
	textAlign(CENTER,CENTER);
}

function draw() {
	clock.display();
}
