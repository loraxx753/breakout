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

function init()
{
	ctx = $('#canvas')[0].getContext('2d');
	WIDTH = $('#canvas').width();
	HEIGHT = $('#canvas').height();
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

function clear()
{
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function gameOver()
{
	clearInterval(interval);
	alert('Game Over');
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
