function array_concat(...arr) {
	return Array.prototype.concat(...arr);
}

function objIntoParams(obj, prefix) {
	var str = [],
		p;
	for (p in obj) {
		if (obj.hasOwnProperty(p)) {
			var k = prefix ? prefix + "[" + p + "]" : p,
				v = obj[p];
			str.push((v !== null && typeof v === "object") ?
				objIntoParams(v, k) :
				encodeURIComponent(k) + "=" + encodeURIComponent(v));
		}
	}
	return str.join("&");
}

module.exports = {
	array_concat,
	objIntoParams
}