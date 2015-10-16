var core = require('../utils/core.js');

function init () {
	console.log("init in function");
	var that = this;
	var options = that.options;
	var tools = that.tools = {};

	tools.svg = d3.select(that.element).append('svg').classed('d3chart', true);

	tools.container = tools.svg.append('g').classed('d3chart-container', true);

	tools.chart = tools.container.append('g').classed('d3chart-chart', true);
}

function update () {
	var that = this;
	var options = that.options;
	var tools = that.tools;
}

function redraw () {
	var that = this;
	var options = that.options;
	var tools = that.tools;
}

function setOption (key, value) {
}

function bindEvents () {
}

function destroy () {
	this.tools = undefined;
}


function API (self, extra) {

	var api = {
		version: '0.1.0',
		init: function () {
			console.log("init in api");
			init.call(self);

			core.isFunction(self.init) && self.init();

			return this;
		},
		update: function () {
			update.call(self);

			core.isFunction(self.update) && self.update();

			return this;
		},
		redraw: function () {
			redraw.call(self);

			core.isFunction(self.redraw) && self.redraw();

			return this;
		},
		destroy: function () {
			destroy.call(seff);

			core.isFunction(self.destroy) && self.destroy();
		}
	};

	return core.merge(api, extra);
}

module.exports = API;
