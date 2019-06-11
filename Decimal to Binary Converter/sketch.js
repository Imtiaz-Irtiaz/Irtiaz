var whole,frac;


var button,input,binary,slider;

function setup() {
	input = createInput('43.25');
	input.size(200);
	input.position(10,10);

	button = createButton('Calculate');
	button.position(210,10);

	binary = createP('The result will go here with maximum 5 bits after the binary point');
	binary.position(10,50);

	button.mousePressed(begin);
	input.changed(begin);
}


function begin(){
	var number = input.value();
	binary.html(DecimalToBinary(number));
}


function DecimalToBinary(number){
	whole = getWhole(number);
	frac = getFrac(number);

	var binInt = "";

	while(whole != 0){
		var modulo = whole%2;
		whole = floor(whole/2);
		binInt = modulo + binInt;
	}

	var binFrac = "";

	while(binFrac.length < 5 && frac != 0){
		var num = frac * 2;
		var whol = getWhole(num);
		frac = getFrac(num);
		binFrac += whol;
	}
	var bin;
	if(binFrac == "") bin = binInt;
	else bin = binInt + "." + binFrac;
	return bin;
}



function getWhole(n){
	var string = str(n);
	var result = "";
	for(var i = 0;i<string.length;i++){
		if(string[i] == ".") break;
		result += string[i];
	}
	if(result == "") return 0;
	return int(result);
}


function getFrac(n){
	var string = str(n);
	var result = "";
	for(var i = 0;i<string.length;i++){
		if(string[i] == "."){
			for(var j = i;j<string.length;j++){
				result += string[j];
			}
			break;
		}
	}
	if(result == "") return 0;
	else return float(result);
}
