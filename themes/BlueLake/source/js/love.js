/*
 *click love
 */
! function(e, t, a) {
	function n() {
		c(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"), o(), r()
	}

	function r() {
		for (var e = 0; e < d.length; e++) d[e].alpha <= 0 ? (t.body.removeChild(d[e].el), d.splice(e, 1)) : (d[e].y--, d[e].scale += .004, d[e].alpha -= .013, d[e].el.style.cssText = "left:" + d[e].x + "px;top:" + d[e].y + "px;opacity:" + d[e].alpha + ";transform:scale(" + d[e].scale + "," + d[e].scale + ") rotate(45deg);background:" + d[e].color + ";z-index:99999");
		requestAnimationFrame(r)
	}

	function o() {
		var t = "function" == typeof e.onclick && e.onclick;
		e.onclick = function(e) {
			t && t(), i(e)
		}
	}

	function i(e) {
		var a = t.createElement("div");
		a.className = "heart", d.push({
			el: a,
			x: e.clientX - 5,
			y: e.clientY - 5,
			scale: 1,
			alpha: 1,
			color: s()
		}), t.body.appendChild(a)
	}

	function c(e) {
		var a = t.createElement("style");
		a.type = "text/css";
		try {
			a.appendChild(t.createTextNode(e))
		} catch (t) {
			a.styleSheet.cssText = e
		}
		t.getElementsByTagName("head")[0].appendChild(a)
	}

	function s() {
		return "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")"
	}
	var d = [];
	e.requestAnimationFrame = function() {
		return e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function(e) {
			setTimeout(e, 1e3 / 60)
		}
	}(), n()
}(window, document);

/*
 *标题
 */
// var OriginTitile = document.title;
// var titleTime;
// document.addEventListener('visibilitychange', function () {
// 	if (document.hidden) {
// 		$('[rel="icon"]').attr('href', "/favicon.ico");
// 		document.title = '╭(°A°`)╮ 页面崩溃啦 ~ | 你快回来！';
// 		clearTimeout(titleTime);
// 	}
// 	else {
// 	$('[rel="icon"]').attr('href', "/favicon.ico");
// 		document.title = '(ฅ>ω<*ฅ) 噫又好了~' + OriginTitile;
// 		titleTime = setTimeout(function () {
// 		document.title = OriginTitile;
// 		}, 2000);
// 	}
// });

/*
 *每日一句Api
 */
$.ajax({
    type: 'POST',
    url: 'https://api.hibai.cn/api/index/index',
    dataType: 'json',
    data: {"TransCode":"030111","OpenId":"mrdong916","Body":""},
    success: function(result){
		$('.description').text(result.Body.word);
        return false;
    }
});

/**
 * Aplayer
 */
//get play list info
// $(function() {
//     $.ajax({
//         type: "POST",
//         url: 'https://api.hibai.cn/api/index/index',
//         dataType: 'json',
//         data: {"TransCode":"020112","OpenId":"mrdong916","Body":{"SongListId":"141998290"}},
//         success: function(e) {
//             var aplayerList = new APlayer({
//             element: document.getElementById('player'),
//             narrow: false,
//             autoplay: false,
//             showlrc: false,
//             mutex: true,
//             theme: '#FFF0',
//             mode: 'random',
//             preload: 'metadata',
//             listmaxheight: '200px',
//             music:e.Body
//             });
//             window.aplayers || (window.aplayers = []),
//             window.aplayers.push(aplayerList)
//         }
//     })
// })

//change aplayer style 
// var aplayer  = document.getElementById('player');
// aplayer.style.boxShadow = 'none';
// aplayer.style.marginTop = '10px';
// $('.aplayer-list-light').css('background','#d8e2eb69');

// url推送
(function(){
var canonicalURL, curProtocol;
//Get the <link> tag
var x=document.getElementsByTagName("link");
//Find the last canonical URL
if(x.length > 0){
	for (i=0;i<x.length;i++){
		if(x[i].rel.toLowerCase() == 'canonical' && x[i].href){
			canonicalURL=x[i].href;
		}
	}
}
//Get protocol
if (!canonicalURL){
	curProtocol = window.location.protocol.split(':')[0];
}
else{
	curProtocol = canonicalURL.split(':')[0];
}
//Get current URL if the canonical URL does not exist
if (!canonicalURL) canonicalURL = window.location.href;
//Assign script content. Replace current URL with the canonical URL
!function(){var e=/([http|https]:\/\/[a-zA-Z0-9\_\.]+\.baidu\.com)/gi,r=canonicalURL,t=document.referrer;if(!e.test(r)){var n=(String(curProtocol).toLowerCase() === 'https')?"https://sp0.baidu.com/9_Q4simg2RQJ8t7jm9iCKT-xh_/s.gif":"//api.share.baidu.com/s.gif";t?(n+="?r="+encodeURIComponent(document.referrer),r&&(n+="&l="+r)):r&&(n+="?l="+r);var i=new Image;i.src=n}}(window);})();
