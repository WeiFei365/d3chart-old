var core = require('../../utils/core.js');

function TreeMap (option) {
	this.option = {};

	if (option) core.merge(this.option, option);
}

TreeMap.prototype.init = function () {
	var that = this;
	var option = that.option;
};

TreeMap.prototype.update = function () {
	var that = this;
	var option = that.option;
};

TreeMap.prototype.redraw = function () {
	var that = this;
	var option = that.option;
};

TreeMap.prototype.setOption = function (keys, value) {
	var that = this;
	var option = that.option;
};

TreeMap.prototype._zoom = function () {
	var that = this;
	var option = that.option;
};

TreeMap.prototype._tooltip = function () {
	var that = this;
	var option = that.option;
};

module.exports = TreeMap;