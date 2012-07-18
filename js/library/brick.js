Brick = function(x, y, width, height, score, red, green, blue, power)
{
	var x;
	var y;
	var width;
	var height;
	var score;
	var red;
	var green;
	var blue;
	var power;

	var collide = function(check)
	{
		if(check.x + 10 > x && check.x - 10 < x + width &&
		check.y + 10 > y && check.y - 10 < y + height)
			return true;
		return false;
	}

	return {
		x : x,
		y : y,
		width : width,
		height : height,
		score : score,
		red : red,
		green : green,
		blue : blue,
		power : power,


		collide : collide,
	}
}