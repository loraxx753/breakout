function powerup(x, y, type)
{
	this.x = x;
	this.y = y;
	this.width = 20;
	this.height = 20;
	this.speed = 1;
	this.type = type;
}
//Resizes the paddle for a set time before reverting to its original size
function resize(size, time)
{
	var originalSize = Paddle.width; 
	Paddle.width = Paddle.width * size;
	Paddle.power = true;
	setTimeout(function() {
		Paddle.width = originalSize; 
		Paddle.power = false;
	}, time);
}
function slow(time)
{
	var originalDX = dx;
	var originalDY = dy;
	dx = 0.5 * dx;
	dy = 0.5 * dy;
	paddle.power = true;
	setTimeout(function() {
		dx = originalDX;
		dy = originalDY;
		paddle.power = false;
	}, time);

}
function createPowerUp(power, x, y)
{
	powerups.push(new powerup(x, y, power));
}
function handlePowerups()
{
	for(var i = powerups.length - 1; i > 0; i--)
	{
		if(Collision.power(powerups[i]))
		{
			if(Paddle.power == false)
			{
				switch(powerups[i].type)
				{
					case 'resize': 
					resize(1.5, 5000); 
					break;
					case 'slow':
					slow(5000);
					break;
				}
			}
			powerups.splice(i, 1);
			continue;
		}
		powerups[i].y += powerups[i].speed;
		switch(powerups[i].type)
		{
			case 'resize': 		
				ctx.drawImage(sizeImage,  powerups[i].x, powerups[i].y);
				break;
			case 'slow': 		
				ctx.drawImage(slowImage,  powerups[i].x, powerups[i].y);
				break;
		}
	}
}
