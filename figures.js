/**
 * Created by Mickey on 29-May-15.
 */

//Figure properties
var FIGURE_SIZE = 5;

var figure = new Array(FIGURE_SIZE);
for(var i = 0; i<FIGURE_SIZE; i++){
    figure[i] = new Array(FIGURE_SIZE);
}
var figureType;
var figurePosX;
var figurePosY;

var rotatedFigure = new Array(FIGURE_SIZE);
for(i = 0; i<FIGURE_SIZE; i++){
    rotatedFigure[i] = new Array(FIGURE_SIZE);
}

function emptyFigure(){
    for(var i=0; i<FIGURE_SIZE; i++)
        for(var j=0; j<FIGURE_SIZE; j++){
            figure[i][j]=0;
        }
    figureType=0;
    figurePosX=3;
    figurePosY=0;
}

// x x
// x x
// Tetromino O
// Color: Yellow
function createFigure1(){
    emptyFigure();
    figureType = 1;
    figure[1][1] = 1;
    figure[1][2] = 1;
    figure[2][1] = 1;
    figure[2][2] = 1;
}

//    x
//  x x x
// Tetromino T
// Color: Purple
function createFigure2(){
    emptyFigure();
    figureType = 2;
    figure[1][2] = 1;
    figure[2][1] = 1;
    figure[2][2] = 1;
    figure[2][3] = 1;
}

//	x x
//    x x
// Tetromino Z
// Color: Red
function createFigure3(){
    emptyFigure();
    figureType = 3;
    figure[1][1] = 1;
    figure[1][2] = 1;
    figure[2][2] = 1;
    figure[2][3] = 1;
}
//	 x x
// x x
// Tetromino S
// Color: Red
function createFigure4(){
    emptyFigure();
    figureType = 4;
    figure[1][2] = 1;
    figure[1][3] = 1;
    figure[2][1] = 1;
    figure[2][2] = 1;
}

// x x x x
// Tetromino I
// Color: Cyan
function createFigure5(){
    emptyFigure();
    figureType = 5;
    figure[2][0] = 1;
    figure[2][1] = 1;
    figure[2][2] = 1;
    figure[2][3] = 1;
}

//     x
// x x x
// Tetromino L
// Color: Orange
function createFigure6(){
    emptyFigure();
    figureType = 6;
    figure[1][2] = 1;
    figure[2][0] = 1;
    figure[2][1] = 1;
    figure[2][2] = 1;
}

// x
// x x x
// Tetromino J
// Color: Blue
function createFigure7(){
    emptyFigure();
    figureType = 7;
    figure[1][2] = 1;
    figure[2][2] = 1;
    figure[2][3] = 1;
    figure[2][4] = 1;
}

function copyFigure(){
    for(var i=0; i<FIGURE_SIZE; i++)
        for(var j=0; j<FIGURE_SIZE; j++)
            figure[i][j] = rotatedFigure[i][j];
}

function figureRotateLeft(){
    for(var i=0; i<FIGURE_SIZE; i++)
        for(var j=0; j<FIGURE_SIZE; j++)
            rotatedFigure[i][j] = figure[j][FIGURE_SIZE-i-1];
}

function figureRotateRight(){
    for(var i=0; i<FIGURE_SIZE; i++)
        for(var j=0; j<FIGURE_SIZE; j++)
            rotatedFigure[i][j] = figure[FIGURE_SIZE-j-1][i];
}

function collisionDetectionOnMove(a, moveX, moveY){
    for(var i=0; i<FIGURE_SIZE; i++)
        for(var j=0; j<FIGURE_SIZE; j++)
            if(figure[i][j] != 0 && a[figurePosY+i+moveY][figurePosX+j+moveX] != 0)
                return false;
    return true;
}

function collisionDetectionOnRotate(a){
    for(var i=0; i<FIGURE_SIZE; i++)
        for(var j=0; j<FIGURE_SIZE; j++)
            if(rotatedFigure[i][j] != 0 && a[figurePosY+i][figurePosX+j] != 0)
                return false;
    return true;
}

/*
function figureRotateLeftWithSize(figureSize){
    for(var i=0; i<figureSize; i++)
        for(var j=0; j<figureSize; j++)
            rotatedFigure[i][j] = figure[j][figureSize-i-1];
}

function figureRotateRightWithSize(figureSize){
    for(var i=0; i<figureSize; i++)
        for(var j=0; j<figureSize; j++)
            rotatedFigure[i][j] = figure[figureSize-j-1][i];
}
*/

// writes the figure into screen
function writeFigure(a){
    for(var i=0; i<FIGURE_SIZE; i++)
        for(var j=0; j<FIGURE_SIZE; j++)
            if(figure[i][j] != 0)
                a[figurePosY+i][figurePosX+j] = figureType;
}

// deletes the active figure
function deleteFigure(a){
    for(var i=0; i<FIGURE_SIZE; i++)
        for(var j=0; j<FIGURE_SIZE; j++)
            if(figure[i][j] != 0)
                a[figurePosY+i][figurePosX+j] = 0;
}


function deleteRows(a){
    var rows = new Array(4);
    var rowsToBeDeleted = 0;

    // we search for rows to be deleted
    for(var i=2; i<numY - 1; i++){
        var toDelete = true;
        for(var j=1; j<numX - 1; j++) {
            if(a[i][j] == 0) toDelete = false;
        }
        if(toDelete){
            rows[rowsToBeDeleted] = i;
            rowsToBeDeleted++;
        }
        if(rowsToBeDeleted > 4)
            alert("fuck xD out of bounds index something blah");

    }

    // we delete the rows we marked
    for (var k=0; k<rowsToBeDeleted; k++){
        for (i=rows[k]; i>1; i--){
            for (var j=1; j<numX-1; j++){
                //console.log(i+" ovo i nece");
                a[i][j]=a[i-1][j];
            }
        }
    }
    numberOfDeletedRows += rowsToBeDeleted;
    console.log(numberOfDeletedRows);
}

