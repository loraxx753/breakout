window.Ball = function()
{
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
		update : update,
	}
}();