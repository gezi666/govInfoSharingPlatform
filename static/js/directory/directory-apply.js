(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$(function () {
    // 勾选
    $('.ckeck-box').click(function () {
        $(this).toggleClass('active');
        if ($(this).hasClass('ckeck-all')) {
            if ($(this).hasClass('active')) {
                $('.ckeck-box').addClass('active');
            } else {
                $('.ckeck-box').removeClass('active');
            }
        }
    });

    // 选择申请类型
    $('.type-radio').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    });

    //返回
    $('.go-back').click(function () {
        // location.href = './index.html'
        history.go(-1);
    });
});

},{}]},{},[1]);
