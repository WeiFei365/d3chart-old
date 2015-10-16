var core = require('../../utils/core.js');

var API = require('../chart_api.js');

var getOptions = require('./default_options.js')


function TreeMap (element, data, options) {
	this.options = getOptions(options);
	this.data = data;
	this.element = element;
	this.type = 'treemap';
	this.theme = 'default';

	return new API(this, null);
}

TreeMap.prototype.init = function () {
	console.log("init in TreeMap");
};

TreeMap.prototype.update = function () {
};

TreeMap.prototype.redraw = function () {
};

TreeMap.prototype.destroy = function () {
};

/*TreeMap.prototype.init = function () {
	var that = this;
	Commons.init.call(that);

	var option = that.option;
	var tools = that.tools;

	tools.svg
		.classed('d3chart-treemap', true);

	tools.colorScale = d3.scale.category20c();

	tools.treemap = d3.layout.treemap();

	that.update();

	return that;
};

TreeMap.prototype.update = function (data) {
	var that = this;
	var option = that.option;
	var tools = that.tools;

	var nodes = tools.containerE.datum({children: data || option.data})
		.selectAll('.node').data(tools.treemap.nodes);

	nodes.exit().remove();

	var newNodes = nodes.enter().append('g')
		.classed('node', true)
		.attr('transform', 'translate(0,0)');
	newNodes.append('rect');
	newNodes.append('text');

	that.setOption('chart.itemStyle', null)
		.setPath()
		.setTooltip()
		.setLegend()
		.bindEvents()
		.redraw();

	return that;
};

TreeMap.prototype.redraw = function () {
	var that = this;
	var option = that.option;
	var tools = that.tools;

	var size = core.getSize(option.element);

	tools.treemap.size(size);
	tools.container.style({width: size[0] + 'px', height: size[1] + 'px'});

	var nodes = tools.containerE.selectAll('.node').data(tools.treemap.nodes)
		.classed('leaf-node', function (d, i) { return !d.children; });
		//.style('background', function (d, i) { return d.children ? tools.colorScale(d.name) : null; });

	// var padding = core.getCSSSize(option.chart.itemStyle.padding);
	// var border = core.getCSSSize(option.chart.itemStyle.border['borde-width']);
	var newTransform = function (d, i) {
		return 'translate(' + [d.x, d.y] + ')';
	};
	var newStyle = {
		width: function (d, i) { return d.dx; },
		height: function (d, i) { return d.dy; },
		fill: function (d, i) { return d.children ? tools.colorScale(d.name) : null; },
		'fill-opacity': function (d, i) { return d.children ? 1 : 0; },
		'stroke': 'orange',
		'stroke-width': 1
	};
	if (core.isNumber(option.animation)) {
		nodes.transition().duration(option.animation)
			.attr('transform', newTransform)
			.each('end', function (d, i) {
				d3.select(this).select('text').text(option.chart.itemStyle.format);
				d3.select(this).select('rect').attr(newStyle);
			})
	}

	return that;
};

TreeMap.prototype.setOption = function (keys, value) {
	var that = this;
	var option = that.option;

	return that;
};

TreeMap.prototype.setPath = function () {
	var that = this;
	var option = that.option;

	return that;
};*/



module.exports = TreeMap;
