void setup(){
size(1400,600);
frameRate(30);
}

var speed = 5;
var x = 0;
void draw() {
    background(252, 255, 214);

    // draw the car body
    fill(255, 0, 115);
    rect(x, 200, 100, 20);
    rect(x + 15, 178, 70, 40);
    
    // draw the wheels
    fill(77, 66, 66);
    ellipse(x + 25, 221, 24, 24);
    ellipse(x + 75, 221, 24, 24);
	
	if (x > 1299){
		speed = -10;
	}
    
	if (x < 1){
		speed = 10;
	}
	
	x = x + speed;
    
};


