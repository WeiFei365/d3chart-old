
'use strict'

var core = {};

core.getSize = function (node) {
	if (!this.isElement(node)) return [1, 1];

	return [$(node).width(), $(node).height()];
};
/**
 * @description 用于计算某个元素相对上N级元素的偏移量，该上N元素可能是，当前元素的父亲、爷爷、祖父。。。等等
 * @param  {DOM} target    子元素
 * @param  {DOM} container 上N级元素
 * @return {Object}           {top: n, left: n}
 */
core.offset = function (target, container) {
	var off = {top: 0, left: 0};
	if ($(container).find(target).length == 0) {
		return off;
	}

	goto($(target));
	function goto ($el) {
		if ($el[0] == container) {
			return;
		}
		//过滤掉所有svg标签
		if (!core.isSVGElement($el[0])) {
			var t = $el.position();
			off.top += t.top;
			off.left += t.left;
		}
		goto($el.parent());
	}

	return off;
};

core.merge = function (tar, sou) {
	return _.merge(tar, sou);
};
core.cloneDeep = function (obj) {
	return _.cloneDeep(obj);
};
core.isElement = function (node) {
	return _.isElement(node);
};
core.isSVGElement = function (node) {
	return "svg,g,text,rect,path,circle,ellipse,line,polyline,polygon,".indexOf(node.tagName.toLowerCase() + ',') != -1;
};
core.isArray = function (val) {
	return _.isArray(val);
};
core.isNumber = function (val) {
	return _.isNumber(val);
};
core.isFunction = function (val) {
	return _.isFunction(val);
};
core.isString = function (val) {
	return _.isString(val);
};
core.isObject = function (val) {
	return _.isObject(val);
};
//return [top， bottom， left， right]
core.getCSSSize = function (val) {
	var v = [0, 0, 0, 0];
	if (!val) return v;
	v = val.replace(/px/g, '').replace(/\s+/g, ' ').split(' ');
	switch (v.length) {
		case 0:
			v = [0, 0, 0, 0];
			break;
		case 1:
			v = [+v[0], +v[0], +v[0], +v[0]];
			break;
		case 2:
			v = [+v[0], +v[0], +v[1], +v[1]];
			break;
		case 3:
			v = [+v[0], +v[2], +v[1], +v[1]];
			break;
		default:
			v = [0, 0, 0, 0];
			break;
	}

	return v;
};

/**
 * @description 安全获取对象的属性值，支持多级取值
 * @param  {Object} obj       源对象
 * @param  {String} keys      key路径，如：'chart.style.padding'
 * @param  {String} splitFlag keys参数多级的分隔标识，默认：'.'
 * @return {*}           取到的值，如果没取到什么都不返回
 */
core.get = function (obj, keys, splitFlag) {
	if (!core.isObject(obj) || !core.isString(keys)) {
		return;
	}
	!core.isString(splitFlag) && (splitFlag = '.');

	function goto (o, ks) {
		if (ks.length == 0) {
			return o;
		}
		try {
			o[ks[0]];
		} catch (e) {
			return;
		}
		return goto(o[ks[0]], ks.slice(1));
	}

	return goto(obj, keys.split(splitFlag));
};

/**
 * @description 安全设置对象的属性值，支持多级设置
 * @param {Object} obj       源对象
 * @param {String} keys      key路径，如：‘chart.style.padding’
 * @param {*} val       值
 * @param {Boolean} notMerge  是否不启用合并处理，只针对最后一级的合并，如上：padding 的合并
 * @param {String} splitFlag keys参数多级的分隔标识，默认：'.'
 */
core.set = function (obj, keys, val, notMerge, splitFlag) {
	if (!core.isObject(obj) || !core.isString(keys)) {
		return;
	}
	!core.isString(splitFlag) && (splitFlag = '.');

	goto(obj, keys.split(splitFlag));
	function goto (curr, ks) {
		if (ks.length == 0) {
			return;
		}
		if (ks.length == 1) {
			if (notMerge || !core.isObject(val) || !core.isObject(curr[ks[0]])) {
				curr[ks[0]] = val;
			} else {
				curr[ks[0]] = core.merge(curr[ks[0]], val);
			}
			return;
		}
		if (!core.isObject(curr[ks[0]])) {
			curr[ks[0]] = {};
		}

		goto(curr[ks[0]], ks.slice(1));
	}
}

core.hide = function (el) {
	d3.select(el).style('display', 'none');
};
core.show = function (el) {
	d3.select(el).style('display', 'block');
};

module.exports = core;
