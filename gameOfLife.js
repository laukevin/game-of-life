var gRow = 20;
var gColumn = 10;
var ticks = 200;
var boxSize = 15;
var kPixelWidth = boxSize*gRow + 1;
var kPixelHeight = boxSize*gColumn + 1;

var gCanvasElement;
var gDrawingContext;
var currFrame;
var nextFrame;
var gState;

function zeroGrid(row,column){
	var grid = [];

	for (var i = 0; i < row; i++){
		grid.push([]);
		for (var j = 0; j < column; j++){
			grid[i].push(0);
		}
	}
	return grid;
};

function inputGrid(grid,coords){
	for (var i = 0; i < coords.length; i++){
		grid[coords[i][0],coords[i][1]] = 1;
	}
};

function updateGrid(gridB){
	//grid that keeps track of the neighbours
	var gridA = zeroGrid(gRow,gColumn);

	for (var i = 0; i < gRow; i++){
		for (var j = 0; j < gColumn; j++){
			var counter = 0;
			var neighbours = 
				[[i-1,j-1],[i-1,j],[i-1,j+1],
				[i,j-1],[i,j+1],
				[i+1,j-1],[i+1,j],[i+1,j+1]];
			for (var k = 0; k < neighbours.length; k++){
				if (gridB[(neighbours[k][0]+gRow) % gRow][(neighbours[k][1]+gColumn) % gColumn] == 1){
					counter++;
				}
			}
			if (gridB[i][j] == 1){
				if (counter == 2 || counter == 3){
					gridA[i][j] = 1;
				}
			}
			else{
				if (counter == 3){
					gridA[i][j] = 1;
				}
			}
		}
	}
	return gridA;
};

function initGame(){
	var canvasElement = document.createElement("canvas");
	canvasElement.id = "life";
	document.body.appendChild(canvasElement);
	
	gCanvasElement = canvasElement;
	gCanvasElement.width = kPixelWidth;
	gCanvasElement.height = kPixelHeight;
	gDrawingContext = gCanvasElement.getContext("2d");
	newGame();
};

function newGame(){
	currFrame = zeroGrid(gRow,gColumn);
	currFrame[5][5] = 1;
	currFrame[5][6] = 1;
	currFrame[5][7] = 1;
	drawBoard();
	var intervalID = window.setInterval(drawUpdate,ticks);
};

function drawBoard(){
	for (var x=0.5; x<kPixelWidth; x += boxSize){
		gDrawingContext.moveTo(x,0);
		gDrawingContext.lineTo(x,kPixelHeight);
	}
	for (var y=0.5; y<kPixelHeight; y += boxSize){
		gDrawingContext.moveTo(0,y);
		gDrawingContext.lineTo(kPixelWidth,y);
	}
	gDrawingContext.strokeStyle = "#EEE";
	gDrawingContext.stroke();	
};

function drawUpdate(){
	nextFrame = updateGrid(currFrame);
	currFrame = nextFrame;
	for (var i = 0; i < gRow; i++){
		for (var j = 0; j < gColumn; j++){
			if (currFrame[i][j] == 1){
				gDrawingContext.fillStyle="#EEE";
			}
			else{
				gDrawingContext.fillStyle="#FFFFFF";
			}
			gDrawingContext.fillRect(1+boxSize*j,1+boxSize*i,boxSize -2, boxSize -2);
		}
	}
};