/**
 * @author weifei (weifei365, weifei365@gmail.com)
 * @description d3chart 内置 tooltip 组件
 * @url http://www.d3chart.com
 */

'use strict'

//核心工具
var core = require('../utils/core.js');
//api接口生成器
var API = require('./component_api.js');
//内置默认类名
var CLASS_NAME = 'd3chart-tooltip';
//内置默认 id，需要时调用 TooltipID() 函数
var TOOLTIP_ID = 10000;
function TooltipID () {
    return CLASS_NAME + '_' + TOOLTIP_ID++;
}
//默认配置，只允许通过 TooltipOptions() 函数使用
var defaultOptions = {
	//element.id 不传使用内置默认
	ID: null,
	//触发的事件类型，多个时 ',' 分隔
    events: 'mousemove',
    /**
     * @description 允许用户微调 tooltip 的位置
     * @param  {Array(2)} arr 默认放置的坐标点
     * @return {Array(2)}     新的坐标点
     */
    position: null,
	//tooltip 移动动画，不需要时传入 0
    animation: 400,
	//tooltip 延迟隐藏的毫秒值，立刻隐藏传入 0，
    hideDelay: 200,
	//通过搭配按键迫使 tooltip 停留在当前位置，支持：'ctrl' 'shift', 'alt'
	keyboard: 'ctrl',
	//原生css样式，会被原封的赋值给 tooltip 顶层元素
    style: {
        'z-index': 9999,
        'position': 'absolute',
        'border': '1px solid rgba(212, 212, 212, 0.8)',
		'border-radius': '4px',
        'box-shadow': '0 2px 6px rgba(0, 0, 0, 0.2)',
		'padding': '5px',
		'color': 'rgba(0, 0, 0, 0.8)',
		'background': 'rgba(255, 255, 255, 0.8)'
    }
};
function TooltipOptions (nowOpts, newOpts) {
    var options = core.cloneDeep(defaultOptions);
    options = core.merge(options, nowOpts || {});
    options = core.merge(options, newOpts || {});
    return options;
}
/**
 * @description 组件类
 * @param {DOM} container 容器，原生DOM
 * @param {Object} options   配置
 */
var Tooltip = function (container, options) {
    this.container = core.isElement(container) ? container : document.body;
    this.options = TooltipOptions(options);

    this.isShown = false;
    this.hideTimer = null;
    this.ID = this.options.ID || TooltipID();

	//内部使用
	this._lastEvents = null;

    this._init();

    var that = this;
    return new API(that, {
        setHTML: function (html) {
            that.tools.container.html(html);
            return this;
        },
        show: function () {
            that._trigger(true);
            return this;
        },
        hide: function () {
            that._trigger(false);
            return this;
        }
    });
};

Tooltip.prototype._init = function () {
    if (this.tools) {
        return this;
    }
    var that = this;
    var opts = that.options;
    var tools = that.tools = {};

    tools.container = d3.select(that.container).append('div');
	tools.container
		.classed(CLASS_NAME, true)
		.attr('id', that.ID);
	//不允许有相同逻辑的出现，因此变相调用配置达到初始化部分参数的效果
	that._setOption('style', {});

    tools.eventController = function () {
        that._move(d3.event);
    };

    that._bindEvents()._trigger(false);

    return this;
};

Tooltip.prototype._bindEvents = function () {
	var that = this;
	var opts = that.options;
	var tools = that.tools;

	//先移除掉上次绑定的所有事件
	if (that._lastEvents) {
		for (var i = 0, arr = that._lastEvents, l = arr.length; i < l; i++) {
			d3.select(that.container).on(arr[i], null);
		}
	}

	//绑定新事件
	var names;
	try {
		names = opts.events.split(',');
	} catch (e) {
		names = defaultOptions.events.split(',');
	}
	that._lastEvents = names;
	for (var i = 0, l = names.length; i < l; i++) {
		d3.select(that.container).on(names[i], tools.eventController);
	}

	return this;
};

Tooltip.prototype._move = function (event) {
	var that = this;
	var opts = that.options;
	var tools = that.tools;

	if (!event || !tools
		|| !that.isShown	//如果是隐藏状态，则不调整
		|| event[(opts.keyboard || '') + 'Key']) {
		return this;
	}

	var position = {
		left: event.x,
		top: event.y
	};

	var func = opts.position;
	var cusPos;
	if (core.isFunction(func)) {
		cusPos = func.call({}, [position.left, position.top]);
		if (core.isArray(cusPos) && cusPos.length >= 2) {
			position.left = cusPos[0];
			position.top = cusPos[1];
		}
	}
	position.left += 'px';
	position.top += 'px';

	if (core.isNumber(opts.animation) && opts.animation > 0) {
		tools.container
			.transition().duration(opts.animation)
			.style(position);
	} else {
		tools.container.style(position);
	}

	return this;
};

Tooltip.prototype._trigger = function (isShow) {
	var that = this;
	var opts = that.options;
	var tools = that.tools;

	that.isShown = isShow;
	that.hideTimer && clearTimeout(that.hideTimer);

	if (isShow) {
		core.show(tools.container[0][0]);
	} else {
		if (core.isNumber(opts.hideDelay)) {
			that.hideTimer = setTimeout(function () {
				core.hide(tools.container[0][0]);
			}, opts.hideDelay);
		} else {
			core.hide(tools.container[0][0]);
		}
	}

	return this;
};

Tooltip.prototype._setOption = function (keys, value) {
	var dummy = keys.search(/style\..+/) == -1 ? keys : 'style.*';
	switch (dummy) {
		case 'ID':this
			this.container.attr('id', ID);
			break;
		case 'events':
			this._bindEvents();
			break;
		case 'style':
			//防止用户破坏 options 对象
			!core.isObject(value) && (this.options.style = TooltipOptions(null, {style: {}}));
			this.tools.container.style(this.options.style);
			break;
		case 'style.*':
			//执行全部更新
			this._setOption('style', {});
			break;
		default:

	}
};

module.exports = Tooltip;
