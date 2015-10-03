var core = require('../../utils/core.js');
var ERROR = require('../../utils/errors.js');
var initOption = require('../option.js').initOption;

var TreeMap = require('./treemap.js');

var TreeMapHelper = function (os, dt) {
	ERROR(!d3, '0001');
	var defaultOptions = {};
	var defaultData = [];

	var option = initOption(defaultOptions, os);
	var d3chart;

	return {
		_: function () {
			this.__proto__ = null;
			this._ = undefined;
			return this;
		},
		init: function (el) {
			d3chart = new TreeMap();
			return this;
		},
		getInstance: function () {
			return d3chart;
		},
		setOptions: function (os, notMerge) {
			return this;
		},
		setData: function (dt) {
			return this;
		},
		redraw: function () {
			return this;
		}
	}._();
};

module.exports = TreeMapHelper;