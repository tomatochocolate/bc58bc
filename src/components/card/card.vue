<template>
  <div class="help" id="con">
    <ul>
      <li>
        <div style="font-weight:bold;font-size:12px">请输入的卡序列号：</div>
        <div style="margin-top:15px">
          <input
            id="cardSerial"
            placeholder="卡序列号"
            type="text"
            style="min-width:265px;width:100%;height:28px;padding:2px 5px;border:1px solid #999;letter-spacing:2px;font-size:12px"
          />
        </div>
        <div style="margin-top:15px">
          <a  class="btn" style="padding:5px 10px;font-size:12px" @click="goRecharge">提交充值</a>&nbsp;&nbsp;&nbsp;&nbsp;
          <a
            href="/buy"
            style="font-size:12px;color:blue;text-decoration:underline"
          >返回</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import common from "../common/common";

export default {
  name: "card",
  data() {
    return {};
  },
  methods: {
    goRegister() {
      this.$router.push("/register");
    },
    goLogin() {
      this.$router.push("/login");
    },
    goRecharge() {
      var token = common.getToken();
      if (token.length <= 0) {
          this.$router.push("/login")
      } else {
       
          var cardSerial = $("#cardSerial").val();
          if (cardSerial.length <= 0) {
            alert("请填写");
            return false;
          }
          // var _url = apiUrl + "api/qt/pay/cart";
          $.ajax({
            url: "http://192.168.0.160:9988/api/qt/pay/cart",
            cache: false,
            type: "post",
            beforeSend: function(xhr) {
              xhr.setRequestHeader("token", token);
            },
            data: { cardPassword: cardSerial },
            success: function(json) {
              if (json.code == 0 || json.paySuccess == "true") {
                window.location.href = "order";
                alert(json.msg);
                return;
              }
              alert(json.msg);
            },
            error: function(jqXHR, textStatus, errorThrown) {
              alert("发生错误，HTTP代码是" + (jqXHR ? jqXHR.status : "未知"));
            },
            complete: function() {
              //无论成功还是失败，都会调用此函数
            }
          });
        ;
      }
    }
  }
};
</script>