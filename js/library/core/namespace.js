/* Namespace function for defining namespaces */
Namespace = function(ns)
{
	var a = ns.split('.'), o = window, len = a.length;
	for(var i = 0; i < len; i++)
	{
		o[a[i]] = o[a[i]] || {};
		o = o[a[i]];
	}
	return o;
};