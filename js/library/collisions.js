function rectToPaddleCollide(rect)
{
	if(paddle.x + paddle.width > rect.x && paddle.x - paddle.width < rect.x + rect.width &&
	paddle.y + paddle.height > rect.y && paddle.y - paddle.height < rect.y + rect.height)
		return true;
	return false;
}

function rectToBallCollide(rect)
{
	if(x + 10 > rect.x && x - 10 < rect.x + rect.width &&
	y + 10 > rect.y && y - 10 < rect.y + rect.height)
		return true;
	return false;
}
