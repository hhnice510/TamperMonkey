// ==UserScript==
// @name         电影天堂
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  点击复制磁力链接
// @author       花花nice
// @match        *://www.ygdy8.com/*
// @match        *://dy.dytt8.net/*
// @grant        none
// @license MIT
// ==/UserScript==

var clipboard = ' ';
var element = document.querySelector('#Zoom > span > a');
var magnet = element.attributes["href"].nodeValue;

var btn = document.createElement('button');
    btn.innerText = '复制链接';
    element.before(btn);

btn.addEventListener('click', copyMagnet);

function copyMagnet() {

    clipboard = navigator.clipboard.writeText(magnet)
    console.log("复制成功")
    //alert("复制成功")

};

