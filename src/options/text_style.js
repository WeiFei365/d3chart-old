var core = require('../utils/core.js');

var textStyle = {};

var initTextStyle = function (custom) {
	var settings = core.cloneDeep(textStyle);

	return core.merge(settings, custom);
};

module.exports = initTextStyle;
