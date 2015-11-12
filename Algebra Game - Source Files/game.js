//Canvas variables
var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");

//Game variables
var hit_Miss = [0, 0];	//Variable to store the number of times hitting the correct answer and how many times missing the answer

var possibleAnswers = [0, 0, 0, 0]; //Array to store values generated that could be possible answers to the question

var algebraVar = {
	x_coord: null,					//The current x-coordinate
	y_coord: null,					//The current y-coordinate
	value: null,					//The value (from possibleAnswers array) belonging to a specific algebraVar (Note: there will be 4 on the screen)
	rate: 2							//rate at which the numbers will move around the canvas. All will move the same speed.
}

var answered;						//Variable to store whether or not the user has selected an answer

var algebraQuestion = [0, '', '', 0, '=', 0]; //Array that stores the equation.          Note: takes the form Ax +(-) b = c

function init(){
	answered = false;				//Initially the user has not selected an answer
	
	generateQuestion();				//Function to generate the algebraic question/find the solution using the library algebra.js
	
	requestAnimationFrame(draw);	//Draw the game
}

function generateQuestion(){
	var variable = random_character();					//Random character between a-z and A-Z	Note: this is the variable in the equation
	var const1 = Math.floor(Math.random() * 10) + 1;	//Random integer between 1 and 10       Note: this is the coefficient of the variable
	var const2 = Math.floor(Math.random() * 20) + 1;	//Random integer between 1 and 20		Note: this is the constant that is subtracted/added
	var operator = Math.floor(Math.random() * 2) + 1;	//Random integer between 1 and 2		Note: this will either be + or -
	var const3 = Math.floor(Math.random() * 50) + 1;	//Random integer between 1 and 50		Note: this is the constant on the right hand side of the equal sign
	
	//Below this uses algebra.js
		var expr = new Expression(variable.toString());		//Creates a new expression using the variable generated above
	
		for(var i = 0; i < const1 - 1; ++i){
			expr = expr.add(variable.toString());			//Will set the leading coefficient of the equation   
		}													//For example: if const1 == 5 -> loop runs 4 times (we already have one from above) ^												
	
		if(operator == 1){									//Randomly picking whether the equation has subtraction or addition
			operator = '+';
			expr = expr.add(const2);
		}
	
		else{
			operator = '-';
			expr = expr.subtract(const2);
		}
	
		var equ = new Equation(expr, const3);				//Creates an equation of the form       const1*variable <operator> const2 = const3
	
		var solve = equ.solveFor(variable);					//Solves the equation for the variable
	
	//Store the algebraic expression into the array
	algebraQuestion[0] = const1;
	algebraQuestion[1] = variable;
	algebraQuestion[2] = operator;
	algebraQuestion[3] = const2;
	algebraQuestion[5] = const3;
	
	possibleAnswers[0] = solve.toString();					//Stores the correct answer 	Note: the other three should be wrong answers

	console.log(possibleAnswers);
	console.log(algebraQuestion);
}

function random_character() {
    var chars = "abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";
    return chars.substr( Math.floor(Math.random() * 52), 1);
}

function drawEquation(){
	ctx.font = "25px Verdana";
	ctx.clearRect(0, 0, 100, 25);
	ctx.fillText(algebraQuestion[0], 20, 20);
	ctx.fillText(algebraQuestion[1], 40, 20);	
	ctx.fillText(algebraQuestion[2], 65, 20);
	ctx.fillText(algebraQuestion[3], 85, 20);
	ctx.fillText(algebraQuestion[4], 120, 20);
	ctx.fillText(algebraQuestion[5], 140, 20);
}

function drawText(arr, x, y){
		
}

function draw(){
	//Create a new equation is the user has answered
	if(answered){
		init();
	}
	
	drawEquation();		//Draws the equation to the screen
	
	drawText(possibleAnswers, 1,2);		//This does nothing as of now
	
	
	//requestAnimationFrame(draw);		//Will be used later to redraw the board to simulate the numbers moving
}


//These two function possibly used later on to randomly select the starting point for each number on the screen
function randX(){
	return Math.floor(Math.random() * 495 + 1);
}

function randY(){
	return Math.floor(Math.random() * 495 + 1);
}



init();				//Function call to start the game