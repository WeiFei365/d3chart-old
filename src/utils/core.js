
var core = {};
core.merge = function (tar, sou) {
	return _.merge(tar, sou);
};
core.cloneDeep = function (obj) {
	return _.cloneDeep(obj);
};
core.isElement = function (node) {
	return _.isElement(node);
};
core.isArray = function (val) {
	return _.isArray(val);
};
core.isNumber = function (val) {
	return _.isNumber(val);
};
core.isFunction = function (val) {
	return _.isFunction(val);
};
core.isString = function (val) {
	return _.isString(val);
};
//return [上， 下， 左， 右]
core.getCSSPadding = function (p) {
	var v = [0, 0, 0, 0];
	if (!p) return v;
	v = p.replace(/px/g, '').replace(/\s+/g, ' ').split(' ');
	if (v.length == 0) v = [0, 0, 0, 0];
	if (v.length == 1) v = [+v[0], +v[0], +v[0], +v[0]];
	if (v.length == 2) v = [+v[0], +v[0], +v[1], +v[1]];
	if (v.length == 3) v = [+v[0], +v[2], +v[1], +v[1]];

	return v;
};
core.getCSSBorderSize = function (b) {
	var v = 0;
	if (!b) return v;
	v = b.match(/\d+px/);
	return +(v ? v[0].replace(/px/, '') : 0);
};

module.exports = core;