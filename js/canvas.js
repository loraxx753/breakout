function draw()
{
	clear();
	circle(x, y, 10);

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
	}
	else
	{
		timerOffset--;
	}
	console.log(timerOffset);
}
$(document).ready(function() {  
	interval = init();
});
