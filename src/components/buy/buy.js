var selectGoodId = 0 ;// 当前选择的产品套餐
var token = getToken();
if(token.length<=0){
	$('#goods').html('请先&nbsp;&nbsp;<a href="login.html">登录</a>')
} else {
	$.ajax({
		url: 'https://jcb.jzstudio.com.cn/api/qt/goods',
		cache: false,
		type: 'post',
		beforeSend: function(xhr) {
			xhr.setRequestHeader('token',token);
		},
		success: function (json) {
			if (json.code == 0) {
				setGoodsList( typeof json.data == 'string' ? eval('('+json.data+')') : json.data );
				return;
			}
			$('#goods').html(json.msg);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			$('#goods').html('发生错误，HTTP代码是' + (jqXHR ? jqXHR.status : '未知'));
		},
		complete: function () {//无论成功还是失败，都会调用此函数
		}
	});
}

function setGoodsList(list) {
	var str = '';
	for (var i = 0; i < list.length ; i++) {
		var _id = list[i].id;
		var _price = list[i].price;
		var _priceDay = list[i].priceDay;
		var _title = list[i].title;
		var _priceShow = list[i].priceShow;
		var _priceSave = list[i].priceSave;
		//alert('_id='+_id+'\n'+'_price='+_price+'\n'+'_priceDay='+_priceDay+'\n'+'_title='+_title+'\n'+'_priceShow='+_priceShow+'\n'+'_priceSave='+_priceSave+'\n');
		str += '<li>';
		str += '<div class="main">';
		str += '<span class="days">'+_title+'</span><span class="price">￥'+_price+'</span><span class="buy">';
		str += '<a href="#" goodId="'+_id+'" class="btn"><i class="icon"><img src="../../assets/buy.png" alt=""></i><span>购买</span></a>';
		str += '</span>';
		str += '</div>';
		str += '<div class="info">';
		str += '<span class="oldprice">原价'+_priceShow+'元&nbsp;&nbsp;</span><span class="save">'+(_priceSave>0?('立省'+_priceSave+'元'):'')+'</span><span class="average">￥'+((_priceDay+'').substring(0,8))+'/天</span>';
		str += '</div>';
		str += '</li>';
	}
	$('#goods').html(str);

	$(".product .btn").click(function(){
		selectGoodId = $(this).attr('goodId') ;//设置当前选择的产品套餐
		$(".buylist").addClass("show");//显示选择支付方式

		$(".buylist .close").click(function(){//关闭 不支持
			selectGoodId = 0 ; //清空当前选择的产品套餐
			$(".buylist").removeClass("show");//隐藏选择支付方式
		});

		$(".buylist .alipay").click(function(){//选择 支付宝
			goPay('alipay');
		});

		$(".buylist .wechat").click(function(){//选择 微信
			goPay('wechat');
		});

	});
}

function goPay(payChannel) {
	//alert('selectGoodId='+selectGoodId+'\npayChannel='+payChannel+'\ntoken='+token);
	$('#payload').show();
	$.ajax({
		url: 'https://jcb.jzstudio.com.cn/api/qt/pay',
		cache: false,
		type: 'post',
		data:{goodsId:selectGoodId,payChannel:payChannel},
		beforeSend: function(xhr) {
			xhr.setRequestHeader('token',token);
		},
		success: function (json) {
			if (json.code == 0) {
				//alert(json.data.payUrl);
				var _json = ( typeof json.data == 'string' ? eval('('+json.data+')') : json.data );
				var orderNo = _json.orderNo;
				var payUrl = _json.payUrl;
				if(orderNo.length>0&&payUrl.length>0){
					setCookie('orderNo',orderNo,5*60*1000);//5分钟有效
					$('#payloadText').html('请在新窗口完成支付后，回到订单页面刷新查看');
					window.open(payUrl,'_blank');
				}else{
					$('#payload').hide();
					alert('请求返回不存在有效的订单编号或支付URL');
				}
				return;
			}
			$('#payload').hide();
			alert(json.msg);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('发生错误，HTTP代码是' + (jqXHR ? jqXHR.status : '未知'));
		},
		complete: function () {//无论成功还是失败，都会调用此函数
		}
	});
}