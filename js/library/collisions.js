window.Collision = function()
{

	var brick = function(rect)
	{
		if(Ball.x + 10 > rect.x && Ball.x - 10 < rect.x + rect.width &&
		Ball.y + 10 > rect.y && Ball.y - 10 < rect.y + rect.height)
			return true;
		return false;
	}

	var paddle = function()
	{
		if(Ball.x + 10 > Paddle.x && Ball.x - 10 < Paddle.x + Paddle.width &&
		Ball.y + 10 > Paddle.y && Ball.y - 10 < Paddle.y + Paddle.height)
			return true;
		return false;
	}
	var power = function() {
		if(Ball.x + 10 > Paddle.x && Ball.x - 10 < Paddle.x + Paddle.width &&
		Ball.y + 10 > Paddle.y && Ball.y - 10 < Paddle.y + Paddle.height)
			return true;
		return false;
	}

	return {
		paddle : paddle,
		brick : brick,
		power : power,
	}

}();


// function rectToPaddleCollide(rect)
// {
// 	if(paddle.x + paddle.width > rect.x && paddle.x - paddle.width < rect.x + rect.width &&
// 	paddle.y + paddle.height > rect.y && paddle.y - paddle.height < rect.y + rect.height)
// 		return true;
// 	return false;
// }

function rectToBallCollide(rect)
{
	if(x + 10 > rect.x && x - 10 < rect.x + rect.width &&
	y + 10 > rect.y && y - 10 < rect.y + rect.height)
		return true;
	return false;
}

