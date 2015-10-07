var core = require('../utils/core.js');
var ERR = require('../utils/errors.js');

var Tooltip = require('../components/tooltip/tooltip.js');
var Legend = require('../components/legend/legend.js');

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
var API_Interface = function (isMerge, proto, firstCall) {
	var that = this;
	var __proto__ = core.cloneDeep(proto) || {};

	return {
		_: function () {
			delete this._;
			return this;
		},
		init: function (tag) {
			isMerge && firstCall && core.isFunction(__proto__.init) && __proto__.init.call(that);

			var option = that.option;
			ERR(!core.isElement(option.element), '1003');

			//init storage space
			var tools = that.tools = {};

			//build chart container
			!core.isString(tag) && (tag = 'svg');
			tools.container = d3.select(option.element).append('svg')
				.classed('d3chart d3chart-container', true);
			tools.containerG = tools.container.append('g')
				.classed('svg-container', true);
			tools.containerE = tools.containerG.append('g')
				.classed('entity', true);

			//init tooltip component
			tools.tooltip = new Tooltip(core.merge({
				element: option.element
			}, option.tooltip));

			//init legend component
			tools.legend = new Legend(core.merge({
				element: tools.containerG[0][0]
			}, option.legend));

			//TODO

			isMerge && !firstCall && core.isFunction(__proto__.init) && __proto__.init.call(that);

			return that;
		},
		update: function () {
			isMerge && firstCall && core.isFunction(__proto__.update) && __proto__.update.call(that);

			//TODO
			
			isMerge && !firstCall && core.isFunction(__proto__.update) && __proto__.update.call(that);

			return that;
		},
		redraw: function () {
			isMerge && firstCall && core.isFunction(__proto__.redraw) && __proto__.redraw.call(that);

			//TODO
			
			isMerge && !firstCall && core.isFunction(__proto__.redraw) && __proto__.redraw.call(that);

			return that;
		},
		setOption: function () {
			isMerge && firstCall && core.isFunction(__proto__.setOption) && __proto__.setOption.call(that);

			//TODO
			
			isMerge && !firstCall && core.isFunction(__proto__.setOption) && __proto__.setOption.call(that);

			return that;
		},
		setTooltip: function () {
			isMerge && firstCall && core.isFunction(__proto__.setTooltip) && __proto__.setTooltip.call(that);

			//TODO
			
			isMerge && !firstCall && core.isFunction(__proto__.setTooltip) && __proto__.setTooltip.call(that);

			return that;
		},
		setLegend: function () {
			isMerge && firstCall && core.isFunction(__proto__.setLegend) && __proto__.setLegend.call(that);

			//TODO
			
			isMerge && !firstCall && core.isFunction(__proto__.setLegend) && __proto__.setLegend.call(that);

			return that;
		},
		bindEvents: function () {
			isMerge && firstCall && core.isFunction(__proto__.bindEvents) && __proto__.bindEvents.call(that);

			//TODO
			
			isMerge && !firstCall && core.isFunction(__proto__.bindEvents) && __proto__.bindEvents.call(that);

			return that;
		},
		getHTML: function () {
			isMerge && firstCall && core.isFunction(__proto__.getHTML) && __proto__.getHTML.call(that);

			//TODO
			
			isMerge && !firstCall && core.isFunction(__proto__.getHTML) && __proto__.getHTML.call(that);
		},
		destroy: function () {
			isMerge && firstCall && core.isFunction(__proto__.destroy) && __proto__.destroy.call(that);

			//TODO
			
			isMerge && !firstCall && core.isFunction(__proto__.destroy) && __proto__.destroy.call(that);
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