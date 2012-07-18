Paddle = function(x, y, width, height, speed, resize, power)
{
	var width;
	var height;	
	var x;
	var y;
	var speed;
	var resize;
	var power;

	var draw = function()
	{
		rect(x, y, width, height);
	}

	var collide = function(check)
	{
		// ctx.save();
		// ctx.fillStyle = 'rgb(255, 0, 0)';
		// circle(check.x, check.y, 5);
		// rect(x, y, width, height, 255, 0, 0)
		// ctx.restore();
		if(check.x + 10 > x && check.x - 10 < x + width &&
		check.y + 10 > y && check.y - 10 < y + height)
			return true;
		return false;
	}
	var move = function(direction)
	{
		if(direction == 'left' && x > 0)
		{
			x -= speed;
		}
		else
		{
			x += speed;
		}

	}

	return {
		width : width,
		height : height,
		x : x,
		y : y,
		speed : speed,
		resize : resize,
		power : power,
		collide : collide,
		move : move,
		draw : draw,
	}

};