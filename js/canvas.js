function draw()
{
	clear();
	circle(x, y, 10);


	if(x + dx + 10 > WIDTH || x + dx - 10 < 0)
		dx = -dx-1;
	if(y + dy + 10 > HEIGHT || y + dy - 10 < 0)
		dy = -dy;

	x += dx;
	y += dy;
}
$(document).ready(function() {  
	init();
});
