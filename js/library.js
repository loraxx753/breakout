// BEGIN LIBRARY CODE
var x = 150;
var y = 150;
var dx = 2;
var dy = 4;
var lives = 3;
var WIDTH;
var HEIGHT;
var ctx;
var gameover = false;
var interval;
var timerOffset = 10;
var BLOCKWIDTH = 60;
var BLOCKHEIGHT = 20;
var ROWS = 4;
var COLUMNS = 7;
var SCOREMULTIPLIER = 10;
var bricks;
var closeBrick = 0;

//Paddle
var paddle = new Object();


var left = false, right = false;
function init()
{
	ctx = $('#canvas')[0].getContext('2d');
	WIDTH = $('#canvas').width();
	HEIGHT = $('#canvas').height();
	paddle.width = 80;
	paddle.height = 15;	
	paddle.x = 0;
	paddle.y = HEIGHT-paddle.height;
	paddle.speed = 5;
	paddle.resize= 1.0;
	$('#lives').html(lives);
	initBricks();
	return setInterval(draw, 10);
}

function circle(x, y, r)
{
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
}

function rect(x, y, w, h)
{
	ctx.beginPath();
	ctx.rect(x,y,w,h);
	ctx.closePath();
	ctx.fill();
}

function rectToBallCollide(rect)
{
	if(x + 10 > rect.x && x - 10 < rect.x + rect.width &&
	y + 10 > rect.y && y - 10 < rect.y + rect.height)
		return true;
	return false;
}
function clear()
{
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function gameOver()
{
	clearInterval(interval);
	// alert('Game Over');
}
//Resizes the paddle for a set time before reverting to its original size
function tempResize(size, time)
{
	var originalSize = paddle.resize; 
	paddle.resize = size;
	setTimeout(function() {
		paddle.resize = originalSize; }, time);
}
function playerDie()
{
	lives -= 1;
	$('#lives').html(lives);
	if(lives > 0)
	{
		x = 150;
		y = 150;
		timerOffset = 10;
	}
	else
	{
		gameOver();
	}
}

function brick (x,y, score){
	this.x = x;
	this.y = y;
	this.width = BLOCKWIDTH;
	this.height = BLOCKHEIGHT;
	this.score = score;
}

function drawBricks()
{
	ctx.save();
	for(var i = 0; i < bricks.length; i++)
	{
		rect(bricks[i].x, bricks[i].y, bricks[i].width, bricks[i].height);
	}
	ctx.restore();
}

function initBricks()
{
	bricks = new Array();
	score = SCOREMULTIPLIER*ROWS;
	for(j = 0; j < ROWS; j++)
	{
		for(i = 0; i < COLUMNS; i++)
		{
			bricks.push(new brick(i*70,j*25, score));
		}
		score -= SCOREMULTIPLIER;
	}
}

function removeBrick()
{
	//The ball is too low to be near any of the bricks
	if(y < closeBrick)
		return;
	for(var i = 0; i < bricks.length; i++){
		if(rectToBallCollide(bricks[i]))
		{
			addScore(bricks[i].score);
			bricks.splice(i, 1);
			dy *= -1;
			return;
		}
	}

}

function addScore(amount)
{
	currentScore = parseInt($('#score').html());
	currentScore += amount;
	$('#score').html(currentScore);


}

//END LIBRARY CODE
