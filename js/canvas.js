function draw()
{
	clear();
	circle(x, y, 10);
	rect(paddle.x, paddle.y, paddle.width * paddle.resize, paddle.height);
	if(timerOffset == 0)
	{
		if(x + dx + 10 > WIDTH || x + dx - 10 < 0)
			dx = -dx-1;
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
		}
	}
	else
	{
		timerOffset--;
	}
	removeBrick();
	drawBricks();
}
$(document).ready(function() {  
	interval = init();
	//Sets flags for which key is being held down to be used in the Draw()
	$(document).keydown(function(e) {
		if(e.keyCode==37 || e.keyCode==65) //left
		{
			left = true
		}
		if(e.keyCode==39 || e.keyCode==68) //right
		{
			right = true;
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
