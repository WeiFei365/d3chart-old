
'use strict'

var core = {};

core.getSize = function (node) {
	if (!this.isElement(node)) return [1, 1];

	return [$(node).width(), $(node).height()];
};

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
//return [top， bottom， left， right]
core.getCSSSize = function (val) {
	var v = [0, 0, 0, 0];
	if (!val) return v;
	v = val.replace(/px/g, '').replace(/\s+/g, ' ').split(' ');
	switch (v.length) {
		case 0:
			v = [0, 0, 0, 0];
			break;
		case 1:
			v = [+v[0], +v[0], +v[0], +v[0]];
			break;
		case 2:
			v = [+v[0], +v[0], +v[1], +v[1]];
			break;
		case 3:
			v = [+v[0], +v[2], +v[1], +v[1]];
			break;
		default:
			v = [0, 0, 0, 0];
			break;
	}

	return v;
};

module.exports = core;