function draw() {
	// Clear screen
	context1.fillStyle = BACKGROUND;
	context1.fillRect(0, 0, width, height);
	// Draw blocks
	var textSize = 12;
	context1.font = ""+textSize+"px Georgia";
	for (var i=0; i<numY-3; i++) {						// TODO change matrix drawing so only the blocks that changed redraw
		for (var j=0; j<numX-1; j++) {
			// active block
			if (a[i+2][j+1] > 0) {
				
				// select color
				switch (a[i+2][j+1]) {
					case 1: 
						context1.fillStyle = TETROMINO_I; // cyan
						break;
					case 2:
						context1.fillStyle = TETROMINO_L; // orange
						break;
					case 3:
						context1.fillStyle = TETROMINO_J; // blue
						break;
					case 4:
						context1.fillStyle = TETROMINO_Z; // red
						break;
					case 5:
						context1.fillStyle = TETROMINO_S; // green
						break;
					case 6:
						context1.fillStyle = TETROMINO_O; // yellow
						break;
					case 7:
						context1.fillStyle = TETROMINO_T; // purple
						break;
				}
				
				var x = j*blockSize+1;
				var y = i*blockSize+1;
				
				// draw block
				context1.fillRect(x, y, blockSize-1, blockSize-1);
			
				// draw shade
				// top left
				
				context1.fillStyle = SHADE_TOP;					// TODO make all blocks images and reuse them?
				context1.beginPath();
				context1.moveTo(x, y);
				context1.lineTo(x+blockSize, y);
			    context1.lineTo(x+blockSize-shadeDist, y+shadeDist);
				context1.lineTo(x+shadeDist, y+shadeDist);
				context1.fill();
				// bottom left
				context1.fillStyle = SHADE_LEFT;
				context1.beginPath();
				context1.moveTo(x, y);
				context1.lineTo(x, y+blockSize);
			    context1.lineTo(x+shadeDist, y+blockSize-shadeDist);
				context1.lineTo(x+shadeDist, y+shadeDist);
				context1.fill();
				// bottom right
				context1.fillStyle = SHADE_BOTTOM;
				context1.beginPath();
				context1.moveTo(x, y+blockSize);
				context1.lineTo(x+blockSize, y+blockSize);
			    context1.lineTo(x+blockSize-shadeDist, y+blockSize-shadeDist);
				context1.lineTo(x+shadeDist, y+blockSize-shadeDist);
				context1.fill();
				// top right
				context1.fillStyle = SHADE_RIGHT;
				context1.beginPath();
				context1.moveTo(x+blockSize, y);
				context1.lineTo(x+blockSize, y+blockSize);
			    context1.lineTo(x+blockSize-shadeDist, y+blockSize-shadeDist);
				context1.lineTo(x+blockSize-shadeDist, y+shadeDist);
				context1.fill();
				
				
				// draw debug text on Active
				if (numDebug == true) {														// TODO make this more usable
					context1.fillStyle = ACTIVE_DEBUG;
					context1.fillText(""+i+", "+j+"", j*blockSize+1, i*blockSize+1+textSize);
				}
			}
			// Empty block
			else {
				// draw inactive block
				context1.fillStyle = INACTIVE;
				context1.fillRect(j*blockSize+1, i*blockSize+1, blockSize-1, blockSize-1);
				
				// draw debug text on Inactive
				if (numDebug == true) {
					context1.fillStyle = INACTIVE_DEBUG;
					context1.fillText(""+i+", "+j+"", j*blockSize+1, i*blockSize+1+textSize);
			
					context1.fillStyle = "rgba(255, 0, 0, 0.6)";
					context1.font = "24px Georgia";
					context1.fillText(numberOfDeletedRows, width*0.83, height*0.045);
					context1.font = ""+textSize+"px Georgia";
				}
			}
		}
	}
}
