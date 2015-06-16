// INPUT from keyboard
$(document).keydown(function(e){
	switch(e.which){
		case 37: 	// left
			moveMe('l');
			break;
		case 38: 	// up
			//newFigure = true; // FOR QUICK DEBUGING
			break;
		case 39:  	// right
			moveMe('r');
			break;
		case 40:	// down
			moveMe('d');
			break;
		case 90:	// z key, rotate left
			moveMe('z');	// NOTE for some keyboards, z is on y button, we should change the bound keys later
			break;
		case 67:	// c key, rotate right
			moveMe('c');
			break;
		case 72: // h key for testing
			if (numDebug == false) {
				numDebug = true;
				draw();
			}
			else {
				numDebug = false;
				draw();
			}
			break;
		default:
			break;
	}
});
