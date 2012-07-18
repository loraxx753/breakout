// BEGIN LIBRARY CODE

var x = 150;
var y = 150;
var dx = 2;
var dy = 4;
var lives = 3;
var ctx;
var gameOver = false;
var gameWon = false;
var interval;
var timerOffset = 10;
var bricks;
var powerups = new Array();
var powertypes = new Array('resize');;
var closeBrick = 0;
var currentLevel = 0;
var firstTime = true;
var paused = false;

var sizeImage = new Image();
sizeImage.src = "size_powerup.png";
var slowImage = new Image();
slowImage.src = "slow_powerup.png";

//Paddle
var paddle = new Object();


var left = false, right = false;
// function init()
// {
// 	Ball.x = 150;
// 	Ball.y = 150;
// 	ctx = $('#canvas')[0].getContext('2d');
// 	WIDTH = $('#canvas').width();
// 	HEIGHT = $('#canvas').height();
// 	Paddle.width = 80;
// 	Paddle.height = 15;	
// 	Paddle.x = (WIDTH-Paddle.width)/2;
// 	Paddle.y = HEIGHT-Paddle.height-10;
// 	Paddle.speed = 5;
// 	Paddle.resize= 1.0;
// 	Paddle.power = false;
// 	$('#lives').html(lives);
// 	$('#level').html(currentLevel+1);
// 	setlevelcolors();
// 	initBricks();
// 	return setInterval(draw, 10);
// }
/* * * * * * * * * * * * * * * * * * * 
 * SHAPES 
 * * * * * * * * * * * * * * * * * * */
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

function clear()
{
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

/* * * * * * * * * * * * * * * * * * * 
 * STOP CONDITIONS 
 * * * * * * * * * * * * * * * * * * */
function gameLost()
{
	gameOver = true;
	clearInterval(interval);
	clear();
	rect(0,0,WIDTH,HEIGHT,0,0,0);
	ctx.fillStyle = '#fff';
	ctx.font = 'bold 80px Londrina Shadow';
	ctx.textBaseline = 'bottom';
	ctx.fillText('GAME OVER', 80, 280);
	$('#canvas').removeClass('gameBorder');
	$('#levelup').remove();
}
function playerWon()
{
	if(paused)
	{
		draw();
	}
	gameWon = true;
	clearInterval(interval);
	// rect(0,0,WIDTH,HEIGHT,0,0,0);
	ctx.fillStyle = 'rgb(35,143,8)';
	ctx.font = 'bold 80px Londrina Shadow';
	ctx.textBaseline = 'bottom';
	ctx.fillText("You've Won!", 80, 280);
	if($('#levelup').length > 0)
	{
		$('#levelup').unbind('click').click(function(e) {
			e.preventDefault();
		});
	}
}

function pauseGameToggle()
{
	if(!interval)
	{
		interval = setInterval(draw, 10);
		paused = false;
	}
	else
	{
		paused = true;
		clearInterval(interval);
		interval = null;		
		ctx.save();
		ctx.fillStyle = 'rgb(0,0,0)';
		ctx.font = 'bold 80px Londrina Shadow';
		ctx.textBaseline = 'bottom';
		if(currentLevel < 7)
			ctx.fillText("Paused!", 120, 300);
		else
			ctx.fillText("Paused!", 120, 100);
		ctx.restore();
	}

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
		console.log('here');
		ball.x = 150;
		ball.y = 150 + levels[currentLevel].gutter;
		timerOffset = 10;
		$('#lives').html(lives).css({
			color: '#F00',
		});
		setTimeout(resetLivesColor, 200);
	}
	else
	{
		gameLost();
	}
}

function randomColor()
{
	return Math.floor(Math.random()*215)+40;
}

function brick (x,y, score,r,g,b,power){
	this.x = x;
	this.y = y;
	this.width = BLOCKWIDTH;
	this.height = BLOCKHEIGHT;
	this.score = score;
	this.r = r;
	this.g = g;
	this.b = b;
	this.power = power;
}

function level (r, g, b, gutter){

	this.r = r;
	this.g = g;
	this.b = b;
	this.gutter = gutter;
}

function setlevelcolors(){

	levels = new Array();
	for(var i = 0; i < MAXLEVEL; i++)
	{
		levels.push(new level(LEVELCOLORS[i].r, LEVELCOLORS[i].g, LEVELCOLORS[i].b, (TOPGUTTER * (i+1))));
	}
}
function nextLevel(){
		currentLevel++;
		if(currentLevel == 10)
		{
			playerWon();
		}
		else
		{
			$('#level').html(currentLevel+1);
			ball.x = 150;
			ball.y = 150 + levels[currentLevel].gutter;
			dx = 2;
			dy = 4;
			Paddle.x = (WIDTH-Paddle.width)/2;
			Paddle.y = HEIGHT-Paddle.height-10;
			initBricks();
			timerOffset = 10;			
		}
}	
function drawBricks()
{
	ctx.save();
	for(var i = 0; i < bricks.length; i++)
	{
		rect(bricks[i].x, bricks[i].y, bricks[i].width, bricks[i].height, bricks[i].red, bricks[i].green, bricks[i].blue);
	}
	ctx.restore();
}

function initBricks()
{
	var r = levels[currentLevel].r;
	var g = levels[currentLevel].g;
	var b = levels[currentLevel].b;
	bricks = new Array();
	score = SCOREMULTIPLIER*ROWS;

	for(j = 0; j < ROWS; j++)
	{
		r -= 30;
		g -= 30;
		b -= 30;
		for(i = 0; i < COLUMNS; i++)
		{
			var random = Math.floor(Math.random()*(powertypes.length*FREQUENCY));
			if(powertypes[random])
			{
				power = powertypes[random];
			}
			else
			{
				power = null;
			}
			bricks.push(
				new Brick(
					(i*(BLOCKWIDTH+GUTTER))+7,
					(j*(BLOCKHEIGHT+GUTTER))+levels[currentLevel].gutter, 
					BLOCKWIDTH,
					BLOCKHEIGHT, 
					score,
					r,
					g,
					b,
					power
				));
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
		if(bricks[i].collide(ball))
		{
			addScore(bricks[i].score);
			if(bricks[i].power)
			{
				var powerX = bricks[i].x + (bricks[i].width/2);
				var powerY = bricks[i].y + (bricks[i].height/2);
				createPowerUp(bricks[i].power, powerX, powerY);
			}
			bricks.splice(i, 1);
			dy *= -1;
			if(bricks.length < 1)
				nextLevel();
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
