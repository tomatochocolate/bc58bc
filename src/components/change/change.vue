<template>
  <div class="chagebox safebox show">
    <div class="logo">
      <img src="../../assets/logo.png" alt />
    </div>
    <div class="title">修改密码</div>
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
          <img src="../../assets/checkcode.png" alt />
        </i>
        <input class="checkcode" type="text" placeholder="请输入验证码" autocomplete="off" />
        <a href="javascript:;" class="checkcodebtn" @click="toRandom">发送验证码</a>
      </li>
      <li>
        <i class="icon">
          <img src="../../assets/password.png" alt />
        </i>
        <input type="password" class="password" placeholder="请输入新密码" autocomplete="off" />
      </li>
    </ul>
    <a href="javascript:;" class="btn" @click="toChange">确定</a>
    <ul class="other">
      <li>
        <a @click="goRegister">注册账号</a>
      </li>
      <li>
        <a @click="goLogin">登录</a>
      </li>
    </ul>
  </div>
</template>

<script>
import common from "../common/common.js";

export default {
  name: "change",
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
    toRandom() {
      var phone = $(".chagebox .phone").val();
      if (phone.length <= 0) {
        alert("修改密码发送验证码时，手机号码，请填写");
        return false;
      }
      if (!/^1[3456789]\d{9}$/.test(phone)) {
        alert("修改密码发送验证码时，手机号码，有误，请重新填写");
        return false;
      }
      if (phone == "13800138000") {
        alert("注册发送验证码时，手机号码，有误，请重新填写");
        return false;
      }
      $(".chagebox .checkcodebtn").addClass("disable");
      common.getRandomCode(".chagebox .checkcodebtn", 60);
      common.sengAjax("/sms", {
        channel: common.getChannelId(),
        phone: phone,
        type: "forgotPassword"
      });
	},
	toChange(){
		var phone=$(".chagebox .phone").val();
		if(phone.length<=0){
			alert("修改密码时，手机号码，请填写");
			return false;
		}
		if(!(/^1[3456789]\d{9}$/.test(phone))){
			alert("修改密码时，手机号码有误，请重新填写");
			return false;
		}
		if(phone=='13800138000'){
			alert("修改密码时，手机号码，有误，请重新填写");
			return false;
		}
		var password = $(".chagebox .password").val();
		if(password.length<=0){
			alert("修改密码时，登录密码，请填写");
			return false;
		}
		if(password.length<6){
			alert("修改密码时，登录密码小于6位，请重新填写");
			return false;
		}
		var captcha = $(".chagebox .checkcode").val();
		if(captcha.length<=0){
			alert("修改密码时，短信验证码，请填写");
			return false;
    }
    
    common.sengAjax('/forgotPassword',{channel:common.getChannelId(),phone:phone,password:password,captcha:captcha},()=>{
      this.$router.push("/login")
      // console.log(this);
      
    });
    
	}
  }
};
</script>

<style scoped>
.safebox .from li .checkcode {
  width: 124px;
}
</style>