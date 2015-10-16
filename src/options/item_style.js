var core = require('../utils/core.js');

var common = {
	'borderColor': 'black',
	'borderWidth': 1,
	'borderRadius': 0
};

var itemStyle = {
	'normal': {},
	'emphasis': {}
};

var initItemStyle = function (custom) {
	var settings = core.cloneDeep(itemStyle);

	settings.normal = core.merge(settings.normal, core.cloneDeep(common));
	settings.emphasis = core.merge(settings.emphasis, core.cloneDeep(common));

	return core.merge(settings, custom);
};

module.exports = initItemStyle;
