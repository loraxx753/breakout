var ball;
var paddle;
var bricks = new Array();

function init()
{
	WIDTH = $('#canvas').width();
	HEIGHT = $('#canvas').height();
	ball = new Ball(150, 150, 10);
	paddleX = ((WIDTH-80)/2);
	paddleY = (HEIGHT-15-10);
	paddle = new Paddle(paddleX, paddleY, 80, 15, 5, 1.0, false);
	ctx = $('#canvas')[0].getContext('2d');
	$('#lives').html(lives);
	$('#level').html(currentLevel+1);
	setlevelcolors();
	initBricks();
	return setInterval(draw, 10);
}
