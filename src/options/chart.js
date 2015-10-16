var core = require('../utils/core.js');

var chart = {};

var initChart = function (custom) {
	var settings = core.cloneDeep(chart);

	return core.merge(settings, custom);
};

module.exports = initChart;
