// 视窗自适应
// var targetDPI, version;
// var ua = navigator.userAgent.toLowerCase();
// window.deprecatedDeviceIsAndroid = (ua.search('android') > -1);
// var viewport = 'initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no';
// if (window.deprecatedDeviceIsAndroid) {
// 	targetDPI = 160;
// 	if (ua.match(/gt-p10\d0|sgh-i987|sph-p100|sgh-t849|sch-i800|shw-m180s|sc-01c/)) targetDPI = 'device-dpi';
// 	viewport += ', target-densityDpi='+targetDPI+', width=device-width';
// } else if (ua.match(/iphone|ipod/)) {
// 	version = ua.match(/cpu (?:\w+ )?os (\d+)_?(\d+)?/);
// 	if (version && (version[1] > 7 || (version[1] == 7 && version[2] && version[2] > 0))) {
// 		viewport += ', minimal-ui';
// 	}
// }
// document.write('<meta name="viewport" content="' + viewport + '" />');
//////////////
// function checkphone(){ 
//     var phone = document.getElementById('phone').value;
//     if(!(/^1[3456789]\d{9}$/.test(phone))){ 
//         alert("手机号码有误，请重填");  
//         return false; 
//     } 
// }
// function show(e){
// 	if(e=='.loginbox'){
// 		document.title = '登录';
// 	} else if(e=='.regbox'){
// 		document.title = '注册';
// 	} else if(e=='.chagebox'){
// 		document.title = '修改密码';
// 	}
// 	$(".safebox").removeClass("show");
// 	$(e).addClass("show");
// }
// // help的隐藏显示
// function showinfo(e){
// 	if($(e).parent().hasClass("show")){
// 		$(e).parent().removeClass("show");
// 	}else{
// 		$(e).parent().addClass("show");
// 	}
// }
// function getRandomCode(e,t) {
// 	var time = t;
// 	if (time === 0) {
// 		time = t;
// 		$(".checkcodebtn").removeClass("disable");
// 		$(e).text("发送验证码");
// 		return;
// 	} else {
// 		time--;
// 		$(e).text("验证码("+time+"s)");
// 	}
// 	setTimeout(function() {
// 		getRandomCode(e,time);
// 	},1000);
// }

// $(
// function(){

// 	$(".regbox .checkcodebtn").click(function(){//注册发送验证码
// 		var phone=$(".regbox .phone").val();
// 		if(phone.length<=0){
// 			alert("注册发送验证码时，手机号码，请填写");
// 			return false;
// 		}
// 		if(!(/^1[3456789]\d{9}$/.test(phone))){
// 			alert("注册发送验证码时，手机号码，有误，请重新填写");
// 			return false;
// 		}
// 		if(phone=='13800138000'){
// 			alert("注册发送验证码时，手机号码，有误，请重新填写");
// 			return false;
// 		}
// 		$(".regbox .checkcodebtn").addClass("disable");
// 		getRandomCode(".regbox .checkcodebtn",60);
// 		sengAjax('/sms',{channel:getChannelId(),phone:phone,type:'register'});
// 	});

// 	$(".chagebox .checkcodebtn").click(function(){//注册发送验证码
// 		var phone=$(".chagebox .phone").val();
// 		if(phone.length<=0){
// 			alert("修改密码发送验证码时，手机号码，请填写");
// 			return false;
// 		}
// 		if(!(/^1[3456789]\d{9}$/.test(phone))){
// 			alert("修改密码发送验证码时，手机号码，有误，请重新填写");
// 			return false;
// 		}
// 		if(phone=='13800138000'){
// 			alert("注册发送验证码时，手机号码，有误，请重新填写");
// 			return false;
// 		}
// 		$(".chagebox .checkcodebtn").addClass("disable");
// 		getRandomCode(".chagebox .checkcodebtn",60);
// 		sengAjax('/sms',{channel:getChannelId(),phone:phone,type:'forgotPassword'});
// 	});

// 	$(".loginbox .btn").click(function(){
// 		var phone=$(".loginbox .phone").val();
// 		if(phone.length<=0){
// 			alert("登录时，手机号码，请填写");
// 			return false;
// 		}
// 		if(!(/^1[3456789]\d{9}$/.test(phone))){
// 			alert("登录时，手机号码，有误，请重新填写");
// 			return false;
// 		}
// 		var password = $(".loginbox .password").val();
// 		if(password.length<=0){
// 			alert("登录时，登录密码，请填写");
// 			return false;
// 		}
// 		sengAjax('/login',{channel:getChannelId(),phone:phone,password:password});
// 	});

// 	$(".regbox .btn").click(function(){
// 		var phone=$(".regbox .phone").val();
// 		if(phone.length<=0){
// 			alert("注册时，手机号码，请填写");
// 			return false;
// 		}
// 		if(!(/^1[3456789]\d{9}$/.test(phone))){
// 			alert("注册时，手机号码有误，请重新填写");
// 			return false;
// 		}
// 		if(phone=='13800138000'){
// 			alert("注册时，手机号码，有误，请重新填写");
// 			return false;
// 		}
// 		var password = $(".regbox .password").val();
// 		if(password.length<=0){
// 			alert("注册时，登录密码，请填写");
// 			return false;
// 		}
// 		if(password.length<6){
// 			alert("注册时，登录密码小于6位，请重新填写");
// 			return false;
// 		}
// 		var captcha = $(".regbox .checkcode").val();
// 		if(captcha.length<=0){
// 			alert("注册时，短信验证码，请填写");
// 			return false;
// 		}
// 		sengAjax('/register',{channel:getChannelId(),phone:phone,password:password,captcha:captcha});
// 	});

// 	$(".chagebox .btn").click(function(){
// 		var phone=$(".chagebox .phone").val();
// 		if(phone.length<=0){
// 			alert("修改密码时，手机号码，请填写");
// 			return false;
// 		}
// 		if(!(/^1[3456789]\d{9}$/.test(phone))){
// 			alert("修改密码时，手机号码有误，请重新填写");
// 			return false;
// 		}
// 		if(phone=='13800138000'){
// 			alert("修改密码时，手机号码，有误，请重新填写");
// 			return false;
// 		}
// 		var password = $(".chagebox .password").val();
// 		if(password.length<=0){
// 			alert("修改密码时，登录密码，请填写");
// 			return false;
// 		}
// 		if(password.length<6){
// 			alert("修改密码时，登录密码小于6位，请重新填写");
// 			return false;
// 		}
// 		var captcha = $(".chagebox .checkcode").val();
// 		if(captcha.length<=0){
// 			alert("修改密码时，短信验证码，请填写");
// 			return false;
// 		}
// 		sengAjax('/forgotPassword',{channel:getChannelId(),phone:phone,password:password,captcha:captcha});
// 	});
// }
// )
// /////////////////
// function getChannelId() {
//     var _channelId = getPars('channelId');
//     return _channelId.length<=0?'GW':_channelId;
// }
// function getToken() {
//     return getCookie('token');
// }

// function sengAjax(api,pars) {
// 	$.ajax({
// 		url:'https://jcb.jzstudio.com.cn/api/qt'+api,
// 		cache:false,
// 		type:'post',
// 		data:pars,
// 		success: function (json) {
// 			if(json.code==0){
// 				if(api=='/login'){
//                     setCookie('token',( typeof json.data == 'string' ? eval('('+json.data+')') : json.data ).token);
// 					var _ua = navigator.userAgent;
//  					if(_ua.indexOf('Android') > -1 || _ua.indexOf('Adr') > -1){ //安卓终端
// 						window.console.log('$appcmdex_vpn_loginResponse:'+json.data);
// 					}else {
// 						external.AppCmd(external.GetSID(window), 'vpn', 'loginResponse', json.data, '', function (code, data) {
// 							console.info(code,data)
// 						});
// 					}
// 				}
// 				alert( json.msg );
// 				return ;
// 			}
// 			alert( json.msg );
// 		},
// 		error: function (jqXHR, textStatus, errorThrown) {
// 			alert('发生错误，HTTP代码是'+(jqXHR?jqXHR.status:'未知'));
// 		},
// 		complete:function () {//无论成功还是失败，都会调用此函数
// 		}
// 	});
// }

// function getPars(_var) {
//     var query = window.location.search.substring(1);
//     var vars = query.split("&");
//     for (var i=0;i<vars.length;i++) {
//         var pair = vars[i].split("=");
//         if(pair[0] == _var){return pair[1];}
//     }
//     return '';
// }

// function getCookie(key) {
//     var arr = document.cookie.match( new RegExp("(^| )"+key+"=([^;]*)(;|$)") );
//     return arr ? unescape(arr[2]) : '' ;
// }

// function setCookie(key,value,millis) {
// 	if( typeof millis != 'number') millis = 1*24*60*60*1000 ;
//     var exp = new Date();
//     exp.setTime(exp.getTime() + millis);
//     document.cookie = key + "="+ escape (value) + ";expires=" + exp.toGMTString();
// }
// function delCookie(key) {
// 	var exp = new Date();
// 	exp.setTime(exp.getTime() - 1);
// 	var cval = getCookie(key);
// 	if(cval!=null) document.cookie = (key + "="+cval+";expires="+exp.toGMTString());
// }

// start 定期检查支付结果
// function checkPayResult() {
// 	var orderNo = getCookie('orderNo');
// 	if(!orderNo||orderNo.length<=0){
// 		clearCheckPayResult();
// 		return ;
// 	}
// 	$.ajax({
// 		url: 'https://jcb.jzstudio.com.cn/api/qt/pay/check/'+orderNo,
// 		cache: false,
// 		type: 'post',
// 		beforeSend: function(xhr) {
// 			xhr.setRequestHeader('token',token);
// 		},
// 		success: function (json) {
// 			if (json.code == 0) {
// 				clearCheckPayResult();
// 				delCookie('orderNo');
// 				var _ua = navigator.userAgent;
// 				if(_ua.indexOf('Android') > -1 || _ua.indexOf('Adr') > -1){ //安卓终端
// 					window.console.log('$appcmdex_vpn_vpnMessageUpdate:{"code": 0,"msg": "请求成功","data": ""}');
// 				}else {
// 					external.AppCmd(external.GetSID(window), 'vpn', 'vpnMessageUpdate', '{"code": 0,"msg": "请求成功","data": ""}', '', function (code, data) {
// 						console.info(code,data)
// 					});
// 				}
// 				return;
// 			}
// 		},
// 		error: function (jqXHR, textStatus, errorThrown) {
// 			//alert('发生错误，HTTP代码是' + (jqXHR ? jqXHR.status : '未知'));
// 		},
// 		complete: function () {//无论成功还是失败，都会调用此函数
// 		}
// 	});
// }
// var _checkPayResult = window.setInterval(checkPayResult,5000);
// function clearCheckPayResult(){
// 	if(_checkPayResult) window.clearInterval(_checkPayResult);
// }
//end 定期检查支付结果