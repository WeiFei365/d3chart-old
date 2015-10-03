var core = require('../../utils/core.js');

var iface = require('../option').API_Interface;

function TreeMap (option) {
	this.option = {};

	if (option) core.merge(this.option, option);

	//混合使用接口
	//接口先执行之后实现类再执行
	this.__proto__ = core.merge(this.__proto__,
		iface.call(this,
			true,
			this.__proto__,
			false));
}

TreeMap.prototype.init = function () {
	var that = this;
	var option = that.option;
	console.log('init in TreeMap');
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
/*
TreeMap.prototype._zoom = function () {
	var that = this;
	var option = that.option;
};

TreeMap.prototype._tooltip = function () {
	var that = this;
	var option = that.option;
};
*/

module.exports = TreeMap;