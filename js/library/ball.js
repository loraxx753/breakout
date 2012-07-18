Ball = function(x, y, width)
{
	var width;
	var x;
	var y;

	var update = function(dx, dy)
	{
		x += dx;
		y += dy;
	}

	return {
		x : x,
		y : y,
		width : width,
		update : update,
	}
};