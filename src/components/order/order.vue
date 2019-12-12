<template>
  <div class="order">
    <ul id="orders">
      <li>
        <div class="info">
          <div class="name">包月套餐</div>
          <div class="time">2019-12-02 14:37:44</div>
        </div>
        <div class="price">￥48</div>
        <div class="clear"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "order",
  data() {
    return {};
  },
  methods: {
    goRegister() {
      this.$router.push("/register");
    },
    goLogin() {
      this.$router.push("/login");
    }
  }
};
</script>

// <script type="text/javascript">
// 	var token = getToken();
// 	if(token.length<=0){
// 		$('#orders').html('请先&nbsp;&nbsp;<a href="login.html">登录</a>')
// 	}else{
// 		$.ajax({
// 			url: 'https://jcb.jzstudio.com.cn/api/qt/pay/records',
// 			cache: false,
// 			type: 'post',
// 			beforeSend: function(xhr) {
// 				xhr.setRequestHeader('token',token);
// 			},
// 			success: function (json) {
// 				if (json.code == 0) {
// 					setOrderList( typeof json.data.data == 'string' ? eval('('+json.data.data+')') : json.data.data );
// 					return;
// 				}
// 				$('#orders').html(json.msg);
// 			},
// 			error: function (jqXHR, textStatus, errorThrown) {
// 				$('#orders').html('发生错误，HTTP代码是' + (jqXHR ? jqXHR.status : '未知'));
// 			},
// 			complete: function () {//无论成功还是失败，都会调用此函数
// 			}
// 		});
// 	}

// 	function setOrderList(list) {
// 		var str = '';
// 		for (var i = 0; i < list.length; i++) {
// 			var _goodsName = list[i].goodsName;
// 			var _addTime = list[i].addTime;
// 			var _total = list[i].total;
// 			str += '<li>';
// 			str += '<div class="info">';
// 			str += '<div class="name">'+_goodsName+'</div>';
// 			str += '<div class="time">'+_addTime+'</div>';
// 			str += '</div><div class="price">￥'+_total+'</div>';
// 			str += '<div class="clear"></div>';
// 			str += '</li>';
// 		}
// 		$('#orders').html(str);
// 	}
//
</script>