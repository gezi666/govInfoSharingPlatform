(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Created by guohuimin on 2017/10/25.
 */

$(function () {
    //根据URL切换顶部选中导航
    var localUrlnav = window.location + '';
    console.log(localUrlnav);
    var spIndexnav;
    if (localUrlnav.indexOf('/index/') >= 0) {
        //首页
        spIndexnav = 1;
    } else if (localUrlnav.indexOf('/directory/') >= 0) {
        //找目录
        spIndexnav = 2;
    } else if (localUrlnav.indexOf('/material/') >= 0) {
        //资料规范
        spIndexnav = 3;
    } else if (localUrlnav.indexOf('/fusion/') >= 0) {
        //融合共享动态
        spIndexnav = 4;
    }
    $(".nav-list>li").eq(spIndexnav).addClass("active").siblings().removeClass("active");
    console.log($(".nav-list>li").length);
    // 页面头部事件
    $(".head-user").hover(function () {
        $(this).addClass("hover");
        $(this).find(".head-user-dis").stop().slideDown();
    }, function () {
        $(this).removeClass("hover");
        $(this).find(".head-user-dis").stop().slideUp();
    });
    $(".nav-list .firstli").hover(function () {
        $(".nav").css("height", "260px");
        $(this).find(".nav-more").stop().slideDown(400);
    }, function () {
        $(".nav").css("height", "40px");
        $(this).find(".nav-more").stop().slideUp(200);
    });
    $(".nav-more-left li").hover(function () {
        $(this).addClass("active"); //.siblings().removeClass("active");
    }, function () {
        $(this).removeClass("active");
    });

    /* 左侧菜单 */
    $(".clickable").click(function () {
        $(".clickable-content").hide();
        $(this).next(".clickable-content").slideDown();
    });
    $(".clickable2").click(function () {
        $(".clickable2").removeClass("clickableActive");
        $(this).addClass("clickableActive");
        $(".clickable2").next(".clickable-content").hide();
        $(this).next(".clickable-content").slideDown();
    });
});

},{}]},{},[1]);
