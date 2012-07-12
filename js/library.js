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
var bricks;

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
function paddleToBallCollide()
{
	if(x + 10 > paddle.x && x - 10 < paddle.x + paddle.width &&
	y + 10 > paddle.y && y - 10 < paddle.y + paddle.height)
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

function brick (x,y){
	this.x = x;
	this.y = y;
	this.width = BLOCKWIDTH;
	this.height = BLOCKHEIGHT;
}

function drawBricks()
{
	for(var i = 0; i < bricks.length; i++)
	{
		rect(bricks[i].x, bricks[i].y, bricks[i].width, bricks[y].height);
	}
}

function initBricks()
{
	bricks = new Array();
	for(i = 0; i < 7; i++)
	{
		for(j = 0; j < 4; j++)
		{
			bricks.push(new brick(i*70,j*25));

		}
	}
}

function removeBrick()
{
	for(var i = 0; i < bricks.length; i++){
		if(collide(brick[i]))
		{
			bricks.splice(i, 1);
		}
	}

}

//END LIBRARY CODE
