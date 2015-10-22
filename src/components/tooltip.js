
var core = require('../utils/core.js');

var API = require('component_api.js');

var CLASS_NAME = 'd3chart-tooltip';
var TOOLTIP_ID = 10000;
function TooltipID () {
    return CLASS_NAME + '_' + TOOLTIP_ID++;
}

var defaultOptions = {
    show: false,
    events: 'mousemove',
    position: null,
    animation: 400,
    hideDelay: 200,
    enterable: false,
    style: {
        'z-index': 9999,
        'position': 'absolute',
        'border': '1px solid rgb(0, 0, 0)',
		'border-radius': '4px',
        'box-shadow': '0 2px 6px rgba(0, 0, 0, 0.2)',
		'padding': '5px',
		'color': '#d4d4d4'
    }
};
function TooltipOptions (custom) {
    var options = core.cloneDeep(defaultOptions);
    options = core.merge(options, custom || {});
    return options;
}

var Tooltip = function (container, options) {
    this.container = core.isElement(container) ? container : document.body;
    this.options = TooltipOptions(options);

    this.isShown = false;
    this.hideTimer = null;
    this.ID = TooltipID();

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

    tools.container = $('<div></div>');
    tools.container.addClass(CLASS_NAME).attr('id', that.ID).css(opts.style);
    $(that.container).append(tools.container);

    tools.eventController = function (event) {
        that._move(event);
    };

    that._bindEvents().show(false);

    return this;
};

Tooltip.prototype._bindEvents = function () {
	var that = this;
	var opts = that.options;
	var tools = that.tools;

	var names;
	try {
		names = opts.events.split(',');
	} catch (e) {
		names = defaultOptions.events.split(',');
	}
	for (var i = 0, l = names.length; i < l; i++) {
		$(that.container)[names[i]](tools.eventController);
	}

	return this;
};

Tooltip.prototype._move = function (event) {
	var that = this;
	var opts = that.options;
	var tools = that.tools;

	if (!event || !this.isShown || !tools) return this;

	var position = core.offset(event.target, that.container);

	position.left += event.offsetX + 10;
	position.top += event.offsetY + 10;

	if (core.isSVGElement(event.target)) {
		position.left += event.target.offsetLeft;
		position.top += event.target.offsetTop;
	}
	var func = opts.position;
	var cusPos;
	if (core.isFunction(func)) {
		cusPos = func.call({}, [position.left, position.top]);
		if (core.isArray(cusPos) && cusPos.length >= 2) {
			position.left = cusPos[0];
			position.top = cusPos[1];
		}
	}
	if (core.isNumber(option.animation)) {
		tools.container.stop().animate(position, option.animation);
	} else {
		tools.container.css(position);
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
		tools.container.show();
	} else {
		if (core.isNumber(opts.hideDelay)) {
			that.hideTimer = setTimeout(function () {
				tools.container.hide();
			}, opts.hideDelay);
		} else {
			tools.container.hide();
		}
	}

	return this;
};

module.exports = Tooltip;
