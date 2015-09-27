
	var CHART_ERROR = {
		_: function () {
			this.__proto__ = null;
			this._ = undefined;
			return this;
		},
		'0001': [
			'需要D3图表库, 请预先引入d3.js, 并保证其能正常使用: d3.version'
		],
		'0002': [
			'需要lodash数据处理工具, 请预先引入lodash.js, 并保证其能正常使用: _.VERSION'
		],
		'1001': [
			'文档中没有必须的DOM标签',
			'The document dont have the DOM tag',
			'文檔中沒有必須的DOM標籤'
		],
		'1002': [
			'请先初始化chart, 参考: https://github.com/WeiFei365/d3chart/wiki/guide'
		],
		'1003': [
			'初始化chart实例, 请使用原生的并具有宽高的DOM元素'
		],
		'1004': [
			'重复初始化实例! 请先销毁当前实例;'
		]
	}._();

window && (window.CHART_ERROR = CHART_ERROR);

module.exports = function (isTrue, error_id) {
	if (isTrue ) throw 'Error Id: ' + id;
};