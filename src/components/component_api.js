
'use strict'

var core = require('../utils/core.js');

function setOption (keys, value) {
	core.set(this.options, keys, value);
}

function setOptions (self, options) {
	if (!core.isObject(options)) {
		return;
	}
	for (var key in options) {
		self.setOption(key, options[key]);
	}
}

var API = function (self, extra) {

	var api = {
		setOption: function (keys, value) {
			setOption.call(self, keys, value);

			core.isFunction(self._setOption) && self._setOption(keys, value);

			return this;
		},
		setOptions: function (options) {
			setOptions.call(self, this, options);

			return this;
		},
		getOptions: function () {
			return core.cloneDeep(self.options);
		}
	};

	return core.merge(api, extra || {});
};

module.exports = API;
