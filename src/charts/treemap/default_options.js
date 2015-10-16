var core = require('../../utils/core.js')

var initOptions = require('../../options/options.js');

var defaultOptions = {
	tooltip: {},
	events: {},
	chart: {
		'zoomable': true,
		'group-padding': '1px'
	}
};

var getOptions = function (custom) {
	var options = core.cloneDeep(defaultOptions);

	options = core.merge(options, custom);

	return initOptions(options);
};

module.exports = getOptions;
