var core = require('../utils/core.js');

var options = {
	color: ["#ff7f50", "#87cefa", "#da70d6", "#32cd32", "#6495ed", "#ff69b4", "#ba55d3", "#cd5c5c", "#ffa500", "#40e0d0"],
	animation: 800
};

var initOptions = function (custom) {
	var settings = core.cloneDeep(options);

	return core.merge(settings, custom);
};

module.exports = initOptions;
