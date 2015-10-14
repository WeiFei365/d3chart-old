var core = require('../utils/core.js');

var init = function () {
  console.log("init in function");
  var that = this;
  var options = that.options;
  var tools = that.tools = {};

  tools.svg = d3.select(that.element).append('svg').classed('d3chart', true);

  tools.container = tools.svg.append('g').classed('d3chart-container', true);

  tools.chart = tools.container.append('g').classed('d3chart-chart', true);
}

var update = function () {
  var that = this;
  var options = that.options;
  var tools = that.tools;
}

var redraw = function () {
  var that = this;
  var options = that.options;
  var tools = that.tools;
}

var setOption = function (key, value) {
}

var bindEvents = function () {
}

var destroy = function () {
  this.tools = undefined;
}


function buildAPI (self, extra) {

  var chartApi = {
    version: '0.1.0',
    init: function () {
      console.log("init in api");
      init.call(self);
      self.init();
      return this;
    },
    update: function () {
      update.call(self);
      self.update();
      return this;
    },
    redraw: function () {
      redraw.call(self);
      self.redraw();
      return this;
    },
    destroy: function () {
      destroy.call(seff);
      self.destroy();
    }
  };

  return core.merge(chartApi, extra);
}

module.exports = buildAPI;
