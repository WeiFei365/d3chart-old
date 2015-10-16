var core = require('../utils/core.js');

var label = {};

var initLabel = function (custom) {
	var settings = core.cloneDeep(label);

	return core.merge(settings, custom);
};

module.exports = initLabel;
