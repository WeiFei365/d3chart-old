var core = require('../utils/core.js');

var Option = {
	element: null,
	color: ["#ff7f50", "#87cefa", "#da70d6", "#32cd32", "#6495ed",
		"#ff69b4", "#ba55d3", "#cd5c5c", "#ffa500", "#40e0d0",
		"#1e90ff", "#ff6347", "#7b68ee", "#00fa9a", "#ffd700",
		"#6b8e23", "#ff00ff", "#3cb371", "#b8860b", "#30e0e0"],
	animation: 800,
	chart: {},
	data: []
};

//所有图表的 API 接口集
//实现方式：
//1. 完全覆盖: this.__proto__ = merge(interface.call(this), this.__proto__);
//
//2. 混合使用: this.__proto__ = merge(this.__proto__, interface.call(this, true, this.__proto__, false));
var API_Interface = function (isMerge, proto, isFirst) {
	var that = this;
	var __proto__ = core.cloneDeep(proto) || {};

	return {
		_: function () {
			delete this._;
			return this;
		},
		init: function () {
			isMerge && isFirst && core.isFunction(__proto__.init) && __proto__.init();

			//TODO
			console.log('init in interface');

			isMerge && !isFirst && core.isFunction(__proto__.init) && __proto__.init();

			return that;
		},
		update: function () {
			isMerge && isFirst && core.isFunction(__proto__.update) && __proto__.update();

			//TODO
			
			isMerge && !isFirst && core.isFunction(__proto__.update) && __proto__.update();

			return that;
		},
		redraw: function () {
			isMerge && isFirst && core.isFunction(__proto__.redraw) && __proto__.redraw();

			//TODO
			
			isMerge && !isFirst && core.isFunction(__proto__.redraw) && __proto__.redraw();

			return that;
		},
		setOption: function () {
			isMerge && isFirst && core.isFunction(__proto__.setOption) && __proto__.setOption();

			//TODO
			
			isMerge && !isFirst && core.isFunction(__proto__.setOption) && __proto__.setOption();

			return that;
		},
		setTooltip: function () {
			isMerge && isFirst && core.isFunction(__proto__.setTooltip) && __proto__.setTooltip();

			//TODO
			
			isMerge && !isFirst && core.isFunction(__proto__.setTooltip) && __proto__.setTooltip();

			return that;
		},
		bindEvents: function () {
			isMerge && isFirst && core.isFunction(__proto__.bindEvents) && __proto__.bindEvents();

			//TODO
			
			isMerge && !isFirst && core.isFunction(__proto__.bindEvents) && __proto__.bindEvents();

			return that;
		},
		getHTML: function () {
			isMerge && isFirst && core.isFunction(__proto__.getHTML) && __proto__.getHTML();

			//TODO
			
			isMerge && !isFirst && core.isFunction(__proto__.getHTML) && __proto__.getHTML();
		},
		destroy: function () {
			isMerge && isFirst && core.isFunction(__proto__.destroy) && __proto__.destroy();

			//TODO
			
			isMerge && !isFirst && core.isFunction(__proto__.destroy) && __proto__.destroy();
		}
	}._();
};

module.exports = {
	initOption: function (def, cus) {
		//合并用户配置到默认配置
		if (cus) core.merge(def, cus);

		var result = core.cloneDeep(Option);
		//合并默认配置到通用配置
		core.merge(result, def);

		return result;
	},
	API_Interface: API_Interface
};