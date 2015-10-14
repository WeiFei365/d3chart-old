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

module.exports = function (custom) {
  var options = core.cloneDeep(defaultOptions);

  core.merge(options, custom);

  return initOptions(options);
};
