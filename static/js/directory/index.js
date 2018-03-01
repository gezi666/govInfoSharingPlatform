(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$(function () {

	var selectedList = [];

	$('.select-item').click(function () {
		var selectxt = $(this).text();
		selectedList.push(selectxt);
		renderList('#selected-condition', '#sel-con-template', selectedList);
	});

	// 更多
	$('.show-more').click(function () {
		$('.theme').toggleClass("active");
	});

	// 选择筛选条件
	$('.select-item').click(function () {
		$(this).parents(".classified-line").addClass("dn");
		if ($(this).text() == '政务主题') {
			$('.theme').removeClass("dn");
		}
	});

	// 删除已选条件
	$('body').delegate('.delself', 'click', function () {
		$(this).parent().remove();
		var txt = $(this).parent().text();
		txt = txt.substring(0, txt.length - 1);
		selectedList.splice($.inArray(txt, selectedList), 1);
		judgeFilterType(txt);
	});

	// 排序功能
	$('.sort-item').click(function () {
		$(this).toggleClass('active');
	});
});

//判断选择条件类型
function judgeFilterType(txt) {
	var resourceArray = ['基本信息', '政务主题', '部门资源', '地方资源'];
	var themeArray = ['全民健康保障', '全民住房保障', '全民社会保障', '药品安全监督', '食品安全监管', '安全生产监督', '市场价格监管'];
	var modeArray = ['数据库', '文件', 'API服务'];
	if ($.inArray(txt, resourceArray) != -1) {
		$('.resource').removeClass("dn");
	} else if ($.inArray(txt, themeArray) != -1) {
		$('.theme').removeClass("dn");
	} else if ($.inArray(txt, modeArray) != -1) {
		$('.mode').removeClass("dn");
	}
}

// Handlebars渲染列表数据
function renderList(domId, tempId, dataList) {
	var tpl = $(tempId).html();
	//预编译模板
	var template = Handlebars.compile(tpl);
	//匹配数据
	var html = template(dataList);
	//输入模板
	$(domId).html(html);
}

},{}]},{},[1]);
