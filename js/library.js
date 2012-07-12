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
	alert('Game Over');
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

//END LIBRARY CODE
