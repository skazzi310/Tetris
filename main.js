var gameOverIndicator = false;
var firstCollision = false;
var numberOfDeletedRows = 0;

var width;
var height;
var canvas1;
var context1;

var numY = 23;
var numX = 12;
var a;			// Security problem, console can directly create/remove blocks

var blockSize;

// shadow dimension, calculated later
var shadeDist;

var numDebug = false;

var newFigure = true; // true = new tetromino needs to be created; false = tetromino if falling
var checkRows = false; // true = delete filled rows if necessary; false = good to go


// background color
var BACKGROUND  = "rgba(110, 110, 110, 1)";

// block colors
var INACTIVE    = "rgba(60, 60, 60, 1)",     // inactive
	TETROMINO_I =  "rgba(120, 220, 210, 1)", // cyan
	TETROMINO_L =  "rgba(240, 150, 50, 1)",  // orange
	TETROMINO_J =  "rgba(10, 100, 170, 1)",  // blue
	TETROMINO_Z =  "rgba(240, 50, 10, 1)",   // red
	TETROMINO_S =  "rgba(110, 170, 50, 1)",  // green
	TETROMINO_O =  "rgba(240, 240, 60, 1)",  // yellow
	TETROMINO_T =  "rgba(140, 80, 190, 1)";  // purple
	
// light shade
var SHADE_TOP    = "rgba(255, 255, 255, 0.4)", // brightest
	SHADE_LEFT   = "rgba(255, 255, 255, 0.2)", // bright
	SHADE_RIGHT  = "rgba(0, 0, 0, 0.2)",   // dark
	SHADE_BOTTOM = "rgba(0, 0, 0, 0.5)";   // darkest

// text colors
var ACTIVE_DEBUG   = "rgba(255, 20, 20, 1)", // red text
	INACTIVE_DEBUG = "rgba(0, 0, 0, 1)";     // black text


window.onload = init;
function init() {
	canvas1 = document.getElementById("canvas1");
	context1 = canvas1.getContext("2d");
	
	width = canvas1.width;
	height = canvas1.height;
	main();
}

function main(){
	var selector_wrapper = $("#wrapper"); // variable added to avoid duplicated JQuery selector (for height and width)
	//var height = selector_wrapper.height();	// not used
	//var width = selector_wrapper.width();		// not used
	

	// not used
	//var blockHeight = height / (numY - 2);
	//var blockWidth = width / numX;
	blockSize = height / (numY - 3);
	
	// calculate shadow dimensions
	shadeDist = Math.round(blockSize / 5);
	
	a = new Array(numY);
	var i; var j;
	for(i = 0; i<a.length; i++){
		a[i] = new Array(numX);
	}
	
	for(i=0; i<a.length - 1; i++){
		for(j=1; j<a[i].length - 1; j++){
			a[i][j] = 0;
			//console.log("" + i + " " + j + " " + a[i][j] + " ");
			
		}
		//console.log("\n");
	}
	
	// initialize border block
	for(i=0; i<a[0].length; i++){
		a[numY - 1][i] = 1;
	}
	for(j=0; j<a.length; j++){
		a[j][0] = 1;
		a[j][a.length] = 1;
	}
	


	// drawing
	
	draw();


	createFigure2();
	newFigure = false;

	writeFigure(a);
	
	// TODO maybe temporarily change the speed of interval for pressing DOWN for fancy effect
}


// makes the movement of the figure
function moveMe(direction){
	deleteFigure(a);
		
	switch(direction){
		case 'l':			// move block left
			if(collisionDetectionOnMove(a, -1, 0)){
				figurePosX--;
			}
			break;
		case 'r':			// move block right
			if(collisionDetectionOnMove(a, 1, 0)){
				figurePosX++;
			}
			break;
		case 'd':			// move block down
			if(collisionDetectionOnMove(a, 0, 1)){
				figurePosY++;
			}
			else {
				// TESTING
				if (firstCollision) {
					newFigure = true;
					checkRows = true;
				}
				else
					firstCollision = true;
			}
			break;
		case 'x':			// makes block fall basically
			if(collisionDetectionOnMove(a, 0, 1)){
				figurePosY++;
			}
			else{
				newFigure = true;
				checkRows = true;
			}
			break;

		case 'z':			// rotate left
			if (figureType == 1)
				break;
			figureRotateLeft();
			if (collisionDetectionOnRotate(a)){
				copyFigure();
			}
			break;
		case 'c':			// rotate right
			if (figureType == 1)
				break;
			figureRotateRight();
			if (collisionDetectionOnRotate(a)){
				copyFigure();
			}
			break;
	}

	writeFigure(a);
	draw();
}

// MOVEMENT
setInterval(function(){
	moveMe('x');
	if (checkRows){
        checkRows = false;
        deleteRows(a);
    }
	if (newFigure){
		gameOver();
		firstCollsion = false;
		var randomFigure = Math.floor((Math.random() * 7) + 1);
		switch (randomFigure){
			case 1:
				createFigure1();
				break;
			case 2:
				createFigure2();
				break;
			case 3:
				createFigure3();
				break;
			case 4:
				createFigure4();
				break;
			case 5:
				createFigure5();
				break;
			case 6:
				createFigure6();
				break;
			case 7:
			default:
				createFigure7();
				break;
		}
		newFigure = false;
	}
	draw();
	
}, 800);

// yips its done
function gameOver(){
    for(var i = 3; i < 8; i++){
        if(a[2][i] > 0 || a[3][i] > 0)
        {
            gameOverIndicator = true;
        }
    }
    if(gameOverIndicator)
    alert("Ha ha! You lost! +\nSCORE: " + numberOfDeletedRows); // Change this :O
}
