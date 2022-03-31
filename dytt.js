// ==UserScript==
// @name         电影天堂复制磁链
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  点击复制电影、电视剧链接
// @author       花花nice
// @match        *://www.ygdy8.com/*
// @match        *://dy.dytt8.net/*
// @grant        none
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js
// @require      https://cdn.bootcdn.net/ajax/libs/Base64/1.1.0/base64.js
// @updateURL    https://raw.githubusercontent.com/hhnice510/TamperMonkey/main/dytt.js
// @updateURL    https://gitee.com/hhnice/TamperMonkey/raw/main/dytt.js
// @license MIT
// ==/UserScript==

$(function(){
    console.log("引入成功")
});


//var num = $("#Zoom").find("table").length
var num = $("#Zoom span table").length;
console.log("一共" + num + "集");

//判断当前页面为电影还是电视剧

    var isMovie = e => {
         return 0 === num ? true : false;
    }
    var isTv = e => {
         return 1 <= num ? true : false;
    }

if(isMovie()){
    let clipboard = ' ';
    let element = document.querySelector('#Zoom > span > a');
    let magnet = element.attributes["href"].nodeValue;

    let btn = document.createElement('button');
        btn.innerText = '复制链接';
        element.before(btn);

    btn.addEventListener('click', copyMagnet);

    function copyMagnet() {

        clipboard = navigator.clipboard.writeText(magnet)
        console.log("复制成功")
        //alert("复制成功")

    };
}


if(isTv()){
    for(var i = 4; i < num + 4; i++){
        //获取标签文本  -srt
        let $i = i;
        let $element = $('#Zoom > span > table:nth-child(' + $i + ') > tbody > tr > td > a')
        let srt = $element.text();
        //url 编码 encodeURI(URL)
        let ftp = encodeURI(srt);
        //console.log(ftp)
        let url = 'AA' + ftp + 'ZZ';
        //base64编码
        //官方cdn中 Base64.js编码方式为btoa(srt)
        //jquery.base64.js中，编码方式为$.base64.encode(srt)
        let urlBase64 = btoa(url);
        let thunder = 'thunder://' + urlBase64;
        //console.log(thunder);
        //将thunder输出至数组存储
        //arr.push(arr[thunder]);


        let id = $i - 3;
        //添加单集复制按钮,放置在链接前面
        let btn = document.createElement('button'); btn.setAttribute("id", id); btn.innerText = '复制链接'; $element.before(btn);

        //定义剪贴板 添加监控click点击复制事件
        let clipboard = '';
        btn.addEventListener('click', copyThunder);
        function copyThunder(){
            clipboard = navigator.clipboard.writeText(thunder)
            console.log("第" + id + "集复制成功")
        }

    }

}








