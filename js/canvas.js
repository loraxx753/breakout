var cheater = '';

function draw()
{
	clear();
	circle(Ball.x, Ball.y, 10);
	rect(Paddle.x, Paddle.y, Paddle.width, Paddle.height);
	removeBrick();
	drawBricks();
	handlePowerups();
	if(timerOffset == 0)
	{
		if(Ball.x + dx + 10 > WIDTH || Ball.x + dx - 10 < 0)
			dx = -dx;
		if(Ball.y + dy - 10 < 0)
			dy = -dy;
		if(Ball.y + dy + 10 > HEIGHT)
		{
			playerDie();
		}
		else
		{
			Ball.x += dx;
			Ball.y += dy;		
		}
		if(left && Paddle.x  > 0)
		{
			Paddle.x -= Paddle.speed;
		}
		else if(right && Paddle.x  + Paddle.width < WIDTH)
		{
			Paddle.x += Paddle.speed;
		}
		if(Collision.paddle(Paddle) && dy >0)
		{
			dy *= -1;
			dx = 8 * ((Ball.x-(Paddle.x+Paddle.width/2))/Paddle.width);
		}
	}
	else
	{
		timerOffset--;
	}
	if(firstTime)
	{
		clearInterval(interval);
	}
}
$(document).ready(function() {  
	interval = init();
	//Sets flags for which key is being held down to be used in the Draw()
	$(document).keydown(function(e) {
		if(e.keyCode == 13)
		{
			if(firstTime)
			{
				interval = setInterval(draw, 10);
				firstTime = false;
				$('.start').remove();
			}
		}
		if(e.keyCode==37 || e.keyCode==65) //left
		{
			left = true
		}
		if(e.keyCode==39 || e.keyCode==68) //right
		{
			right = true;
		}
		if(e.keyCode == 80)
		{
			if(!firstTime && !gameOver && !gameWon)
			{
				pauseGameToggle();
			}
		}


	});
	$(document).keypress(function(e) {
		if(e.keyCode > 48 && e.keyCode < 58)
		{
			cheater += String.fromCharCode(e.keyCode);
		}
		if(e.keyCode == 99)
		{
			cheater = '';
		}
		if(cheater == '753123')
		{
			if($('#levelup').length == 0)
			{
				$('.info').after('<p><a href="#" id="levelup">Skip Level</a></p>');
				$('#levelup').click(function(e) {
					e.preventDefault();
					if(currentLevel < (MAXLEVEL-1))
					{
						nextLevel();
						draw();
						if(paused)
						{
							ctx.save();
							ctx.fillStyle = 'rgb(0,0,0)';
							ctx.font = 'bold 80px Londrina Shadow';
							ctx.textBaseline = 'bottom';
							if(currentLevel < 6)
								ctx.fillText("Paused!", 120, 300);
							else
								ctx.fillText("Paused!", 120, 150);
							ctx.restore();
						}

					}
				});
			}
		}
	});
		//Sets flags for which key is being held down to be used in the Draw()
	$(document).keyup(function(e) {
		if(e.keyCode==37 || e.keyCode==65) //left
		{
			left = false;
		}
		if(e.keyCode==39 || e.keyCode==68) //right
		{
			right = false;
		}
	});
});
