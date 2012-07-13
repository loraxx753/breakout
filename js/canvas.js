var cheater = '';

function draw()
{
	clear();
	circle(x, y, 10);
	rect(paddle.x, paddle.y, paddle.width, paddle.height);
	removeBrick();
	drawBricks();
	handlePowerups();
	if(timerOffset == 0)
	{
		if(x + dx + 10 > WIDTH || x + dx - 10 < 0)
			dx = -dx;
		if(y + dy - 10 < 0)
			dy = -dy;
		if(y + dy + 10 > HEIGHT)
		{
			playerDie();
		}
		else
		{
			x += dx;
			y += dy;		
		}
		if(left && paddle.x  > 0)
		{
			paddle.x -= paddle.speed;
		}
		else if(right && paddle.x  + paddle.width < WIDTH)
		{
			paddle.x += paddle.speed;
		}
		if(rectToBallCollide(paddle) && dy >0)
		{
			dy *= -1;
			dx = 8 * ((x-(paddle.x+paddle.width/2))/paddle.width);
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
