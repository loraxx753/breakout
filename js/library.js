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
var BLOCKWIDTH = 65;
var GUTTER = 5;
var BLOCKHEIGHT = 20;
var ROWS = 4;
var COLUMNS = 7;
var SCOREMULTIPLIER = 10;
var MAXLEVEL = 10;
var bricks;
var closeBrick = 0;
var currentLevel = 0;
var levelColors = [
	{
		r: 193,
		g: 82, 
		b: 218,
	},
	{
		r: 117,
		g: 185, 
		b: 181,
	},
	{
		r: 194,
		g: 21, 
		b: 21,
	},
	{
		r: 35,
		g: 143, 
		b: 8,
	},
	{
		r: 255,
		g: 255, 
		b: 0,
	},
	{
		r: 189,
		g: 157, 
		b: 188,
	},
	{
		r: 84,
		g: 209, 
		b: 113,
	},
	{
		r: 255,
		g: 255, 
		b: 255,
	},
	{
		r: 100,
		g: 85, 
		b: 240,
	},
	{
		r: 54,
		g: 141, 
		b: 168,
	},
]

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
	paddle.x = (WIDTH-paddle.width)/2;
	paddle.y = HEIGHT-paddle.height-10;
	paddle.speed = 5;
	paddle.resize= 1.0;
	$('#lives').html(lives);
	$('#level').html(currentLevel+1);
	setlevelcolors();
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

function rect(x, y, w, h, r, g, b)
{
	ctx.beginPath();
	ctx.rect(x,y,w,h);
	ctx.closePath();
	//ctx.fillStyle = "rgb(222, 33, 22)";
	ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
	ctx.fill();
	ctx.fillStyle = 'rgb(0,0,0)';
	ctx.lineWidth = 2;
	ctx.stroke();
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
	clear();
	rect(0,0,WIDTH,HEIGHT,0,0,0);
	ctx.fillStyle = '#fff';
	ctx.font = 'bold 80px Londrina Shadow';
	ctx.textBaseline = 'bottom';
	ctx.fillText('GAME OVER', 80, 280);
	$('#canvas').removeClass('gameBorder');
}
//Resizes the paddle for a set time before reverting to its original size
function tempResize(size, time)
{
	var originalSize = paddle.resize; 
	paddle.resize = size;
	setTimeout(function() {
		paddle.resize = originalSize; }, time);
}
function resetLivesColor()
{
	$('#lives').css('color', '#000');
}
function playerDie()
{
	lives -= 1;
	if(lives > -1)
	{
		x = 150;
		y = 150;
		timerOffset = 10;
		$('#lives').html(lives).css({
			color: '#F00',
		});
		setTimeout(resetLivesColor, 200);
	}
	else
	{
		gameOver();
	}
}

function randomColor()
{
	return Math.floor(Math.random()*215)+40;
}

function brick (x,y, score,r,g,b){
	this.x = x;
	this.y = y;
	this.width = BLOCKWIDTH;
	this.height = BLOCKHEIGHT;
	this.score = score;
	this.r = r;
	this.g = g;
	this.b = b;
}

function level (r, g, b){

	this.r = r;
	this.g = g;
	this.b = b;
}

function setlevelcolors(){

	levels = new Array();
	for(var i = 0; i < MAXLEVEL; i++)
	{
		levels.push(new level(levelColors[i].r, levelColors[i].g, levelColors[i].b));
	}
}

function playerWon()
{
	clearInterval(interval);
	// rect(0,0,WIDTH,HEIGHT,0,0,0);
	ctx.fillStyle = 'rgb(35,143,8)';
	ctx.font = 'bold 80px Londrina Shadow';
	ctx.textBaseline = 'bottom';
	ctx.fillText("You've Won!", 80, 280);
}

function setLevel()
{
	currentLevel++;
	if(currentLevel == 10)
	{
		playerWon();
	}
	initBricks();
	x = 150;
	y = 150;
	timerOffset = 10;
	$('#level').html(currentLevel+1);
}

function drawBricks()
{
	ctx.save();
	for(var i = 0; i < bricks.length; i++)
	{
		rect(bricks[i].x, bricks[i].y, bricks[i].width, bricks[i].height, bricks[i].r, bricks[i].g, bricks[i].b);
	}
	ctx.restore();
}


function initBricks()
{
	var r = levels[currentLevel].r;
	var g = levels[currentLevel].g;
	var b = levels[currentLevel].b;
	console.log(r+','+g+','+b);
	bricks = new Array();
	score = SCOREMULTIPLIER*ROWS;

	for(j = 0; j < ROWS; j++)
	{
		r -= 30;
		g -= 30;
		b -= 30;
		for(i = 0; i < COLUMNS; i++)
		{
			bricks.push(new brick((i*(BLOCKWIDTH+GUTTER))+7,(j*(BLOCKHEIGHT+GUTTER))+20, score,r,g,b));
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
			if(bricks.length == 0)
			{
				setLevel();
			}
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
