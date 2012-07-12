function draw()
{
	clear();
	circle(x, y, 10);
	rect(paddle.x, paddle.y, paddle.width, paddle.height);

	if(x + dx + 10 > WIDTH || x + dx - 10 < 0)
		dx = -dx-1;
	if(y + dy + 10 > HEIGHT || y + dy - 10 < 0)
		dy = -dy;
	if(left && paddle.x - paddle.speed > 0)
	{
		paddle.x -= paddle.speed;
	}
	else if(right && paddle.x + paddle.speed + paddle.width < WIDTH)
	{
		paddle.x += paddle.speed;
	}
	if(paddleToBallCollide())
	{
		dy *= -1;
	}
	x += dx;
	y += dy;
}
$(document).ready(function() {  
	init();
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
