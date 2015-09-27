var core = require('../utils/core.js');

var Option = {
	element: null,
	color: ["#ff7f50", "#87cefa", "#da70d6", "#32cd32", "#6495ed",
		"#ff69b4", "#ba55d3", "#cd5c5c", "#ffa500", "#40e0d0",
		"#1e90ff", "#ff6347", "#7b68ee", "#00fa9a", "#ffd700",
		"#6b8e23", "#ff00ff", "#3cb371", "#b8860b", "#30e0e0"],
	animation: 800,
	chart: {},
	data: []
};

module.exports = {
	initOption: function (def, cus) {
		//合并用户配置到默认配置
		if (cus) core.merge(def, cus);

		var result = core.cloneDeep(Option);
		//合并默认配置到通用配置
		core.merge(result, def);

		return result;
	}
};