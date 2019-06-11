var grid;

var canvas,input,button,slider,div;

function setup() {
	input = createInput('20');
	input.size(200);

	button = createButton('Show Triangle');

	div = createDiv('Text Size');
	slider = createSlider(10,30,20);

	canvas = createCanvas(int(input.value()) * 60,int(input.value()) * 40);
	textAlign(CENTER,CENTER);
	textSize(slider.value());

	grid = new Grid(int(input.value()),int(input.value())*2 - 1);

	input.position(8,8);
	button.position(208,8);
	div.position(8,29);
	slider.position(10,49);
	canvas.position(8,72);

	input.changed(resetup);
	button.changed(resetup);
}

function draw() {
	background(255);
	textSize(slider.value());
	grid.display();
}


function resetup(){
	canvas = createCanvas(int(input.value()) * 60,int(input.value()) * 40);
	textAlign(CENTER,CENTER);
	textSize(20);

	grid = new Grid(int(input.value()),int(input.value())*2 - 1);

	input.position(8,8);
	button.position(208,8);
	div.position(8,29);
	slider.position(10,49);
	canvas.position(8,72);
}
