<template>
  <div class="regbox safebox show">
    <div class="logo">
      <img src="../../assets/logo.png" alt />
    </div>
    <div class="title">手机号注册</div>
    <ul class="from">
      <li>
        <i class="icon">
          <img src="../../assets/phone.png" alt />
        </i>
        <input
          type="text"
          onkeyup="this.value=this.value.replace(/\D/g,'')"
          class="phone"
          placeholder="请输入手机号"
          autocomplete="off"
        />
      </li>
      <li>
        <i class="icon">
          <img src="../../assets/password.png" alt />
        </i>
        <input type="password" class="password" placeholder="请输入密码" autocomplete="off" />
      </li>
      <li>
        <i class="icon">
          <img src="../../assets/checkcode.png" alt />
        </i>
        <input class="checkcode" type="text" placeholder="请输入验证码" autocomplete="off" />
        <a href="javascript:;" class="checkcodebtn" @click="toRandom">发送验证码</a>
      </li>
    </ul>
    <a href="javascript:;" class="btn" @click="toRegister">注册</a>
    <ul class="other">
      <li>
        <a @click="goLogin">登录</a>
      </li>
      <li>
        <a @click="goChange">忘记密码？</a>
      </li>
    </ul>
    <div class="info">
      新用户免费体验
      <span>30分钟</span>
      <a @click="goLogin">马上登录&gt;</a>
    </div>
  </div>
</template>

<script>
import common from "../common/common.js";

export default {
  name: "register",
  data() {
    return {};
  },
  methods: {
    goLogin() {
      this.$router.push("/login");
    },
    goChange() {
      this.$router.push("/change");
    },
    toRandom() {
      //注册发送验证码
      var phone = $(".regbox .phone").val();
      if (phone.length <= 0) {
        alert("注册发送验证码时，手机号码，请填写");
        return false;
      }
      if (!/^1[3456789]\d{9}$/.test(phone)) {
        alert("注册发送验证码时，手机号码，有误，请重新填写");
        return false;
      }
      if (phone == "13800138000") {
        alert("注册发送验证码时，手机号码，有误，请重新填写");
        return false;
      }
      $(".regbox .checkcodebtn").addClass("disable");
      common.getRandomCode(".regbox .checkcodebtn", 60);
      common.sengAjax("/sms", {
        channel: common.getChannelId(),
        phone: phone,
        type: "register"
      });
    },
    toRegister() {
      var phone = $(".regbox .phone").val();
      if (phone.length <= 0) {
        alert("注册时，手机号码，请填写");
        return false;
      }
      if (!/^1[3456789]\d{9}$/.test(phone)) {
        alert("注册时，手机号码有误，请重新填写");
        return false;
      }
      if (phone == "13800138000") {
        alert("注册时，手机号码，有误，请重新填写");
        return false;
      }
      var password = $(".regbox .password").val();
      if (password.length <= 0) {
        alert("注册时，登录密码，请填写");
        return false;
      }
      if (password.length < 6) {
        alert("注册时，登录密码小于6位，请重新填写");
        return false;
      }
      var captcha = $(".regbox .checkcode").val();
      if (captcha.length <= 0) {
        alert("注册时，短信验证码，请填写");
        return false;
      }
      common.sengAjax("/register", {
        channel: common.getChannelId(),
        phone: phone,
        password: password,
        captcha: captcha
      },()=>{
        this.$router.push("/login");
      });
    }
  },
  created: function() {}
};
</script>

<style scoped>
.safebox .from li .checkcode {
  width: 124px;
}
</style>